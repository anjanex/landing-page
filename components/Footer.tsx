"use client";

import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";

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
                <MdMailOutline size={23} />
              </a>
              <a
                href="https://x.com/anjanexofficial"
                className="footer-social"
                aria-label="Twitter"
                data-hover
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/anjanexofficial/"
                className="footer-social"
                aria-label="Instagram"
                data-hover
              >
                <FaInstagram size={22} />
              </a>
              {/* <a
                href="#"
                className="footer-social"
                aria-label="LinkedIn"
                data-hover
              >
                <FaLinkedinIn size={22} />
              </a> */}
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
