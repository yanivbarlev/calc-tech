# 🚀 Quick Start: Deploy to Vercel in 5 Minutes

## The Fastest Way to Get Your Site Online

### Step 1: Push to GitHub (2 minutes)

```bash
cd calculator-net-clone

# If not already a git repo
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/calculator-site.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (2 minutes)

1. Go to **https://vercel.com/new**
2. Sign in with GitHub
3. Click "Import" next to your repository
4. Click "Deploy" (keep all defaults)
5. Wait ~2 minutes ⏳

**Done!** Your site is live at: `https://your-project.vercel.app`

### Step 3: Connect GoDaddy Domain (5 minutes)

**In Vercel:**
1. Project Settings → Domains
2. Add your domain: `yourdomain.com`
3. Note the DNS records shown

**In GoDaddy:**
1. My Products → Your Domain → Manage DNS
2. Edit A record `@` → Point to: `76.76.21.21`
3. Edit/Add CNAME `www` → Point to: `cname.vercel-dns.com`
4. Save changes

**Wait 15-30 minutes for DNS propagation** ☕

**Done!** Your site is live at: `https://yourdomain.com` 🎉

---

## ✅ What You Get

- ✅ Free hosting forever (Vercel Hobby plan)
- ✅ Global CDN (fast worldwide)
- ✅ Automatic HTTPS/SSL
- ✅ Auto-deploy on Git push
- ✅ Preview URLs for branches
- ✅ 100 GB bandwidth/month

---

## 🔄 Update Your Site

```bash
# Make changes to your code
git add .
git commit -m "Updated calculator"
git push
```

Vercel automatically deploys in ~2 minutes!

---

## 📖 Need More Details?

See **`VERCEL-DEPLOYMENT.md`** for:
- Detailed instructions with screenshots
- Troubleshooting guide
- Advanced configuration
- Custom domain setup tips
- DNS troubleshooting

---

## 💡 Pro Tips

1. **Always use `main` branch** for production
2. **Test on Vercel URL** before connecting domain
3. **DNS can take up to 48 hours** (usually 15-30 mins)
4. **Free SSL** activates automatically after domain verifies
5. **Every push to main** triggers automatic deployment

---

**That's it!** Your calculator site is now live on Vercel with your GoDaddy domain. 🚀
