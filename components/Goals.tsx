'use client'

import styles from './Goals.module.css'

const cards = [
  {
    num: '01',
    title: 'Smart Reminders',
    tag: 'AI-Powered',
    desc: 'Automated reminders that help you stay consistent and never miss a session — tailored to your schedule and preferences.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Weekly Challenges',
    tag: 'Community',
    desc: 'Compete with fellow members in weekly challenges designed to push your limits and accelerate your results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: '1-on-1 Coaching',
    tag: 'Elite Access',
    desc: 'Work directly with certified trainers who guide and push you forward every step of the way on your fitness journey.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Progress Tracking',
    tag: 'Analytics',
    desc: 'Real-time metrics and body composition analysis so you always know exactly where you stand and what to do next.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 16l4-4 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const proof = [
  { num: '94%', text: 'hit their first milestone within 60 days' },
  { num: '4.9★', text: 'average coach rating across 2,400+ members' },
  { num: '3×', text: 'faster progress with 1-on-1 coaching' },
]

export default function Goals() {
  return (
    <section className={styles.section}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <p className="section-label">Your Results</p>
          <h2 className={styles.title}>
            Achieve Your Goals<br />
            <span className={styles.accent}>With Expert Guidance</span>
          </h2>
        </div>
        <p className={styles.subtitle}>
          Personalized plans, expert guidance, and smart tools to keep you consistent and motivated.
        </p>
      </div>

      {/* 2×2 Grid */}
      <div className={styles.grid}>
        {cards.map((c) => (
          <div key={c.num} className={styles.cell}>
            <div className={styles.cellBorderAccent} />

            <div className={styles.cellTop}>
              <span className={styles.cellNum}>{c.num}</span>
              <div className={styles.cellIcon}>{c.icon}</div>
            </div>

            <div className={styles.cellBody}>
              <span className={styles.cellTag}>{c.tag}</span>
              <h3 className={styles.cellTitle}>{c.title}</h3>
              <p className={styles.cellDesc}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Proof strip */}
      <div className={styles.proof}>
        {proof.map((p, i) => (
          <div key={i} className={styles.proofItem}>
            {i > 0 && <div className={styles.proofDivider} />}
            <span className={styles.proofNum}>{p.num}</span>
            <span className={styles.proofText}>{p.text}</span>
          </div>
        ))}
      </div>

    </section>
  )
}
