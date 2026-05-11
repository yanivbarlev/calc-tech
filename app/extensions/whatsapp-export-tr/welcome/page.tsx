"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle,
  Shield,
  MessageSquare,
  Download,
} from "lucide-react";

const GUMROAD_URL = "https://goldbaryaniv.gumroad.com/l/vzyczr";

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
    q: "WhatsApp Web sohbetleri nasıl yedeklenir?",
    a: "web.whatsapp.com adresini açın, araç çubuğundaki eklenti simgesine tıklayın, yedeklemek istediğiniz sohbetleri seçin, biçimi ve tarih aralığını belirleyin, ardından İndir'e tıklayın.",
  },
  {
    q: "WhatsApp mesajları CSV olarak nasıl indirilir?",
    a: "Eklenti simgesine tıklayın, sohbeti seçin, biçim olarak CSV'yi seçin ve İndir'e tıklayın. Dosya Excel ve Google E-Tablolar ile uyumlu olarak kaydedilir.",
  },
  {
    q: "Ücretsiz mi?",
    a: "Her sohbet için en fazla 100 mesaj ve sınırsız TXT dışa aktarma ücretsizdir. Sınırsız mesaj, HTML/CSV ve medya için PRO sürümü tek seferlik $4,99 ödeme ile kullanılabilir — abonelik yoktur.",
  },
  {
    q: "Telefonuma uygulama yüklemem gerekir mi?",
    a: "Hayır, eklenti yalnızca Chrome'da WhatsApp Web (web.whatsapp.com) ile çalışır. Telefonunuza herhangi bir uygulama yüklemenize gerek yoktur.",
  },
  {
    q: "Verilerim güvende mi?",
    a: "Tüm işlemler yerel olarak tarayıcınızda yapılır. Hiçbir mesaj, kişi veya kişisel veri dışarı gönderilmez. Sohbetleriniz yalnızca bilgisayarınızda kalır.",
  },
];

export default function WhatsAppExportTrWelcomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/*
          GOOGLE ADS CONVERSION PIXEL
          ============================
          IMPORTANT: Replace PLACEHOLDER_CONVERSION_ID and PLACEHOLDER_LABEL with your real
          Google Ads conversion tracking values before going live.

          How to find these values:
          1. Go to Google Ads → Tools → Conversions
          2. Select the conversion action for "Extension Install" (or create one)
          3. Click "Tag setup" → "Use Google Tag Manager" or "Install the tag yourself"
          4. The conversion ID is the number after "AW-" (e.g., AW-1006081641 → ID is 1006081641)
          5. The label is the string after the slash (e.g., "AbCdEfGhIjKlMnOp")

          Replace the src attribute below:
          https://www.googleadservices.com/pagead/conversion/YOUR_CONVERSION_ID/?label=YOUR_LABEL&guid=ON&script=0

          PLACEMENT NOTE: This img tag MUST remain as the first child of <body>.
          Placing it inside <head> breaks HTML parsing and kills all page styling.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://www.googleadservices.com/pagead/conversion/PLACEHOLDER_CONVERSION_ID/?label=PLACEHOLDER_LABEL&guid=ON&script=0"
        />

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
              <Link href="/extensions/whatsapp-export-tr">
                <span className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
                  ← Eklenti Sayfası
                </span>
              </Link>
            </div>
          </header>

          {/* Hero */}
          <section className="pt-14 pb-10 text-center bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-2xl mx-auto px-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3">
                Hoş geldiniz!
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                WhatsApp Sohbet Dışa Aktarma eklentisi başarıyla yüklendi.
              </p>
              <a
                href="https://web.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <ExternalLink className="w-5 h-5" />
                WhatsApp Web&apos;i Aç
              </a>
              <p className="text-sm text-slate-400 mt-3">
                web.whatsapp.com — Tarayıcınızdan asla çıkmaz
              </p>
            </div>
          </section>

          {/* Steps */}
          <section className="py-16">
            <div className="max-w-3xl mx-auto px-4">
              <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
                Nasıl Başlanır
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-14">
                3 adımda sohbetlerinizi dışa aktarın
              </h2>

              {/* Step 1 */}
              <div className="py-12 text-center border-b border-slate-100">
                <StepNumber n={1} />
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  WhatsApp Web&apos;i açın
                </h2>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Chrome&apos;da{" "}
                  <a
                    href="https://web.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline font-medium"
                  >
                    web.whatsapp.com
                  </a>{" "}
                  adresine gidin ve hesabınıza giriş yapın.
                </p>
                <a
                  href="https://web.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  web.whatsapp.com&apos;u Aç
                </a>
              </div>

              {/* Step 2 */}
              <div className="py-12 text-center border-b border-slate-100">
                <StepNumber n={2} />
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  Eklenti simgesini bulun
                </h2>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Chrome araç çubuğundaki bulmaca simgesine tıklayın ve{" "}
                  <strong>&quot;WhatsApp Sohbet Dışa Aktarma&quot;</strong> üzerine tıklayın.
                  Daha kolay erişim için raptiye simgesine basarak eklentiyi sabitleyebilirsiniz.
                </p>
                {/* Chrome puzzle-piece icon — canonical shared image */}
                <div className="inline-block rounded-xl overflow-hidden border border-slate-200 shadow-sm mx-auto">
                  <NextImage
                    src="/shared/chrome-puzzle-icon.png"
                    alt="Chrome araç çubuğundaki bulmaca (puzzle) simgesi — eklentilere erişmek için tıklayın"
                    width={400}
                    height={60}
                    className="block"
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div className="py-12 text-center">
                <StepNumber n={3} />
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  Sohbetinizi dışa aktarın
                </h2>
                <p className="text-slate-500 max-w-lg mx-auto">
                  Açılan panelden bir sohbet seçin, biçimi (TXT, HTML, CSV) ve tarih
                  aralığını belirleyin, ardından{" "}
                  <strong>&quot;İndir&quot;</strong>e tıklayın.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 max-w-xs mx-auto">
                  {["TXT", "HTML", "CSV"].map((fmt) => (
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

          {/* Features quick-list */}
          <section className="py-16 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4">
              <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
                Özellikler
              </p>
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
                Neler yapabilirsiniz?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Sohbetleri TXT, HTML veya CSV olarak dışa aktarın",
                  "Mesajları tarih aralığına göre filtreleyin",
                  "Birden fazla sohbeti tek seferde dışa aktarın",
                  "Kişileri ve grup katılımcılarını dışa aktarın",
                  "Fotoğraf, video ve ses dahil etme (PRO)",
                  "HTML dışa aktarımında koyu tema",
                  "Tüm işlemler yerel — hiçbir veri dışarı çıkmaz",
                  "Abonelik yok — tek seferlik PRO lisansı",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRO Upsell */}
          <section className="py-16 bg-white">
            <div className="max-w-2xl mx-auto px-4">
              <div className="border-2 border-green-500 rounded-2xl p-8 text-center bg-green-50">
                <div className="inline-flex p-3 bg-green-100 rounded-xl mb-4">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  PRO sürüme geçin
                </h2>
                <p className="text-slate-600 mb-6">
                  Sınırsız dışa aktarma, HTML/CSV ve medya için PRO&apos;ya geçin —
                  tek seferlik $4,99 ödeme.
                </p>
                <ul className="text-left space-y-2 mb-8 max-w-xs mx-auto">
                  {[
                    "Sınırsız mesaj dışa aktarma",
                    "HTML, CSV ve medya biçimleri",
                    "Kişi ve grup listesi dışa aktarma",
                    "Tek seferlik ödeme — abonelik yok",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {/* IMPORTANT: Replace GUMROAD_URL constant at the top of this file with the
                    real Gumroad product URL for whatsapp-export-tr after creating the product. */}
                <a
                  href={GUMROAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  PRO Lisans Satın Al — $4,99
                </a>
                <p className="text-xs text-slate-400 mt-3">Güvenli ödeme · Anında teslimat</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4">
              <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
                Sıkça Sorulan Sorular
              </p>
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
                Sık sorulan sorular
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
                Başlamaya hazır mısınız?
              </h2>
              <p className="text-slate-400 mb-8">
                WhatsApp Web&apos;i açın ve sohbetlerinizi dışa aktarmaya başlayın.
              </p>
              <a
                href="https://web.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <ExternalLink className="w-5 h-5" />
                WhatsApp Web&apos;i Aç
              </a>
              <p className="text-sm text-slate-500 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span>Ücretsiz başlayın</span>
                <span>&bull;</span>
                <span>Abonelik yok</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> %100 gizli
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
                  Gizlilik Politikası
                </Link>
                <Link href="/terms" className="hover:text-white">
                  Kullanım Koşulları
                </Link>
              </div>
              <p>&copy; {new Date().getFullYear()} Calc-Tech. Tüm hakları saklıdır.</p>
            </div>
          </footer>
      </div>
    </>
  );
}
