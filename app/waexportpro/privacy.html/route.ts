import { NextResponse } from "next/server";

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy — WAExportPro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Figtree', sans-serif;
            background: #fafaf8;
            color: #111;
            line-height: 1.7;
            -webkit-font-smoothing: antialiased;
        }
        a { color: #25d366; text-decoration: none; }
        a:hover { text-decoration: underline; }
        nav {
            position: sticky; top: 0; z-index: 100;
            background: rgba(250,250,248,0.85);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid #e4e4e0;
        }
        .nav-inner {
            max-width: 960px; margin: 0 auto; padding: 16px 24px;
            display: flex; align-items: center; justify-content: space-between;
        }
        .logo { font-weight: 800; font-size: 18px; color: #111; text-decoration: none; }
        .container { max-width: 720px; margin: 0 auto; padding: 60px 24px 80px; }
        h1 { font-size: 32px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em; }
        .updated { font-size: 14px; color: #999; margin-bottom: 40px; }
        h2 { font-size: 20px; font-weight: 700; margin-top: 36px; margin-bottom: 12px; }
        p, li { font-size: 15px; color: #444; margin-bottom: 12px; }
        ul { padding-left: 24px; margin-bottom: 16px; }
        li { margin-bottom: 6px; }
        footer {
            border-top: 1px solid #e4e4e0;
            padding: 24px 0;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
        .footer-links { list-style: none; display: flex; justify-content: center; gap: 20px; margin-top: 8px; }
        .footer-links a { color: #999; }
    </style>
</head>
<body>
    <nav>
        <div class="nav-inner">
            <a href="/waexportpro" class="logo">WAExportPro</a>
            <a href="/waexportpro" style="font-size:14px;font-weight:600;color:#444;">Back to home</a>
        </div>
    </nav>

    <div class="container">
        <h1>Privacy Policy</h1>
        <p class="updated">Last updated: March 12, 2026</p>

        <p>WAExportPro (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;the extension&rdquo;) is a Chrome browser extension that exports WhatsApp Web chat history, contacts, and group participant lists. We are committed to protecting your privacy. This policy explains what data we access, how we use it, and what we do not do.</p>

        <h2>1. Data We Access</h2>
        <p>The extension accesses the following data solely to provide its core export functionality:</p>
        <ul>
            <li><strong>WhatsApp Web content:</strong> Chat messages, contact names, phone numbers, group participant lists, and media files displayed on web.whatsapp.com. This data is read directly from the page in your browser.</li>
            <li><strong>Local preferences:</strong> Your export settings (format, date range, CSV columns, dark mode preference) and license key status, stored via Chrome&rsquo;s local storage API.</li>
            <li><strong>Install attribution identifier:</strong> If you reach our landing page (downloads.services or calc-tech.com) from a Google Ads link, that page passes a Google click identifier (GCLID) to the extension so we can attribute the install. It is stored locally via Chrome&rsquo;s storage API and contains only the click identifier &mdash; no personal information.</li>
        </ul>

        <h2>2. Data Processing</h2>
        <p>All chat data processing happens <strong>entirely within your browser</strong>. Messages, contacts, and media are read from the WhatsApp Web page, formatted into your chosen export format (HTML, CSV, or text), and saved directly to your device as a downloaded file.</p>
        <p><strong>Your WhatsApp data is never uploaded to, transmitted to, or stored on any external server.</strong></p>

        <h2>3. Data We Send</h2>
        <p>The extension makes the following limited network requests:</p>
        <ul>
            <li><strong>License verification:</strong> When you activate or validate a PRO license key, the key is sent to Lemon Squeezy&rsquo;s license API (<code>api.lemonsqueezy.com</code>) for current purchases, or Gumroad&rsquo;s API (<code>api.gumroad.com</code>) for legacy purchases made before the migration. Only the license key string, instance details, and product identifier are sent &mdash; no chat data, no personal information.</li>
            <li><strong>Install/purchase attribution:</strong> Anonymous conversion pixels may be sent to Google Ads to measure advertising effectiveness. These contain no personal data or chat content &mdash; only a click identifier and conversion event type.</li>
        </ul>

        <h2>4. Data We Do NOT Collect</h2>
        <ul>
            <li>We do not collect, store, or transmit your WhatsApp messages or chat content</li>
            <li>We do not collect your contacts, phone numbers, or personal information</li>
            <li>We do not collect browsing history or activity outside of web.whatsapp.com</li>
            <li>We do not use analytics or tracking SDKs within the extension</li>
            <li>We do not sell, share, or transfer any data to third parties</li>
            <li>We do not use any data for advertising, profiling, or creditworthiness assessments</li>
        </ul>

        <h2>5. Permissions Explained</h2>
        <ul>
            <li><strong>storage:</strong> Saves your export preferences and license key status locally on your device.</li>
            <li><strong>sidePanel:</strong> Allows the extension to open as a side panel alongside WhatsApp Web.</li>
            <li><strong>Host permission (web.whatsapp.com):</strong> Lets the content script read the chat you choose to export and inject the export buttons. Data is processed only in your browser and never sent to a server.</li>
            <li><strong>externally_connectable (downloads.services, calc-tech.com):</strong> Lets our own landing and thank-you pages pass the Google Ads click identifier (GCLID) to the extension for install attribution. No other sites can connect, and no chat data is exchanged.</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>Exported files are saved directly to your device and are not retained by us. Local preferences and the install attribution identifier stored via Chrome&rsquo;s storage API persist until you uninstall the extension or clear extension data.</p>

        <h2>7. Children&rsquo;s Privacy</h2>
        <p>WAExportPro is not directed at children under 13. We do not knowingly collect any personal information from children.</p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the extension after changes constitutes acceptance of the revised policy.</p>

        <h2>9. Contact</h2>
        <p>If you have questions about this privacy policy or your data, please contact us at:</p>
        <p><a href="mailto:support@downloads.services">support@downloads.services</a></p>
    </div>

    <footer>
        <span>&copy; 2026 WAExportPro</span>
        <ul class="footer-links">
            <li><a href="/waexportpro/privacy.html">Privacy</a></li>
            <li><a href="/waexportpro/terms.html">Terms</a></li>
            <li><a href="/waexportpro/eula.html">EULA</a></li>
        </ul>
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
