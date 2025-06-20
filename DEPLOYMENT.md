# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended)
1. Go to your GitHub repository
2. Click "Settings" → "Pages"
3. Select "Deploy from a branch"
4. Choose branch: `main`
5. Select folder: `/construction` (or your specific folder)
6. Click "Save"

### Option 2: Netlify
1. Go to netlify.com
2. Drag your specific folder (e.g., `construction/`) to deploy
3. Or connect GitHub and specify the folder path

### Option 3: Vercel
1. Go to vercel.com
2. Import your GitHub repository
3. Set root directory to your specific folder (e.g., `construction`)

## 🔄 Safe Development Workflow

### Making Changes (Development Branch)
```bash
# 1. Switch to development branch
git checkout development

# 2. Make changes in template/ folder
# 3. Test your changes
# 4. Commit and push
git add .
git commit -m "New feature: [description]"
git push origin development
```

### Deploying to Live (Main Branch)
```bash
# 1. Sync template to construction folder
./sync-template.sh construction

# 2. Customize construction folder content
# 3. Switch to main branch
git checkout main

# 4. Commit and push
git add .
git commit -m "Deploy construction landing page"
git push origin main
```

## 📁 Folder-Specific Publishing

### For Construction Landing Page:
- Deploy `construction/` folder
- URL: `https://yoursite.com/construction/`
- Images are referenced from root `Images/` folder

### For Template (Development):
- Deploy `template/` folder
- URL: `https://yoursite.com/template/`
- Images are referenced from root `Images/` folder

### For New Projects:
1. Create new folder: `./sync-template.sh real-estate`
2. Customize content in `real-estate/` folder
3. Deploy `real-estate/` folder

## 🛡️ Security Features

- ✅ Template changes don't affect live sites
- ✅ Each project has its own folder
- ✅ Development branch for testing
- ✅ Main branch for live deployment
- ✅ Easy sync between template and projects
- ✅ Images folder is shared but protected from direct web access
- ✅ Only landing page files are deployed

## 📝 Customization Checklist

When creating a new landing page:

- [ ] Copy template: `./sync-template.sh [project-name]`
- [ ] Update title in `index.html`
- [ ] Change hero content
- [ ] Update feature descriptions
- [ ] Modify testimonials
- [ ] Change color scheme (if needed)
- [ ] Update images (in root Images/ folder)
- [ ] Test on mobile
- [ ] Deploy specific folder

## 🖼️ Image Management

- All images are stored in the root `Images/` folder
- Images are referenced using `../Images/` path in subfolders
- When deployed, only the specific project folder is accessible
- Creative assets are protected from direct web access 