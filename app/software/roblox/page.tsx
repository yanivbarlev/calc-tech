import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "../software.css";

export const metadata: Metadata = {
  title: "Roblox - Download Roblox for Android & PC | Calc-Tech Software",
  description: "Download Roblox for free! Explore millions of user-created games, build your own worlds, and connect with friends. Safe, verified download links.",
  keywords: "Roblox, Roblox download, Roblox game, Roblox app, Roblox PC, Roblox Android, gaming platform, user-created games",
};

const trendingApps = [
  {
    name: "Uber - Request a ride",
    category: "Maps & Navigation",
    icon: "https://img.appposts.com/com_ubercab.webp",
    href: "/software/com_ubercab",
  },
  {
    name: "WhatsApp",
    category: "Communication",
    icon: "https://img.appposts.com/com_whatsapp.webp",
    href: "#",
  },
  {
    name: "TikTok",
    category: "Social Media",
    icon: "https://img.appposts.com/com_zhiliaoapp_musically.webp",
    href: "#",
  },
];

const popularApps = [
  {
    name: "Minecraft",
    category: "Games",
    icon: "https://img.appposts.com/com_mojang_minecraftpe.webp",
    href: "#",
  },
  {
    name: "Spotify",
    category: "Music & Audio",
    icon: "https://img.appposts.com/com_spotify_music.webp",
    href: "#",
  },
  {
    name: "Instagram",
    category: "Social Media",
    icon: "https://img.appposts.com/com_instagram_android.webp",
    href: "#",
  },
];

export default function RobloxAppPage() {
  const ADSENSE_ID = "ca-pub-2201920716197483";

  return (
    <div className="software-page">
      {/* Header */}
      <header className="software-header">
        <div className="header-body">
          <Link href="/" className="header-logo" style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea', textDecoration: 'none' }}>
            Calc-Tech
          </Link>
          <Link href="/software" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none' }}>
            Software Hub
          </Link>
        </div>
      </header>

      {/* Top Ad Banner */}
      <div className="ads-top">
        <ins
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '728px', maxWidth: '100%', height: '90px' }}
          data-ad-client={ADSENSE_ID}
          data-ad-slot="3339483394"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        ></ins>
        <Script id="ad-top" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="main-left">
          {/* App Header */}
          <div className="main-app">
            <div className="main-app-left">
              <img
                src="https://img.appposts.com/com_roblox_client.webp"
                alt="Roblox"
                loading="eager"
              />
            </div>
            <div className="main-app-right">
              <h1>
                Roblox
                <span className="safe-icon"></span>
              </h1>
              <div className="cs-main-app-common">
                <div className="cs-main-app-rating">
                  <span className="cs-main-app-text">4.3</span>
                  <span className="cs-main-app-type">Ratings</span>
                </div>
                <div className="cs-main-app-download">
                  <span className="cs-main-app-text">200M+</span>
                  <span className="cs-main-app-type">Downloads</span>
                </div>
                <div className="cs-main-app-age">
                  <span className="cs-main-app-text">9+</span>
                  <span className="cs-main-app-type">Age</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ad Unit 1 */}
          <div className="ads">
            <ins
              className="adsbygoogle adsHeight"
              style={{ display: 'inline-block' }}
              data-ad-client={ADSENSE_ID}
              data-ad-slot="3339483394"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <Script id="ad-1" strategy="afterInteractive">
              {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
          </div>

          {/* About Section */}
          <div className="main-about">
            <div className="main-about-list">
              <div className="main-about-item">
                <div className="cs-main-about-type">App Name</div>
                <div className="cs-main-about-content">Roblox</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Category</div>
                <div className="cs-main-about-content">Games / Adventure</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Downloads</div>
                <div className="cs-main-about-content">200M+</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Safety</div>
                <div className="cs-main-about-content">100% Safe</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Developer</div>
                <div className="cs-main-about-content">Roblox Corporation</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Price</div>
                <div className="cs-main-about-content">Free</div>
              </div>
            </div>
          </div>

          {/* Ad Unit 2 */}
          <div className="ads">
            <ins
              className="adsbygoogle adsHeight"
              style={{ display: 'inline-block' }}
              data-ad-client={ADSENSE_ID}
              data-ad-slot="9713320054"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <Script id="ad-2" strategy="afterInteractive">
              {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
          </div>

          {/* Introduction/Review Section */}
          <div className="main-introduction">
            <article className="cs-main-introduction-content">
              <h3>Editor&apos;s Review</h3>
              <p>
                Roblox is a global online platform that brings together millions of players
                in user-generated 3D worlds. Whether you want to explore vast adventure
                landscapes, compete in thrilling obstacle courses, or build your own virtual
                creations, Roblox offers an ever-expanding universe of experiences created by
                its own community. With over 200 million monthly active users, it has become
                one of the most popular gaming platforms in the world.
              </p>

              <h3>Gameplay</h3>
              <p>
                Unlike traditional games, Roblox is a platform that hosts millions of individual
                games (called &quot;experiences&quot;) created by users using Roblox Studio.
                From role-playing adventures and tycoon simulators to competitive shooters and
                puzzle games, the variety is virtually limitless. Each experience has its own
                mechanics, goals, and worlds to explore, ensuring there&apos;s always something
                new to discover.
              </p>

              <h3>Graphics &amp; Performance</h3>
              <p>
                Roblox uses a distinctive blocky art style that keeps the platform accessible
                across a wide range of devices including mobile phones, tablets, PCs, and
                consoles. While individual experiences can range from simple to highly detailed,
                the engine is optimized for smooth performance. Recent updates have introduced
                improved lighting, textures, and avatar rendering capabilities.
              </p>

              <h3>Social Features</h3>
              <p>
                At its core, Roblox is a social platform. Players can add friends, join groups,
                chat in real-time, and collaborate on building projects. Private servers allow
                friends to play together in a controlled environment. The platform also offers
                robust parental controls, making it a popular choice for younger gamers while
                still appealing to older audiences.
              </p>

              <h3>Pros</h3>
              <ul>
                <li>Massive library of free user-created games</li>
                <li>Cross-platform play on mobile, PC, console, and VR</li>
                <li>Strong social and community features</li>
                <li>Creative tools with Roblox Studio for building your own games</li>
                <li>Regular updates and new content from the community</li>
                <li>Parental controls for safer gameplay</li>
              </ul>

              <h3>Cons</h3>
              <ul>
                <li>In-app purchases (Robux) can add up</li>
                <li>Quality of user-created games varies significantly</li>
                <li>Moderation challenges in a large online community</li>
                <li>Some experiences may contain ads or paywalls</li>
              </ul>
            </article>
          </div>

          {/* Download Section */}
          <div className="main-download">
            <div className="main-app" style={{ padding: 0 }}>
              <div className="main-app-left">
                <img
                  src="https://img.appposts.com/com_roblox_client.webp"
                  alt="Roblox"
                />
              </div>
              <div className="main-app-right">
                <h1>
                  Roblox
                  <span className="safe-icon"></span>
                </h1>
                <div className="cs-main-app-common">
                  <div className="cs-main-app-rating">
                    <span className="cs-main-app-text">4.3</span>
                    <span className="cs-main-app-type">Ratings</span>
                  </div>
                  <div className="cs-main-app-download">
                    <span className="cs-main-app-text">200M+</span>
                    <span className="cs-main-app-type">Downloads</span>
                  </div>
                  <div className="cs-main-app-age">
                    <span className="cs-main-app-text">9+</span>
                    <span className="cs-main-app-type">Age</span>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="main-download-btn"
              href="https://www.roblox.com/download"
              target="_blank"
              rel="noopener noreferrer"
              title="Download Roblox"
            >
              <span className="main-download-btn-text">Download from Roblox.com</span>
            </a>
            <a
              className="main-download-btn"
              href="https://play.google.com/store/apps/details?id=com.roblox.client"
              target="_blank"
              rel="noopener noreferrer"
              title="Download Roblox from Google Play"
              style={{ marginTop: '10px' }}
            >
              <span className="main-download-btn-text">Download from Google Play</span>
            </a>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="main-right">
          {/* Sidebar Ad */}
          <div className="sidebar-section ads-sidebar">
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '300px', maxWidth: '100%', height: '250px' }}
              data-ad-client={ADSENSE_ID}
              data-ad-slot="9713320054"
              data-ad-format="rectangle"
            ></ins>
            <Script id="ad-sidebar" strategy="afterInteractive">
              {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
          </div>

          {/* Trending Apps */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Trending Apps</h3>
            {trendingApps.map((app) => (
              <Link key={app.name} href={app.href} className="sidebar-app-item">
                <img src={app.icon} alt={app.name} />
                <div className="sidebar-app-info">
                  <h4>{app.name}</h4>
                  <p>{app.category}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Popular Apps */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Popular Apps</h3>
            {popularApps.map((app) => (
              <Link key={app.name} href={app.href} className="sidebar-app-item">
                <img src={app.icon} alt={app.name} />
                <div className="sidebar-app-info">
                  <h4>{app.name}</h4>
                  <p>{app.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="ads-bottom">
        <ins
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '728px', maxWidth: '100%', height: '90px' }}
          data-ad-client={ADSENSE_ID}
          data-ad-slot="3339483394"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        ></ins>
        <Script id="ad-bottom" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </div>

      {/* Footer */}
      <footer className="software-footer">
        <div className="cs-footer">
          <div className="cs-footer-introduction">
            Whether you&apos;re an expert, or a first-time user, you&apos;ll find the most helpful
            app reviews, guides and downloads here at Calc-Tech Software Hub.
          </div>
          <div className="cs-footer-about">
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
