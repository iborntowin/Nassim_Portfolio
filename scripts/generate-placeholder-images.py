#!/usr/bin/env python3
"""
Generate placeholder images for project portfolio
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(width, height, text, filename, bg_color=(30, 41, 59), text_color=(255, 255, 255)):
    """Create a placeholder image with text"""
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font, fallback to basic if not available
    try:
        font = ImageFont.truetype("arial.ttf", 24)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position to center it
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Add a subtle border
    draw.rectangle([0, 0, width-1, height-1], outline=(100, 116, 139), width=2)
    
    img.save(filename, 'JPEG', quality=85)
    print(f"Created: {filename}")

def main():
    # Create directories if they don't exist
    os.makedirs('public/images/projects/1', exist_ok=True)
    os.makedirs('public/images/projects/2', exist_ok=True)
    os.makedirs('public/images/projects/3', exist_ok=True)
    os.makedirs('public/images/projects/4', exist_ok=True)
    os.makedirs('public/images/projects/5', exist_ok=True)
    
    # Project 1: Cession App
    create_placeholder_image(1200, 630, "Cession App\nDashboard", "public/images/projects/1/hero.jpg", (59, 130, 246))
    create_placeholder_image(800, 500, "JWT Authentication\nSystem", "public/images/projects/1/auth.jpg", (16, 185, 129))
    create_placeholder_image(800, 500, "Contract Management\nInterface", "public/images/projects/1/contracts.jpg", (139, 69, 19))
    create_placeholder_image(800, 500, "Mobile Responsive\nDesign", "public/images/projects/1/mobile.jpg", (147, 51, 234))
    
    # Project 2: Board-AI
    create_placeholder_image(1200, 630, "Board-AI\nComponent Detection", "public/images/projects/2/hero.jpg", (220, 38, 127))
    create_placeholder_image(800, 500, "CNN Model\nTraining Process", "public/images/projects/2/training.jpg", (5, 150, 105))
    create_placeholder_image(800, 500, "Detection Results\n92% Accuracy", "public/images/projects/2/results.jpg", (245, 101, 101))
    create_placeholder_image(800, 500, "TensorRT\nOptimization", "public/images/projects/2/architecture.jpg", (168, 85, 247))
    
    # Project 3: NeuroVigil
    create_placeholder_image(1200, 630, "NeuroVigil\nDriver Fatigue Detection", "public/images/projects/3/hero.jpg", (99, 102, 241))
    
    # Project 4: Nanosatellite Communication
    create_placeholder_image(1200, 630, "Nanosatellite\nCommunication System", "public/images/projects/4/hero.jpg", (34, 197, 94))
    
    # Project 5: GoldenTouch
    create_placeholder_image(1200, 630, "GoldenTouch\nAI Event Platform", "public/images/projects/5/hero.jpg", (251, 146, 60))
    
    print("All placeholder images generated successfully!")

if __name__ == "__main__":
    main()