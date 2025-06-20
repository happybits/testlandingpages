#!/bin/bash

# Script to sync template changes to other project folders
# Usage: ./sync-template.sh [folder-name]

if [ $# -eq 0 ]; then
    echo "Usage: ./sync-template.sh [folder-name]"
    echo "Example: ./sync-template.sh construction"
    exit 1
fi

TARGET_FOLDER=$1

if [ ! -d "$TARGET_FOLDER" ]; then
    echo "Creating folder: $TARGET_FOLDER"
    mkdir -p "$TARGET_FOLDER"
fi

echo "Syncing template to $TARGET_FOLDER..."

# Copy all files from template to target folder
cp template/index.html "$TARGET_FOLDER/"
cp template/styles.css "$TARGET_FOLDER/"
cp template/script.js "$TARGET_FOLDER/"
cp -r template/Images "$TARGET_FOLDER/"

echo "✅ Template synced to $TARGET_FOLDER successfully!"
echo "📝 Remember to customize the content for $TARGET_FOLDER" 