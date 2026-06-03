import { NextResponse } from "next/server";

// Post-install page for the BRAZILIAN / Portuguese variant "Exportar Conversas do WhatsApp".
// The extension's service worker opens this URL in a BACKGROUND tab on install
// (WhatsApp Web opens in the foreground). Its job is to fire the Google Ads install
// conversion that the bundled chrome-extension:// welcome page cannot — MV3 CSP blocks
// gtag.js on extension pages, so the conversion must live on a real origin.
//
// Google Ads conversion action: "new_whatsapp_extension_michael" (shared account for now).
//   account/label: AW-1006081641 / TWjeCLuClsIbEOms3t8D
//   NOTE: if the BR product gets its own Google Ads account/conversion, swap the
//   send_to label below — that's the only change needed.
const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tudo pronto — Exportar Conversas do WhatsApp</title>

    <!-- Google tag (gtag.js) — Google Ads -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1006081641"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-1006081641');
    </script>
    <!-- Event snippet for new_whatsapp_extension_michael conversion page -->
    <script>
      gtag('event', 'conversion', {
          'send_to': 'AW-1006081641/TWjeCLuClsIbEOms3t8D',
          'value': 1.0,
          'currency': 'USD'
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
            width: 88px; height: 88px;
            border-radius: 24px;
            background: #111b21;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 28px;
            box-shadow: 0 12px 32px rgba(37,211,102,0.25);
        }
        .badge svg { width: 48px; height: 48px; }
        .check {
            display: inline-flex; align-items: center; gap: 8px;
            background: #dcfce7; color: #15803d;
            font-weight: 700; font-size: 14px;
            padding: 6px 14px; border-radius: 999px;
            margin-bottom: 18px;
        }
        h1 { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 12px; }
        p.sub { font-size: 17px; color: #54656f; max-width: 460px; margin-bottom: 32px; }
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
        .steps {
            margin-top: 44px; display: grid; gap: 14px;
            max-width: 420px; width: 100%; text-align: left;
        }
        .step {
            display: flex; align-items: flex-start; gap: 12px;
            background: #fff; border: 1px solid #e9edef;
            border-radius: 14px; padding: 14px 16px;
        }
        .step .n {
            flex: 0 0 26px; height: 26px;
            background: #e7f7ee; color: #2DAA66;
            border-radius: 50%; font-weight: 800; font-size: 13px;
            display: flex; align-items: center; justify-content: center;
        }
        .step .txt { font-size: 14px; color: #3b4a54; }
        .step .txt strong { color: #111b21; }
        footer { margin-top: 40px; font-size: 12px; color: #8696a0; }
        footer a { color: #8696a0; }
    </style>
</head>
<body>
    <div class="badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.79.47 3.47 1.29 4.93L2 22l5.18-1.27A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z" fill="#25d366"/>
            <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#111b21" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>

    <span class="check">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#15803d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Instalado
    </span>

    <h1>Tudo pronto!</h1>
    <p class="sub">O Exportar Conversas do WhatsApp está pronto. Abra o WhatsApp Web e clique na extensão para exportar qualquer conversa em PDF, CSV ou TXT.</p>

    <a class="cta" href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer">
        Abrir o WhatsApp Web
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7v9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>

    <div class="steps">
        <div class="step"><span class="n">1</span><span class="txt">Abra <strong>web.whatsapp.com</strong> no Chrome e faça login.</span></div>
        <div class="step"><span class="n">2</span><span class="txt">Clique no <strong>ícone de quebra-cabeça</strong> na barra de ferramentas e fixe a extensão.</span></div>
        <div class="step"><span class="n">3</span><span class="txt">Escolha uma conversa, o formato e o intervalo de datas e clique em <strong>Baixar</strong>.</span></div>
    </div>

    <footer>
        &copy; 2026 Exportar Conversas do WhatsApp &middot;
        <a href="/waexportpro/privacy.html">Privacidade</a> &middot;
        <a href="/waexportpro/terms.html">Termos</a>
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
