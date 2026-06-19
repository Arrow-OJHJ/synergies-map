# IBM Synergies Map - Deployment Guide

## Overview

This guide provides complete step-by-step instructions for deploying the IBM Synergies Map to IBM Cloud Object Storage with automated CI/CD via GitHub Actions. This is designed for new team members who need to set up or maintain the deployment infrastructure.

### What This Guide Covers

- Setting up IBM Cloud Object Storage for static website hosting
- Configuring GitHub Actions for automatic deployments
- Troubleshooting common issues
- Ongoing maintenance and updates

### What You'll Need

- **IBM Cloud account** (free tier available at https://cloud.ibm.com)
- **GitHub repository access** (admin permissions to add secrets)
- **Basic familiarity** with web browsers and command line (optional)
- **Time required**: ~30 minutes for initial setup

---

## Why IBM Cloud Object Storage?

We use IBM Cloud Object Storage because:
- **IBM-aligned**: Demonstrates our commitment as an IBM distributor
- **Cost-effective**: ~$1/month for typical usage (vs $5-20+ for compute services)
- **Simple**: No servers to manage, just upload files
- **Fast**: Global CDN capabilities for quick loading
- **Reliable**: Enterprise-grade availability and durability

---

## Architecture Overview

```
Developer makes changes to IBM_Synergies_Map.html
    ↓
Commits and pushes to GitHub (main branch)
    ↓
GitHub Actions workflow automatically triggers
    ↓
Deploys HTML file to IBM Cloud Object Storage
    ↓
Live website updates within 2-3 minutes
```

**Live URL**: https://arrow-ibm-synergies-map.s3-web.eu-gb.cloud-object-storage.appdomain.cloud

---

## Part 1: IBM Cloud Setup

### Step 1: Create IBM Cloud Account (if needed)

1. Go to https://cloud.ibm.com
2. Click **"Create an account"** (or log in if you already have one)
3. Follow the registration process
4. Verify your email address
5. Log in to IBM Cloud Console

### Step 2: Create Object Storage Instance

1. In IBM Cloud Console, click **"Catalog"** in the top navigation
2. Search for **"Object Storage"**
3. Click on **"Object Storage"** service
4. Click **"Create"**
5. Configure the instance:
   - **Service name**: `synergies-map-storage` (or your preference)
   - **Resource group**: Default (or select your preferred group)
   - **Pricing plan**: Standard (pay-as-you-go)
   - **Location**: Select your region (e.g., London for UK)
6. Click **"Create"**
7. Wait 30-60 seconds for provisioning to complete

### Step 3: Create Storage Bucket

1. Once the Object Storage instance is created, click **"Create bucket"**
2. Select **"Quickly get started"** → **"Custom bucket"**
3. Configure the bucket:
   - **Bucket name**: `arrow-ibm-synergies-map` (must be globally unique)
     - If taken, try: `synergies-map-[your-company]` or `synergies-map-[your-initials]`
   - **Resiliency**: Regional
   - **Location**: London (eu-gb) or your preferred region
   - **Storage class**: Smart Tier (free-tier enabled) - recommended
4. Leave other options as default
5. Click **"Create bucket"**

**Important**: Note your bucket name and region - you'll need these later!

### Step 4: Enable Public Access

1. Click on your bucket name to open it
2. Go to the **"Permissions"** tab
3. Find the **"Public access"** section
4. Click **"Create access policy"**
5. Keep **"Content Reader"** role selected
6. Click **"Create"**
7. Confirm the warning (this is intentional for website hosting)

### Step 5: Enable Static Website Hosting

1. Go to the **"Data management"** tab
2. Find the **"Static website hosting"** section
3. Click **"Create"**
4. Configure:
   - **Index document**: `index.html`
   - **Error document**: `index.html` (for single-page app fallback)
5. Click **"Save"**

**Your public endpoint URL will appear** - it looks like:
```
https://[bucket-name].s3-web.[region].cloud-object-storage.appdomain.cloud
```

**Save this URL** - this is your live website address!

### Step 6: Create Service Credentials

These credentials allow GitHub Actions to deploy files automatically.

1. Go back to your Object Storage instance (click "Cloud Object Storage" in left sidebar)
2. Click **"Service credentials"** in the left menu
3. Click **"New credential"**
4. Configure:
   - **Name**: `github-actions-deploy`
   - **Role**: Writer
   - **Control by Secrets Manager**: Toggle OFF (turn it off)
   - **Include HMAC Credential**: Toggle ON (turn it on)
5. Click **"Add"**
6. Click on the credential name to view it
7. **Copy the entire JSON** - you'll need these values:
   - `apikey`
   - `resource_instance_id` (this is the CRN)

**Keep these credentials secure** - treat them like passwords!

---

## Part 2: GitHub Configuration

### Step 7: Add GitHub Secrets

GitHub Secrets store sensitive information securely for use in automated workflows.

1. Go to your GitHub repository: https://github.com/[your-org]/synergies-map
2. Click **"Settings"** (top right)
3. In left sidebar: **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"**

**Add these 4 secrets one at a time:**

#### Secret 1: IBM_CLOUD_API_KEY
- **Name**: `IBM_CLOUD_API_KEY`
- **Value**: The `apikey` value from your service credentials JSON
- Click **"Add secret"**

#### Secret 2: COS_INSTANCE_CRN
- Click **"New repository secret"**
- **Name**: `COS_INSTANCE_CRN`
- **Value**: The `resource_instance_id` value from your service credentials JSON
- Click **"Add secret"**

#### Secret 3: COS_BUCKET_NAME
- Click **"New repository secret"**
- **Name**: `COS_BUCKET_NAME`
- **Value**: Your bucket name (e.g., `arrow-ibm-synergies-map`)
- Click **"Add secret"**

#### Secret 4: COS_REGION
- Click **"New repository secret"**
- **Name**: `COS_REGION`
- **Value**: Your region code (e.g., `eu-gb` for London)
- Click **"Add secret"**

**Verify**: You should now see 4 secrets listed in the Actions secrets page.

---

## Part 3: Deploy and Verify

### Step 8: Trigger First Deployment

The GitHub Actions workflow file (`.github/workflows/deploy.yml`) is already in the repository. Any push to the main branch will trigger automatic deployment.

**Option A: Make a small change**
```bash
# Edit any file (e.g., add a comment to README.md)
git add .
git commit -m "test: trigger initial deployment"
git push origin main
```

**Option B: Manual trigger**
1. Go to **"Actions"** tab in GitHub
2. Click **"Deploy to IBM Cloud Object Storage"**
3. Click **"Run workflow"** → **"Run workflow"**

### Step 9: Monitor Deployment

1. Go to **"Actions"** tab in your GitHub repository
2. Click on the running workflow
3. Watch the deployment steps:
   - ✓ Checkout repository
   - ✓ Install IBM Cloud CLI
   - ✓ Authenticate to IBM Cloud
   - ✓ Deploy HTML file to Object Storage
   - ✓ Display public URL

**Deployment takes ~20-30 seconds**

### Step 10: Verify Live Site

1. Open your public endpoint URL in a browser:
   ```
   https://[your-bucket-name].s3-web.[region].cloud-object-storage.appdomain.cloud
   ```
2. The IBM Synergies Map should load completely
3. Test functionality:
   - Click product nodes to see connections
   - Toggle light/dark mode
   - Use search functionality
   - Test responsive layout (resize browser)

**If everything works: Congratulations! 🎉 Your deployment is complete!**

---

## Ongoing Operations

### Making Updates

Every time you push changes to the main branch, the site automatically updates:

```bash
# 1. Edit IBM_Synergies_Map.html locally
# 2. Test by opening the file in your browser
# 3. Commit and push
git add IBM_Synergies_Map.html
git commit -m "feat: add new product connection"
git push origin main

# 4. GitHub Actions automatically deploys
# 5. Live site updates in 2-3 minutes
```

### Viewing Deployment History

- Go to **"Actions"** tab in GitHub
- See all past deployments with timestamps
- Click any deployment to see detailed logs

### Rolling Back Changes

**Method 1: Git Revert**
```bash
git revert HEAD
git push origin main
# Automatically deploys previous version
```

**Method 2: Object Storage Console**
1. Go to IBM Cloud → Object Storage → Your bucket
2. Find `IBM_Synergies_Map.html`
3. Click **"⋮"** → **"View versions"**
4. Select previous version → **"Restore"**

---

## Troubleshooting

### Deployment Fails: Authentication Error

**Symptom**: Workflow fails at "Authenticate to IBM Cloud" step

**Solutions**:
1. Verify `IBM_CLOUD_API_KEY` secret is correct (no extra spaces)
2. Check API key hasn't expired (regenerate if needed)
3. Ensure service credentials have "Writer" role

### Deployment Fails: Bucket Not Found

**Symptom**: Error message "Bucket not found"

**Solutions**:
1. Verify `COS_BUCKET_NAME` secret matches actual bucket name exactly
2. Check `COS_REGION` is correct (e.g., `eu-gb` not `eu-gb-1`)
3. Ensure bucket exists in Object Storage console

### Website Shows 404 Not Found

**Symptom**: URL returns "404 Not Found"

**Solutions**:
1. Verify static website hosting is enabled in bucket settings
2. Check public access is enabled
3. Ensure `index.html` exists in bucket (check Objects tab)
4. Wait 2-3 minutes for DNS propagation
5. Try the direct file URL: `[bucket-url]/IBM_Synergies_Map.html`

### Website Shows 403 Forbidden

**Symptom**: URL returns "403 Forbidden" or "Access Denied"

**Solutions**:
1. Enable public access on bucket (Permissions tab)
2. Verify access policy includes "Content Reader" role
3. Check bucket policy allows public read access

### Changes Not Appearing on Live Site

**Symptom**: Pushed changes but website looks the same

**Solutions**:
1. Check GitHub Actions completed successfully (green checkmark)
2. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Clear browser cache completely
4. Wait up to 1 hour for cache expiration
5. Verify correct file was uploaded in Object Storage console

### Workflow Runs But Nothing Happens

**Symptom**: Green checkmark but site doesn't update

**Solutions**:
1. Check the workflow logs for the actual URL being deployed to
2. Verify you're checking the correct URL (not a cached version)
3. Check Object Storage console to see if file was actually uploaded
4. Look at file modification timestamp in Object Storage

---

## Cost Management

### Expected Costs

For typical usage (internal tool, low traffic):

| Component | Cost | Notes |
|-----------|------|-------|
| Storage | ~$0.00001/month | 0.5MB file is negligible |
| Bandwidth (first 5GB) | Free | Likely covers all usage |
| Bandwidth (additional) | $0.09/GB | Only if high traffic |
| API Requests | $0.004/1000 | Minimal for static hosting |

**Total expected cost: < $1/month**

### Monitoring Costs

1. Go to IBM Cloud Console
2. Click **"Manage"** → **"Billing and usage"**
3. View current month's charges
4. Set up billing alerts (recommended):
   - Go to **"Manage"** → **"Billing and usage"** → **"Spending notifications"**
   - Set alert threshold (e.g., $5/month)

### Cost Optimization Tips

1. **Use Smart Tier storage** (already configured) - automatically optimizes costs
2. **Cache headers** (already configured) - reduces request count
3. **Monitor usage** - check monthly to ensure no unexpected traffic
4. **Delete old versions** - if you enable versioning, clean up old files periodically

---

## Security Best Practices

1. **Rotate API keys every 90 days**
   - Create new service credentials
   - Update GitHub secrets
   - Delete old credentials

2. **Use least privilege**
   - Service credentials only have "Writer" role (not Manager)
   - Only necessary team members have GitHub admin access

3. **Monitor access logs**
   - Enable Activity Tracker in IBM Cloud (optional)
   - Review for unusual activity

4. **Keep secrets secure**
   - Never commit credentials to Git
   - Don't share API keys via email or chat
   - Use GitHub secrets for all sensitive data

5. **Enable versioning** (optional)
   - Allows rollback if files are accidentally overwritten
   - Go to bucket → Configuration → Object versioning

---

## Advanced: Custom Domain (Optional)

If you want a custom domain like `synergies.arrow-ecs.co.uk`:

### Requirements
- Domain name (owned by your organization)
- IBM Cloud Internet Services (CIS) instance

### Setup Steps
1. Create IBM Cloud Internet Services instance
2. Add your domain to CIS
3. Update DNS nameservers at your domain registrar
4. Create CNAME record pointing to Object Storage endpoint
5. Enable SSL/TLS (automatic with CIS)

**Detailed guide**: https://cloud.ibm.com/docs/cis

---

## Reference Information

### Important URLs

- **IBM Cloud Console**: https://cloud.ibm.com
- **Object Storage Docs**: https://cloud.ibm.com/docs/cloud-object-storage
- **GitHub Actions Docs**: https://docs.github.com/actions
- **Live Site**: https://arrow-ibm-synergies-map.s3-web.eu-gb.cloud-object-storage.appdomain.cloud

### Useful Commands (Local Testing)

```bash
# Install IBM Cloud CLI (one-time)
curl -fsSL https://clis.cloud.ibm.com/install/linux | sh

# Login to IBM Cloud
ibmcloud login --apikey YOUR_API_KEY

# Install Object Storage plugin
ibmcloud plugin install cloud-object-storage

# Configure COS
ibmcloud cos config crn --crn YOUR_COS_CRN
ibmcloud cos config region --region eu-gb

# Upload file manually
ibmcloud cos upload \
  --bucket arrow-ibm-synergies-map \
  --key index.html \
  --file IBM_Synergies_Map.html \
  --content-type "text/html"

# List bucket contents
ibmcloud cos list-objects --bucket arrow-ibm-synergies-map
```

### GitHub Actions Workflow Location

The deployment workflow is defined in:
```
.github/workflows/deploy.yml
```

This file controls:
- When deployments trigger (push to main, manual trigger)
- What steps are executed (install CLI, authenticate, deploy)
- What secrets are used (API key, CRN, bucket name, region)

---

## Getting Help

### Internal Support
- Check this guide first for common issues
- Review GitHub Actions logs for specific error messages
- Ask team members who have deployed before

### External Resources
- **IBM Cloud Support**: https://cloud.ibm.com/unifiedsupport/supportcenter
- **IBM Cloud Docs**: https://cloud.ibm.com/docs
- **GitHub Community**: https://github.community

### Reporting Issues

If you encounter problems not covered in this guide:
1. Document the exact error message
2. Note which step you were on
3. Take screenshots if helpful
4. Create an issue in the GitHub repository

---

**Last Updated**: 2026-06-19  
**Maintained by**: Arrow ECS UK  
**Questions?** Contact the repository maintainers