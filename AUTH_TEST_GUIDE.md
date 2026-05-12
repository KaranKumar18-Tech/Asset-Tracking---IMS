# AssetPulse Auth Flow Testing Guide

## Overview
This guide tests the three credential flows and confirms the auth guard works correctly.

## Demo Credentials

```
Admin:   admin@emb.global / admin123 → Admin role → Dashboard
Manager: manager@emb.global / manager123 → Manager role → Dashboard  
Vendor:  vendor@emb.global / vendor123 → Vendor role → Field App (/mobile)
```

---

## Test 1: Admin Login Flow

1. **Start Fresh**
   - Open DevTools (F12) → Application → LocalStorage
   - Clear `assetpulse_user` if present
   - Refresh page → should show Login screen

2. **Login as Admin**
   - Click "admin@emb.global / admin123" pill OR manually enter:
     - Email: `admin@emb.global`
     - Password: `admin123`
   - Click "Sign In" button
   - **Expected**: See 600ms loading spinner, then redirect to Dashboard (/)
   - **Verify**: TopNav shows "Admin User" with "admin" role

3. **Verify Session Persists**
   - Refresh the page
   - **Expected**: Stay on Dashboard, still logged in as Admin User
   - **Verify**: DevTools → LocalStorage → `assetpulse_user` contains:
     ```json
     {"email":"admin@emb.global","role":"admin","name":"Admin User"}
     ```

4. **Sign Out**
   - Click "Sign Out" button in TopNav (right side)
   - **Expected**: Redirect to Login screen
   - **Verify**: DevTools → LocalStorage → `assetpulse_user` is deleted
   - **Verify**: Can't access protected routes (try navigating to `/assets`)

---

## Test 2: Manager Login Flow

1. **Start Fresh**
   - Clear localStorage: DevTools → Application → LocalStorage → delete `assetpulse_user`
   - Refresh page → Login screen

2. **Login as Manager**
   - Click "manager@emb.global / manager123" pill OR manually enter:
     - Email: `manager@emb.global`
     - Password: `manager123`
   - Click "Sign In"
   - **Expected**: Redirect to Dashboard (/)
   - **Verify**: TopNav shows "City Manager" with "manager" role

3. **Navigate to Other Pages**
   - Click on "Assets" tab in TopNav
   - **Expected**: Load Assets page successfully
   - Click on "Alerts" tab
   - **Expected**: Load Alerts page successfully
   - Click on "Reports" tab
   - **Expected**: Load Reports page successfully

4. **Sign Out**
   - Click "Sign Out" button
   - **Expected**: Redirect to Login
   - **Verify**: localStorage cleared, can't access protected routes

---

## Test 3: Vendor Login Flow (Field App)

1. **Start Fresh**
   - Clear localStorage
   - Refresh page → Login screen

2. **Login as Vendor**
   - Click "vendor@emb.global / vendor123" pill OR manually enter:
     - Email: `vendor@emb.global`
     - Password: `vendor123`
   - Click "Sign In"
   - **Expected**: Redirect to /mobile (Field App page)
   - **Verify**: TopNav shows "Field Vendor" with "vendor" role

3. **Verify Vendor Role Redirect**
   - This confirms role-based routing works:
     - Admin/Manager → `/`
     - Vendor → `/mobile`

4. **Sign Out from Mobile View**
   - Click "Sign Out" in TopNav
   - **Expected**: Redirect to Login
   - **Verify**: localStorage cleared

---

## Test 4: Auth Guard Protection

### 4a: Direct Navigation Without Auth

1. **Clear Auth**
   - Clear localStorage: delete `assetpulse_user`
   - Ensure you're logged out

2. **Try Direct Navigation**
   - Open DevTools → Console
   - Type: `window.location.href = 'http://localhost:5174/assets'`
   - **Expected**: Redirect to `/` (root), then show Login screen
   - **Expected**: Can't see Assets page
   - **Verify**: Auth guard in App.jsx prevents access

3. **Try Other Protected Routes**
   - Try `/scan`, `/alerts`, `/reports`, `/mobile`
   - **Expected**: All redirect to Login screen
   - **Verify**: No way to access protected pages without auth

### 4b: Invalid Credentials

1. **Try Wrong Password**
   - Email: `admin@emb.global`
   - Password: `wrongpassword`
   - Click "Sign In"
   - **Expected**: Red error message: "Invalid credentials"
   - **Expected**: Stay on Login page
   - **Verify**: localStorage empty (not saved)

2. **Try Wrong Email**
   - Email: `unknown@emb.global`
   - Password: `admin123`
   - Click "Sign In"
   - **Expected**: Red error message: "Invalid credentials"
   - **Verify**: localStorage empty

### 4c: Multiple Browser Tabs

1. **Login in Tab A**
   - Tab A: Login as Admin, see Dashboard

2. **Check Tab B**
   - Open new tab, go to `http://localhost:5174/`
   - **Expected**: Shows Dashboard (localStorage syncs across tabs)

3. **Sign Out in Tab A**
   - Tab A: Click Sign Out
   - **Expected**: Redirect to Login

4. **Refresh Tab B**
   - Tab B: Refresh page
   - **Expected**: Shows Login (localStorage was cleared)

---

## Test 5: Session Persistence After Refresh

1. **Login as Any User**
   - Use any of the three credentials

2. **Hard Refresh Multiple Times**
   - Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - **Expected**: Stay logged in, page loads quickly (cached by service worker)

3. **Close and Reopen Browser**
   - Close browser completely
   - Reopen and go to `http://localhost:5174/`
   - **Expected**: Still logged in (localStorage persists)

4. **Clear Cookies (But Not Storage)**
   - DevTools → Application → Cookies → delete all
   - Refresh page
   - **Expected**: Still logged in (we use localStorage, not cookies)

5. **Clear All Storage and Reload**
   - DevTools → Application → LocalStorage → delete `assetpulse_user`
   - Refresh page
   - **Expected**: Shows Login screen

---

## Test 6: Rapid Sign In/Out

1. **Sign In**
   - Login as admin

2. **Immediately Click Sign Out**
   - Click Sign Out button
   - **Expected**: Cleanly transitions to Login
   - **Verify**: No error messages, state is consistent

3. **Repeat 5 Times**
   - Sign in, sign out repeatedly
   - **Expected**: No memory leaks, state always consistent

---

## Test 7: Browser DevTools Manipulation

### 7a: Manually Clear Storage

1. **Login as Admin**

2. **Open DevTools**
   - Application → LocalStorage → delete `assetpulse_user`

3. **Refresh Page**
   - **Expected**: Shows Login screen
   - **Verify**: Auth guard caught the missing storage

### 7b: Manually Set Corrupted Storage

1. **Open DevTools**
   - LocalStorage → Create key `assetpulse_user` with value: `{invalid json`

2. **Refresh Page**
   - **Expected**: Shows Login screen (error handling in useAuth)
   - **Verify**: Corrupted data is handled gracefully

### 7c: Manually Set Valid Storage

1. **Open DevTools**
   - LocalStorage → Create key `assetpulse_user` with value:
     ```json
     {"email":"admin@emb.global","role":"admin","name":"Admin User"}
     ```

2. **Refresh Page**
   - **Expected**: Shows Dashboard (localStorage is trusted)
   - **Verify**: Session restored correctly

---

## Test Summary Checklist

- [ ] Admin login → Dashboard, shows "Admin User"
- [ ] Manager login → Dashboard, shows "City Manager"
- [ ] Vendor login → /mobile, shows "Field Vendor"
- [ ] Sign out clears localStorage
- [ ] Sign out redirects to Login
- [ ] Can't access protected routes without auth
- [ ] Invalid credentials show error message
- [ ] Session persists across page refresh
- [ ] Session persists across browser reopens
- [ ] Auth guard catches missing localStorage
- [ ] Auth guard catches corrupted localStorage
- [ ] Multiple tabs stay in sync
- [ ] Rapid login/logout doesn't break state

---

## Implementation Details

**Auth Storage Key**: `assetpulse_user`

**Stored User Object**:
```javascript
{
  email: "admin@emb.global",
  role: "admin",
  name: "Admin User"
}
```

**Auth Guard Logic** (App.jsx):
```javascript
const storedUser = localStorage.getItem('assetpulse_user')
const isAuthenticated = user && storedUser

if (!isAuthenticated) {
  return <Login />
}
```

**Sign Out Logic** (useAuth.js):
```javascript
const signOut = () => {
  setUser(null)
  localStorage.removeItem('assetpulse_user')
}
```

---

## Troubleshooting

**Issue**: Stuck on Login after clearing storage
- **Solution**: Refresh page (React state needs to sync with localStorage)

**Issue**: Multiple tabs out of sync
- **Solution**: Refresh the tab that doesn't match (localStorage is checked on App mount)

**Issue**: Storage key not found
- **Solution**: Check DevTools → Application → LocalStorage → look for `assetpulse_user`
- **Note**: Old key was `auth_user`, migrations may be needed if upgrading

**Issue**: Can't see TopNav user info
- **Solution**: Make sure you're logged in and on Desktop (TopNav hidden on mobile)

---

## Key Files

- `/src/hooks/useAuth.js` - Auth logic, localStorage management
- `/src/pages/Login.jsx` - Login UI, credential validation
- `/src/components/TopNav.jsx` - Sign Out button, user display
- `/src/App.jsx` - Auth guard, route protection
