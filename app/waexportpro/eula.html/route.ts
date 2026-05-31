import { NextResponse } from "next/server";

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>End User License Agreement &mdash; WAExportPro</title>
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
        <h1>End User License Agreement</h1>
        <p class="updated">Last updated: March 12, 2026</p>

        <p>This End User License Agreement (&ldquo;EULA&rdquo;) is a legal agreement between you (&ldquo;User&rdquo;) and WAExportPro (&ldquo;Licensor&rdquo;) for the use of the WAExportPro Chrome browser extension (&ldquo;Software&rdquo;).</p>
        <p>By installing or using the Software, you agree to be bound by this EULA. If you do not agree, do not install or use the Software.</p>

        <h2>1. Grant of License</h2>
        <p>The Licensor grants you a limited, non-exclusive, non-transferable, revocable license to install and use the Software on Chrome-based browsers for personal or commercial purposes, subject to the terms of this EULA.</p>

        <h2>2. License Tiers</h2>
        <ul>
            <li><strong>Free License:</strong> Permits use of basic export features (text format, up to 100 messages per export) at no cost.</li>
            <li><strong>PRO License:</strong> A one-time purchase ($4.99) that unlocks all export formats, unlimited messages, contact/group export, and media downloads. Each PRO license key is valid for one user and may be used on multiple devices owned by the same user.</li>
        </ul>

        <h2>3. Restrictions</h2>
        <p>You may not:</p>
        <ul>
            <li>Copy, modify, distribute, sell, or sublicense the Software or any part of it</li>
            <li>Reverse-engineer, decompile, or disassemble the Software</li>
            <li>Share, publish, or transfer your PRO license key to another person</li>
            <li>Use the Software for any unlawful purpose or in violation of any applicable law</li>
            <li>Use the Software to violate the privacy or rights of any third party</li>
            <li>Remove or alter any proprietary notices or labels in the Software</li>
        </ul>

        <h2>4. Ownership</h2>
        <p>The Software is licensed, not sold. The Licensor retains all ownership, intellectual property rights, and title to the Software. This EULA does not grant you any ownership rights.</p>

        <h2>5. Privacy</h2>
        <p>Your use of the Software is also governed by our <a href="/waexportpro/privacy.html">Privacy Policy</a>. The Software processes all data locally in your browser. No chat data is transmitted to any external server.</p>

        <h2>6. Third-Party Services</h2>
        <p>The Software interacts with:</p>
        <ul>
            <li><strong>WhatsApp Web (web.whatsapp.com):</strong> To read chat data for export. The Software is not affiliated with or endorsed by Meta Platforms, Inc.</li>
            <li><strong>Lemon Squeezy (api.lemonsqueezy.com):</strong> To activate and validate PRO license keys for current purchases.</li>
            <li><strong>Gumroad (api.gumroad.com):</strong> To verify legacy PRO license keys purchased before the Lemon Squeezy migration.</li>
        </ul>

        <h2>7. Disclaimer of Warranties</h2>
        <p>THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. THE LICENSOR DOES NOT WARRANT THAT THE SOFTWARE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPATIBLE WITH ALL PLATFORMS OR VERSIONS OF WHATSAPP WEB.</p>

        <h2>8. Limitation of Liability</h2>
        <p>IN NO EVENT SHALL THE LICENSOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF PROFITS, OR BUSINESS INTERRUPTION, ARISING FROM YOUR USE OR INABILITY TO USE THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
        <p>THE LICENSOR&rsquo;S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE PRO LICENSE.</p>

        <h2>9. Refunds</h2>
        <p>PRO licenses include a 30-day money-back guarantee. Refund requests must be submitted within 30 days of purchase. Refunds are handled through the platform used for the order: Lemon Squeezy for current purchases and Gumroad for legacy purchases.</p>

        <h2>10. Termination</h2>
        <p>This EULA is effective until terminated. It terminates automatically if you fail to comply with any of its terms. Upon termination, you must uninstall the Software and destroy all copies. The Licensor may also revoke your license at its discretion.</p>

        <h2>11. Updates</h2>
        <p>The Licensor may release updates to the Software from time to time. Updates may modify, add, or remove features. Continued use of the Software after an update constitutes acceptance of any changes.</p>

        <h2>12. Governing Law</h2>
        <p>This EULA shall be governed by and construed in accordance with the laws of the State of Israel, without regard to conflicts of law principles. Any disputes shall be resolved in the courts of Tel Aviv, Israel.</p>

        <h2>13. Contact</h2>
        <p>For questions about this EULA, contact us at:</p>
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
