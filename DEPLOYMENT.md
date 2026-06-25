# Deployment Guide

## Architecture

```
GitHub (main) → GitHub Actions → IBM Cloud Object Storage → Live Site
```

**Live URL**: https://arrow-ibm-synergies-map.s3-web.eu-gb.cloud-object-storage.appdomain.cloud

---

## Part 1: IBM Cloud Setup

### Step 1: Create Object Storage Instance

1. Log in to [IBM Cloud Console](https://cloud.ibm.com)
2. Go to **Catalog** → search for **Object Storage** → click **Create**
3. Configure:
   - **Service name**: `synergies-map-storage`
   - **Pricing plan**: Standard
   - **Location**: London (eu-gb)
4. Click **Create** and wait ~60 seconds

### Step 2: Create Storage Bucket

1. Inside the Object Storage instance, click **Create bucket** → **Custom bucket**
2. Configure:
   - **Bucket name**: `arrow-ibm-synergies-map` (must be globally unique)
   - **Resiliency**: Regional
   - **Location**: eu-gb
   - **Storage class**: Smart Tier
3. Click **Create bucket**

Note your bucket name and region — you'll need them in Part 2.

### Step 3: Enable Public Access

1. Open the bucket → **Permissions** tab
2. Under **Public access**, click **Create access policy**
3. Keep **Content Reader** selected → **Create**

### Step 4: Enable Static Website Hosting

1. Open the bucket → **Data management** tab
2. Under **Static website hosting**, click **Create**
3. Set **Index document** and **Error document** both to `index.html`
4. Click **Save**

Your public endpoint will appear:
```
https://[bucket-name].s3-web.[region].cloud-object-storage.appdomain.cloud
```

### Step 5: Create Service Credentials

1. Go back to the Object Storage instance → **Service credentials** → **New credential**
2. Configure:
   - **Name**: `github-actions-deploy`
   - **Role**: Writer
   - **Include HMAC Credential**: on
3. Click **Add**, then open the credential and copy the full JSON

You'll need `apikey` and `resource_instance_id` (the CRN) from that JSON.

---

## Part 2: GitHub Configuration

### Step 6: Add Repository Secrets

Go to the repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

Add these four secrets:

| Secret name | Value |
|---|---|
| `IBM_CLOUD_API_KEY` | `apikey` from service credentials JSON |
| `COS_INSTANCE_CRN` | `resource_instance_id` from service credentials JSON |
| `COS_BUCKET_NAME` | Your bucket name (e.g. `arrow-ibm-synergies-map`) |
| `COS_REGION` | Your region code (e.g. `eu-gb`) |

---

## Part 3: Deploy

### Step 7: Trigger Deployment

The workflow file (`.github/workflows/deploy.yml`) is already in the repository. Push any change to `main` to trigger it, or run it manually:

1. Go to **Actions** tab → **Deploy to IBM Cloud Object Storage**
2. Click **Run workflow**

Deployment takes ~20–30 seconds. The live site updates within 2 minutes.

### Rolling Back

```bash
git revert HEAD
git push origin main
```

---

## Troubleshooting

**Authentication error** (fails at "Authenticate to IBM Cloud")
- Verify `IBM_CLOUD_API_KEY` is correct with no extra spaces
- Check the API key hasn't expired — regenerate in IBM Cloud if needed
- Confirm service credentials have Writer role

**Bucket not found**
- Verify `COS_BUCKET_NAME` matches the bucket name exactly
- Check `COS_REGION` is correct (e.g. `eu-gb` not `eu-gb-1`)

**404 on the live URL**
- Confirm static website hosting is enabled
- Confirm public access is enabled
- Wait 2–3 minutes for DNS propagation
- Try the direct file URL: `[bucket-url]/IBM_Synergies_Map.html`

**403 Forbidden**
- Enable public access on the bucket (Permissions tab)
- Verify the access policy includes Content Reader role

**Changes not appearing**
- Check the Actions tab shows a green checkmark
- Hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
- Clear browser cache

---

## Manual Deploy (CLI)

```bash
# Install IBM Cloud CLI
curl -fsSL https://clis.cloud.ibm.com/install/linux | sh

# Login and install plugin
ibmcloud login --apikey YOUR_API_KEY
ibmcloud plugin install cloud-object-storage

# Configure
ibmcloud cos config crn --crn YOUR_COS_CRN
ibmcloud cos config region --region eu-gb

# Upload
ibmcloud cos upload \
  --bucket arrow-ibm-synergies-map \
  --key index.html \
  --file IBM_Synergies_Map.html \
  --content-type "text/html"
```
