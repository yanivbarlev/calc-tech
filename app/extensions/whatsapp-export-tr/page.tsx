"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  ChevronDown,
  ChevronUp,
  Calculator,
  CheckCircle,
  FileText,
  Download,
  Calendar,
  Users,
  Lock,
  MessageSquare,
  FileSpreadsheet,
} from "lucide-react";

// IMPORTANT: Replace TR_PLACEHOLDER_ID with the real Chrome Web Store extension ID
// after the extension is submitted and approved.
// Example: https://chromewebstore.google.com/detail/whatsapp-sohbet-disa-akta/REAL_EXTENSION_ID
const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/TR_PLACEHOLDER_ID";

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeWidth="0" />
      </svg>
      Chrome&apos;a Ekle - Ücretsiz
    </a>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string | React.ReactNode;
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

const FEATURES = [
  {
    icon: FileText,
    title: "WhatsApp Sohbetlerini Dışa Aktar",
    color: "text-green-600",
    bg: "bg-green-50",
    bullets: [
      "WhatsApp sohbetlerini metin dosyası (.txt) olarak kaydedin",
      "WhatsApp mesajlarını biçimlendirme, emoji ve medya ile birlikte HTML olarak dışa aktarın",
      "WhatsApp sohbetlerini Excel ve Google E-Tablolar için CSV olarak indirin",
      "Birden fazla sohbeti tek seferde veya tek tek seçerek dışa aktarın",
      "Mesajları özel tarih aralığına göre filtreleyin",
      "Fotoğraf, video ve ses dosyalarını da dışa aktarmaya dahil edin",
      "HTML dışa aktarımında koyu tema seçeneği",
    ],
  },
  {
    icon: Users,
    title: "WhatsApp Kişilerini Dışa Aktar",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    bullets: [
      "WhatsApp kayıtlı kişi listenizi indirin",
      "Tüm grupların katılımcılarını dışa aktarın",
      "Kayıtlı ve kayıtlı olmayan tüm kişileri dışa aktarın",
      "Kişileri elektronik tablolara aktarmak için CSV olarak kaydedin",
    ],
  },
  {
    icon: Shield,
    title: "Gizlilik ve Güvenlik",
    color: "text-teal-600",
    bg: "bg-teal-50",
    bullets: [
      "Tüm işlemler tarayıcınızda yerel olarak yapılır",
      "Hiçbir mesaj, kişi veya kişisel veri dış sunuculara gönderilmez",
      "Sohbetleriniz bilgisayarınızdan asla çıkmaz",
      "%100 güvenli ve gizli",
    ],
  },
  {
    icon: Calendar,
    title: "Esnek Dışa Aktarma Seçenekleri",
    color: "text-blue-600",
    bg: "bg-blue-50",
    bullets: [
      "Özel tarih aralığı seçimi ile belirli dönemleri dışa aktarın",
      "TXT, HTML ve CSV formatları arasında seçim yapın",
      "Tek sohbet veya toplu dışa aktarma",
      "Medya dahil etme seçeneği (fotoğraf, video, ses)",
    ],
  },
];

const FAQS = [
  {
    q: "WhatsApp Web sohbetleri nasıl yedeklenir?",
    a: "Çok kolay: Chrome'a eklentiyi yükleyin, web.whatsapp.com adresini açın, araç çubuğundaki eklenti simgesine tıklayın, yedeklemek istediğiniz sohbetleri seçin, biçimi (TXT, HTML veya CSV) ve tarih aralığını belirleyin, ardından İndir düğmesine tıklayın. Dosya doğrudan bilgisayarınıza kaydedilir.",
  },
  {
    q: "WhatsApp mesajları CSV olarak nasıl indirilir?",
    a: "Eklentiyi Chrome'a yükleyin, WhatsApp Web'i açın, eklenti simgesine tıklayın, indirmek istediğiniz sohbeti seçin, biçim olarak CSV'yi seçin ve İndir'e tıklayın. CSV dosyası Excel ve Google E-Tablolar ile uyumludur.",
  },
  {
    q: "Ücretsiz mi?",
    a: "Evet, temel özellikler tamamen ücretsizdir. Ücretsiz planda her sohbet için en fazla 100 mesaj ve sınırsız TXT dışa aktarma alırsınız. Sınırsız mesaj, HTML (emoji ve medya dahil), CSV, kişiler ve grup katılımcıları için PRO sürümü tek seferlik $4,99 ödeme ile kullanılabilir — abonelik yoktur.",
  },
  {
    q: "Telefonuma uygulama yüklemem gerekir mi?",
    a: "Hayır, eklenti yalnızca Chrome'da WhatsApp Web (web.whatsapp.com) ile çalışır. Telefonunuza herhangi bir uygulama yüklemenize gerek yoktur.",
  },
  {
    q: "Verilerim güvende mi?",
    a: "Tüm işlemler yerel olarak tarayıcınızda yapılır. Hiçbir mesaj, kişi veya kişisel veri dışarı gönderilmez. Sohbetleriniz yalnızca bilgisayarınızda kalır — sunucularımıza hiçbir şey iletilmez.",
  },
];

export default function WhatsAppExportTrPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
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
              <CtaButton className="!px-5 !py-2 !text-sm !rounded-lg" />
            </div>
          </header>

          {/* Hero */}
          <section className="pt-20 pb-16 bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 mb-4">
                Chrome Eklentisi — Ücretsiz
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                WhatsApp Sohbet Dışa Aktarma ve Yedekleme
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                WhatsApp Web sohbetlerinizi ve mesaj geçmişinizi tek tıkla TXT, HTML veya CSV
                olarak dışa aktarın, indirin ve yedekleyin. Ücretsiz Chrome eklentisi.
              </p>
              <CtaButton />
              <p className="text-sm text-slate-400 mt-4">
                Tarayıcınızdan asla çıkmaz — %100 yerel ve güvenli
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
                Nasıl Çalışır
              </p>
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-14">
                WhatsApp Web Sohbetleri Nasıl İndirilir?
              </h2>
              <div className="grid md:grid-cols-5 gap-4 items-start">
                {[
                  {
                    n: 1,
                    title: "Chrome'da WhatsApp Web'i açın",
                    desc: "web.whatsapp.com adresine gidin ve hesabınıza giriş yapın.",
                  },
                  {
                    n: 2,
                    title: "Eklenti simgesine tıklayın",
                    desc: "Tarayıcı çubuğundaki WhatsApp Sohbet Dışa Aktarma simgesine tıklayın.",
                  },
                  {
                    n: 3,
                    title: "Sohbetleri seçin",
                    desc: "Dışa aktarmak istediğiniz sohbetleri veya kişileri seçin.",
                  },
                  {
                    n: 4,
                    title: "Biçim ve tarih belirleyin",
                    desc: "TXT, HTML veya CSV biçimini ve tarih aralığını seçin.",
                  },
                  {
                    n: 5,
                    title: "İndir'e tıklayın",
                    desc: "Dosya doğrudan bilgisayarınıza kaydedilir.",
                  },
                ].map((step) => (
                  <div key={step.n} className="text-center">
                    <div className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-green-600">{step.n}</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{step.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-20 bg-slate-50">
            <div className="max-w-5xl mx-auto px-4">
              <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
                Özellikler
              </p>
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-14">
                Güçlü Dışa Aktarma Özellikleri
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {FEATURES.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
                    >
                      <div className={`inline-flex p-3 rounded-lg ${feature.bg} mb-4`}>
                        <Icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">
                        {feature.title}
                      </h3>
                      <ul className="space-y-2">
                        {feature.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-2 text-slate-600 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
                Fiyatlandırma
              </p>
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-14">
                Basit ve Şeffaf Fiyatlandırma
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Free */}
                <div className="border border-slate-200 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Ücretsiz Plan</h3>
                  <p className="text-slate-500 text-sm mb-6">Hemen başlayın, kredi kartı gerekmez</p>
                  <p className="text-4xl font-bold text-slate-900 mb-8">
                    $0 <span className="text-base font-normal text-slate-400">/ sonsuza</span>
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Her sohbet için en fazla 100 mesaj",
                      "Sınırsız TXT dışa aktarma",
                      "WhatsApp Web ile tam uyumlu",
                      "Yükleme sonrası hemen kullanım",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <CtaButton className="!w-full !justify-center !rounded-xl !text-base" />
                </div>

                {/* Pro */}
                <div className="border-2 border-green-500 rounded-xl p-8 relative bg-green-50">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    EN POPÜLER
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">PRO Plan</h3>
                  <p className="text-slate-500 text-sm mb-6">Tam dışa aktarma — abonelik yok</p>
                  <p className="text-4xl font-bold text-slate-900 mb-8">
                    $4.99 <span className="text-base font-normal text-slate-400">tek seferlik</span>
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Sınırsız mesaj — sohbetin tamamını dışa aktarın",
                      "Tüm biçimler: medya içeren HTML, Excel için CSV, metin",
                      "Kişileri ve grup katılımcılarını dışa aktarın",
                      "Fotoğraf, video ve seslerle birlikte dışa aktarma",
                      "Tek seferlik ödeme — abonelik yok",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <CtaButton className="!w-full !justify-center !rounded-xl !text-base" />
                  <p className="text-xs text-center text-slate-400 mt-3">
                    Güvenli ödeme
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4">
              <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
                Sıkça Sorulan Sorular
              </p>
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
                WhatsApp Sohbet Dışa Aktarma Hakkında Sorular
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

          {/* Closing CTA */}
          <section className="py-20 bg-slate-900">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <p className="text-slate-400 mb-2">Hemen başlayın</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                WhatsApp sohbet geçmişinizi bugün yedekleyin
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Tek tıkla TXT, HTML veya CSV olarak dışa aktarın. %100 yerel ve güvenli.
              </p>
              <CtaButton />
              <p className="text-sm text-slate-500 mt-4">
                Ücretsiz başlayın · Kredi kartı gerekmez · %100 gizli
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
  );
}
