#!/usr/bin/env python3
"""
Create placeholder avatar images for testimonials
"""

from PIL import Image, ImageDraw, ImageFont
import os
import random

def create_avatar_placeholder(name_initial, filename, bg_color):
    """Create a placeholder avatar with initials"""
    size = 150
    img = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font, fallback to basic if not available
    try:
        font = ImageFont.truetype("arial.ttf", 60)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position to center it
    bbox = draw.textbbox((0, 0), name_initial, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    draw.text((x, y), name_initial, fill=(255, 255, 255), font=font)
    
    # Make it circular
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse([0, 0, size, size], fill=255)
    
    # Apply mask to make circular
    img.putalpha(mask)
    
    img.save(filename, 'PNG')
    print(f"Created: {filename}")

def main():
    # Create avatars directory if it doesn't exist
    os.makedirs('public/images/avatars', exist_ok=True)
    
    # Create avatar placeholders with different colors
    avatars = [
        ('JS', 'avatar-1.png', (59, 130, 246)),   # Blue
        ('AM', 'avatar-2.png', (16, 185, 129)),   # Green
        ('RK', 'avatar-3.png', (139, 69, 19)),    # Brown
        ('LM', 'avatar-4.png', (147, 51, 234)),   # Purple
        ('ST', 'avatar-5.png', (220, 38, 127)),   # Pink
        ('DW', 'avatar-6.png', (5, 150, 105)),    # Teal
        ('MJ', 'avatar-7.png', (245, 101, 101)),  # Red
        ('NK', 'avatar-8.png', (168, 85, 247)),   # Violet
        ('PL', 'avatar-9.png', (34, 197, 94)),    # Emerald
        ('QR', 'avatar-10.png', (251, 146, 60)),  # Orange
        ('TU', 'avatar-11.png', (99, 102, 241)),  # Indigo
        ('VW', 'avatar-12.png', (236, 72, 153)),  # Fuchsia
        ('XY', 'avatar-13.png', (14, 165, 233)),  # Sky
        ('ZA', 'avatar-14.png', (34, 197, 94)),   # Green
    ]
    
    for initial, filename, color in avatars:
        create_avatar_placeholder(initial, f'public/images/avatars/{filename}', color)
    
    print("All avatar placeholders created successfully!")

if __name__ == "__main__":
    main()