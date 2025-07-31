#!/usr/bin/env python3
"""
Create placeholder logo images for the portfolio
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_logo_placeholder(name, filename, bg_color=(59, 130, 246), text_color=(255, 255, 255)):
    """Create a placeholder logo with text"""
    width, height = 120, 60
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font, fallback to basic if not available
    try:
        font = ImageFont.truetype("arial.ttf", 16)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position to center it
    bbox = draw.textbbox((0, 0), name, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    draw.text((x, y), name, fill=text_color, font=font)
    
    # Add a subtle border
    draw.rectangle([0, 0, width-1, height-1], outline=(100, 116, 139), width=1)
    
    img.save(filename, 'PNG')
    print(f"Created: {filename}")

def main():
    # Create logos directory if it doesn't exist
    os.makedirs('public/images/logos', exist_ok=True)
    
    # Create logo placeholders
    logos = [
        ('React', 'react.png', (97, 218, 251)),
        ('Next.js', 'nextjs.png', (0, 0, 0)),
        ('TypeScript', 'typescript.png', (49, 120, 198)),
        ('Python', 'python.png', (255, 212, 59)),
        ('Spring', 'spring.png', (109, 179, 63)),
        ('PostgreSQL', 'postgresql.png', (51, 103, 145)),
        ('Docker', 'docker.png', (29, 155, 209)),
        ('TensorFlow', 'tensorflow.png', (255, 109, 56))
    ]
    
    for name, filename, color in logos:
        create_logo_placeholder(name, f'public/images/logos/{filename}', color)
    
    print("All logo placeholders created successfully!")

if __name__ == "__main__":
    main()