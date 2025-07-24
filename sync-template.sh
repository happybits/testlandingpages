#!/bin/bash

# Script to sync template changes to role-specific folders inside the 'pro' directory
# Usage: ./sync-template.sh [role-name]

if [ $# -eq 0 ]; then
    echo "Usage: ./sync-template.sh [role-name]"
    echo "Example: ./sync-template.sh project-manager"
    echo "Example: ./sync-template.sh superintendent"
    echo "Example: ./sync-template.sh contractor"
    exit 1
fi

TARGET_FOLDER="pro/$1"
SOURCE_FOLDER="pro/template"

if [ ! -d "$TARGET_FOLDER" ]; then
    echo "Creating folder: $TARGET_FOLDER"
    mkdir -p "$TARGET_FOLDER"
fi

echo "Syncing $SOURCE_FOLDER to $TARGET_FOLDER..."

# Copy all files from template to target folder
cp "$SOURCE_FOLDER/index.html" "$TARGET_FOLDER/"
cp "$SOURCE_FOLDER/styles.css" "$TARGET_FOLDER/"
cp "$SOURCE_FOLDER/script.js" "$TARGET_FOLDER/"

# Update image paths in the copied index.html file
echo "Updating image paths in $TARGET_FOLDER/index.html..."
sed -i '' 's/src="Images\//src="..\/Images\//g' "$TARGET_FOLDER/index.html"

echo "✅ Template synced to $TARGET_FOLDER successfully!"
echo "📝 Remember to customize the content for the $1 role."
echo "🖼️  Images are shared from the pro/Images/ folder."
echo ""
echo "🌐 Your new page will be accessible at:"
echo "   www.marcopolo.me/business/pro/$1" 