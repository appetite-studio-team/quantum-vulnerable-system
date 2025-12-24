# Admin Authentication Testing Guide

This guide will help you test the admin login and admin dashboard functionality.

## Prerequisites

1. **Appwrite Instance**: You need a running Appwrite instance (cloud or self-hosted)
2. **Environment Variables**: Configure your Appwrite credentials
3. **Admin User**: Create an admin user in Appwrite

## Step 1: Set Up Environment Variables

Create a `.env.local` file in the root directory (if it doesn't exist):

```bash
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
# OR for self-hosted:
# NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost/v1

NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id_here

# Server-side API key (optional, for server-side operations)
APPWRITE_API_KEY=your_api_key_here
```

**Where to find these values:**
- **Endpoint**: Your Appwrite instance URL (cloud.appwrite.io for cloud, or your self-hosted URL)
- **Project ID**: Appwrite Console → Settings → Project ID
- **Database ID**: Appwrite Console → Databases → Your Database → Settings → Database ID
- **Collection ID**: Appwrite Console → Databases → Your Database → Your Collection → Settings → Collection ID
- **API Key**: Appwrite Console → Settings → API Keys → Create API Key (with Databases scope)

## Step 2: Create Admin User in Appwrite

### Option A: Using Appwrite Console (Recommended)

1. Go to your Appwrite Console
2. Navigate to **Auth** → **Users**
3. Click **Create User**
4. Fill in:
   - **Email**: `admin@example.com` (or your preferred email)
   - **Password**: Choose a secure password
   - **Name**: Admin (optional)
5. Click **Create**
6. **Important**: Make sure email verification is disabled for testing, OR verify the email if required

### Option B: Using Appwrite SDK (Programmatic)

You can also create a user programmatically using a script:

```typescript
// create-admin.ts (run this once)
import { Client, Users } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setKey(process.env.APPWRITE_API_KEY!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const users = new Users(client);

async function createAdmin() {
  try {
    const user = await users.create(
      'unique()', // User ID (auto-generated)
      'admin@example.com',
      undefined, // Phone (optional)
      'Admin User', // Name
      'your-secure-password'
    );
    console.log('Admin user created:', user);
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

createAdmin();
```

## Step 3: Configure Appwrite Auth Settings

1. Go to **Auth** → **Settings** in Appwrite Console
2. Ensure **Email/Password** authentication is enabled
3. For testing, you may want to disable email verification temporarily:
   - Set **Email Verification** to `disabled` (or verify emails manually)
4. Configure **Password History** and **Password Dictionary** as needed

## Step 4: Start the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

## Step 5: Test Admin Login

### Test Case 1: Access Admin Login Page

1. Navigate to: `http://localhost:3000/admin-login`
2. **Expected**: You should see a clean login form with:
   - Email input field
   - Password input field
   - "Sign In" button
   - "Back to Home" link

### Test Case 2: Invalid Credentials

1. Enter incorrect email/password
2. Click "Sign In"
3. **Expected**: 
   - Error message displayed: "Login failed. Please check your credentials."
   - Form remains visible
   - No redirect occurs

### Test Case 3: Valid Login

1. Enter the admin email and password you created
2. Click "Sign In"
3. **Expected**:
   - Loading state shows "Signing in..."
   - Redirects to `/admin` page
   - Admin dashboard loads

### Test Case 4: Direct Access to Admin Page (Unauthenticated)

1. Logout or clear cookies
2. Navigate directly to: `http://localhost:3000/admin`
3. **Expected**: 
   - Automatically redirected to `/admin-login`
   - Cannot access admin page without authentication

## Step 6: Test Admin Dashboard

### Test Case 1: View All Entries

1. After logging in, you should see the admin dashboard
2. **Expected**:
   - Header with logo and "Admin Dashboard" title
   - Logout button in top right
   - Search bar and status filter
   - List of all vulnerability entries (regardless of status)

### Test Case 2: Filter by Status

1. Use the status dropdown filter
2. Select different statuses: "All Status", "Pending", "Under Review", "Verified"
3. **Expected**:
   - List updates to show only entries matching selected status
   - Filter persists while navigating

### Test Case 3: Search Functionality

1. Type in the search box (e.g., "RSA" or organization name)
2. **Expected**:
   - List filters to show entries matching search query
   - Searches across name, description, and organization fields

### Test Case 4: Update Entry Status

1. Find an entry in the list
2. Use the status dropdown next to the entry
3. Change status (e.g., from "Pending" to "Verified")
4. **Expected**:
   - Status updates immediately
   - Entry appears/disappears based on filter settings
   - No page reload required

### Test Case 5: Edit Entry

1. Click "Edit" button on any entry
2. **Expected**:
   - Modal form opens with pre-filled data
   - All fields are editable
   - Form shows current values

3. Make changes to fields (e.g., change name, description, score)
4. Click "Update Entry"
5. **Expected**:
   - Form closes
   - Entry updates in the list
   - Changes are visible immediately

### Test Case 6: Create New Entry

1. Click "Add New Entry" button
2. **Expected**:
   - Modal form opens with empty fields
   - All required fields marked with *

3. Fill in the form:
   - **Required fields**: Asset Name, Organization, Description, Weakness Reason, Risk Score, Quantum Risk Level, Vulnerability Level, Status
   - **Optional fields**: System Category, Use Case, Cryptography, Protocols, Recommendations, Mitigation

4. Click "Create Entry"
5. **Expected**:
   - Form closes
   - New entry appears in the list
   - Entry has the status you selected

### Test Case 7: Delete Entry

1. Click "Delete" button on any entry
2. **Expected**:
   - Confirmation dialog appears: "Are you sure you want to delete this entry?"

3. Click "OK" to confirm
4. **Expected**:
   - Entry is removed from the list
   - Entry no longer appears in any filter

### Test Case 8: Logout

1. Click "Logout" button in the header
2. **Expected**:
   - Redirects to `/admin-login`
   - Session is cleared
   - Cannot access `/admin` without logging in again

## Step 7: Test API Routes (Optional)

You can test the API routes directly using curl or Postman:

### Fetch All Entries
```bash
curl http://localhost:3000/api/admin/vulnerabilities
```

### Create Entry
```bash
curl -X POST http://localhost:3000/api/admin/vulnerabilities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Vulnerability",
    "description": "Test description",
    "organization": "Test Org",
    "quantum_risk_level": "at-risk",
    "vulnerability_level": "medium",
    "score": 5.5,
    "weakness_reason": "Test reason",
    "current_cryptography": ["RSA-2048"],
    "affected_protocols": ["TLS"],
    "status": "pending"
  }'
```

### Update Entry
```bash
curl -X PUT http://localhost:3000/api/admin/vulnerabilities/ENTRY_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "score": 7.5
  }'
```

### Update Status
```bash
curl -X PATCH http://localhost:3000/api/admin/vulnerabilities/ENTRY_ID/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "verified"
  }'
```

### Delete Entry
```bash
curl -X DELETE http://localhost:3000/api/admin/vulnerabilities/ENTRY_ID
```

## Troubleshooting

### Issue: "Cannot find module 'appwrite'"

**Solution**: The package is already installed. If you see this error, try:
```bash
npm install appwrite
```

### Issue: "Appwrite configuration missing"

**Solution**: 
1. Check that `.env.local` exists and has all required variables
2. Restart the dev server after adding environment variables
3. Ensure variable names start with `NEXT_PUBLIC_` for client-side access

### Issue: Login fails with "Invalid credentials"

**Solution**:
1. Verify the user exists in Appwrite Console → Auth → Users
2. Check that email/password are correct
3. Ensure email verification is disabled or email is verified
4. Check browser console for detailed error messages

### Issue: "Failed to fetch vulnerabilities"

**Solution**:
1. Verify database and collection IDs are correct
2. Check that the collection exists in Appwrite
3. Ensure the collection has the correct schema (fields match expected format)
4. Check server logs for detailed error messages

### Issue: Redirect loop between login and admin page

**Solution**:
1. Clear browser cookies/localStorage
2. Check that `isAuthenticated()` function is working correctly
3. Verify Appwrite session cookies are being set

### Issue: API routes return 500 errors

**Solution**:
1. Check server-side logs (`npm run dev` terminal)
2. Verify `APPWRITE_API_KEY` is set correctly
3. Ensure API key has proper permissions (Databases scope)
4. Check that database/collection IDs are correct

## Browser Console Testing

Open browser DevTools (F12) and check:

1. **Network Tab**: Verify API calls are being made
2. **Console Tab**: Look for any JavaScript errors
3. **Application Tab → Cookies**: Verify Appwrite session cookies are set after login

## Expected Behavior Summary

✅ **Login Page**:
- Clean, centered form
- Error messages on invalid credentials
- Redirects to admin on success

✅ **Admin Dashboard**:
- Shows all entries (not just published)
- Filter by status works
- Search works across multiple fields
- CRUD operations all functional
- Status updates work instantly
- Logout clears session

✅ **Authentication**:
- Unauthenticated users redirected to login
- Session persists across page refreshes
- Logout properly clears session

## Next Steps

After testing, consider:
1. Adding server-side authentication middleware to API routes
2. Implementing role-based access control (if multiple admin levels)
3. Adding audit logging for admin actions
4. Implementing pagination for large datasets
5. Adding bulk operations (bulk delete, bulk status update)


