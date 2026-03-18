'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Pause, Play, RotateCcw } from 'lucide-react'
import styles from './Hero.module.css'

const brands = ['ProForm', 'Technogym', 'NordicTrack', 'Life Fitness', 'Hammer', 'Bowflex', 'Rogue', 'Precor', 'Cybex', 'Matrix', 'Assault', 'Concept2', 'Eleiko', 'TechnoGym', 'ProForm', 'Technogym', 'NordicTrack', 'Life Fitness', 'Hammer', 'Bowflex', 'Rogue', 'Precor', 'Cybex', 'Matrix', 'Assault', 'Concept2', 'Eleiko', 'TechnoGym']

const trainers = [
  {
    id: '01',
    name: 'Jack Morrison',
    fullName: 'Coach Jack Morrison',
    role: 'Strength & Conditioning',
    cert: 'NSCA-CSCS',
    exp: '12 years experience',
    description: 'Former D1 athlete turned elite coach. Jack specializes in powerlifting and athletic performance enhancement — building champions from the ground up.',
    img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=1200&q=85&fit=crop&crop=face,top',
    thumb: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&q=80&fit=crop&crop=face,top',
  },
  {
    id: '02',
    name: 'Sofia Reyes',
    fullName: 'Sofia Reyes',
    role: 'Yoga & Mindfulness',
    cert: 'RYT-500',
    exp: '8 years experience',
    description: 'Certified in Vinyasa and Yin yoga, Sofia brings a holistic approach that balances strength with recovery and mental clarity.',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=85&fit=crop&crop=face,top',
    thumb: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80&fit=crop&crop=face,top',
  },
  {
    id: '03',
    name: 'Marcus Chen',
    fullName: 'Marcus Chen',
    role: 'Combat & HIIT',
    cert: 'ACE-CPT',
    exp: '10 years experience',
    description: 'MMA background with a passion for transformative high-intensity training. Marcus pushes every client beyond what they thought possible.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85&fit=crop&crop=face,top',
    thumb: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&q=80&fit=crop&crop=face,top',
  },
  {
    id: '04',
    name: 'Amara Williams',
    fullName: 'Amara Williams',
    role: 'Cardio & Endurance',
    cert: 'ACSM-EP',
    exp: '7 years experience',
    description: 'Marathon runner and endurance specialist. Amara helps clients build aerobic capacity and the mental toughness to go the distance.',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=85&fit=crop&crop=face,top',
    thumb: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&q=80&fit=crop&crop=face,top',
  },
]

const DURATION = 6000

export default function Hero() {
  const headRef = useRef<HTMLHeadingElement>(null)

  // Booking panel
  const [showPanel, setShowPanel] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  // Story modal
  const [mounted, setMounted] = useState(false)
  const [storyOpen, setStoryOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const tickRef = useRef(0)
  const activeRef = useRef(0)

  useEffect(() => {
    setMounted(true)
    const el = headRef.current
    if (!el) return
    el.style.animation = 'fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both'
  }, [])

  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    tickRef.current = 0
    setProgress(0)
    setIsEnded(false)
  }, [active])

  useEffect(() => {
    if (!storyOpen || isPaused) return
    const tick = 50
    const totalTicks = DURATION / tick
    const interval = setInterval(() => {
      tickRef.current += 1
      setProgress((tickRef.current / totalTicks) * 100)
      if (tickRef.current >= totalTicks) {
        clearInterval(interval)
        if (activeRef.current < trainers.length - 1) {
          setActive(p => p + 1)
        } else {
          setIsPaused(true)
          setIsEnded(true)
        }
      }
    }, tick)
    return () => clearInterval(interval)
  }, [storyOpen, isPaused, active])

  const openStory = (i: number) => {
    setActive(i)
    setIsPaused(false)
    setIsEnded(false)
    setStoryOpen(true)
  }

  const closeStory = useCallback(() => {
    setStoryOpen(false)
    setIsPaused(false)
  }, [])

  const goTo = useCallback((i: number) => {
    setActive(i)
    setIsPaused(false)
    setIsEnded(false)
  }, [])

  const prev = useCallback(() => {
    if (activeRef.current > 0) goTo(activeRef.current - 1)
  }, [goTo])

  const next = useCallback(() => {
    if (activeRef.current < trainers.length - 1) {
      goTo(activeRef.current + 1)
    } else {
      setIsPaused(true)
      setIsEnded(true)
    }
  }, [goTo])

  const handleControl = useCallback(() => {
    if (isEnded) goTo(0)
    else setIsPaused(p => !p)
  }, [isEnded, goTo])

  useEffect(() => {
    if (!storyOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeStory()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [storyOpen, closeStory, next, prev])

  const handleConfirm = () => {
    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      setShowPanel(false)
      setSelected(null)
    }, 1800)
  }

  const trainer = trainers[active]

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.bg}>
          <video
            className={styles.bgImg}
            src="/hero_video.mp4"
            autoPlay loop muted playsInline
            ref={(el) => { if (el) el.playbackRate = 1 }}
          />
          <div className={styles.bgOverlay} />
          <div className={styles.bgNoise} />
        </div>

        <div className={styles.headlineWrap}>
          <h1 ref={headRef} className={styles.headline}>
            Build Your Strongest<br />
            <span className={styles.gold}>Body.</span> Forzax Results.
          </h1>
        </div>

        <div className={`container ${styles.bottomRow}`}>

          {/* Trainer card + booking panel */}
          <motion.div
            className={styles.trainerWrap}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >

            {/* Booking panel — slides up */}
            <AnimatePresence>
              {showPanel && (
                <motion.div
                  className={styles.bookingPanel}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                >
                  {confirmed ? (
                    <div className={styles.confirmedMsg}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Booking Confirmed!</span>
                    </div>
                  ) : (
                    <>
                      <div className={styles.panelHeader}>
                        <span className={styles.panelLabel}>Our Trainers</span>
                        <button className={styles.panelClose} onClick={() => setShowPanel(false)}>
                          <X size={13} />
                        </button>
                      </div>

                      <div className={styles.panelAvatars}>
                        {trainers.map((t, i) => (
                          <button
                            key={t.id}
                            className={`${styles.panelAvatar} ${selected === i ? styles.panelAvatarActive : ''}`}
                            onClick={() => { setSelected(i); openStory(i) }}
                          >
                            <div className={styles.panelAvatarRing}>
                              <img src={t.thumb} alt={t.name} className={styles.panelAvatarImg} />
                            </div>
                            <span className={styles.panelAvatarName}>{t.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>

                      <button
                        className={`${styles.panelConfirmBtn} ${selected !== null ? styles.panelConfirmBtnActive : ''}`}
                        onClick={handleConfirm}
                        disabled={selected === null}
                      >
                        Confirm
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className={styles.trainerCard}
              whileHover={{
                y: -14,
                scale: 1.04,
                boxShadow: '0 24px 60px rgba(201,168,76,0.22), 0 8px 24px rgba(0,0,0,0.6)',
                borderColor: 'rgba(201,168,76,0.45)',
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            >
              <div>
                <p className={styles.trainerName}>Choose Your Trainer</p>
                <p className={styles.trainerTime}>Professional Coaches</p>
              </div>
              <button
                className={`${styles.confirmBtn} ${showPanel ? styles.confirmBtnActive : ''}`}
                onClick={() => setShowPanel(p => !p)}
              >
                View Trainers
              </button>
            </motion.div>
          </motion.div>

          <div className={styles.spacer} />

          <motion.div
            className={styles.workoutCard}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -14,
              scale: 1.04,
              boxShadow: '0 24px 60px rgba(201,168,76,0.22), 0 8px 24px rgba(0,0,0,0.6)',
              borderColor: 'rgba(201,168,76,0.45)',
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            <div className={styles.wcHeader}>
              <div className={styles.wcIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 4v16M18 4v16M3 12h18M3 6h3M18 6h3M3 18h3M18 18h3" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className={styles.wcTitle}>Full Body Workout</p>
                <p className={styles.wcTime}>10:00 AM – 11:30 AM</p>
              </div>
            </div>
            <p className={styles.wcLabel}>Workout Lists:</p>
            <ul className={styles.wcList}>
              {[['Push-Ups', '15 × 3'], ['Pull-Ups', '12 × 3'], ['Weighted Squats', '12 × 3'], ['Deadlifts', '10 × 3']].map(([ex, rep]) => (
                <li key={ex} className={styles.wcItem}>
                  <span>{ex}</span>
                  <span className={styles.wcRep}>{rep}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {brands.map((b, i) => (
            <span key={i} className={styles.marqueeBrand}>{b}</span>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {mounted && storyOpen && createPortal(
        <AnimatePresence>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.backdropBg} onClick={closeStory} />

            <motion.div
              className={styles.storyCard}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className={styles.progressRow}>
                {trainers.map((_, i) => (
                  <button key={i} className={styles.progressTrack} onClick={() => goTo(i)}>
                    <div
                      className={styles.progressFill}
                      style={{ width: i < active ? '100%' : i === active ? `${progress}%` : '0%' }}
                    />
                  </button>
                ))}
              </div>

              <div className={styles.storyHeader}>
                <div className={styles.storyMeta}>
                  <div className={styles.storyThumb}>
                    <img src={trainer.thumb} alt={trainer.name} className={styles.storyThumbImg} />
                  </div>
                  <div>
                    <div className={styles.storyMetaName}>{trainer.fullName}</div>
                    <div className={styles.storyMetaRole}>{trainer.role}</div>
                  </div>
                </div>
                <div className={styles.storyActions}>
                  <button className={styles.actionBtn} onClick={handleControl}>
                    {isPaused ? isEnded ? <RotateCcw size={16} /> : <Play size={16} /> : <Pause size={16} />}
                  </button>
                  <button className={styles.actionBtn} onClick={closeStory}>
                    <X size={16} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={trainer.img}
                  alt={trainer.name}
                  className={styles.storyImg}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              <div className={styles.gradTop} />
              <div className={styles.gradBottom} />

              <div className={styles.storyInfo}>
                <span className={styles.storyInfoCert}>{trainer.cert}</span>
                <h3 className={styles.storyInfoName}>{trainer.fullName}</h3>
                <p className={styles.storyInfoDesc}>{trainer.description}</p>
                <span className={styles.storyInfoExp}>{trainer.exp}</span>
              </div>

              <button className={styles.zonePrev} onClick={prev} aria-label="Previous" />
              <button className={styles.zoneNext} onClick={next} aria-label="Next" />
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
