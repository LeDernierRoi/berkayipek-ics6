import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "en";

type Dict = Record<string, { tr: string; en: string }>;

export const DICT: Dict = {
  "nav.home": { tr: "Ana Sayfa", en: "Home" },
  "nav.bonuses": { tr: "Sitelere Git & Bonuslar", en: "Sites & Bonuses" },
  "nav.videos": { tr: "Videolar", en: "Videos" },
  "nav.calculator": { tr: "Envanter Değer Hesaplayıcı", en: "Inventory Value Calculator" },

  "header.leaderboard": { tr: "Liderlik Tablosu", en: "Leaderboard" },

  "hero.tag": { tr: "BERKAYCS2 — CS2 Affiliate Hub", en: "BERKAYCS2 — CS2 Affiliate Hub" },
  "hero.desc": {
    tr: "Berkaycs2 topluluğu için resmi partner bağlantıları, özel BERKAY promosyon kodu, YouTube içerikleri, Discord bağlantısı ve envanter değer hesaplayıcı tek bir premium merkezde.",
    en: "Official partner links, the BERKAY promo code, YouTube content, Discord access and an inventory value calculator in one premium hub for the Berkaycs2 community.",
  },
  "hero.promo": { tr: "Promosyon Kodu", en: "Promo Code" },
  "hero.copy": { tr: "Kopyala", en: "Copy" },
  "hero.copied": { tr: "Kopyalandı", en: "Copied" },
  "hero.viewBonuses": { tr: "Bonusları Gör", en: "View Bonuses" },

  "marquee.title": { tr: "Aktif Partner Bonusları", en: "Active Partner Bonuses" },
  "marquee.hint": { tr: "Üzerine gel — akış durur", en: "Hover to pause" },
  "marquee.visit": { tr: "Siteye Git", en: "Visit Site" },

  "stats.views": { tr: "toplam görüntüleme", en: "total views" },

  "about.tag": { tr: "Berkaycs2", en: "Berkaycs2" },
  "about.title": { tr: "CS2 topluluğu için premium merkez", en: "A premium hub for the CS2 community" },
  "about.body": {
    tr: "Bu merkez; içerik, topluluk, partner promosyonları ve envanter değer hesaplama akışlarını hızlı, güvenilir ve tek ekranda erişilebilir tutmak için tasarlandı.",
    en: "This hub keeps content, community links, partner promos and inventory value workflows fast, reliable and accessible from one screen.",
  },

  "bonuses.tag": { tr: "Resmi Partner Siteleri", en: "Official Partner Sites" },
  "bonuses.title": { tr: "BONUSLAR", en: "BONUSES" },
  "bonuses.desc": {
    tr: "Kodu kopyala, seçtiğin platforma git ve BERKAY avantajını aktif et.",
    en: "Copy the code, open your chosen platform and activate the BERKAY benefit.",
  },
  "bonuses.copyCode": { tr: "Kodu Kopyala", en: "Copy Code" },
  "bonuses.goSite": { tr: "Siteye Git", en: "Visit Site" },

  "videos.tag": { tr: "Sosyal İçerikler", en: "Social Content" },
  "videos.title": { tr: "VİDEOLAR", en: "VIDEOS" },
  "videos.channel": { tr: "Kanala Git", en: "Open Channel" },

  "calculator.tag": { tr: "Steam Market", en: "Steam Market" },
  "calculator.title": { tr: "ENVANTER DEĞER HESAPLAYICI", en: "INVENTORY VALUE CALCULATOR" },
  "calculator.desc": {
    tr: "Steam ID veya özel URL gir, örnek market değerini ve partner yönlendirmesini anında gör.",
    en: "Enter a Steam ID or custom URL to view an estimated market value and partner redirect instantly.",
  },
  "calculator.label": { tr: "Steam ID veya Özel URL", en: "Steam ID or Custom URL" },
  "calculator.button": { tr: "Değeri Hesapla", en: "Calculate Value" },
  "calculator.loading": { tr: "Envanter taranıyor...", en: "Scanning inventory..." },
  "calculator.total": { tr: "Toplam Değer", en: "Total Value" },
  "calculator.items": { tr: "Skinler", en: "Items" },
  "calculator.cta": { tr: "Bu Değeri Katlamak İster misin?", en: "Want to Multiply This?" },

  "lb.title": { tr: "Discord Bot Liderlik Tablosu", en: "Discord Bot Leaderboard" },
  "lb.subtitle": { tr: "En aktif topluluk üyeleri", en: "Most active community members" },
  "lb.rank": { tr: "Sıra", en: "Rank" },
  "lb.user": { tr: "Kullanıcı", en: "User" },
  "lb.points": { tr: "Puan", en: "Points" },

  "legal.terms": { tr: "Kullanım Şartları", en: "Terms of Service" },
  "legal.privacy": { tr: "Gizlilik Politikası", en: "Privacy Policy" },
  "legal.cookies": { tr: "Çerez Politikası", en: "Cookie Policy" },
  "legal.close": { tr: "Kapat", en: "Close" },
  "legal.terms.body": {
    tr: "Bu site CS2 partner platformlarının promosyon kodlarını ve yönlendirme bağlantılarını paylaşır. Partner platformlarda gerçekleşen işlemler kullanıcının kendi sorumluluğundadır.",
    en: "This site shares promo codes and referral links for CS2 partner platforms. Activity on partner platforms is the user's own responsibility.",
  },
  "legal.privacy.body": {
    tr: "Dil tercihi, admin oturumu ve yönetim paneli içerikleri tarayıcı depolamasında saklanır. Üçüncü taraf bağlantılar kendi gizlilik politikalarına tabidir.",
    en: "Language preference, admin session and dashboard content are stored in browser storage. Third-party links are governed by their own privacy policies.",
  },
  "legal.cookies.body": {
    tr: "Zorunlu yerel depolama dışında çerez akışı kullanılmaz. Harici platformlar ziyaret edildiğinde kendi çerez sistemlerini çalıştırabilir.",
    en: "No cookie flow is used beyond essential local storage. External platforms may run their own cookie systems when visited.",
  },

  "footer.rights": { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },

  "admin.title": { tr: "BERKAYCS2 ADMİN", en: "BERKAYCS2 ADMIN" },
  "admin.password": { tr: "Şifre", en: "Password" },
  "admin.login": { tr: "Giriş Yap", en: "Login" },
  "admin.error": { tr: "Şifre doğrulanamadı.", en: "Password could not be verified." },
};

type Ctx = { lang: Lang; setLang: (lang: Lang) => void; t: (key: keyof typeof DICT | string) => string };
const I18nContext = createContext<Ctx>({ lang: "tr", setLang: () => {}, t: (key) => String(key) });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("berkaycs2_lang");
      if (saved === "tr" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("berkaycs2_lang", next);
    } catch {}
  };

  const t = (key: string) => {
    const entry = (DICT as Dict)[key];
    return entry ? entry[lang] : key;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);