'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './ProgramTabs.module.css'

const PROGRAMS = [
  {
    id: '01',
    title: 'Strength Training',
    description: 'Progressive resistance training designed to build functional muscle mass, improve power output, and completely reshape your physique.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85&fit=crop',
  },
  {
    id: '02',
    title: 'HIIT Cardio',
    description: 'High-intensity interval training to maximize fat burn, elevate your endurance, and keep your metabolism running at peak capacity.',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=1200&q=85&fit=crop',
  },
  {
    id: '03',
    title: 'Combat & MMA',
    description: 'Martial arts-inspired conditioning combining boxing fundamentals, MMA drills, and reactive agility work for a full-body transformation.',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&q=85&fit=crop',
  },
]

const AUTO_PLAY = 5000

const variants = {
  enter: (dir: number) => ({ y: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  center: { zIndex: 1, y: 0, opacity: 1 },
  exit: (dir: number) => ({ zIndex: 0, y: dir > 0 ? '100%' : '-100%', opacity: 0 }),
}

export default function ProgramTabs() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setDirection(1)
    setActive(p => (p + 1) % PROGRAMS.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive(p => (p - 1 + PROGRAMS.length) % PROGRAMS.length)
  }, [])

  const goTo = (i: number) => {
    if (i === active) return
    setDirection(i > active ? 1 : -1)
    setActive(i)
    setPaused(false)
  }

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, AUTO_PLAY)
    return () => clearInterval(t)
  }, [active, paused, next])

  return (
    <section className={styles.section}>
      {/* Grid bg pattern */}
      <div className={styles.bgPattern} />

      <div className={styles.inner}>
        {/* LEFT — tabs */}
        <div className={styles.left}>
          <div className={styles.heading}>
            <p className="section-label">Training Programs</p>
            <h2 className={styles.title}>
              How We Train <span className={styles.accent}>You</span>
            </h2>
          </div>

          <div className={styles.tabs}>
            {PROGRAMS.map((p, i) => {
              const isActive = active === i
              return (
                <button key={p.id} onClick={() => goTo(i)} className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}>
                  <div className={styles.progressTrack}>
                    {isActive && (
                      <motion.div
                        key={`${i}-${paused}`}
                        className={styles.progressBar}
                        initial={{ height: '0%' }}
                        animate={paused ? { height: '0%' } : { height: '100%' }}
                        transition={{ duration: AUTO_PLAY / 1000, ease: 'linear' }}
                      />
                    )}
                  </div>
                  <span className={styles.tabId}>/{p.id}</span>
                  <div className={styles.tabContent}>
                    <span className={styles.tabTitle}>{p.title}</span>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                          className={styles.tabDesc}
                        >
                          {p.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* RIGHT — image */}
        <div className={styles.right} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className={styles.imageWrap}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ y: { type: 'spring', stiffness: 260, damping: 32 }, opacity: { duration: 0.4 } }}
                className={styles.imageSlide}
                onClick={next}
              >
                <img src={PROGRAMS[active].image} alt={PROGRAMS[active].title} className={styles.img} />
                <div className={styles.imgOverlay} />
              </motion.div>
            </AnimatePresence>

            <div className={styles.navBtns}>
              <button className={styles.navBtn} onClick={e => { e.stopPropagation(); prev() }}><ChevronLeft size={16} /></button>
              <button className={styles.navBtn} onClick={e => { e.stopPropagation(); next() }}><ChevronRight size={16} /></button>
            </div>

            <div className={styles.counter}>
              <span className={styles.counterActive}>{String(active + 1).padStart(2, '0')}</span>
              <span className={styles.counterTotal}>/ {String(PROGRAMS.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
