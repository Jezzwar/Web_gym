'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', goal: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible') }),
      { threshold: 0.1 }
    )
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className={styles.section} ref={ref}>
      <div className="container">
        <div className={styles.layout}>
          {/* Left info */}
          <div className={styles.info}>
            <p className="section-label reveal" data-reveal>Get Started</p>
            <h2 className={`${styles.title} reveal`} data-reveal>
              Start Your<br />
              <span className={styles.accent}>Free Trial Today</span>
            </h2>
            <p className={`${styles.desc} reveal`} data-reveal>
              Fill out the form and a member of our team will contact you within 24 hours to schedule your complimentary orientation session.
            </p>

            <div className={`${styles.details} reveal`} data-reveal>
              {[
                { icon: '📍', label: 'Location', val: '14 Goldsmith Ave, City Center' },
                { icon: '📞', label: 'Phone', val: '+1 (800) ELITE-FIT' },
                { icon: '✉️', label: 'Email', val: 'hello@elitefit.club' },
                { icon: '🕐', label: 'Hours', val: 'Mon – Sun, 5:00 AM – 11:00 PM' },
              ].map(d => (
                <div key={d.label} className={styles.detailItem}>
                  <span className={styles.detailIcon}>{d.icon}</span>
                  <div>
                    <p className={styles.detailLabel}>{d.label}</p>
                    <p className={styles.detailVal}>{d.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className={`${styles.mapWrap} reveal`} data-reveal>
              <div className={styles.map}>
                <div className={styles.mapPin}>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path d="M10 0C4.477 0 0 4.477 0 10c0 7 10 14 10 14s10-7 10-14c0-5.523-4.477-10-10-10zm0 14a4 4 0 110-8 4 4 0 010 8z" fill="var(--gold)"/>
                  </svg>
                </div>
                <p className={styles.mapLabel}>ELITE Fitness Club — City Center</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formWrap} reveal`} data-reveal>
            {sent ? (
              <div className={styles.success}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="var(--gold)" strokeWidth="1.5"/>
                  <path d="M8 12l3 3 5-5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>You're all set!</h3>
                <p>We've received your request. Expect a call from your future coach within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>Book Your Free Session</h3>
                  <p className={styles.formSub}>No credit card required. Cancel anytime.</p>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Alex Johnson"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="alex@example.com"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Primary Goal</label>
                  <select
                    className={styles.input}
                    value={form.goal}
                    onChange={e => setForm({ ...form, goal: e.target.value })}
                    required
                  >
                    <option value="">Select your goal...</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-build">Muscle Building</option>
                    <option value="endurance">Endurance & Cardio</option>
                    <option value="flexibility">Flexibility & Yoga</option>
                    <option value="general">General Fitness</option>
                    <option value="combat">Combat Sports</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Message (Optional)</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Tell us about your fitness background or any questions you have..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                  />
                </div>

                <button type="submit" className={styles.submit}>
                  <span>Book My Free Trial</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <p className={styles.privacy}>
                  🔒 Your data is protected. We never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
