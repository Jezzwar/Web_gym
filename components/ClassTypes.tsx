'use client'

import Image from 'next/image'
import { Zap, Dumbbell, Wind, Shield } from 'lucide-react'
import { MorphingCardStack } from './ui/morphing-card-stack'
import styles from './ClassTypes.module.css'

const classes = [
  {
    id: '1',
    title: 'Cardio',
    icon: <Wind size={20} />,
    description: 'High-intensity cardiovascular training to maximize fat burn and endurance. Tailored sessions from HIIT to steady-state cardio.',
  },
  {
    id: '2',
    title: 'Strength',
    icon: <Dumbbell size={20} />,
    description: 'Progressive resistance training designed to build functional muscle mass, improve power output, and reshape your physique.',
  },
  {
    id: '3',
    title: 'Yoga',
    icon: <Zap size={20} />,
    description: 'Mind-body integration through dynamic flows and restorative postures. Improves flexibility, mobility, and mental clarity.',
  },
  {
    id: '4',
    title: 'Combat',
    icon: <Shield size={20} />,
    description: 'Martial arts-inspired conditioning combining boxing, MMA fundamentals, and reactive agility drills for full-body transformation.',
  },
]

export default function ClassTypes() {
  return (
    <section id="programs" className={styles.section}>
      <div className={styles.inner}>

        {/* LEFT — header + cards */}
        <div className={styles.left}>
          <p className="section-label">Train Your Way</p>
          <h2 className={styles.title}>
            Expert-Led <span className={styles.accent}>Classes</span>
          </h2>

          <div className={styles.cardStack}>
            <MorphingCardStack
              cards={classes}
              defaultLayout="stack"
            />
          </div>
        </div>

        {/* RIGHT — spinning plate */}
        <div className={styles.right}>
          <div className={styles.plateWrap}>
            <Image
              src="/plate3.png"
              alt=""
              fill
              className={styles.plate}
              sizes="50vw"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
