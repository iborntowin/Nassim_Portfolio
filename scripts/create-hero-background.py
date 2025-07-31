#!/usr/bin/env python3
"""
Create a hero background image for the portfolio
"""

from PIL import Image, ImageDraw, ImageFilter
import os

def create_hero_background():
    """Create a professional hero background image"""
    width, height = 1200, 800
    
    # Create base image with gradient
    img = Image.new('RGB', (width, height), (15, 23, 42))  # Dark blue base
    draw = ImageDraw.Draw(img)
    
    # Create gradient effect
    for y in range(height):
        # Create a gradient from dark blue to darker blue
        r = int(15 + (y / height) * 10)
        g = int(23 + (y / height) * 15)
        b = int(42 + (y / height) * 20)
        
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add some geometric patterns
    for i in range(0, width, 100):
        for j in range(0, height, 100):
            # Add subtle dots
            if (i + j) % 200 == 0:
                draw.ellipse([i-2, j-2, i+2, j+2], fill=(59, 130, 246, 50))
    
    # Add diagonal lines for texture
    for i in range(-height, width, 50):
        draw.line([(i, 0), (i + height, height)], fill=(59, 130, 246, 20), width=1)
    
    # Apply slight blur for smoothness
    img = img.filter(ImageFilter.GaussianBlur(radius=1))
    
    # Save the image
    img.save('public/images/hero-background.jpg', 'JPEG', quality=90)
    print("Hero background image created: public/images/hero-background.jpg")

if __name__ == "__main__":
    # Create images directory if it doesn't exist
    os.makedirs('public/images', exist_ok=True)
    create_hero_background()