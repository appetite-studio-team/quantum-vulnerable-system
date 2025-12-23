# Production Deployment Guide

## CORS Configuration Fix

The error you're seeing is a CORS (Cross-Origin Resource Sharing) issue. Appwrite needs to be configured to allow requests from your production domain.

### Error Message:
```
Access to fetch at 'https://appwrite-prod.cloud3.appetite.studio/v1/account/sessions/email' 
from origin 'https://vulnerable.quantumx.technology' has been blocked by CORS policy: 
The 'Access-Control-Allow-Origin' header has a value 'https://localhost' that is not equal 
to the supplied origin.
```

## Solution: Configure Appwrite Platforms

### Step 1: Add Production Domain to Appwrite

1. **Go to Appwrite Console**
   - Navigate to: `https://appwrite-prod.cloud3.appetite.studio` (or your Appwrite instance)
   - Login with your admin credentials

2. **Navigate to Settings → Platforms**
   - Click on **Settings** in the left sidebar
   - Click on **Platforms** tab

3. **Add New Platform**
   - Click **"Add Platform"** button
   - Select **"Web"** as the platform type
   - Enter your production domain:
     ```
     https://vulnerable.quantumx.technology
     ```
   - Click **"Save"**

4. **Optional: Keep Localhost for Development**
   - Make sure `https://localhost` (or `http://localhost:3000`) is also added as a platform
   - This allows local development to continue working

### Step 2: Verify Environment Variables

Make sure your production environment has these variables set:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://appwrite-prod.cloud3.appetite.studio/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
APPWRITE_API_KEY=your_api_key
```

### Step 3: Clear Browser Cache

After updating Appwrite settings:
1. Clear your browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Try logging in again

## Alternative: Self-Hosted Appwrite CORS Configuration

If you're using a self-hosted Appwrite instance, you may need to configure CORS in the environment variables:

```bash
# In your Appwrite .env file
_APP_CONSOLE_WHITELIST_ROOT=https://vulnerable.quantumx.technology
_APP_CONSOLE_WHITELIST_URLS=https://vulnerable.quantumx.technology,https://localhost
```

## Troubleshooting

### Still Getting CORS Errors?

1. **Check Platform Configuration**
   - Verify the exact domain is added (including `https://`)
   - No trailing slashes
   - Check for typos

2. **Check Environment Variables**
   - Ensure `NEXT_PUBLIC_APPWRITE_ENDPOINT` matches your Appwrite instance URL
   - Verify all variables are set in your hosting platform (Vercel/Netlify/etc.)

3. **Wait for Propagation**
   - Appwrite changes may take a few minutes to propagate
   - Try again after 2-3 minutes

4. **Check Browser Console**
   - Look for any other errors that might be causing issues
   - Check Network tab to see the exact request/response

### Multiple Environments

If you have multiple environments (dev, staging, production), add all domains:

**In Appwrite Console → Settings → Platforms:**
- `http://localhost:3000` (local development)
- `https://staging.quantumx.technology` (staging, if applicable)
- `https://vulnerable.quantumx.technology` (production)

## Security Notes

- Only add domains you own and trust
- Never add wildcard domains (`*.example.com`) in production
- Use HTTPS for all production domains
- Keep your Appwrite API keys secure and never commit them to git

## Quick Checklist

- [ ] Added production domain to Appwrite Platforms
- [ ] Verified environment variables in hosting platform
- [ ] Cleared browser cache
- [ ] Tested login functionality
- [ ] Verified admin dashboard loads correctly


