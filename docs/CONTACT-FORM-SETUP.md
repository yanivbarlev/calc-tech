# Contact Form Setup Instructions

## ✅ Contact Page Created

The contact page has been created at `/contact` and will forward emails to: **yaniv.bl+calc@gmail.com**

## 🔧 Setup Required: Formspree Integration

To make the contact form functional, you need to set up Formspree (free service for form submissions):

### Step 1: Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Get Started" or "Sign Up"
3. Create a free account (free tier allows 50 submissions/month)

### Step 2: Create a New Form
1. After logging in, click "New Form" or "Create Form"
2. Give it a name like "Calc-Tech Contact Form"
3. Set the email destination to: **yaniv.bl+calc@gmail.com**
4. Copy the Form ID (it looks like: `xyzabc123`)

### Step 3: Update the Contact Page
1. Open `calculator-net-clone/app/contact/page.tsx`
2. Find line 30 where it says:
   ```typescript
   const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
   ```
3. Replace `YOUR_FORMSPREE_ID` with your actual Formspree Form ID
4. Save the file

### Step 4: Verify Email
1. Formspree will send a verification email to yaniv.bl+calc@gmail.com
2. Click the verification link in that email
3. Your form is now active!

## 🎯 Alternative: Using Web3Forms (Also Free)

If you prefer Web3Forms instead:

### Step 1: Get Access Key
1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Enter your email: **yaniv.bl+calc@gmail.com**
3. Click "Get Access Key"
4. Check your email and copy the access key

### Step 2: Update Contact Page for Web3Forms
Replace the fetch code in `contact/page.tsx` (around line 27-40) with:

```typescript
const response = await fetch("https://api.web3forms.com/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Replace with your key
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  }),
});
```

## 📧 Direct Email Link (Already Working)

The contact page also includes a direct email link that works immediately:
- Users can click the email address to open their email client
- Email: yaniv.bl+calc@gmail.com

## 🧪 Testing the Form

After setup:
1. Go to your website at `/contact`
2. Fill out the form
3. Submit it
4. Check yaniv.bl+calc@gmail.com for the message
5. Verify the reply-to address is the user's email

## 🔒 Spam Protection

Both Formspree and Web3Forms include:
- Built-in spam protection
- reCAPTCHA options (can enable in dashboard)
- Rate limiting
- Email verification

## 💰 Pricing (Free Tiers)

**Formspree Free:**
- 50 submissions/month
- Unlimited forms
- Email notifications
- No credit card required

**Web3Forms Free:**
- 250 submissions/month
- Unlimited forms
- Email notifications
- No credit card required

## 📝 Recommended: Formspree

I recommend Formspree because:
- Easy setup
- Reliable service
- Good free tier
- Professional email templates
- Form analytics dashboard

## ⚡ Quick Start (1-Minute Setup)

1. Go to https://formspree.io/register
2. Sign up with Google or Email
3. Create a form, set email to: yaniv.bl+calc@gmail.com
4. Copy the Form ID
5. Update line 30 in `contact/page.tsx` with your Form ID
6. Done! Test it immediately.

---

## 🎉 Once Complete

After setup, your contact page will:
- ✅ Accept messages from users
- ✅ Forward them to yaniv.bl+calc@gmail.com
- ✅ Show success/error messages
- ✅ Include user's email for replies
- ✅ Categorize by subject
- ✅ Work on mobile and desktop
- ✅ Meet AdSense requirements for contact info

## 🚀 Go Live

The contact page is ready to use as soon as you complete the Formspree setup!

---

*Created: November 2024*
*Status: Setup Required - Follow steps above*
