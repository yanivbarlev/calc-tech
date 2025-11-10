# 🚀 Deploy to Vercel with GoDaddy Domain

This guide shows you how to deploy your calculator site to Vercel (free hosting) and connect your GoDaddy domain.

## Why Vercel?

- ✅ **Free hosting** for Next.js apps
- ✅ **Automatic deployments** from Git
- ✅ **Global CDN** for lightning-fast performance
- ✅ **Built-in SSL/HTTPS** (automatic, free)
- ✅ **Zero configuration** - just connect and deploy
- ✅ **Serverless** - scales automatically
- ✅ Made by the creators of Next.js

## 📋 Prerequisites

1. **GitHub/GitLab/Bitbucket Account** (to host your code)
2. **Vercel Account** (free - sign up at https://vercel.com)
3. **GoDaddy Domain** (for your custom domain)

---

## Part 1: Deploy to Vercel (5 minutes)

### Step 1: Push Code to GitHub

If you haven't already:

```bash
cd calculator-net-clone

# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/calculator-site.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to https://vercel.com and sign up/login**
   - Use your GitHub account (recommended)

2. **Click "Add New Project"**

3. **Import your GitHub repository**
   - Select "Import Git Repository"
   - Choose your calculator-net-clone repo
   - Click "Import"

4. **Configure Project**
   - **Project Name**: `calculator-site` (or your choice)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - Click **"Deploy"**

5. **Wait for deployment** (1-2 minutes)
   - Vercel will build and deploy your site
   - You'll get a URL like: `calculator-site.vercel.app`

6. **🎉 Your site is live!**
   - Visit your Vercel URL to see it working
   - Test a few calculators to ensure everything works

---

## Part 2: Connect Your GoDaddy Domain (10 minutes)

### Step 1: Add Domain in Vercel

1. **In your Vercel project dashboard**, click **"Settings"**

2. **Go to "Domains" tab**

3. **Add your domain**:
   - Enter your GoDaddy domain: `yourdomain.com`
   - Click "Add"

4. **Vercel will show you DNS records** you need to add:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Step 2: Configure DNS in GoDaddy

1. **Log into your GoDaddy account**

2. **Go to My Products → Domains**

3. **Click on your domain** → "Manage DNS"

4. **Update DNS Records**:

   **For Root Domain (@):**
   - Find existing `A` record with name `@`
   - Click "Edit" (pencil icon)
   - Change "Points to" to: `76.76.21.21`
   - TTL: 600 seconds (or default)
   - Click "Save"

   **For www Subdomain:**
   - Find existing `CNAME` record with name `www`
   - If it doesn't exist, click "Add" → select "CNAME"
   - Name: `www`
   - Points to: `cname.vercel-dns.com`
   - TTL: 1 Hour (or default)
   - Click "Save"

5. **Remove conflicting records** (if any):
   - Look for other `A` records pointing elsewhere
   - Remove parking page records
   - Keep only the Vercel DNS records

### Step 3: Verify Domain in Vercel

1. **Back in Vercel**, click "Verify" or "Refresh"

2. **Wait for DNS propagation** (can take 5 minutes to 48 hours, usually 15-30 minutes)

3. **Check status**:
   - Valid ✅ = Domain is connected!
   - Pending ⏳ = Wait a bit longer
   - Invalid ❌ = Check DNS settings

4. **Once verified**, Vercel will automatically:
   - Issue free SSL certificate
   - Enable HTTPS
   - Redirect www to non-www (or vice versa, configurable)

---

## Part 3: Configure Domain Settings (Optional)

### Set Primary Domain

In Vercel project settings → Domains:
- Choose which version is primary:
  - `yourdomain.com` (recommended)
  - `www.yourdomain.com`
- Vercel will redirect other versions to primary

### Enable Production Branch

- **Main branch** deploys to your custom domain
- **Other branches** get preview URLs
- This is automatic - no configuration needed!

---

## 🔄 Automatic Deployments

From now on:

1. **Make changes** to your code locally
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update calculator"
   git push
   ```
3. **Vercel automatically deploys** (1-2 minutes)
4. **Changes are live** on your domain!

---

## 🎛️ Advanced Configuration

### Environment Variables

If you need environment variables:
1. Vercel Dashboard → Settings → Environment Variables
2. Add variables (e.g., API keys)
3. Redeploy to apply changes

### Custom Build Settings

Already configured in `vercel.json`:
- Security headers
- Framework detection
- Build commands

### Preview Deployments

- Every Git branch gets its own preview URL
- Test changes before merging to main
- Share preview links with others

---

## 📊 DNS Propagation Check

Check if your DNS changes have propagated:

**Online Tools:**
- https://dnschecker.org
- https://www.whatsmydns.net

**Command Line:**
```bash
# Check A record
nslookup yourdomain.com

# Check CNAME
nslookup www.yourdomain.com
```

---

## 🔧 Troubleshooting

### Domain Not Verifying

**Problem**: Domain shows as "Invalid" in Vercel

**Solutions**:
1. Wait longer (DNS can take up to 48 hours)
2. Double-check DNS records in GoDaddy match exactly
3. Remove any conflicting DNS records
4. Try clearing Cloudflare cache if you use it
5. Use `nslookup yourdomain.com` to verify DNS

### SSL Certificate Not Issued

**Problem**: HTTPS not working

**Solutions**:
1. Wait 15-30 minutes after domain verification
2. Visit Settings → Domains → click "Refresh SSL"
3. Ensure DNS is fully propagated
4. Check that no CAA records block Let's Encrypt

### Site Shows 404

**Problem**: Custom domain shows 404 error

**Solutions**:
1. Ensure domain is marked as "Valid" in Vercel
2. Check project is deployed successfully
3. Verify production deployment exists
4. Clear browser cache

### Build Fails

**Problem**: Deployment fails during build

**Solutions**:
1. Check build logs in Vercel dashboard
2. Ensure package.json has all dependencies
3. Verify Node.js version compatibility
4. Test build locally: `npm run build`

---

## 🌍 DNS Records Reference

Here's what your GoDaddy DNS should look like:

| Type  | Name | Value                 | TTL     |
|-------|------|-----------------------|---------|
| A     | @    | 76.76.21.21          | 600s    |
| CNAME | www  | cname.vercel-dns.com | 1 Hour  |

**Remove/Disable:**
- Old A records pointing to other IPs
- Parking page redirects
- Any conflicting CNAME records

---

## 💰 Pricing

**Vercel:**
- ✅ **Free (Hobby Plan)**:
  - Unlimited personal projects
  - 100 GB bandwidth/month
  - Automatic SSL
  - Global CDN
  - Perfect for this calculator site!

**GoDaddy:**
- 💵 **Domain Registration**: ~$12-15/year
- That's it! No hosting fees needed.

---

## 📈 Performance & Analytics

### Built-in Vercel Analytics
- Enable in project settings (free on paid plans)
- See page views, performance metrics
- Real user monitoring

### Add Google Analytics (Optional)
1. Add Google Analytics script to `app/layout.tsx`
2. Deploy changes
3. Track visitors

---

## ✅ Post-Deployment Checklist

- [ ] Site is live on Vercel URL
- [ ] Custom domain connected in Vercel
- [ ] DNS updated in GoDaddy
- [ ] Domain verified (green checkmark)
- [ ] HTTPS working (automatic SSL)
- [ ] All calculator pages working
- [ ] Mobile responsive (test on phone)
- [ ] Performance test (Google PageSpeed Insights)

---

## 🎉 You're Live!

Your calculator site is now:
- ✅ Hosted on Vercel's global CDN
- ✅ Accessible via your GoDaddy domain
- ✅ Secured with HTTPS
- ✅ Auto-deploying from Git
- ✅ Fast and scalable

**Example URLs:**
- Production: `https://yourdomain.com`
- Vercel URL: `https://calculator-site.vercel.app`
- Preview: `https://calculator-site-git-feature-branch.vercel.app`

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Next.js Docs**: https://nextjs.org/docs
- **GoDaddy DNS Help**: https://www.godaddy.com/help/dns-management-19201

---

**Deployed with**: Vercel
**Domain from**: GoDaddy
**Framework**: Next.js 16
**Status**: ✅ Production Ready
