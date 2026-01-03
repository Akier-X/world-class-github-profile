# 📋 Detailed Setup Guide

Complete guide for setting up and customizing your world-class GitHub profile.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [GitHub Token Setup](#github-token-setup)
5. [Deployment](#deployment)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **Git**: Latest version recommended

### Verify Installation

```bash
node --version  # Should be ≥18.0.0
npm --version   # Should be ≥9.0.0
git --version
```

### GitHub Account

- Active GitHub account
- Public repositories (for full feature set)
- (Optional) GitHub Personal Access Token

## Installation

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/world-class-github-profile.git

# Navigate to project directory
cd world-class-github-profile
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# This will install:
# - Next.js and React
# - TypeScript
# - Tailwind CSS
# - Framer Motion
# - Three.js
# - GitHub API clients
# - Testing libraries
# - And more...
```

### Step 3: Verify Installation

```bash
# Check for errors
npm run type-check

# Run linter
npm run lint
```

## Configuration

### Method 1: Configuration File (Recommended)

1. **Copy example config**

   ```bash
   cp config.example.json config.json
   ```

2. **Edit `config.json`**

   ```json
   {
     "github": {
       "username": "your-github-username",
       "token": "ghp_xxxxx"
     },
     "personal": {
       "name": "Your Full Name",
       "occupation": "Full Stack Developer",
       "bio": "Passionate about building world-class products",
       "skills": [
         "React",
         "TypeScript",
         "Node.js",
         "Python",
         "AWS"
       ],
       "location": "Tokyo, Japan",
       "email": "your.email@example.com",
       "website": "https://yourwebsite.com"
     },
     "social": {
       "twitter": "your_twitter",
       "linkedin": "your-linkedin",
       "blog": "https://yourblog.com"
     },
     "preferences": {
       "theme": "dark",
       "primaryColor": "#3B82F6",
       "showEmail": false,
       "showLocation": true,
       "pinnedRepos": ["important-repo-1", "important-repo-2"],
       "excludeRepos": ["test-repo", "private-notes"],
       "highlightLanguages": ["TypeScript", "Python", "Go"]
     },
     "features": {
       "readmeGenerator": true,
       "dashboard": true,
       "portfolio": true,
       "aiBranding": true,
       "realTimeActivity": true,
       "blogIntegration": true,
       "3dAnimations": true,
       "darkMode": true
     }
   }
   ```

### Method 2: Environment Variables

1. **Copy example .env**

   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`**

   ```bash
   # GitHub Configuration
   NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
   GITHUB_TOKEN=ghp_xxxxx

   # Personal Information
   NEXT_PUBLIC_NAME=Your Name
   NEXT_PUBLIC_OCCUPATION=Full Stack Developer
   NEXT_PUBLIC_BIO=Building world-class products

   # Social Links
   NEXT_PUBLIC_TWITTER=your_twitter
   NEXT_PUBLIC_LINKEDIN=your-linkedin
   NEXT_PUBLIC_WEBSITE=https://yourwebsite.com

   # Theme
   NEXT_PUBLIC_THEME=dark
   NEXT_PUBLIC_PRIMARY_COLOR=#3B82F6

   # Feature Flags
   NEXT_PUBLIC_ENABLE_3D=true
   NEXT_PUBLIC_ENABLE_REALTIME=true
   NEXT_PUBLIC_ENABLE_BLOG=true
   ```

### Configuration Priority

Environment variables override config.json values:

```
LocalStorage > .env > config.json > defaults
```

## GitHub Token Setup

### Why You Need a Token

- **Higher API Rate Limits**: 5000 requests/hour vs 60 requests/hour
- **Access Private Data**: If needed for personal use
- **Faster Data Loading**: Better user experience

### Creating a Personal Access Token

1. **Go to GitHub Settings**

   https://github.com/settings/tokens

2. **Generate New Token (Classic)**

   Click "Generate new token (classic)"

3. **Configure Token**

   - **Note**: "World-Class GitHub Profile"
   - **Expiration**: Choose appropriate duration
   - **Scopes**: Select:
     - ✅ `public_repo` (for public repo access)
     - ✅ `read:user` (for user profile)
     - ✅ `user:email` (for email address)

4. **Generate and Copy**

   Click "Generate token" and copy it immediately

5. **Add to Configuration**

   ```bash
   # In .env
   GITHUB_TOKEN=ghp_your_copied_token_here
   ```

   **⚠️ NEVER commit your token to Git!**

## Deployment

### GitHub Pages (Automatic)

1. **Update Repository Settings**

   In `next.config.js`:
   ```javascript
   basePath: process.env.NODE_ENV === 'production'
     ? '/world-class-github-profile'  // Your repo name
     : '',
   ```

2. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

3. **Enable GitHub Pages**

   - Repository → Settings → Pages
   - Source: "GitHub Actions"
   - Wait for workflow to complete

4. **Access Your Site**

   `https://yourusername.github.io/world-class-github-profile`

### Manual Build

```bash
# Build the project
npm run build

# Export static files
npm run export

# Output will be in ./out directory
# Deploy ./out to any static hosting:
# - Vercel
# - Netlify
# - AWS S3 + CloudFront
# - Firebase Hosting
```

## Customization

### Pinning Specific Repositories

In `config.json`:

```json
{
  "preferences": {
    "pinnedRepos": [
      "my-best-project",
      "popular-library",
      "portfolio-website"
    ]
  }
}
```

Pinned repos appear first in the Projects section.

### Excluding Repositories

```json
{
  "preferences": {
    "excludeRepos": [
      "test-repo",
      "private-notes",
      "learning-exercises"
    ]
  }
}
```

### Custom Primary Color

```json
{
  "preferences": {
    "primaryColor": "#10B981"  // Green
  }
}
```

Or edit `tailwind.config.js` for full theme control.

### Disabling Features

```json
{
  "features": {
    "3dAnimations": false,      // Disable 3D charts
    "realTimeActivity": false,  // Disable activity feed
    "blogIntegration": false    // Disable blog section
  }
}
```

### Adding Custom Sections

1. Create component in `src/components/sections/MySection.tsx`
2. Import in `src/app/page.tsx`
3. Add to page:

```typescript
<MySection />
```

## Troubleshooting

### GitHub API Rate Limit Exceeded

**Problem**: "API rate limit exceeded" error

**Solution**:
- Add GitHub Personal Access Token to `.env`
- Token increases limit from 60 to 5000 requests/hour

### Build Fails with Type Errors

**Problem**: TypeScript errors during build

**Solution**:
```bash
# Check errors
npm run type-check

# Fix or temporarily disable strict mode in tsconfig.json
{
  "compilerOptions": {
    "strict": false  // Not recommended for production
  }
}
```

### 3D Animations Not Working

**Problem**: Charts appear but no 3D effects

**Solution**:
- Check browser compatibility (Chrome, Firefox, Safari modern versions)
- Disable in config if issues persist:
```json
{
  "features": {
    "3dAnimations": false
  }
}
```

### Deployment Shows 404

**Problem**: GitHub Pages returns 404

**Solution**:
- Verify `basePath` in `next.config.js` matches repo name
- Check GitHub Pages settings (Settings → Pages)
- Ensure workflow completed successfully (Actions tab)
- Clear browser cache

### Data Not Loading

**Problem**: Dashboard shows loading spinner indefinitely

**Solution**:
1. Check GitHub username in config
2. Verify internet connection
3. Check browser console for errors
4. Try with a different username to test

### Missing Dependencies

**Problem**: Module not found errors

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Verify all packages
npm list
```

## Advanced Configuration

### Changing Port

```bash
# Development
PORT=3001 npm run dev

# Or in package.json
"dev": "next dev -p 3001"
```

### Custom Domain (GitHub Pages)

1. Add `CNAME` file to `public/` directory:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Type: A
   - Name: @
   - Value: 185.199.108.153 (and other GitHub IPs)

3. Enable HTTPS in GitHub Pages settings

### Analytics Integration

Add to `src/app/layout.tsx`:

```typescript
// Google Analytics
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## Getting Help

### Resources

- **Documentation**: This file and README.md
- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and share ideas

### Before Asking for Help

1. Check this guide thoroughly
2. Search existing GitHub issues
3. Try with default config first
4. Check browser console for errors

### Providing Information

When reporting issues, include:

- Node.js and npm versions
- Operating system
- Error messages (full stack trace)
- Steps to reproduce
- Config (sanitized, no tokens!)

---

Need more help? Open an issue on GitHub with detailed information!
