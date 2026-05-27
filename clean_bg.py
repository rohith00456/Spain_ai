from PIL import Image

def process():
    img = Image.open('spineai_device.png').convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    visited = set()
    queue = []
    
    # Add border pixels to queue
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))
        
    while queue:
        x, y = queue.pop(0)
        
        if (x, y) in visited:
            continue
        if x < 0 or x >= width or y < 0 or y >= height:
            continue
            
        visited.add((x, y))
        r, g, b, a = pixels[x, y]
        
        # The fake background is white/gray squares. Device is black.
        # This stops the fill safely at the device borders.
        if r > 120 and g > 120 and b > 120:
            pixels[x, y] = (0, 0, 0, 0)
            queue.append((x + 1, y))
            queue.append((x - 1, y))
            queue.append((x, y + 1))
            queue.append((x, y - 1))
            
    img.save('spineai_device.png', "PNG")
    print("DONE background removal.")

process()
