"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              Anjanex
            </a>
            <p className="footer-tagline">We ship products, not projects.</p>
          </div>
          {/* <div className="footer-links">
            <a href="#services">Terms &amp; Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund &amp; Cancellation</a>
          </div> */}
          <div className="footer-right">
            <div className="footer-socials">
              <a
                href="mailto:one@anjanex.com"
                className="footer-social"
                aria-label="EMail"
                data-hover
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="22" height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </a>
              <a
                href="https://x.com/anjanexofficial"
                className="footer-social"
                aria-label="Twitter"
                data-hover
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/anjanexofficial/"
                className="footer-social"
                aria-label="Instagram"
                data-hover
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="footer-social"
                aria-label="LinkedIn"
                data-hover
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="4" />
                  <path d="M8 11v5M8 8v.01M12 16v-5c0-1 .6-2 2-2s2 1 2 2v5" />
                </svg>
              </a>
            </div>
            <span className="footer-copy">
              &copy; {new Date(Date.now()).getFullYear()} Anjanex. All rights reserved.
            </span>
          </div>
        </div>
        <div className="footer-giant">
          <span className="footer-giant-text">ANJANEX</span>
        </div>
      </div>
    </footer>
  );
}
