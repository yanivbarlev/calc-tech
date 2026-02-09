import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "../components/AdUnit";
import "../software.css";

export const metadata: Metadata = {
  title: "Uber - Request a ride - Download Uber for Android | Calc-Tech Software",
  description: "Download Uber - Request a ride for free, safe and reliable! Experience the latest version of Uber and enjoy new features. Get rides, delivery, and more.",
  keywords: "Uber, Uber app, Request a ride, ride sharing, transportation app, Uber download, Uber android",
};

export default function UberAppPage() {
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

      {/* Main Content */}
      <div className="main">
        <div className="main-left">
          {/* App Header */}
          <div className="main-app">
            <div className="main-app-left">
              <img
                src="https://img.appposts.com/com_ubercab.webp"
                alt="Uber - Request a ride"
                loading="eager"
              />
            </div>
            <div className="main-app-right">
              <h1>
                Uber - Request a ride
                <span className="safe-icon"></span>
              </h1>
              <div className="cs-main-app-common">
                <div className="cs-main-app-rating">
                  <span className="cs-main-app-text">4.64</span>
                  <span className="cs-main-app-type">Ratings</span>
                </div>
                <div className="cs-main-app-download">
                  <span className="cs-main-app-text">500M+</span>
                  <span className="cs-main-app-type">Downloads</span>
                </div>
                <div className="cs-main-app-age">
                  <span className="cs-main-app-text">4+</span>
                  <span className="cs-main-app-type">Age</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ad Unit 1 */}
          <div className="ads">
            <AdUnit
              adClient={ADSENSE_ID}
              adSlot="3339483394"
              className="adsbygoogle adsHeight"
            />
          </div>

          {/* About Section */}
          <div className="main-about">
            <div className="main-about-list">
              <div className="main-about-item">
                <div className="cs-main-about-type">App Name</div>
                <div className="cs-main-about-content">Uber - Request a ride</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Category</div>
                <div className="cs-main-about-content">Maps & Navigation</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Downloads</div>
                <div className="cs-main-about-content">500M+</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Safety</div>
                <div className="cs-main-about-content">100% Safe</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Developer</div>
                <div className="cs-main-about-content">Uber Technologies, Inc.</div>
              </div>
              <div className="main-about-item">
                <div className="cs-main-about-type">Price</div>
                <div className="cs-main-about-content">Free</div>
              </div>
            </div>
          </div>

          {/* Ad Unit 2 */}
          <div className="ads">
            <AdUnit
              adClient={ADSENSE_ID}
              adSlot="9713320054"
              className="adsbygoogle adsHeight"
            />
          </div>

          {/* Introduction/Review Section */}
          <div className="main-introduction">
            <article className="cs-main-introduction-content">
              <h3>Editor&apos;s Review</h3>
              <p>
                Are you tired of the hassle of finding reliable transportation for your everyday needs?
                Look no further than Uber! 🚗 Join the millions of riders who trust Uber to get them
                where they need to go, whether it&apos;s a quick errand in town or an adventurous exploration
                in a new city. Discover a wide range of ride options at your fingertips, from affordable
                UberX rides to luxurious Black car services. 🌟 With upfront pricing, safety features,
                and exclusive perks through Uber One, your journey with Uber is set to be smooth and
                stress-free. 🎉
              </p>

              <h3>Features</h3>
              <ul>
                <li>Wide range of ride options</li>
                <li>Upfront pricing</li>
                <li>Comprehensive safety features</li>
                <li>Exclusive perks with Uber One</li>
                <li>Reserve rides in advance</li>
                <li>Eco-friendly options</li>
                <li>Car borrowing with Uber Carshare</li>
                <li>Ride-sharing and split fare features</li>
                <li>Delivery and transportation solutions</li>
                <li>Business travel management</li>
                <li>Hourly car service option</li>
              </ul>

              <h3>Pros</h3>
              <ul>
                <li>Convenience and accessibility</li>
                <li>Transparent pricing</li>
                <li>Safety assurance</li>
                <li>Exclusive discounts with Uber One</li>
                <li>Eco-friendly ride choices</li>
              </ul>

              <h3>Cons</h3>
              <ul>
                <li>Limited availability in some cities</li>
                <li>Ride options may vary by location</li>
              </ul>
            </article>
          </div>

          {/* Download Section */}
          <div className="main-download">
            <div className="main-app" style={{ padding: 0 }}>
              <div className="main-app-left">
                <img
                  src="https://img.appposts.com/com_ubercab.webp"
                  alt="Uber - Request a ride"
                />
              </div>
              <div className="main-app-right">
                <h1>
                  Uber - Request a ride
                  <span className="safe-icon"></span>
                </h1>
                <div className="cs-main-app-common">
                  <div className="cs-main-app-rating">
                    <span className="cs-main-app-text">4.64</span>
                    <span className="cs-main-app-type">Ratings</span>
                  </div>
                  <div className="cs-main-app-download">
                    <span className="cs-main-app-text">500M+</span>
                    <span className="cs-main-app-type">Downloads</span>
                  </div>
                  <div className="cs-main-app-age">
                    <span className="cs-main-app-text">4+</span>
                    <span className="cs-main-app-type">Age</span>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="main-download-btn"
              href="https://play.google.com/store/apps/details?id=com.ubercab"
              target="_blank"
              rel="noopener noreferrer"
              title="Download Uber - Request a ride"
            >
              <span className="main-download-btn-text">Download from Google Play</span>
            </a>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="main-right">
          {/* Sidebar Ad */}
          <div className="sidebar-section ads-sidebar">
            <AdUnit
              adClient={ADSENSE_ID}
              adSlot="9713320054"
              adFormat="rectangle"
              style={{ width: '300px', maxWidth: '100%', height: '250px' }}
            />
          </div>

          {/* Trending Apps */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Trending Apps</h3>
            <Link href="/software/roblox" className="sidebar-app-item">
              <img src="https://img.appposts.com/com_roblox_client.webp" alt="Roblox" />
              <div className="sidebar-app-info">
                <h4>Roblox</h4>
                <p>Games / Adventure</p>
              </div>
            </Link>
            <Link href="#" className="sidebar-app-item">
              <img src="https://img.appposts.com/com_whatsapp.webp" alt="WhatsApp" />
              <div className="sidebar-app-info">
                <h4>WhatsApp</h4>
                <p>Communication</p>
              </div>
            </Link>
            <Link href="#" className="sidebar-app-item">
              <img src="https://img.appposts.com/com_zhiliaoapp_musically.webp" alt="TikTok" />
              <div className="sidebar-app-info">
                <h4>TikTok</h4>
                <p>Social Media</p>
              </div>
            </Link>
          </div>

          {/* Popular Apps */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Popular Apps</h3>
            <Link href="#" className="sidebar-app-item">
              <img src="https://img.appposts.com/com_mojang_minecraftpe.webp" alt="Minecraft" />
              <div className="sidebar-app-info">
                <h4>Minecraft</h4>
                <p>Games</p>
              </div>
            </Link>
            <Link href="#" className="sidebar-app-item">
              <img src="https://img.appposts.com/com_spotify_music.webp" alt="Spotify" />
              <div className="sidebar-app-info">
                <h4>Spotify</h4>
                <p>Music & Audio</p>
              </div>
            </Link>
            <Link href="#" className="sidebar-app-item">
              <img src="https://img.appposts.com/com_instagram_android.webp" alt="Instagram" />
              <div className="sidebar-app-info">
                <h4>Instagram</h4>
                <p>Social Media</p>
              </div>
            </Link>
          </div>
        </div>
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
