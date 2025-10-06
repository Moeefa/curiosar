#!/bin/bash
# compress-sar-images.sh
# Compress all SAR images in /public/sar/<year>/*.png without losing quality

# Requirements: install oxipng
# sudo pacman -S oxipng

# Base directory containing SAR images
BASE_DIR="./public/sar"

# Loop through each year folder
for year_dir in "$BASE_DIR"/*/; do
    echo "Processing year: $(basename "$year_dir")"

    # Compress all PNGs in this year folder
    oxipng -o6 -r "$year_dir"

    echo "Done: $(basename "$year_dir")"
done

echo "All images compressed!"

