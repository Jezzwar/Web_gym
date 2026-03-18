'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, MapPin } from 'lucide-react'
import styles from './ContactModal.module.css'

type Props = {
  open: boolean
  planName: string
  onClose: () => void
}

export default function ContactModal({ open, planName, onClose }: Props) {
  const [mounted, setMounted] = useState(false)
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!open) { setSent(false); return }
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { onClose() }, 2000)
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className={styles.backdropBg} onClick={onClose} />

          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          >
            {/* corner plusses */}
            <span className={`${styles.plus} ${styles.plusTL}`}>+</span>
            <span className={`${styles.plus} ${styles.plusTR}`}>+</span>
            <span className={`${styles.plus} ${styles.plusBL}`}>+</span>
            <span className={`${styles.plus} ${styles.plusBR}`}>+</span>

            <button className={styles.closeBtn} onClick={onClose}>
              <X size={16} />
            </button>

            {/* Left */}
            <div className={styles.left}>
              <p className="section-label">Membership</p>
              <h2 className={styles.title}>Get in<br /><span className={styles.accent}>Touch</span></h2>
              <p className={styles.desc}>
                Interested in the <strong>{planName}</strong> plan? Fill out the form and our team will reach out within 1 business day.
              </p>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}><Mail size={16} /></div>
                  <div>
                    <p className={styles.contactLabel}>Email</p>
                    <p className={styles.contactValue}>hello@forzax.club</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}><Phone size={16} /></div>
                  <div>
                    <p className={styles.contactLabel}>Phone</p>
                    <p className={styles.contactValue}>+1 (800) FORZAX</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}><MapPin size={16} /></div>
                  <div>
                    <p className={styles.contactLabel}>Address</p>
                    <p className={styles.contactValue}>14 Goldsmith Ave, City Center</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className={styles.right}>
              {sent ? (
                <motion.div
                  className={styles.successMsg}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>We'll be in touch soon!</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.field}>
                    <label className={styles.label}>Name</label>
                    <input className={styles.input} type="text" placeholder="Your full name" required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input className={styles.input} type="email" placeholder="you@email.com" required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone</label>
                    <input className={styles.input} type="tel" placeholder="+1 (000) 000-0000" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Message</label>
                    <textarea className={styles.textarea} rows={4} placeholder="Any questions or special requests…" />
                  </div>
                  <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
