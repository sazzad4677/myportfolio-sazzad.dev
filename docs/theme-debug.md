# Theme Update Debugging Guide

## Issue
When clicking "Set as Default", the theme briefly shows as selected then reverts back.

## Debug Steps

1. **Open Browser Console**:
   - Go to Admin Dashboard → Theme tab
   - Open browser DevTools (F12)
   - Go to Console tab

2. **Click "Set as Default" on any theme**

3. **Check Console Output**:
   You should see logs like:
   ```
   Updating default theme to: gold
   Current theme config before update: { defaultTheme: 'system', customThemes: [] }
   Theme config after update: { defaultTheme: 'gold', customThemes: [] }
   Save result: { defaultTheme: 'gold', customThemes: [] }
   ```

4. **What to Look For**:
   - Does the "Save result" show the correct theme?
   - Does the theme revert after the save completes?
   - Are there any error messages?

## Possible Causes

### 1. Database Not Saving
If the save result shows the wrong theme, the database isn't persisting the change.

### 2. Subscription Firing with Old Data
If the save result is correct but UI reverts, the subscription is receiving stale data.

### 3. Theme Field Not in Database
If there's no `theme` field in the MongoDB document, it won't persist.

## Quick Fix to Test

Try manually checking MongoDB:
1. Open MongoDB Compass or Atlas
2. Find your portfolio document
3. Check if it has a `theme` field
4. If not, the schema might not be applied

## Next Steps

Based on console output, we can:
- Fix the database schema if theme field is missing
- Adjust the subscription logic if it's a timing issue
- Debug the API route if saves aren't persisting
