"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import NextImage from "next/image";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle,
  Shield,
  Sparkles,
  Copy,
} from "lucide-react";

// TODO: replace with real ES Google Ads conversion ID before launch
const GADS_ID = "AW-TODO_ES_CONVERSION_ID";
const PURCHASE_CONVERSION_LABEL = "TODO_ES_PURCHASE_LABEL";

// Gumroad checkout URL for the ES variant
const GUMROAD_URL = "https://goldbaryaniv.gumroad.com/l/xgatba";

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between p-5">
        <span className="font-semibold text-slate-800 text-left pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
        )}
      </div>
      {isOpen && (
        <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <div className="w-16 h-16 rounded-full border-[3px] border-green-500 flex items-center justify-center mx-auto mb-6">
      <span className="text-2xl font-bold text-green-600">{n}</span>
    </div>
  );
}

const FAQS = [
  {
    q: "¿Dónde encuentro mi clave de licencia?",
    a: "Gumroad envía tu clave de licencia al correo electrónico que usaste al comprar. Busca un correo con el asunto \"Tu compra de Yaniv Goldbar\". Si no lo ves en la bandeja de entrada, revisa la carpeta de spam. También puedes encontrarla en tu biblioteca de Gumroad.",
  },
  {
    q: "¿Cómo activo mi licencia en la extensión?",
    a: "Abre WhatsApp Web (web.whatsapp.com) en Chrome, haz clic en el icono de la extensión para abrir el panel lateral, luego haz clic en el botón \"Pasa a PRO\" o \"Ingresar licencia\". Pega tu clave y haz clic en \"Activar\". Las funciones PRO se desbloquean de inmediato.",
  },
  {
    q: "¿Qué pasa si la clave no funciona?",
    a: "Asegúrate de copiar la clave completa sin espacios adicionales al inicio o al final. Si el problema persiste, responde al correo de Gumroad o contáctanos y lo resolvemos de inmediato.",
  },
  {
    q: "¿Es una suscripción o un pago único?",
    a: "Es un pago único de $7,99. Sin suscripción, sin renovaciones automáticas, sin cargos adicionales. Una vez que activas tu licencia, las funciones PRO son tuyas para siempre.",
  },
  {
    q: "¿Las actualizaciones futuras están incluidas?",
    a: "Sí. Tu licencia PRO incluye todas las actualizaciones futuras de la extensión sin costo adicional. Si agregamos nuevas funciones PRO, las recibirás automáticamente.",
  },
];

function ThankYouContent() {
  const params = useSearchParams();
  const licenseKey = params.get("license_key") || "";
  const orderId = params.get("order_id") || "";
  const customerEmail = params.get("customer_email") || "";

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (!licenseKey) return;
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      // ignorar
    }
  };

  return (
    <>
      {/* Google Ads conversion — only fires when a real conversion ID is configured */}
      {GADS_ID !== "AW-TODO_ES_CONVERSION_ID" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gads-init-es" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GADS_ID}');
              gtag('event', 'conversion', {
                'send_to': '${GADS_ID}/${PURCHASE_CONVERSION_LABEL}',
                'value': 7.99,
                'currency': 'USD',
                'transaction_id': '${orderId.replace(/'/g, "")}'
              });
            `}
          </Script>
        </>
      )}

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Calc-Tech
              </span>
            </Link>
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              Exportar Chat WhatsApp
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-14 pb-10 text-center bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Tu licencia PRO de Exportar Chat WhatsApp está lista. Todas las
              funciones PRO están desbloqueadas de por vida.
            </p>
          </div>
        </section>

        {/* License key card */}
        <section className="pb-4">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white border-2 border-green-500 rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold tracking-wide uppercase text-slate-400 mb-3">
                Tu clave de licencia
              </p>
              {licenseKey ? (
                <div className="flex items-center gap-3">
                  <code className="flex-1 break-all bg-slate-100 text-slate-900 font-mono text-sm md:text-base px-3 py-3 rounded-lg">
                    {licenseKey}
                  </code>
                  <button
                    onClick={onCopy}
                    className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copiado" : "Copiar"}
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-slate-700">
                  <strong>Revisa tu correo electrónico</strong> — Gumroad acaba
                  de enviar tu clave de licencia a{" "}
                  <strong>
                    {customerEmail || "la dirección que usaste al comprar"}
                  </strong>
                  . Busca un correo con el asunto{" "}
                  <em>&quot;Tu compra de Yaniv Goldbar&quot;</em>. Si no lo ves,
                  revisa la carpeta de spam. Puede tardar 1–2 minutos.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Activation steps */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              Activa en 3 pasos
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-14">
              Desbloquea exportaciones ilimitadas en menos de un minuto
            </h2>

            {/* Paso 1 */}
            <div className="py-12 text-center border-b border-slate-100">
              <StepNumber n={1} />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Revisa tu correo
              </h2>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Gumroad te envió la clave de licencia al correo que usaste al
                comprar. Puede tardar 1–2 minutos en llegar. Si no lo ves en la
                bandeja de entrada, revisa la carpeta de spam.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="py-12 text-center border-b border-slate-100">
              <StepNumber n={2} />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Copia tu clave de licencia
              </h2>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Abre el correo de Gumroad y copia la clave de licencia. También
                puedes encontrarla arriba en esta página si aparece en la URL.
              </p>
              <div className="inline-block rounded-xl overflow-hidden border border-slate-200 shadow-sm mx-auto">
                <NextImage
                  src="/shared/chrome-puzzle-icon.png"
                  alt="Icono de pieza de rompecabezas en la barra de Chrome — haz clic para acceder a las extensiones"
                  width={400}
                  height={60}
                  className="block"
                />
              </div>
            </div>

            {/* Paso 3 */}
            <div className="py-12 text-center">
              <StepNumber n={3} />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Pégala en la extensión
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Abre{" "}
                <a
                  href="https://web.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline font-medium"
                >
                  web.whatsapp.com
                </a>{" "}
                en Chrome, haz clic en el icono de la extensión para abrir el
                panel lateral, luego haz clic en{" "}
                <strong>&quot;Pasa a PRO&quot;</strong> o en el campo de
                licencia. Pega tu clave y haz clic en{" "}
                <strong>Activar</strong>. Las funciones PRO se desbloquean al
                instante.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {["HTML", "CSV", "Media"].map((fmt) => (
                  <div
                    key={fmt}
                    className="bg-green-50 border border-green-200 rounded-lg py-2 px-3 text-center"
                  >
                    <span className="font-bold text-green-700 text-sm">{fmt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What you unlocked */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              Lo que desbloqueaste
            </p>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              Todas las funciones PRO, para siempre
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Exportaciones ilimitadas — sin límite de 100 mensajes",
                "Formatos HTML, CSV y TXT",
                "Exporta fotos, videos y archivos de audio",
                "Exporta contactos y participantes de grupos",
                "Tema oscuro para exportaciones HTML",
                "Exportación masiva de múltiples chats a la vez",
                "Todas las funciones PRO futuras incluidas",
                "Activa en hasta 3 de tus propios equipos",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-slate-700 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              Preguntas frecuentes
            </p>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              Resolvemos tus dudas
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-slate-900 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para exportar?
            </h2>
            <p className="text-slate-400 mb-8">
              Abre WhatsApp Web, activa tu clave y empieza a exportar sin
              límites.
            </p>
            <a
              href="https://web.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5" />
              Abrir WhatsApp Web
            </a>
            <p className="text-sm text-slate-500 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>Licencia de por vida</span>
              <span>&bull;</span>
              <span>Sin suscripción</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> 100% privado
              </span>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-8">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <Link href="/" className="text-slate-300 hover:text-white font-medium">
              Calc-Tech.com
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white">
                Política de privacidad
              </Link>
              <Link href="/terms" className="hover:text-white">
                Términos de uso
              </Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Calc-Tech. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function WhatsAppExportEsThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <p className="text-slate-500">Cargando…</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
