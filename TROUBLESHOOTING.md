# TROUBLESHOOTING GUIDE

## Fatal Error: "A persistent non-recoverable error has occurred"

If you see this error in VS Code/Cursor, follow these steps:

### Quick Fix (Usually Works):

```bash
# 1. Delete problematic folders
rm -rf node_modules
rm -rf .next
rm -rf .turbo

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall dependencies
npm install

# 4. Restart your IDE completely
# Close VS Code/Cursor and reopen

# 5. Run the dev server
npm run dev
```

### If That Doesn't Work:

#### Step 1: Check for Syntax Errors
Look for these common issues:
- Missing closing braces `}` in components
- Unclosed JSX tags `<div>` without `</div>`
- Import statements with typos
- Missing semicolons in certain contexts

#### Step 2: Verify TypeScript Setup

Make sure these files exist:
- `tsconfig.json` ✓
- `next-env.d.ts` ✓
- `types/global.d.ts` ✓

#### Step 3: Check package.json

Ensure all dependencies are properly listed:
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.263.1",
    "@prisma/client": "^5.8.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "typescript": "^5.0.0",
    "prisma": "^5.8.0"
  }
}
```

#### Step 4: Restart TypeScript Server in IDE

In VS Code/Cursor:
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
2. Type: "TypeScript: Restart TS Server"
3. Press Enter

#### Step 5: Check for Circular Dependencies

Look for files that import each other:
```typescript
// BAD - Circular dependency
// file1.ts imports file2.ts
// file2.ts imports file1.ts
```

### Common Causes:

1. **Missing node_modules** - Run `npm install`
2. **Corrupted .next cache** - Delete `.next` folder
3. **TypeScript errors** - Check terminal for errors
4. **Missing type definitions** - Install `@types/*` packages
5. **Conflicting versions** - Use exact versions in package.json

### Nuclear Option (Last Resort):

```bash
# Delete everything and start fresh
rm -rf node_modules
rm -rf .next
rm -rf package-lock.json
rm -rf .turbo

# Reinstall everything
npm install

# Restart IDE completely
```

### Prevention:

1. Always run `npm install` after pulling new code
2. Keep dependencies up to date
3. Don't commit `node_modules` or `.next`
4. Use `.gitignore` properly
5. Restart IDE after major changes

## Database Connection Issues

If you see Prisma errors:

```bash
# Regenerate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Reset database (CAREFUL - deletes all data)
npx prisma migrate reset
```

## Port Already in Use

If port 3000 is taken:

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

## Still Having Issues?

1. Check the terminal for actual error messages
2. Look at the browser console (F12)
3. Check Next.js logs in terminal
4. Verify all files are saved
5. Try incognito/private browser window

## Getting Help:

If none of this works:
1. Click "Show details" in the error modal
2. Copy the full error message
3. Share it for specific help

Remember: 90% of IDE errors are fixed by:
- Deleting `node_modules` and `.next`
- Running `npm install`
- Restarting the IDE
