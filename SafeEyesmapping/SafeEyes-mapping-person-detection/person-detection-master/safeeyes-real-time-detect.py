import os
import cv2
import torch
import numpy as np
import threading
import time
from ultralytics import YOLO

MODEL_PATH = "yolov8n.pt"  
PPE_MODEL_PATH = "ppe_detection.pt" 
VIDEO_PATH = 1  
CONFIDENCE_THRESHOLD = 0.5
FRAME_RESIZE = (640, 480)
FPS_TARGET = 20  
FRAME_DELAY = max(0, 1.0 / FPS_TARGET)  

PPE_CATEGORIES = ["Hardhat", "Safety Vest", "Glasses", "Gloves", "Boots"]

MAP_SIZE = (640, 480, 3)
virtual_map = np.zeros(MAP_SIZE, dtype=np.uint8)
polygon_points = []
drawing = False
map_defined = False
latest_frame = None
lock = threading.Lock()
person_positions = {}

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

def is_inside_polygon(point, polygon):
    return cv2.pointPolygonTest(np.array(polygon, dtype=np.int32), point, False) >= 0

def load_model(model_path):
    return YOLO(model_path).to('cuda' if torch.cuda.is_available() else 'cpu')


def detect_ppe(frame, ppe_model, person_boxes):
    ppe_results = ppe_model(frame)
    ppe_status = {bbox: {ppe: "Missing" for ppe in PPE_CATEGORIES} for bbox in person_boxes}
    
    for result in ppe_results:
        for detection in result.boxes:
            x1, y1, x2, y2 = map(int, detection.xyxy[0])
            class_id = int(detection.cls[0].item())
            label = ppe_model.names[class_id]
            
            for bbox in person_boxes:
                px1, py1, px2, py2 = bbox
                if x1 >= px1 and y1 >= py1 and x2 <= px2 and y2 <= py2:
                    ppe_status[bbox][label] = "Present"
    
    return ppe_status

def process_video(person_model, ppe_model):
    global latest_frame, lock, virtual_map, polygon_points, map_defined, person_positions
    cap = cv2.VideoCapture(VIDEO_PATH)
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return
    
    cv2.namedWindow("Webcam")
    cv2.setMouseCallback("Webcam", draw_map)
    last_time = time.time()
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to capture frame.")
            break
        
        frame = cv2.resize(frame, FRAME_RESIZE)
        
        with lock:
            latest_frame = frame.copy()

        if not map_defined:
            if len(polygon_points) > 1:
                cv2.polylines(frame, [np.array(polygon_points)], True, (255, 0, 0), 2)
            cv2.imshow('Webcam', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
            continue
        
        virtual_map.fill(0)
        if len(polygon_points) > 1:
            cv2.polylines(virtual_map, [np.array(polygon_points)], True, (255, 0, 0), 2)

        results = person_model(frame)
        person_boxes = {}

        for result in results:
            for detection in result.boxes:
                conf = detection.conf[0].item()
                if conf < CONFIDENCE_THRESHOLD:
                    continue
                x1, y1, x2, y2 = map(int, detection.xyxy[0])
                class_id = int(detection.cls[0].item())
                label = person_model.names[class_id]

                if label == "person":
                    center_x, center_y = (x1 + x2) // 2, (y1 + y2) // 2
                    if is_inside_polygon((center_x, center_y), polygon_points):
                        person_boxes[(x1, y1, x2, y2)] = (center_x, center_y)
        
        ppe_status = detect_ppe(frame, ppe_model, person_boxes.keys())
        
        for (x1, y1, x2, y2), (cx, cy) in person_boxes.items():
            missing_ppe = [ppe for ppe, status in ppe_status[(x1, y1, x2, y2)].items() if status == "Missing"]
            color = (0, 255, 0) if not missing_ppe else (0, 0, 255)
            cv2.circle(virtual_map, (cx, cy), 5, color, -1)
            
            for i, (ppe, status) in enumerate(ppe_status[(x1, y1, x2, y2)].items()):
                text = f"{ppe}: {status}"
                ppe_color = (0, 255, 0) if status == "Present" else (0, 0, 255)
                cv2.putText(frame, text, (x1, y1 - 20 - (i * 15)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, ppe_color, 2)
            
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        
        cv2.imshow('Webcam', frame)
        cv2.imshow('Virtual Map', virtual_map)

        elapsed = time.time() - last_time
        time.sleep(max(0, FRAME_DELAY - elapsed))
        last_time = time.time()

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

def main():
    person_model = load_model(MODEL_PATH)
    ppe_model = load_model(PPE_MODEL_PATH)
    process_video(person_model, ppe_model)

if __name__ == "__main__":
    main()

