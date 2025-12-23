# Admin Portal Testing Guide

## Features Overview

1. Admin Login
2. View All Entries
3. Filter by Status
4. Search Entries
5. Create New Entry
6. Edit Entry
7. Delete Entry
8. Update Entry Status
9. Logout

---

## Testing Instructions

### 1. Admin Login

**Test:** Navigate to `/admin-login`, enter email and password, click "Sign In".

**Expected:** Redirects to `/admin` dashboard after successful login.

**Error Test:** Enter wrong credentials, should show error message.

---

### 2. View All Entries

**Test:** After login, check if all vulnerability entries are displayed in a list.

**Expected:** All entries from database are visible regardless of status (Pending, In-review, Published).

---

### 3. Filter by Status

**Test:** Use the status dropdown filter, select "Pending", "Under Review", "Verified", or "All Status".

**Expected:** List updates to show only entries matching selected status.

---

### 4. Search Entries

**Test:** Type text in the search box (try entry name, organization, or description keywords).

**Expected:** List filters to show entries matching the search query.

---

### 5. Create New Entry

**Test:** Click "Add New Entry" button, fill all required fields (marked with *), click "Create Entry".

**Required Fields:** Asset Name, Organization, Description, Weakness Reason, Risk Score, Quantum Risk Level, Vulnerability Level, Status.

**Expected:** New entry appears in the list immediately.

---

### 6. Edit Entry

**Test:** Click "Edit" button on any entry, modify fields in the form, click "Update Entry".

**Expected:** Changes are saved and visible in the entry list.

---

### 7. Delete Entry

**Test:** Click "Delete" button on any entry, confirm deletion in the popup.

**Expected:** Entry is removed from the list permanently.

---

### 8. Update Entry Status

**Test:** Use the status dropdown on any entry card, change status (e.g., Pending → Verified).

**Expected:** Status updates immediately without page refresh.

---

### 9. Logout

**Test:** Click "Logout" button in the header.

**Expected:** Redirects to `/admin-login` page, cannot access `/admin` without logging in again.

---

## Quick Test Checklist

- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] All entries are visible on dashboard
- [ ] Status filter works for each status
- [ ] Search finds entries by name/organization
- [ ] Can create new entry with all required fields
- [ ] Can edit existing entry and save changes
- [ ] Can delete entry with confirmation
- [ ] Can update entry status via dropdown
- [ ] Logout redirects to login page
- [ ] Cannot access admin page without login

---

## Common Issues

**Issue:** "Session already active" error on login.

**Solution:** All sessions are automatically cleared when login page loads. If error persists, clear browser cookies.

**Issue:** Entry not showing in list.

**Solution:** Check if entry exists in database, verify status filter is set to "All Status", check browser console for errors.

**Issue:** Changes not saving.

**Solution:** Check browser console for API errors, verify all required fields are filled, check network tab for failed requests.

