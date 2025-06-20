#!/bin/bash

# Script to sync template changes to other project folders inside the 'pages' directory
# Usage: ./sync-template.sh [folder-name]

if [ $# -eq 0 ]; then
    echo "Usage: ./sync-template.sh [folder-name]"
    echo "Example: ./sync-template.sh construction"
    exit 1
fi

TARGET_FOLDER="pages/$1"
SOURCE_FOLDER="pages/template"

if [ ! -d "$TARGET_FOLDER" ]; then
    echo "Creating folder: $TARGET_FOLDER"
    mkdir -p "$TARGET_FOLDER"
fi

echo "Syncing $SOURCE_FOLDER to $TARGET_FOLDER..."

# Copy all files from template to target folder
cp "$SOURCE_FOLDER/index.html" "$TARGET_FOLDER/"
cp "$SOURCE_FOLDER/styles.css" "$TARGET_FOLDER/"
cp "$SOURCE_FOLDER/script.js" "$TARGET_FOLDER/"

echo "✅ Template synced to $TARGET_FOLDER successfully!"
echo "📝 Remember to customize the content for your new page."
echo "🖼️  Images are shared from the root Images/ folder." 