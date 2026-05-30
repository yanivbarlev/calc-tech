# 🔐 Add Clerk Authentication to Your Calculator Site

Complete step-by-step guide to add user authentication with Clerk.

---

## 📋 Todo List

### ✅ Phase 1: Setup Clerk Account (5 minutes)

- [ ] **Task 1**: Sign up for Clerk account
  - Go to: https://clerk.com
  - Click "Start Building for Free"
  - Sign up with GitHub, Google, or email
  - Verify your email

- [ ] **Task 2**: Create new Clerk application
  - Click "Create Application"
  - Name: "Calculator Site" (or your choice)
  - Choose sign-in methods:
    - ✅ Email
    - ✅ Google (recommended)
    - ✅ GitHub (optional)
  - Click "Create Application"

- [ ] **Task 3**: Get your API keys
  - After creating app, you'll see the dashboard
  - Go to "API Keys" in left sidebar
  - Copy these keys (you'll need them):
    - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
    - `CLERK_SECRET_KEY`

---

## 📦 Phase 2: Install Clerk in Your Project (5 minutes)

### Task 4: Install Clerk packages

Open terminal and run:

```bash
cd calculator-net-clone
npm install @clerk/nextjs
```

Wait for installation to complete (~30 seconds).

---

### Task 5: Create environment variables file

Create a new file: `.env.local` in the `calculator-net-clone` directory:

```bash
# In calculator-net-clone folder, create .env.local
```

Add this content (replace with YOUR keys from Clerk dashboard):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE

# Clerk URLs (keep these as-is)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

**IMPORTANT**:
- Replace `YOUR_KEY_HERE` with actual keys from Clerk
- Don't commit this file to Git (it's already in .gitignore)
- This file stays on your local machine only

---

## 🔧 Phase 3: Configure Clerk in Your App (10 minutes)

### Task 6: Wrap your app with ClerkProvider

**File to edit**: `app/layout.tsx`

Find this line:
```tsx
export default function RootLayout({
```

Add Clerk import at the top:
```tsx
import { ClerkProvider } from '@clerk/nextjs'
```

Then wrap the `<html>` tag with `<ClerkProvider>`:

**Before**:
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**After**:
```tsx
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

---

### Task 7: Create middleware for route protection

**Create new file**: `middleware.ts` in the root of `calculator-net-clone` folder (next to `package.json`)

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define which routes should be protected (require login)
const isProtectedRoute = createRouteMatcher([
  // Add routes here that require login
  // Example: '/dashboard(.*)',
  // For now, we'll keep all routes public
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```

**What this does**:
- Allows Clerk to handle authentication
- Currently keeps all routes public
- You can protect specific routes later by adding them to `isProtectedRoute`

---

### Task 8: Replace Sign In button on homepage

**File to edit**: `app/page.tsx`

At the top of the file, add these imports:
```tsx
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
```

Find the Sign In button (around line 208):
```tsx
<Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
  Sign In
</Button>
```

Replace it with:
```tsx
<SignedOut>
  <SignInButton mode="modal">
    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
      Sign In
    </Button>
  </SignInButton>
</SignedOut>
<SignedIn>
  <UserButton
    appearance={{
      elements: {
        avatarBox: "w-10 h-10"
      }
    }}
  />
</SignedIn>
```

**What this does**:
- Shows "Sign In" button when user is NOT logged in
- Shows user avatar/menu when user IS logged in
- Opens Clerk's beautiful sign-in modal

---

### Task 9: Create Sign In page

**Create folder**: `app/sign-in`
**Create file**: `app/sign-in/[[...sign-in]]/page.tsx`

```tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-2xl"
          }
        }}
      />
    </div>
  )
}
```

---

### Task 10: Create Sign Up page

**Create folder**: `app/sign-up`
**Create file**: `app/sign-up/[[...sign-up]]/page.tsx`

```tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-2xl"
          }
        }}
      />
    </div>
  )
}
```

---

## 🧪 Phase 4: Test Locally (5 minutes)

### Task 11: Test the authentication flow

```bash
cd calculator-net-clone
npm run dev
```

Open: http://localhost:3000

**Test checklist**:
- [ ] Click "Sign In" button
- [ ] Clerk modal appears
- [ ] Click "Sign up" to create account
- [ ] Enter email and password
- [ ] Verify email (check inbox)
- [ ] Sign in successfully
- [ ] See user avatar/button in header
- [ ] Click avatar to see menu
- [ ] Sign out works
- [ ] Sign in again works

---

## 🚀 Phase 5: Deploy to Vercel (10 minutes)

### Task 12: Add environment variables to Vercel

1. Go to: https://vercel.com
2. Select your project: `calc-tech`
3. Go to: **Settings → Environment Variables**
4. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_YOUR_KEY_HERE` | Production, Preview, Development |
| `CLERK_SECRET_KEY` | `sk_test_YOUR_SECRET_KEY_HERE` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/` | Production, Preview, Development |

5. Click "Save" for each variable

---

### Task 13: Update your production domain in Clerk

1. Go to Clerk dashboard: https://dashboard.clerk.com
2. Select your application
3. Go to: **Domains**
4. Add your Vercel domain:
   - `calc-tech-peach.vercel.app`
   - And your custom domain if you have one: `yourdomain.com`
5. Save

---

### Task 14: Deploy to production

```bash
cd calculator-net-clone
git add .
git commit -m "Add Clerk authentication"
git push
```

Vercel will automatically deploy (1-2 minutes).

---

### Task 15: Test in production

Visit: https://calc-tech-peach.vercel.app

**Production test checklist**:
- [ ] Sign In button works
- [ ] Can create new account
- [ ] Email verification works
- [ ] Can sign in
- [ ] User avatar appears
- [ ] Can sign out
- [ ] Can sign in again

---

## 🎨 Phase 6: Customize (Optional)

### Add Clerk branding customization

In Clerk dashboard → **Customization**:
- Upload your logo
- Change colors to match your site
- Customize sign-in/sign-up forms
- Add custom fields

### Add protected routes

Edit `middleware.ts` to protect specific routes:

```typescript
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/saved-calculations(.*)',
])
```

Now these routes require login!

---

## 🔧 Troubleshooting

### Issue: "Clerk: Missing publishableKey"

**Solution**:
- Check `.env.local` file exists
- Verify keys are copied correctly
- Restart dev server: `npm run dev`

### Issue: "Sign in button does nothing"

**Solution**:
- Check middleware.ts is in root folder
- Verify ClerkProvider wraps the app in layout.tsx
- Check browser console for errors

### Issue: "Redirect loop after sign in"

**Solution**:
- Check AFTER_SIGN_IN_URL is set to `/`
- Verify no conflicting redirects in middleware

### Issue: "Works locally but not on Vercel"

**Solution**:
- Check environment variables in Vercel settings
- Add your Vercel domain to Clerk dashboard
- Redeploy after adding env vars

---

## 📊 What You Get with Clerk (Free Plan)

✅ **5,000 Monthly Active Users** (MAUs) - free forever
✅ **Unlimited sign-ins**
✅ **Email & password authentication**
✅ **Social sign-in** (Google, GitHub, etc.)
✅ **Email verification**
✅ **Password reset**
✅ **User profile management**
✅ **Session management**
✅ **2FA/MFA support**
✅ **Pre-built UI components**
✅ **User management dashboard**

---

## 🎯 Success Criteria

You're done when:
- ✅ Sign In button opens Clerk modal
- ✅ Users can create accounts
- ✅ Users can sign in/out
- ✅ User avatar appears when signed in
- ✅ Works in production on Vercel
- ✅ Email verification works

---

## 📚 Resources

- **Clerk Docs**: https://clerk.com/docs/quickstarts/nextjs
- **Clerk Dashboard**: https://dashboard.clerk.com
- **Clerk Components**: https://clerk.com/docs/components/overview
- **Next.js + Clerk**: https://clerk.com/docs/references/nextjs/overview

---

## 🚀 Next Steps After Setup

Consider adding:
1. **User Dashboard** - Show saved calculations
2. **Calculation History** - Store user's past calculations
3. **Favorites** - Let users save favorite calculators
4. **Profile Page** - Custom user settings
5. **Admin Panel** - Manage users (if needed)

---

**Estimated Total Time**: 30-45 minutes
**Difficulty**: Beginner-friendly (Clerk does the heavy lifting!)
**Cost**: Free for up to 5,000 users/month

---

Good luck! 🎉 You'll have professional authentication in under an hour.
