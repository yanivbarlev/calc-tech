"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

// TODO: replace with real CWS detail URL once published
const CWS_URL =
  "https://chromewebstore.google.com/search/Exportar%20Chat%20WhatsApp";

const REASONS = [
  "No exportaba mis chats correctamente",
  "Era difícil de usar",
  "Encontré una mejor extensión",
  "El plan gratuito era demasiado limitado",
  "Solo probaba — volveré a instalar",
  "Otra razón",
];

export default function WhatsAppExportEsUninstallPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [other, setOther] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to a feedback endpoint when one is available.
    // Pattern used by other calc-tech extensions:
    //   POST /api/feedback with { extension: "whatsapp-export-es", reason: selected, comment: other }
    // For now, show the thank-you state immediately (client-only).
    setSubmitted(true);
  }

  return (
    <div
      style={{
        fontFamily:
          "'Outfit', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
        background: "#ffffff",
        color: "#111",
        minHeight: "100vh",
        padding: "0 24px 80px",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { max-width: 960px; margin: 0 auto; }
        header { padding: 28px 0 24px; border-bottom: 1px solid #efefef; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 9px; font-size: 15px; font-weight: 700; color: #111; letter-spacing: -.3px; text-decoration: none; }
        .logo-dot { width: 28px; height: 28px; background: #25d366; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .section-label { font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #bbb; margin-bottom: 16px; }
        .radio-option { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 8px; cursor: pointer; transition: background .12s; margin-bottom: 4px; }
        .radio-option:hover { background: #fafafa; }
        .radio-option input[type=radio] { display: none; }
        .radio-circle { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #e0e0e0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: border-color .15s; }
        .radio-circle.checked { border-color: #25d366; }
        .radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #25d366; }
        .radio-label { font-size: 14px; color: #222; cursor: pointer; }
        textarea { width: 100%; border: 1px solid #e8e8e8; border-radius: 8px; padding: 12px 14px; font-family: inherit; font-size: 13.5px; color: #333; resize: vertical; outline: none; transition: border-color .15s; background: #fff; }
        textarea:focus { border-color: #25d366; }
        .submit-btn { background: #25d366; color: #fff; border: none; border-radius: 8px; padding: 11px 26px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .15s; }
        .submit-btn:hover { background: #1daa54; }
        .reinstall-btn { display: inline-flex; align-items: center; gap: 9px; background: #25d366; color: #fff; border-radius: 9px; padding: 13px 26px; font-family: inherit; font-size: 14px; font-weight: 700; text-decoration: none; transition: background .15s, transform .12s; }
        .reinstall-btn:hover { background: #1daa54; transform: translateY(-1px); }
        .reinstall-btn-outline { display: inline-flex; align-items: center; gap: 9px; color: #25d366; border: 2px solid #25d366; border-radius: 9px; padding: 11px 22px; font-family: inherit; font-size: 13.5px; font-weight: 600; text-decoration: none; transition: background .15s, color .15s; margin-top: 10px; }
        .reinstall-btn-outline:hover { background: #25d366; color: #fff; }
        .thank-you { background: #e6faf0; border: 1px solid #a7f0c4; border-radius: 10px; padding: 20px 22px; }
        footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid #efefef; display: flex; gap: 20px; }
        footer a { font-size: 11px; color: #999; text-decoration: none; }
        footer a:hover { color: #25d366; }
        @media (max-width: 680px) {
          .survey-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="page">
        {/* Header */}
        <header>
          <Link href="/" className="logo">
            <div className="logo-dot">
              <MessageSquare style={{ width: 14, height: 14, color: "#fff" }} />
            </div>
            Exportar Chat WhatsApp
          </Link>
        </header>

        {/* Reinstall CTA — prominente, por encima del survey */}
        <section style={{ padding: "48px 0 0" }}>
          <div
            style={{
              background: "#fafafa",
              border: "1px solid #efefef",
              borderRadius: 12,
              padding: "32px 28px",
              maxWidth: 580,
            }}
          >
            <div className="section-label">¿Cambiaste de opinión?</div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#111",
                letterSpacing: "-.4px",
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              ¿Volver a instalar Exportar Chat WhatsApp?
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#555",
                lineHeight: 1.7,
                marginBottom: 22,
                maxWidth: 440,
              }}
            >
              Solo tarda 10 segundos. No necesitas cuenta. Si algo no funcionó
              como esperabas, cuéntanos abajo — puede que tengamos una solución.
            </p>
            <a
              href={CWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reinstall-btn"
            >
              <MessageSquare style={{ width: 15, height: 15 }} />
              Reinstalar la extensión
            </a>
            <p style={{ marginTop: 10, fontSize: 12, color: "#aaa" }}>
              Gratis · Sin cuenta requerida
            </p>
          </div>
        </section>

        {/* Survey + info lateral */}
        <div
          className="survey-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,380px)",
            gap: 56,
            marginTop: 48,
            alignItems: "start",
          }}
        >
          {/* Izquierda: encuesta */}
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-.5px",
                lineHeight: 1.2,
                color: "#111",
                marginBottom: 10,
              }}
            >
              ¿Por qué desinstalaste?
            </h1>
            <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.6, marginBottom: 28 }}>
              ¿Tienes 30 segundos para contarnos? Tu opinión nos ayuda a mejorar.
            </p>

            <div className="section-label">Motivo de desinstalación</div>

            {submitted ? (
              <div className="thank-you">
                <p style={{ fontWeight: 600, fontSize: 14.5, color: "#1a7a42", marginBottom: 6 }}>
                  ¡Gracias por tu opinión!
                </p>
                <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.6, marginBottom: 16 }}>
                  Leemos cada respuesta. Si cambias de opinión, puedes reinstalar
                  la extensión en cualquier momento — es gratis.
                </p>
                <a
                  href={CWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reinstall-btn-outline"
                  style={{ marginTop: 0 }}
                >
                  <MessageSquare style={{ width: 14, height: 14 }} />
                  Reinstalar la extensión
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  {REASONS.map((reason) => (
                    <label
                      key={reason}
                      className="radio-option"
                      onClick={() => setSelected(reason)}
                    >
                      <input type="radio" name="reason" value={reason} />
                      <div
                        className={`radio-circle${selected === reason ? " checked" : ""}`}
                      >
                        {selected === reason && <div className="radio-dot" />}
                      </div>
                      <span className="radio-label">{reason}</span>
                    </label>
                  ))}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#999",
                      marginBottom: 6,
                    }}
                  >
                    Cuéntanos más (opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tu comentario nos ayuda a mejorar la extensión..."
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Enviar
                </button>
              </form>
            )}
          </div>

          {/* Derecha: qué puede hacer la extensión + reinstall secundario */}
          <div style={{ paddingTop: 8 }}>
            <div className="section-label">Qué puedes hacer con ella</div>
            <p
              style={{
                fontSize: 14,
                color: "#555",
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              Exportar Chat WhatsApp es la forma más fácil de guardar tus
              conversaciones de WhatsApp Web directamente desde Chrome, sin
              necesidad de instalar nada en tu teléfono.
            </p>
            <ul
              style={{
                listStyle: "none",
                marginBottom: 24,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                "Exporta chats en formato TXT, HTML y CSV",
                "Filtra mensajes por rango de fechas",
                "Exporta múltiples chats a la vez",
                "Incluye fotos, videos y audios (PRO)",
                "Todo se procesa localmente — sin servidores",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 9,
                    fontSize: 13.5,
                    color: "#444",
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      flexShrink: 0,
                      color: "#25d366",
                      fontWeight: 700,
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={CWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reinstall-btn-outline"
            >
              <MessageSquare style={{ width: 14, height: 14 }} />
              Reinstalar la extensión
            </a>
            <p style={{ marginTop: 10, fontSize: 12, color: "#aaa" }}>
              Gratis. Sin cuenta requerida.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <Link href="/">calc-tech.com</Link>
          <Link href="/privacy">Privacidad</Link>
          <Link href="/terms">Términos</Link>
        </footer>
      </div>
    </div>
  );
}
