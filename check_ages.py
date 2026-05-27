import cv2
import glob
import os

def check_folders():
    for folder in ['1 export', '2 export']:
        print(f"Folder: {folder}")
        frames = sorted(glob.glob(os.path.join(folder, "*.png")))
        print(f"Total files: {len(frames)}")
        
        # Check every 50 frames
        for i in range(0, len(frames), 50):
            img = cv2.imread(frames[i])
            if img is not None:
                # Save crop
                name = os.path.basename(frames[i])
                out_name = f"crop_{folder.replace(' ', '_')}_{name}"
                crop = img[50:180, 800:1200]
                cv2.imwrite(out_name, crop)
                print(f"Saved {out_name} for frame {i+1}")

if __name__ == "__main__":
    check_folders()
