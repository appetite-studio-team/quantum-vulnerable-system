# Quick Testing Guide

## 🚀 Quick Start

### 1. Set Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
APPWRITE_API_KEY=your_api_key
```

### 2. Create Admin User

**In Appwrite Console:**
1. Go to **Auth** → **Users** → **Create User**
2. Email: `admin@test.com`
3. Password: `admin123` (or your choice)
4. **Disable email verification** for testing (Auth → Settings)

### 3. Start Dev Server

```bash
npm run dev
```

### 4. Test Login

1. Go to: `http://localhost:3000/admin-login`
2. Login with: `admin@test.com` / `admin123`
3. Should redirect to `/admin`

### 5. Test Admin Features

✅ **View all entries** - Should see all vulnerabilities  
✅ **Filter by status** - Use dropdown to filter  
✅ **Search** - Type in search box  
✅ **Edit entry** - Click "Edit", modify, save  
✅ **Add entry** - Click "Add New Entry", fill form, create  
✅ **Delete entry** - Click "Delete", confirm  
✅ **Update status** - Use status dropdown on any entry  
✅ **Logout** - Click logout, should redirect to login  

## 🔍 Quick Checks

### Login Page (`/admin-login`)
- [ ] Form displays correctly
- [ ] Invalid credentials show error
- [ ] Valid credentials redirect to `/admin`

### Admin Page (`/admin`)
- [ ] Shows all entries (not just published)
- [ ] Status filter works
- [ ] Search works
- [ ] Edit modal opens with data
- [ ] Create form works
- [ ] Delete confirms and removes entry
- [ ] Status updates work
- [ ] Logout works

### Authentication
- [ ] Direct access to `/admin` redirects to login if not authenticated
- [ ] Session persists on page refresh
- [ ] Logout clears session

## 🐛 Common Issues

**"Cannot find module 'appwrite'"**
→ Already installed, restart dev server

**"Appwrite configuration missing"**
→ Check `.env.local` exists and has all variables, restart server

**Login fails**
→ Check user exists in Appwrite, email verification disabled, correct credentials

**No data showing**
→ Check database/collection IDs are correct, entries exist in Appwrite

## 📝 Test Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Access `/admin` without login (should redirect)
- [ ] View all entries
- [ ] Filter by "Pending" status
- [ ] Filter by "Verified" status
- [ ] Search for entry by name
- [ ] Edit an entry and save
- [ ] Create a new entry
- [ ] Delete an entry
- [ ] Update entry status via dropdown
- [ ] Logout and verify cannot access admin

See `TESTING.md` for detailed testing instructions.

