import cv2
import numpy as np

# ***** Global variable declaration *****
points = []
current = (0, 0)
prev_current = (0, 0)
transparent_overlay = None

def on_mouse(event, x, y, flags, param):
    global points, current, transparent_overlay
    if event == cv2.EVENT_MOUSEMOVE:
        current = (x, y)
    elif event == cv2.EVENT_LBUTTONDOWN:
        print("Adding point #%d with position(%d,%d)" % (len(points), x, y))
        points.append([x, y])
        cv2.circle(transparent_overlay, (x, y), 5, (0, 200, 0), -1)
    elif event == cv2.EVENT_RBUTTONDOWN:
        print("Completing polygon with %d points." % len(points))
        cv2.fillPoly(transparent_overlay, np.array([points]), (255, 0, 0))

cv2.namedWindow("Webcam")
cv2.setMouseCallback("Webcam", on_mouse)

# Open webcam
cap = cv2.VideoCapture(0)

while cv2.getWindowProperty("Webcam", 0) >= 0:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture image")
        break
    
    transparent_overlay = np.zeros_like(frame, dtype=np.uint8)

    # Draw the polygon on the transparent overlay
    if len(points) > 1:
        cv2.polylines(transparent_overlay, [np.array(points)], False, (255, 0, 0), 1)
        cv2.line(transparent_overlay, (points[-1][0], points[-1][1]), current, (0, 0, 255))

    # Blend the overlay with the frame
    blended_frame = cv2.addWeighted(frame, 1.0, transparent_overlay, 0.5, 0)

    cv2.imshow("Webcam", blended_frame)

    if cv2.waitKey(1) == ord('d'):  # Press 'd' to finish drawing
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()
