import { NextResponse } from "next/server";

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms of Service &mdash; WAExportPro</title>
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
        <h1>Terms of Service</h1>
        <p class="updated">Last updated: March 12, 2026</p>

        <p>By installing or using WAExportPro (&ldquo;the extension&rdquo;), you agree to the following terms. If you do not agree, please uninstall the extension.</p>

        <h2>1. Description of Service</h2>
        <p>WAExportPro is a Chrome browser extension that allows you to export chat history, contacts, and group participant lists from WhatsApp Web (web.whatsapp.com) into downloadable files in HTML, CSV, or plain text format.</p>

        <h2>2. Free and PRO Tiers</h2>
        <p>The extension is available in two tiers:</p>
        <ul>
            <li><strong>Free:</strong> Text-only export, limited to 100 messages per export.</li>
            <li><strong>PRO ($4.99 one-time payment):</strong> All export formats, unlimited messages, contact/group export, and media download. New PRO licenses are sold through Lemon Squeezy and existing Gumroad purchases remain valid for legacy customers.</li>
        </ul>

        <h2>3. License</h2>
        <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the extension for personal or business purposes in accordance with these terms. You may not reverse-engineer, decompile, modify, or redistribute the extension or any part of it.</p>

        <h2>4. Acceptable Use</h2>
        <p>You agree to use the extension only for lawful purposes. You are responsible for ensuring that your export of WhatsApp data complies with applicable laws, WhatsApp&rsquo;s terms of service, and the privacy rights of the people in your conversations. We are not responsible for how you use exported data.</p>

        <h2>5. Intellectual Property</h2>
        <p>All code, design, and branding of WAExportPro are owned by us. &ldquo;WhatsApp&rdquo; is a trademark of Meta Platforms, Inc. WAExportPro is not affiliated with, endorsed by, or sponsored by Meta or WhatsApp.</p>

        <h2>6. Disclaimer of Warranties</h2>
        <p>The extension is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not guarantee that the extension will work uninterrupted, error-free, or be compatible with all versions of WhatsApp Web. WhatsApp may change their platform at any time, which could affect extension functionality.</p>

        <h2>7. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the extension, including but not limited to data loss, loss of business, or inability to export data.</p>

        <h2>8. Refund Policy</h2>
        <p>PRO licenses come with a 30-day money-back guarantee. If you are unsatisfied with the PRO version, contact us within 30 days of purchase for a full refund. Refunds are handled through the payment platform used for the order, which is Lemon Squeezy for new purchases and Gumroad for legacy purchases.</p>

        <h2>9. Termination</h2>
        <p>We reserve the right to revoke access to the extension or PRO features at any time if you violate these terms. You may stop using the extension at any time by uninstalling it.</p>

        <h2>10. Changes to Terms</h2>
        <p>We may update these terms from time to time. Changes will be reflected on this page. Continued use of the extension constitutes acceptance of updated terms.</p>

        <h2>11. Governing Law</h2>
        <p>These terms are governed by the laws of the State of Israel. Any disputes will be resolved in the courts of Tel Aviv, Israel.</p>

        <h2>12. Contact</h2>
        <p>For questions about these terms, contact us at:</p>
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
