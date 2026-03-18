'use client'

import styles from './Facilities.module.css'

const items = [
  {
    num: '01',
    title: 'Fit Cycle',
    tag: '24 Bikes',
    desc: 'Studio-grade cycling bikes with real-time performance metrics and adaptive resistance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="17" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="19" cy="17" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 17l4-10h6l4 10M9 7l2 5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Yoga Studio',
    tag: '60+ Classes',
    desc: 'Premium yoga and functional training space in a dedicated mindfulness zone.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Combat Zone',
    tag: '30 Stations',
    desc: 'Fully equipped MMA and boxing area with heavy bags, rings, and agility tools.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M14.5 2.5c0 1.5-1.5 7-1.5 7h-2C10.5 9.5 9 4 9 2.5a2.75 2.75 0 015.5 0z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 11.5h12a2 2 0 012 2V17a4 4 0 01-4 4H8a4 4 0 01-4-4v-3.5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Free Weights',
    tag: '200+ Items',
    desc: 'Complete dumbbell and barbell sets ranging from 2.5 kg to 100 kg.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6 4v16M18 4v16M3 12h18M3 6h3M18 6h3M3 18h3M18 18h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Facilities() {
  return (
    <section className={styles.section}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <p className="section-label">World-Class Equipment</p>
          <h2 className={styles.title}>
            Premium <span className={styles.accent}>Facilities</span>
          </h2>
        </div>
        <p className={styles.subtitle}>
          Train with cutting-edge equipment in a space built for performance and comfort. Every corner is designed to push your limits.
        </p>
      </div>

      {/* 2×2 Grid */}
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.num} className={styles.cell}>
            <div className={styles.cellBorderAccent} />

            <div className={styles.cellTop}>
              <span className={styles.cellNum}>{item.num}</span>
              <div className={styles.cellIcon}>{item.icon}</div>
            </div>

            <div className={styles.cellBody}>
              <span className={styles.cellTag}>{item.tag}</span>
              <h3 className={styles.cellTitle}>{item.title}</h3>
              <p className={styles.cellDesc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
