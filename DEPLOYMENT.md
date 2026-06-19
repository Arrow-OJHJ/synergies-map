# IBM Synergies Map - Deployment Guide

## Overview

This guide walks you through deploying the IBM Synergies Map to IBM Cloud Object Storage with automated CI/CD via GitHub Actions.

## Architecture

```
GitHub Repository (main branch)
    ↓ (push trigger)
GitHub Actions Workflow
    ↓ (deploy)
IBM Cloud Object Storage Bucket
    ↓ (serve)
Public URL: https://[bucket-name].s3.[region].cloud-object-storage.appdomain.cloud
```

## Prerequisites

- IBM Cloud account (https://cloud.ibm.com)
- GitHub repository with admin access
- IBM Cloud CLI (for local testing - optional)

## Part 1: IBM Cloud Object Storage Setup

### Step 1: Create Object Storage Instance

1. Log in to IBM Cloud Console: https://cloud.ibm.com
2. Navigate to **Catalog** → **Storage** → **Object Storage**
3. Click **Create**
4. Configure:
   - **Service name**: `synergies-map-storage` (or your preference)
   - **Resource group**: Default or create new
   - **Pricing plan**: Standard (pay-as-you-go)
   - **Location**: 
     - **Regional**: `eu-gb` (London) - recommended for UK
     - **Cross Region**: `eu-geo` (Europe) - for higher availability
5. Click **Create**
6. Wait for provisioning (30-60 seconds)

### Step 2: Create Storage Bucket

1. In your Object Storage instance, click **Create bucket**
2. Choose **Quickly get started** → **Custom bucket**
3. Configure:
   - **Bucket name**: `ibm-synergies-map` (must be globally unique)
     - If taken, try: `arrow-ibm-synergies-map` or `synergies-map-[your-initials]`
   - **Resiliency**: Regional (eu-gb) or Cross Region (eu-geo)
   - **Location**: eu-gb (London) or eu-geo (Europe)
   - **Storage class**: Standard
4. Click **Create bucket**

### Step 3: Configure Public Access

1. In your bucket, go to **Access policies** tab
2. Click **Public access**
3. Enable **Public access** toggle
4. Confirm the warning (this is intentional for website hosting)

### Step 4: Enable Static Website Hosting

1. In your bucket, go to **Configuration** tab
2. Scroll to **Static website hosting**
3. Click **Edit**
4. Enable static website hosting
5. Configure:
   - **Index document**: `index.html`
   - **Error document**: `index.html` (SPA fallback)
6. Click **Save**
7. **Note the public endpoint URL** - it will look like:
   ```
   https://ibm-synergies-map.s3.eu-gb.cloud-object-storage.appdomain.cloud
   ```

### Step 5: Create Service Credentials

1. Go back to your Object Storage instance (not the bucket)
2. Click **Service credentials** in left menu
3. Click **New credential**
4. Configure:
   - **Name**: `github-actions-deploy`
   - **Role**: Writer
   - **Include HMAC Credential**: ✓ (checked)
5. Click **Add**
6. Click **View credentials** and copy the entire JSON
7. **Save these credentials securely** - you'll need:
   - `apikey`
   - `resource_instance_id` (this is your CRN)

## Part 2: GitHub Repository Setup

### Step 6: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

**Secret 1: IBM_CLOUD_API_KEY**
- Name: `IBM_CLOUD_API_KEY`
- Value: The `apikey` from your service credentials JSON

**Secret 2: COS_INSTANCE_CRN**
- Name: `COS_INSTANCE_CRN`
- Value: The `resource_instance_id` from your service credentials JSON

**Secret 3: COS_BUCKET_NAME**
- Name: `COS_BUCKET_NAME`
- Value: Your bucket name (e.g., `ibm-synergies-map`)

**Secret 4: COS_REGION**
- Name: `COS_REGION`
- Value: Your region (e.g., `eu-gb` or `eu-geo`)

### Step 7: Verify GitHub Actions Workflow

The workflow file `.github/workflows/deploy.yml` should already be in your repository. If not, it will be created in the next steps.

## Part 3: First Deployment

### Step 8: Trigger Deployment

1. Commit and push any change to the `main` branch, or
2. Go to **Actions** tab in GitHub
3. Select **Deploy to IBM Cloud Object Storage** workflow
4. Click **Run workflow** → **Run workflow**

### Step 9: Monitor Deployment

1. Click on the running workflow
2. Watch the deployment steps:
   - ✓ Checkout code
   - ✓ Install IBM Cloud CLI
   - ✓ Authenticate to IBM Cloud
   - ✓ Deploy HTML file
   - ✓ Deployment complete

### Step 10: Verify Deployment

1. Open your public endpoint URL in a browser:
   ```
   https://[your-bucket-name].s3.[region].cloud-object-storage.appdomain.cloud
   ```
2. The IBM Synergies Map should load and function correctly
3. Test:
   - Click products to see connections
   - Toggle light/dark mode
   - Search functionality
   - Responsive layout

## Part 4: Custom Domain (Optional)

### Step 11: Set Up Custom Domain with IBM Cloud Internet Services

If you want a custom domain like `synergies.arrow-ecs.co.uk`:

1. Create IBM Cloud Internet Services (CIS) instance
2. Add your domain to CIS
3. Update DNS nameservers at your registrar
4. Create CNAME record pointing to Object Storage endpoint
5. Enable SSL/TLS (automatic with CIS)

**Detailed CIS setup guide**: https://cloud.ibm.com/docs/cis

## Ongoing Operations

### Automatic Deployments

Every push to the `main` branch automatically triggers deployment:

```bash
git add IBM_Synergies_Map.html
git commit -m "feat: add new product connection"
git push origin main
# Deployment happens automatically within 2-3 minutes
```

### Manual Deployment

Trigger manually via GitHub Actions UI:
1. Go to **Actions** tab
2. Select workflow
3. Click **Run workflow**

### Rollback

To rollback to a previous version:

1. In Object Storage bucket, go to **Objects** tab
2. Find `IBM_Synergies_Map.html`
3. Click **⋮** → **View versions**
4. Select previous version → **Restore**

Or via Git:
```bash
git revert HEAD
git push origin main
# Automatically deploys previous version
```

### Monitoring

**View deployment history:**
- GitHub: **Actions** tab shows all deployments

**View access logs:**
- IBM Cloud: Object Storage → Bucket → **Activity Tracker**

**Check costs:**
- IBM Cloud: **Manage** → **Billing and usage**

## Troubleshooting

### Deployment Fails: Authentication Error

**Problem**: `Error: Unable to authenticate`

**Solution**:
1. Verify `IBM_CLOUD_API_KEY` secret is correct
2. Check API key hasn't expired
3. Ensure service credentials have Writer role

### Deployment Fails: Bucket Not Found

**Problem**: `Error: Bucket not found`

**Solution**:
1. Verify `COS_BUCKET_NAME` secret matches actual bucket name
2. Check `COS_REGION` is correct
3. Ensure bucket exists in Object Storage

### Website Shows 404

**Problem**: URL returns 404 Not Found

**Solution**:
1. Verify static website hosting is enabled
2. Check public access is enabled
3. Ensure `index.html` exists in bucket
4. Wait 2-3 minutes for DNS propagation

### Website Shows Access Denied

**Problem**: URL returns 403 Forbidden

**Solution**:
1. Enable public access on bucket
2. Check bucket policy allows public read
3. Verify object ACL is public-read

### Changes Not Appearing

**Problem**: Pushed changes but website unchanged

**Solution**:
1. Check GitHub Actions completed successfully
2. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
3. Check cache-control headers (may need to wait up to 1 hour)
4. Verify correct file was uploaded in Object Storage

## Cost Optimization

### Expected Costs (Low Usage)

- **Storage**: 0.5MB × $0.023/GB/month = **$0.00001/month**
- **Bandwidth**: First 5GB free, then $0.09/GB
- **Requests**: $0.004/1000 requests
- **Total**: **< $1/month** for typical usage

### Cost Reduction Tips

1. **Use Smart Tier storage class** - automatically moves to cheaper storage
2. **Enable compression** - reduces bandwidth costs
3. **Set cache headers** - reduces request count (already configured)
4. **Monitor usage** - set up billing alerts in IBM Cloud

## Security Best Practices

1. **Rotate API keys** every 90 days
2. **Use least privilege** - Writer role only for deployment
3. **Enable versioning** - allows rollback if needed
4. **Monitor access logs** - detect unusual activity
5. **Keep secrets secure** - never commit to Git

## Support Resources

- **IBM Cloud Docs**: https://cloud.ibm.com/docs/cloud-object-storage
- **GitHub Actions Docs**: https://docs.github.com/actions
- **IBM Cloud Support**: https://cloud.ibm.com/unifiedsupport/supportcenter

## Quick Reference

### Useful Commands (Local Testing)

```bash
# Install IBM Cloud CLI
curl -fsSL https://clis.cloud.ibm.com/install/linux | sh

# Login
ibmcloud login --apikey YOUR_API_KEY -r eu-gb

# Configure COS
ibmcloud plugin install cloud-object-storage
ibmcloud cos config crn --crn YOUR_COS_CRN

# Upload file manually
ibmcloud cos upload \
  --bucket ibm-synergies-map \
  --key index.html \
  --file IBM_Synergies_Map.html \
  --content-type "text/html"

# List bucket contents
ibmcloud cos list-objects --bucket ibm-synergies-map
```

### Important URLs

- **IBM Cloud Console**: https://cloud.ibm.com
- **Object Storage Docs**: https://cloud.ibm.com/docs/cloud-object-storage
- **Your Bucket URL**: `https://[bucket-name].s3.[region].cloud-object-storage.appdomain.cloud`

---

**Last Updated**: 2026-06-19  
**Version**: 1.0  
**Maintained by**: Arrow ECS UK