'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export default function Navigation() {
  const [navHidden, setNavHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300 && currentScrollY > lastScrollY.current) {
        setNavHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setNavHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const scrollToTarget = useCallback((href: string) => {
    // Access the global Lenis instance
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string | HTMLElement | number, options?: Record<string, unknown>) => void } }).lenis;

    if (href === '#' || !href) {
      if (lenis) {
        lenis.scrollTo(0, { offset: 0, duration: 2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      scrollToTarget(href);
    },
    [scrollToTarget]
  );

  const handleMobileLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      closeMenu();
      scrollToTarget(href);
    },
    [scrollToTarget, closeMenu]
  );

  return (
    <>
      <nav className={`nav${navHidden ? ' hidden' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={handleAnchorClick}>
            <span className="nav-logo-mark">A</span>
            <span className="nav-logo-text">ANJANEX</span>
          </a>
          <div className="nav-links" id="navLinks">
            <a href="#services" className="nav-link" data-hover onClick={handleAnchorClick}>
              Services
            </a>
            <a href="#work" className="nav-link" data-hover onClick={handleAnchorClick}>
              Work
            </a>
            <a href="#process" className="nav-link" data-hover onClick={handleAnchorClick}>
              Process
            </a>
            <a href="#about" className="nav-link" data-hover onClick={handleAnchorClick}>
              About
            </a>
            <a href="#faq" className="nav-link" data-hover onClick={handleAnchorClick}>
              FAQ
            </a>
          </div>
          <a
            href="https://wa.me/917977933565?text=Hello%2C%20I%20would%20like%20to%20get%20in%20touch."
            target="_blank"
            rel="noopener noreferrer"
            aria-label='LetsTalk'
            className="nav-cta" data-hover
          >
            <span>Let&apos;s Talk</span>
            <span className="nav-cta-arrow">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 16L16 4M16 4H6M16 4V14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
          <button
            className={`nav-menu-btn${menuOpen ? ' active' : ''}`}
            id="menuBtn"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' active' : ''}`} id="mobileMenu">
        <div className="mobile-menu-inner">
          <a href="#" className="mobile-menu-link" onClick={handleMobileLinkClick}>
            Home
          </a>
          <a href="#services" className="mobile-menu-link" onClick={handleMobileLinkClick}>
            Services
          </a>
          <a href="#work" className="mobile-menu-link" onClick={handleMobileLinkClick}>
            Work
          </a>
          <a href="#process" className="mobile-menu-link" onClick={handleMobileLinkClick}>
            Process
          </a>
          <a href="#about" className="mobile-menu-link" onClick={handleMobileLinkClick}>
            About
          </a>
          <a href="#contact" className="mobile-menu-link" onClick={handleMobileLinkClick}>
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
