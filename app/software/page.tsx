"use client";

import Link from "next/link";
import "./software.css";

export default function SoftwareHub() {
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
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0px 0px 12px rgba(0, 0, 0, .12)',
            marginBottom: '30px'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px'
            }}>
              Welcome to Calc-Tech Software Hub
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto 40px',
              lineHeight: '1.8'
            }}>
              Your ultimate destination for discovering, downloading, and reviewing the best apps and software.
              Find comprehensive guides, expert reviews, and safe download links.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '40px'
            }}>
              <div style={{
                padding: '30px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>📱 Mobile Apps</h3>
                <p>Discover the best mobile applications</p>
              </div>

              <div style={{
                padding: '30px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>⭐ Expert Reviews</h3>
                <p>Read detailed reviews and ratings</p>
              </div>

              <div style={{
                padding: '30px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🔒 Safe Downloads</h3>
                <p>100% verified and secure downloads</p>
              </div>
            </div>
          </div>

          {/* Featured Apps Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0px 0px 12px rgba(0, 0, 0, .12)',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: '#0F112F'
            }}>
              Featured Apps
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {/* Uber App Card */}
              <Link
                href="/software/com_ubercab"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  padding: '20px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '15px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, .15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <img
                    src="https://img.appposts.com/com_ubercab.webp"
                    alt="Uber"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      marginRight: '15px'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                      Uber - Request a ride
                    </h3>
                    <p style={{ color: '#757575', fontSize: '0.9rem' }}>Maps & Navigation</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>⭐ 4.64</span>
                  <span>📥 500M+</span>
                  <span>🔒 Safe</span>
                </div>
              </Link>

              {/* Placeholder for more apps */}
              <div style={{
                padding: '20px',
                border: '2px dashed #e5e5e5',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '140px',
                color: '#999'
              }}>
                <p style={{ textAlign: 'center' }}>
                  More apps coming soon!<br />
                  Stay tuned for updates
                </p>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0px 0px 12px rgba(0, 0, 0, .12)',
            padding: '30px'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: '#0F112F'
            }}>
              Browse by Category
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              {[
                '📱 Social Media',
                '🎮 Games',
                '📷 Photo & Video',
                '🎵 Music & Audio',
                '🛠️ Productivity',
                '🗺️ Maps & Navigation',
                '💼 Business',
                '📚 Education'
              ].map((category, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#f8f8f8',
                    textAlign: 'center',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#667eea';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f8f8';
                    e.currentTarget.style.color = 'inherit';
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
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
