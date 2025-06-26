# Landing Page Templates

This repository contains multiple landing page templates and variations for different projects.

## 📁 Folder Structure

```
├── pro/
│   ├── template/          # Master template - edit here for new features
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js
│   └── construction/      # Construction-specific landing page
│       ├── index.html
│       ├── styles.css
│       └── script.js
├── Images/                # Development images (protected from web access)
├── pro/
│   ├── Images/            # Shared production images (deployed securely)
├── Reference/             # Design references
└── sync-template.sh       # Script to copy template to new projects
```

## 🚀 Publishing

This repository uses **GitHub Actions** to automatically deploy the website.

- **Trigger:** A push to the `main` branch.
- **Source:** The contents of the `/pro` folder.
- **Result:** The `pro` folder is published as the live website.

The workflow is defined in `.github/workflows/deploy.yml`. You do not need to change the deployment settings on GitHub manually.

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

1. **Run the sync script** with a new project name:
   `./sync-template.sh real-estate`
2. **Customize the new folder** located at `pro/real-estate/`.
3. **Deploy the root** of the repository. Your new page will be at `yoursite.com/pro/real-estate/`.

## 🛡️ Security

- ✅ Sensitive files (README, .git, etc.) stay in root
- ✅ Images centralized in pro/Images/ for security and maintainability
- ✅ Smart fallback paths work for both localhost and production
- ✅ Only landing page files are in subfolders
- ✅ Each subfolder can be deployed independently
- ✅ Creative assets are protected from direct web access
- ✅ Single source of truth for all production images 