# GoDaddy Domain Setup for Vercel

## 🎯 Overview

This guide explains how to connect your GoDaddy domain to your Vercel-hosted calculator website.

## 📋 Prerequisites

- ✅ Domain purchased from GoDaddy
- ✅ Website deployed on Vercel
- ✅ Access to both GoDaddy and Vercel accounts

## ⏱️ Time Required

- **Setup Time**: 10-15 minutes
- **DNS Propagation**: 24-48 hours (usually faster, often 1-2 hours)

---

## 🚀 Step-by-Step Setup

### Part 1: Add Domain to Vercel (5 minutes)

#### Step 1: Go to Vercel Dashboard

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **calculator-net-clone** (or your project name)
3. Go to **Settings** tab

#### Step 2: Add Your Domain

1. In Settings, click **Domains** section (left sidebar)
2. Click **Add Domain** button
3. Enter your domain name:
   - Example: `calc-tech.com` (your actual domain)
   - Or with www: `www.calc-tech.com`
4. Click **Add**

#### Step 3: Choose Domain Type

Vercel will show options:
- **Option A**: Add both `calc-tech.com` and `www.calc-tech.com`
- **Option B**: Add only one and redirect the other

**Recommended**: Add both, set one as primary

#### Step 4: Note the DNS Records

Vercel will show you DNS records to add. **Copy these** (you'll need them for GoDaddy):

**For Root Domain** (`calc-tech.com`):
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW Subdomain** (`www.calc-tech.com`):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Important**: Keep this Vercel tab open - you'll need these values!

---

### Part 2: Configure DNS in GoDaddy (10 minutes)

#### Step 1: Access GoDaddy DNS Management

1. Go to [GoDaddy](https://www.godaddy.com/)
2. Sign in to your account
3. Click on your **Profile Icon** (top right) → **My Products**
4. Find your domain in the list
5. Click **DNS** button next to your domain
   - Or click the domain name, then click **DNS** tab

#### Step 2: Configure A Record (for root domain)

1. Look for existing **A Records**
2. Find the one with:
   - **Name/Host**: `@` (represents your root domain)
   - **Type**: `A`

3. **Edit** (or **Delete and Add New**):
   - Click the pencil icon or **Edit**
   - **Type**: `A`
   - **Name**: `@`
   - **Value/Points to**: `76.76.21.21` (Vercel's IP)
   - **TTL**: `600` seconds (or default)
   - Click **Save**

**If no A record exists**:
1. Click **Add** or **Add New Record**
2. **Type**: `A`
3. **Name**: `@`
4. **Value**: `76.76.21.21`
5. **TTL**: `600`
6. Click **Save**

#### Step 3: Configure CNAME Record (for www subdomain)

1. Look for existing **CNAME Records** with name `www`
2. **Edit or Delete** any existing www CNAME:

3. **Add New CNAME**:
   - Click **Add** or **Add New Record**
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Value/Points to**: `cname.vercel-dns.com`
   - **TTL**: `600` seconds (or default)
   - Click **Save**

#### Step 4: Remove Conflicting Records (Important!)

**Check for and remove these if they exist**:

1. **Domain Forwarding**:
   - If you have domain forwarding set up, disable it
   - Go to GoDaddy → Domain Settings → Forwarding → Delete any forwards

2. **Parking Page**:
   - If domain is parked, remove parking
   - GoDaddy → Domain Settings → Remove parking

3. **Conflicting A Records**:
   - Delete any other A records pointing to different IPs
   - Keep only the Vercel one (`76.76.21.21`)

#### Step 5: Save and Verify

1. Review your DNS records - should look like:
   ```
   Type    Name    Value
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns.com
   ```

2. Click **Save** (if not already saved)
3. Note: Changes may take a few minutes to save

---

### Part 3: Verify in Vercel (2 minutes)

#### Step 1: Check Domain Status

1. Go back to your Vercel Dashboard → Project → Settings → Domains
2. Wait 1-2 minutes, then refresh the page
3. Domain status will show:
   - ⏳ **"Pending"** or **"Configuring"** - DNS not propagated yet
   - ✅ **"Valid Configuration"** - Success! Domain is working

#### Step 2: Test Your Domain

**Wait Time**:
- **Minimum**: 5-10 minutes
- **Average**: 1-2 hours
- **Maximum**: 24-48 hours

**How to Test**:
1. Open a new browser tab (or incognito mode)
2. Go to your domain: `https://calc-tech.com`
3. Go to www version: `https://www.calc-tech.com`
4. Both should load your calculator website!

#### Step 3: Set Primary Domain (Optional)

In Vercel:
1. Settings → Domains
2. Click the three dots (**...**) next to your preferred domain
3. Click **"Make Primary"**
4. This will redirect the other version to your primary

---

## 🔧 Common DNS Record Configurations

### Option 1: Root Domain Only (calc-tech.com)
```
Type: A
Name: @
Value: 76.76.21.21
```

### Option 2: WWW Only (www.calc-tech.com)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Option 3: Both (Recommended)
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔍 Verification Checklist

Before waiting for DNS propagation:

- [ ] A record added: `@` → `76.76.21.21`
- [ ] CNAME record added: `www` → `cname.vercel-dns.com`
- [ ] No conflicting A records
- [ ] Domain forwarding disabled in GoDaddy
- [ ] Domain not parked
- [ ] Vercel shows domain as "Pending" or "Configuring"

---

## 🧪 Testing Your Domain

### Method 1: Direct Browser Test
```
https://calc-tech.com
https://www.calc-tech.com
```

### Method 2: DNS Lookup Tool
Check if DNS has propagated:
- [whatsmydns.net](https://www.whatsmydns.net/)
- Enter your domain
- Check A record: Should show `76.76.21.21`

### Method 3: Command Line
**Windows (Command Prompt)**:
```cmd
nslookup calc-tech.com
nslookup www.calc-tech.com
```

**Mac/Linux (Terminal)**:
```bash
dig calc-tech.com
dig www.calc-tech.com
```

Look for:
- A record: `76.76.21.21`
- CNAME: `cname.vercel-dns.com`

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Typing your domain in browser loads your site
- ✅ HTTPS automatically works (Vercel provides SSL)
- ✅ Both www and non-www versions work
- ✅ Vercel dashboard shows "Valid Configuration"
- ✅ No browser security warnings

---

## 🚨 Troubleshooting

### Problem 1: "This site can't be reached" or DNS Error

**Solution**:
1. Wait longer (DNS can take 24-48 hours)
2. Check DNS records in GoDaddy are correct
3. Verify no typos in IP address or CNAME
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try incognito/private browsing mode
6. Use DNS lookup tool to check propagation

### Problem 2: Domain shows "Invalid Configuration" in Vercel

**Solution**:
1. Double-check A record: `@` → `76.76.21.21`
2. Check CNAME: `www` → `cname.vercel-dns.com`
3. Remove any conflicting DNS records
4. Wait 15-30 minutes and refresh Vercel

### Problem 3: Domain loads but shows old/wrong content

**Solution**:
1. Clear browser cache completely
2. Try different browser or incognito
3. Wait for full DNS propagation (up to 48 hours)
4. Verify in Vercel that correct project is connected

### Problem 4: "Too Many Redirects" Error

**Solution**:
1. Check GoDaddy forwarding settings - disable any
2. Remove duplicate DNS records in GoDaddy
3. Wait 15 minutes, clear cache, try again

### Problem 5: SSL/HTTPS Not Working

**Solution**:
- Vercel automatically provisions SSL certificates
- Wait 10-15 minutes after domain verification
- If still not working after 1 hour, contact Vercel support
- Ensure you're using `https://` not `http://`

### Problem 6: WWW Not Working

**Solution**:
1. Check CNAME record: `www` → `cname.vercel-dns.com`
2. Verify no conflicting www A records
3. Wait for DNS propagation
4. In Vercel, ensure www domain is added

---

## 📱 Setting Up Email (Optional)

**Note**: Vercel hosting doesn't include email. To use email@yourdomain.com:

**Option 1: GoDaddy Email**
1. Purchase GoDaddy email service
2. MX records automatically configured

**Option 2: Google Workspace (Gmail)**
1. Sign up for Google Workspace
2. Add MX records provided by Google to GoDaddy DNS

**Option 3: Free Email Forwarding**
1. Use services like ImprovMX or ForwardEmail
2. Add their MX records to GoDaddy
3. Forward domain emails to your Gmail

---

## 🎯 Post-Setup Checklist

After domain is live:

### Immediate Tasks:
- [ ] Test domain in multiple browsers
- [ ] Verify HTTPS is working
- [ ] Update Google Analytics domain (if using)
- [ ] Update any hardcoded URLs in your code
- [ ] Test all pages load correctly

### Google Services:
- [ ] Add domain to Google Search Console
- [ ] Submit sitemap to Search Console
- [ ] Update Google Analytics property URL
- [ ] Apply for Google AdSense with new domain

### Social & Marketing:
- [ ] Update social media profiles with new domain
- [ ] Update email signature
- [ ] Update business cards/marketing materials
- [ ] Share on social media

---

## 📊 DNS Record Examples (Visual Reference)

### GoDaddy DNS Records Should Look Like:

```
┌──────────┬────────┬─────────────────────────┬──────┐
│   Type   │  Name  │         Value           │ TTL  │
├──────────┼────────┼─────────────────────────┼──────┤
│    A     │   @    │     76.76.21.21         │ 600  │
│  CNAME   │  www   │  cname.vercel-dns.com   │ 600  │
└──────────┴────────┴─────────────────────────┴──────┘
```

---

## 💡 Pro Tips

1. **Use Both Versions**: Setup both www and non-www for maximum compatibility
2. **Set Primary Domain**: Choose one as primary in Vercel for consistent URLs
3. **Monitor Analytics**: After going live, check Google Analytics for traffic
4. **Update Everywhere**: Update domain in all your accounts (ads, socials, etc.)
5. **Backup Old Content**: If replacing an existing site, backup first
6. **Test Mobile**: Always test on mobile devices after domain goes live

---

## 📞 Support Resources

**Vercel Support**:
- [Vercel Docs - Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [Vercel Support](https://vercel.com/support)

**GoDaddy Support**:
- [GoDaddy DNS Help](https://www.godaddy.com/help/change-an-a-record-19237)
- [GoDaddy Support](https://www.godaddy.com/contact-us)

**DNS Propagation Checkers**:
- [What's My DNS](https://www.whatsmydns.net/)
- [DNS Checker](https://dnschecker.org/)

---

## ⏰ Timeline Summary

| Time          | What Happens                                    |
|---------------|------------------------------------------------|
| 0 minutes     | You configure DNS in GoDaddy                   |
| 1-5 minutes   | Vercel detects configuration                   |
| 10-30 minutes | DNS starts propagating globally                |
| 1-2 hours     | Most locations can access your domain          |
| 24-48 hours   | Complete global DNS propagation                |

---

## ✅ Quick Setup Checklist

Print this and check off as you go:

1. [ ] Add domain in Vercel (Settings → Domains)
2. [ ] Copy Vercel's DNS records (A and CNAME)
3. [ ] Log in to GoDaddy
4. [ ] Go to domain DNS settings
5. [ ] Add/Edit A record: `@` → `76.76.21.21`
6. [ ] Add/Edit CNAME: `www` → `cname.vercel-dns.com`
7. [ ] Remove conflicting DNS records
8. [ ] Disable domain forwarding
9. [ ] Save changes
10. [ ] Wait 10-30 minutes
11. [ ] Test domain in browser
12. [ ] Verify HTTPS works
13. [ ] Check both www and non-www
14. [ ] Update Google services
15. [ ] Celebrate! 🎉

---

## 🎉 Success!

Once your domain is live:
- Your calculator website will be accessible at your custom domain
- Vercel automatically handles HTTPS/SSL
- Your site will load fast globally via Vercel's CDN
- You're ready to apply for Google AdSense!

---

*Setup Guide Version: 1.0*
*Last Updated: November 2024*
*For: GoDaddy Domain → Vercel Deployment*
