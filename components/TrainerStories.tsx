'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Pause, Play, RotateCcw } from 'lucide-react'
import styles from './TrainerStories.module.css'

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

export default function TrainerStories() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const tickRef = useRef(0)
  const activeRef = useRef(0)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    tickRef.current = 0
    setProgress(0)
    setIsEnded(false)
  }, [active])

  useEffect(() => {
    if (!open || isPaused) return
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
  }, [open, isPaused, active])

  const openStory = (i: number) => {
    setActive(i)
    setIsPaused(false)
    setIsEnded(false)
    setOpen(true)
  }

  const close = useCallback(() => {
    setOpen(false)
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
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, close, next, prev])

  const trainer = trainers[active]

  return (
    <>
      {/* Fixed sidebar avatars */}
      <div className={styles.sidebar}>
        {trainers.map((t, i) => (
          <button key={t.id} className={styles.avatarBtn} onClick={() => openStory(i)}>
            <div className={styles.avatarRing}>
              <img src={t.thumb} alt={t.name} className={styles.avatarImg} />
            </div>
            <div className={styles.tooltip}>
              <span className={styles.tooltipName}>{t.name}</span>
              <span className={styles.tooltipRole}>{t.role}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Story Modal */}
      {mounted && open && createPortal(
        <AnimatePresence>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.backdropBg} onClick={close} />

            <motion.div
              className={styles.storyCard}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Progress bars */}
              <div className={styles.progressRow}>
                {trainers.map((_, i) => (
                  <button key={i} className={styles.progressTrack} onClick={() => goTo(i)}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: i < active ? '100%' : i === active ? `${progress}%` : '0%',
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Header */}
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
                    {isPaused
                      ? isEnded ? <RotateCcw size={16} /> : <Play size={16} />
                      : <Pause size={16} />}
                  </button>
                  <button className={styles.actionBtn} onClick={close}>
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Photo */}
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

              {/* Info */}
              <div className={styles.storyInfo}>
                <span className={styles.storyInfoCert}>{trainer.cert}</span>
                <h3 className={styles.storyInfoName}>{trainer.fullName}</h3>
                <p className={styles.storyInfoDesc}>{trainer.description}</p>
                <span className={styles.storyInfoExp}>{trainer.exp}</span>
              </div>

              {/* Tap zones */}
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
