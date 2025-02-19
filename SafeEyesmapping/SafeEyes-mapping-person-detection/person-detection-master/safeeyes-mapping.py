import os
import cv2
import torch
import numpy as np
import threading
from ultralytics import YOLO

MODEL_PATH = "yolov8n.pt"
VIDEO_PATH = 0 
CONFIDENCE_THRESHOLD = 0.5 
FRAME_RESIZE = (640, 480)  
FRAME_SKIP = 2


MAP_SIZE = (300, 300, 3)
virtual_map = np.zeros(MAP_SIZE, dtype=np.uint8)
polygon_points = [] 
drawing = False
map_defined = False 
frame_counter = 0  
latest_frame = None
lock = threading.Lock()


def draw_map(event, x, y, flags, param):
    global polygon_points, drawing, map_defined
    if map_defined:
        return  
    if event == cv2.EVENT_LBUTTONDOWN:
        drawing = True
        polygon_points.append((x, y))
    elif event == cv2.EVENT_MOUSEMOVE and drawing:
        polygon_points.append((x, y))
    elif event == cv2.EVENT_LBUTTONUP:
        drawing = False
    elif event == cv2.EVENT_RBUTTONDOWN and len(polygon_points) > 2:
        map_defined = True  
        drawing = False  

def is_inside_polygon(point, polygon):
    if len(polygon) < 3:
        return False
    return cv2.pointPolygonTest(np.array(polygon, dtype=np.int32), point, False) >= 0

def load_model(model_path):
    return YOLO(model_path).to('cuda' if torch.cuda.is_available() else 'cpu')

def capture_video(video_path):
    global latest_frame, lock
    cap = cv2.VideoCapture(video_path)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, FRAME_RESIZE)
        with lock:
            latest_frame = frame.copy()
    cap.release()

def process_video(person_model):
    global latest_frame, lock, virtual_map, polygon_points, map_defined, frame_counter
    cv2.namedWindow("Webcam")
    cv2.setMouseCallback("Webcam", draw_map)
    
    while True:
        with lock:
            if latest_frame is None:
                continue
            frame = latest_frame.copy()
        
        frame_counter += 1
        if frame_counter % FRAME_SKIP != 0:
            continue
        
        if not map_defined:
            if len(polygon_points) > 1:
                cv2.polylines(frame, [np.array(polygon_points)], False, (255, 0, 0), 2)
            cv2.putText(frame, "Draw area and right-click to confirm", (20, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
            cv2.imshow('Webcam', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
            continue
        
        virtual_map.fill(0) 
        if len(polygon_points) > 1:
            cv2.polylines(virtual_map, [np.array(polygon_points)], True, (255, 0, 0), 2)
        
        results = person_model(frame)
        for result in results:
            for detection in result.boxes:
                conf = detection.conf[0].item()
                if conf < CONFIDENCE_THRESHOLD:
                    continue
                x1, y1, x2, y2 = map(int, detection.xyxy[0])
                label = result.names[detection.cls[0].item()]
                center_x, center_y = (x1 + x2) // 2, y2
                if is_inside_polygon((center_x, center_y), polygon_points):
                    map_x = int((center_x - min(p[0] for p in polygon_points)) * MAP_SIZE[1] /
                                (max(p[0] for p in polygon_points) - min(p[0] for p in polygon_points) + 1))
                    map_y = int((center_y - min(p[1] for p in polygon_points)) * MAP_SIZE[0] /
                                (max(p[1] for p in polygon_points) - min(p[1] for p in polygon_points) + 1))
                    cv2.circle(virtual_map, (map_x, map_y), 5, (0, 255, 0), -1)
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(frame, f"{label}: {conf:.2f}", (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        cv2.imshow('Webcam', frame)
        cv2.imshow('Virtual Map', virtual_map)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cv2.destroyAllWindows()

def main():
    if not os.path.exists(MODEL_PATH):
        print("Error: Model file not found!")
        return
    person_model = load_model(MODEL_PATH)
    
    video_thread = threading.Thread(target=capture_video, args=(VIDEO_PATH,), daemon=True)
    video_thread.start()
    process_video(person_model)
    print("Real-time detection and mapping complete.")

if __name__ == "__main__":
    main()
