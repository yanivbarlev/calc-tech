# calc-tech.com — CLAUDE.md

This is the calc-tech Next.js app. It serves as the hosted backend for Chrome extensions: welcome pages, uninstall pages, and marketing landing pages.

## Deployment

**Mechanism:** Vercel watches the GitHub repo and auto-deploys on every push to `main`.
**GitHub remote:** `https://github.com/yanivbarlev/calc-tech.git`
**Live domain:** `https://calc-tech.com`

After any file change, deploy by:
```bash
git add <files>
git commit -m "..."
git push origin main
```

Wait ~90 seconds, then verify the live URL in a browser. **Never report a task as done until the URL loads.**

## Extension Pages

Each Chrome extension gets a folder under `app/extensions/<slug>/`:

```
app/extensions/<slug>/
  welcome/
    layout.tsx    ← SEO metadata (title, description)
    page.tsx      ← the welcome page shown after install
  uninstall/
    layout.tsx    ← SEO metadata
    page.tsx      ← uninstall survey + reinstall CTA
```

Live URLs:
- `https://calc-tech.com/extensions/<slug>/welcome`
- `https://calc-tech.com/extensions/<slug>/uninstall`

### Wiring in the extension

In `background.js`:
```js
// Open welcome page on install
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.tabs.create({ url: 'https://calc-tech.com/extensions/<slug>/welcome' });
    }
});

// Open uninstall survey when user removes extension
chrome.runtime.setUninstallURL('https://calc-tech.com/extensions/<slug>/uninstall').catch(() => {});
```

**Why hosted URLs?** The uninstall URL fires after the extension is removed — `chrome.runtime.getURL()` would 404 because the extension no longer exists. Always use the calc-tech.com URL.

## Shared Assets

Images shared across extension pages live in `public/shared/`:
```
public/shared/chrome-puzzle-icon.png   → calc-tech.com/shared/chrome-puzzle-icon.png
```

Reference in Next.js pages: `<NextImage src="/shared/chrome-puzzle-icon.png" ... />`

Always commit `public/shared/` alongside the page files.

## Design System (Design A — Clean Slate)

All extension pages use this design language:

| Token | Value |
|---|---|
| Font | `'Outfit', system-ui, -apple-system, sans-serif` |
| Google Fonts | `https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700` |
| Background | `#ffffff` |
| Accent | `#1a8c5f` |
| Text primary | `#111111` |
| Text muted | `#555555` |
| Text subtle | `#bbbbbb` |
| Border | `#efefef` |
| Section labels | `9.5px, weight 700, uppercase, letter-spacing .12em, color #bbb` |
| Max-width | `960px–1060px`, centered |
| Border-radius | `10–12px` |

Rules: no emojis, no Inter font, no purple/blue gradients. Desktop-first layout (not phone-width).

## Existing Extensions

| Extension | Welcome | Uninstall |
|---|---|---|
| CleanTube | `/extensions/cleantube/welcome` | `/extensions/cleantube/uninstall` |
| ChatGPT Exporter | `/extensions/chatgpt-conversation-export/welcome` | — |
| WhatsApp Chat Export | `/extensions/whatsapp-chat-export/welcome` | — |
