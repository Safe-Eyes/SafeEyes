from ultralytics import YOLO
import cv2

model_path = 'best.pt'
video_path = 0
model = YOLO(model_path)

results = model.track(video_path, persist=True, stream=True, conf=0.25, task='detect')

max_track_id = 0

cap = cv2.VideoCapture(video_path)
output = cv2.VideoWriter("output-4.avi", cv2.VideoWriter_fourcc(*'MPEG'), 25, (int(cap.get(3)),int(cap.get(4))))

for result in results:
    summary = result.summary()
    for s in summary:
      if 'track_id' in s and 'name' in s and s['track_id'] > max_track_id and s['name'] == 'person':
        max_track_id = s['track_id']
    tracked_frame = result.plot()
    output.write(tracked_frame)
    cv2.imshow('frame', tracked_frame)
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break

output.release()
cap.release()
cv2.destroyAllWindows()
print("Tracking video complete...")
print(f"There are {max_track_id} peoples in video")