# Landing Page Templates

This repository contains multiple landing page templates and variations for different projects.

## 📁 Folder Structure

```
├── template/          # Master template - edit here for new features
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── Images/
├── construction/      # Construction-specific landing page
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── Images/
└── Reference/         # Design references
```

## 🚀 Publishing

### For Template (Development):
- Edit files in `template/` folder
- Test changes locally
- Push to `development` branch

### For Construction (Live):
- Copy changes from `template/` to `construction/`
- Customize for construction industry
- Push to `main` branch for live deployment

## 📋 Workflow

1. **Make changes in `template/`** - This is your master template
2. **Test changes** - Ensure everything works
3. **Copy to specific project folder** - Use `template/` as base
4. **Customize for specific use case** - Modify content, colors, etc.
5. **Deploy specific folder** - Only the project folder goes live

## 🔄 Branch Strategy

- `main` - Live/production code (construction folder)
- `development` - Template development (template folder)
- `feature/*` - New features being developed

## 📝 How to Create a New Landing Page

1. Copy `template/` folder to a new folder (e.g., `real-estate/`)
2. Customize the content for your specific industry
3. Deploy only that folder
4. Keep `template/` updated with new features

## 🛡️ Security

- Sensitive files (README, .git, etc.) stay in root
- Only landing page files are in subfolders
- Each subfolder can be deployed independently 