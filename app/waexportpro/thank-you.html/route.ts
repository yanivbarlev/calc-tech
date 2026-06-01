import { NextResponse } from "next/server";

// Post-purchase thank-you page for "WhatsApp Chat Export & Backup" (the $9.95 flagship).
// The extension opens this page after the user activates a PRO license (free -> Pro).
// Its job is to fire the Google Ads PURCHASE conversion that the side panel cannot —
// MV3 CSP blocks gtag.js on chrome-extension:// pages, so the conversion must live on a
// real origin.
//
// Google Ads conversion action: "WAExportPro Purchase"
//   account/label: AW-1006081641 / AH84CPblnIccEOms3t8D
const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you — WhatsApp Chat Export &amp; Backup PRO</title>

    <!-- Google tag (gtag.js) — Google Ads -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1006081641"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-1006081641');
    </script>
    <!-- Conversion event snippet for "WAExportPro Purchase" -->
    <script>
      gtag('event', 'conversion', {
          'send_to': 'AW-1006081641/AH84CPblnIccEOms3t8D',
          'value': 4.99,
          'currency': 'USD',
          'transaction_id': ''
          // 'new_customer': true /* calculate dynamically, populate with true/false */,
      });
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Figtree', -apple-system, sans-serif;
            background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 60%);
            color: #111b21;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 24px;
            text-align: center;
        }
        .badge {
            width: 92px; height: 92px;
            border-radius: 26px;
            background: #111b21;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 26px;
            box-shadow: 0 14px 36px rgba(45,170,102,0.30);
        }
        .badge svg { width: 50px; height: 50px; }
        .pill {
            display: inline-flex; align-items: center; gap: 8px;
            background: #fef9c3; color: #a16207;
            font-weight: 800; font-size: 13px; letter-spacing: .04em;
            padding: 6px 14px; border-radius: 999px;
            margin-bottom: 18px; text-transform: uppercase;
        }
        h1 { font-size: 34px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 12px; }
        p.sub { font-size: 17px; color: #54656f; max-width: 480px; margin-bottom: 32px; }
        .cta {
            display: inline-flex; align-items: center; gap: 10px;
            background: #2DAA66; color: #fff;
            font-weight: 700; font-size: 17px;
            padding: 15px 32px; border-radius: 999px;
            text-decoration: none;
            box-shadow: 0 8px 20px rgba(45,170,102,0.35);
            transition: transform .15s, box-shadow .15s;
        }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(45,170,102,0.45); }
        .perks {
            margin-top: 44px; display: grid; gap: 14px;
            max-width: 440px; width: 100%; text-align: left;
        }
        .perk {
            display: flex; align-items: center; gap: 12px;
            background: #fff; border: 1px solid #e9edef;
            border-radius: 14px; padding: 14px 16px;
            font-size: 14px; color: #3b4a54;
        }
        .perk svg { flex: 0 0 20px; }
        footer { margin-top: 40px; font-size: 12px; color: #8696a0; }
        footer a { color: #8696a0; }
    </style>
</head>
<body>
    <div class="badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.9 8.6L22 9.3L16.7 14L18.2 21L12 17.3L5.8 21L7.3 14L2 9.3L9.1 8.6L12 2Z" fill="#25d366"/>
            <path d="M8.5 12l2.4 2.4L15.7 9.6" stroke="#111b21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>

    <span class="pill">PRO Unlocked</span>

    <h1>Thank you!</h1>
    <p class="sub">Your PRO license is active. You now have unlimited exports, PDF / CSV / HTML formats, media, and contact &amp; group lists — no message cap.</p>

    <a class="cta" href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer">
        Back to WhatsApp Web
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7v9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>

    <div class="perks">
        <div class="perk"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#2DAA66" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Unlimited messages — the 100-message cap is gone</div>
        <div class="perk"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#2DAA66" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>PDF, CSV, HTML and TXT export formats</div>
        <div class="perk"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#2DAA66" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Export photos, videos and audio</div>
        <div class="perk"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#2DAA66" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Contacts &amp; group-participant lists, bulk multi-chat export</div>
    </div>

    <footer>
        &copy; 2026 WhatsApp Chat Export &amp; Backup &middot;
        <a href="/waexportpro/privacy.html">Privacy</a> &middot;
        <a href="/waexportpro/terms.html">Terms</a>
    </footer>
</body>
</html>`;

export async function GET() {
  return new NextResponse(HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
