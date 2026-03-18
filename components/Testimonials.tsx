'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Testimonials.module.css'

const reviews = [
  {
    name: 'David K.',
    role: 'Performance Member · 2 years',
    text: "Elite transformed my physique and my mindset. Coach Jack is relentless in the best way possible — 22 kg lost in 8 months and I've never felt stronger.",
    stars: 5,
    initials: 'DK',
  },
  {
    name: 'Priya M.',
    role: 'Elite Member · 3 years',
    text: "The yoga sessions with Sofia are incredible. This isn\u2019t a gym, it\u2019s a lifestyle. The facilities are world-class and the community keeps you accountable.",
    stars: 5,
    initials: 'PM',
  },
  {
    name: 'Tom R.',
    role: 'Basic Member · 1 year',
    text: "Started on Basic just to \"try it out.\" Now I\u2019m convinced this is the best investment I\u2019ve made. The trainers actually remember your name and your goals.",
    stars: 5,
    initials: 'TR',
  },
  {
    name: 'Aisha L.',
    role: 'Elite Member · 18 months',
    text: "Marcus in Combat class is a beast \u2014 and he\u2019ll turn you into one too. My confidence is through the roof. The 1-on-1 coaching is worth every cent.",
    stars: 5,
    initials: 'AL',
  },
  {
    name: 'James H.',
    role: 'Performance Member · 14 months',
    text: 'The equipment is pristine, the vibe is serious but welcoming. I hit my first ever 100 kg squat here last month. Elite lives up to the name.',
    stars: 5,
    initials: 'JH',
  },
]

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible') }),
      { threshold: 0.1 }
    )
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % reviews.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label reveal" data-reveal>Social Proof</p>
          <h2 className={`${styles.title} reveal`} data-reveal>
            Real Results,<br />
            <span className={styles.accent}>Real People</span>
          </h2>
        </div>

        <div className={`${styles.main} reveal`} data-reveal>
          {/* Featured */}
          <div className={styles.featured}>
            <div className={styles.quoteIcon}>
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                <path d="M0 24V14.4C0 6.4 4.267 1.6 12.8 0l2.133 3.2C10.4 4.267 8 7.467 8 12H14.4V24H0zm17.6 0V14.4C17.6 6.4 21.867 1.6 30.4 0l1.6 3.2C27.467 4.267 25.6 7.467 25.6 12H32V24H17.6z" fill="var(--gold)" fillOpacity="0.2"/>
              </svg>
            </div>
            <blockquote className={styles.quote}>{reviews[active].text}</blockquote>
            <div className={styles.reviewer}>
              <div className={styles.reviewerAvatar}>{reviews[active].initials}</div>
              <div>
                <p className={styles.reviewerName}>{reviews[active].name}</p>
                <p className={styles.reviewerRole}>{reviews[active].role}</p>
              </div>
              <div className={styles.stars}>
                {Array.from({ length: reviews[active].stars }).map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>
            </div>
          </div>

          {/* Nav dots */}
          <div className={styles.dots}>
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>

          {/* Stack preview */}
          <div className={styles.stack}>
            {reviews.filter((_, i) => i !== active).slice(0, 3).map((r) => (
              <div key={r.name} className={styles.stackCard}>
                <div className={styles.stackAvatar}>{r.initials}</div>
                <div>
                  <p className={styles.stackName}>{r.name}</p>
                  <p className={styles.stackRole}>{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
