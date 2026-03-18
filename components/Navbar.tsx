'use client'

import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = ['Programs', 'Dashboard', 'Community', 'Pricing']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>

        {/* Logo — far left */}
        <a href="#" className={styles.logo}>
          <svg className={styles.logoIcon} width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="13" width="6" height="6" rx="1" fill="var(--gold)"/>
            <rect x="24" y="13" width="6" height="6" rx="1" fill="var(--gold)"/>
            <rect x="8" y="10" width="4" height="12" rx="1" fill="var(--gold)" opacity="0.8"/>
            <rect x="20" y="10" width="4" height="12" rx="1" fill="var(--gold)" opacity="0.8"/>
            <rect x="12" y="7" width="8" height="18" rx="1" fill="var(--gold)" opacity="0.5"/>
          </svg>
          <span className={styles.logoText}>FORZA<span className={styles.dot}>X</span></span>
        </a>

        {/* Nav — absolute center */}
        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className={styles.navLink} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
        </nav>

        {/* CTA — far right */}
        <button
          className={styles.cta}
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Start Free Trial
        </button>

        <button className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
