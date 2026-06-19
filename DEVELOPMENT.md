# IBM Synergies Map - Development Workflow Guide

## Overview

This guide covers the development workflow for maintaining and enhancing the IBM Synergies Map, including best practices for working with IBM Bob (AI assistant) and the CI/CD pipeline.

## Development Environment

### Prerequisites

- **Git**: Version control
- **Modern web browser**: Chrome, Firefox, Safari, or Edge
- **Text editor/IDE**: VS Code recommended (with IBM Bob integration)
- **GitHub account**: With access to the repository

### Optional Tools

- **IBM Cloud CLI**: For manual deployments and testing
- **Node.js**: If you add build tools later
- **Live Server**: VS Code extension for local development

## Project Structure

```
synergies-map/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD pipeline
├── IBM_Synergies_Map.html          # Main application (single file)
├── README.md                       # Project overview
├── DEPLOYMENT.md                   # Deployment guide
├── DEVELOPMENT.md                  # This file
└── .gitignore                      # Git exclusions
```

## Development Workflow

### 1. Local Development

#### Opening the Project

```bash
# Clone repository (if not already done)
git clone https://github.com/your-org/synergies-map.git
cd synergies-map

# Open in VS Code
code .
```

#### Testing Locally

**Option A: Direct File Opening**
```bash
# Simply open the HTML file in your browser
open IBM_Synergies_Map.html  # macOS
start IBM_Synergies_Map.html # Windows
xdg-open IBM_Synergies_Map.html # Linux
```

**Option B: Live Server (Recommended)**
1. Install "Live Server" extension in VS Code
2. Right-click `IBM_Synergies_Map.html`
3. Select "Open with Live Server"
4. Browser opens at `http://localhost:5500`

**Benefits of Live Server:**
- Auto-refresh on file changes
- Simulates real web server environment
- Better for testing CORS and other web features

### 2. Making Changes

#### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/add-new-product

# Make your changes to IBM_Synergies_Map.html

# Test locally (open in browser)

# Commit changes
git add IBM_Synergies_Map.html
git commit -m "feat: add Confluent to Data & AI play"

# Push to GitHub
git push origin feature/add-new-product

# Create Pull Request on GitHub
```

#### Commit Message Convention

Follow conventional commits for clarity:

```
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Visual/CSS changes (no logic change)
refactor: Code restructuring (no behavior change)
perf: Performance improvements
test: Adding tests
chore: Maintenance tasks

Examples:
feat: add IBM Concert product to Automation play
fix: correct connection between Instana and Turbonomic
docs: update README with v3.1 features
style: adjust node spacing for better visual balance
refactor: optimize connection rendering algorithm
```

### 3. Working with IBM Bob

#### Best Practices for AI-Assisted Development

**Starting a Session:**
```
"Bob, I need to add a new product called 'IBM Concert' to the Automation play. 
It should connect to API Connect and Event Automation. Can you help?"
```

**Providing Context:**
```
"Bob, analyze the current product data structure in IBM_Synergies_Map.html 
and show me how to add a new product with all required fields."
```

**Iterative Development:**
```
1. Ask Bob to analyze the code
2. Discuss the change you want to make
3. Let Bob suggest the implementation
4. Review Bob's suggestions
5. Ask Bob to make the changes
6. Test locally
7. Commit if successful
```

#### Common Bob Commands

```
# Code Analysis
"Bob, analyze the connection logic in the HTML file"
"Bob, show me all products in the Data & AI play"
"Bob, find where the theme toggle is implemented"

# Making Changes
"Bob, add a new product with these details: [details]"
"Bob, update the connection between Product A and Product B"
"Bob, change the color scheme for the Security play"

# Debugging
"Bob, why isn't the search function finding Product X?"
"Bob, the connections aren't rendering correctly, can you investigate?"

# Documentation
"Bob, update the README to reflect the new product"
"Bob, add comments explaining the layout algorithm"
```

#### Bob Integration Tips

1. **Be Specific**: Provide exact product names, play categories, and requirements
2. **Show Examples**: Reference existing products as templates
3. **Test Incrementally**: Make one change at a time
4. **Ask for Explanations**: Understand the code, don't just copy-paste
5. **Review Changes**: Always review Bob's suggestions before committing

### 4. Testing Changes

#### Pre-Commit Checklist

- [ ] Open HTML file in browser
- [ ] Test light and dark modes
- [ ] Click each new/modified product
- [ ] Verify connections render correctly
- [ ] Test search functionality
- [ ] Check responsive layout (resize browser)
- [ ] Verify no console errors (F12 Developer Tools)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

#### Manual Testing Scenarios

**Product Addition:**
1. Click the new product node
2. Verify sidebar shows correct information
3. Check all connections are visible
4. Verify connection justifications display
5. Test clicking connected products

**Connection Changes:**
1. Select source product
2. Verify target product highlights
3. Check connection line renders
4. Verify justification text appears
5. Test bidirectional connections

**Visual Changes:**
1. Toggle light/dark mode
2. Check color contrast
3. Verify text readability
4. Test hover states
5. Check responsive breakpoints

### 5. Deployment Process

#### Automatic Deployment (Recommended)

```bash
# Merge to main branch triggers automatic deployment
git checkout main
git merge feature/add-new-product
git push origin main

# GitHub Actions automatically:
# 1. Runs workflow
# 2. Deploys to IBM Cloud Object Storage
# 3. Updates live site within 2-3 minutes
```

#### Manual Deployment

```bash
# Trigger via GitHub Actions UI
# 1. Go to repository on GitHub
# 2. Click "Actions" tab
# 3. Select "Deploy to IBM Cloud Object Storage"
# 4. Click "Run workflow" → "Run workflow"
```

#### Monitoring Deployment

```bash
# Watch GitHub Actions
# 1. Go to "Actions" tab
# 2. Click on running workflow
# 3. Monitor each step
# 4. Check for errors

# Verify deployment
# 1. Wait 2-3 minutes for cache
# 2. Open public URL
# 3. Hard refresh (Ctrl+Shift+R)
# 4. Test changes
```

### 6. Rollback Procedure

#### Via Git Revert

```bash
# Revert last commit
git revert HEAD
git push origin main
# Automatic deployment restores previous version

# Revert specific commit
git revert <commit-hash>
git push origin main
```

#### Via Object Storage

```bash
# Manual rollback in IBM Cloud Console
# 1. Go to Object Storage bucket
# 2. Find IBM_Synergies_Map.html
# 3. Click "⋮" → "View versions"
# 4. Select previous version
# 5. Click "Restore"
```

## Code Structure Guide

### HTML File Organization

The `IBM_Synergies_Map.html` file is organized as follows:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Meta tags, title, favicon -->
  <!-- Google Fonts -->
  <style>
    /* Carbon Design System tokens */
    /* Layout styles */
    /* Component styles */
    /* Responsive styles */
  </style>
</head>
<body>
  <!-- Header with title and controls -->
  <!-- Main container with product nodes -->
  <!-- Sidebar for product details -->
  <!-- SVG canvas for connections -->
  <!-- Tweaks panel for customization -->
  
  <script>
    /* Configuration and data */
    /* Layout computation */
    /* Rendering functions */
    /* Event handlers */
    /* Initialization */
  </script>
</body>
</html>
```

### Key Code Sections

**Product Data Structure:**
```javascript
const products = [
  {
    id: 'product-id',
    name: 'Product Name',
    play: 1, // Play number (1-6)
    desc: 'Product description',
    value: 'Value proposition',
    competitors: ['Competitor 1', 'Competitor 2'],
    differentiators: ['Differentiator 1', 'Differentiator 2'],
    questions: ['Question 1?', 'Question 2?']
  }
];
```

**Connection Data Structure:**
```javascript
const connections = [
  {
    from: 'product-a',
    to: 'product-b',
    justification: 'Why these products integrate'
  }
];
```

### Adding a New Product

1. **Add to products array:**
```javascript
{
  id: 'new-product',
  name: 'New Product',
  play: 2, // Data & AI
  desc: 'What this product does...',
  value: 'Business value and ROI...',
  competitors: ['Competitor A', 'Competitor B'],
  differentiators: ['Key advantage 1', 'Key advantage 2'],
  questions: [
    'Discovery question 1?',
    'Discovery question 2?',
    'Discovery question 3?',
    'Discovery question 4?'
  ]
}
```

2. **Add connections:**
```javascript
{
  from: 'new-product',
  to: 'existing-product',
  justification: 'Integration explanation...'
}
```

3. **Test thoroughly**

### Modifying Styles

**Carbon Design System tokens** are used throughout:
```css
:root {
  --cds-background: #ffffff;
  --cds-text-primary: #161616;
  --play-1: #0043ce; /* Automation */
  --play-2: #198038; /* Data & AI */
  /* etc. */
}
```

**To change colors:**
1. Modify CSS variables in `:root` or `[data-theme="dark"]`
2. Test in both light and dark modes
3. Ensure sufficient contrast for accessibility

## Troubleshooting

### Common Issues

**Issue: Changes not visible after deployment**
```bash
# Solution: Clear browser cache
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (macOS)

# Or wait 1 hour for cache expiration
```

**Issue: Connections not rendering**
```javascript
// Check console for errors (F12)
// Verify product IDs match in connections array
// Ensure SVG canvas is properly sized
```

**Issue: Search not finding products**
```javascript
// Verify product data includes searchable fields
// Check search function includes all relevant fields
// Test with exact product names first
```

**Issue: Layout looks broken**
```css
/* Check browser console for CSS errors */
/* Verify viewport meta tag is present */
/* Test in different browsers */
/* Check for JavaScript errors blocking rendering */
```

## Performance Optimization

### Best Practices

1. **Minimize file size**: Keep HTML under 1MB
2. **Optimize SVG rendering**: Use efficient path calculations
3. **Event delegation**: Already implemented for performance
4. **Lazy loading**: Consider for future enhancements
5. **Cache headers**: Already configured in deployment

### Monitoring Performance

```javascript
// Add to browser console for performance testing
console.time('render');
// Trigger render
console.timeEnd('render');

// Check memory usage
console.memory; // Chrome only
```

## Security Considerations

1. **No sensitive data**: Keep API keys out of HTML
2. **Input sanitization**: Already implemented for search
3. **XSS prevention**: Use textContent, not innerHTML where possible
4. **HTTPS**: Enabled via IBM Cloud Object Storage
5. **Content Security Policy**: Consider adding in future

## Future Enhancements

### Potential Features

- [ ] Export product data as PDF
- [ ] Share specific product views via URL parameters
- [ ] Add product comparison mode
- [ ] Implement user favorites/bookmarks
- [ ] Add analytics tracking
- [ ] Multi-language support
- [ ] Mobile app version

### Build Process (Future)

If the project grows, consider adding:
- **Build tools**: Webpack, Vite, or Parcel
- **CSS preprocessor**: Sass or Less
- **Minification**: Terser for JavaScript
- **Testing**: Jest for unit tests
- **Linting**: ESLint and Prettier

## Resources

### Documentation
- **IBM Carbon Design System**: https://carbondesignsystem.com
- **IBM Cloud Object Storage**: https://cloud.ibm.com/docs/cloud-object-storage
- **GitHub Actions**: https://docs.github.com/actions

### Tools
- **VS Code**: https://code.visualstudio.com
- **IBM Cloud CLI**: https://cloud.ibm.com/docs/cli
- **Git**: https://git-scm.com

### Support
- **IBM Cloud Support**: https://cloud.ibm.com/unifiedsupport/supportcenter
- **GitHub Issues**: Use repository issues for bug reports
- **Internal Team**: Contact Arrow ECS UK team

---

**Last Updated**: 2026-06-19  
**Version**: 1.0  
**Maintained by**: Arrow ECS UK