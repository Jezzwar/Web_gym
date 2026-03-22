'use client'

import { useState, useRef, useContext, createContext, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { Check, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import NumberFlow from '@number-flow/react'
import confetti from 'canvas-confetti'
import styles from './Pricing.module.css'
import ContactModal from './ContactModal'

// ── Plans ──────────────────────────────────────────────────────────────────
const plans = [
  {
    name: 'Basic',
    price: 39,
    yearlyPrice: 29,
    desc: 'Access to the main gym floor. Perfect for self-directed training.',
    features: [
      'Full gym access (5 AM – 11 PM)',
      'Locker & shower facilities',
      'Basic fitness assessment',
      'Access to group cardio classes',
      'Mobile app tracking',
    ],
    isPopular: false,
    cta: 'Start Free Trial',
  },
  {
    name: 'Performance',
    price: 79,
    yearlyPrice: 59,
    desc: 'Gym + pool + yoga. Our most popular plan for serious athletes.',
    features: [
      'Everything in Basic',
      'Heated pool & spa access',
      'Unlimited yoga studio sessions',
      'Monthly body composition scan',
      '2 personal training sessions / month',
      'Nutrition guidance portal',
    ],
    isPopular: true,
    cta: 'Get Started',
  },
  {
    name: 'Forzax',
    price: 149,
    yearlyPrice: 109,
    desc: 'The complete Forzax experience — no limits, no compromises.',
    features: [
      'Everything in Performance',
      'Unlimited 1-on-1 coaching',
      'Priority class booking',
      'Dedicated recovery suite',
      'Weekly progress reviews',
      'Meal planning access',
      'Guest passes (2/month)',
    ],
    isPopular: false,
    cta: 'Contact Sales',
  },
]

// ── Context ────────────────────────────────────────────────────────────────
const PricingCtx = createContext<{
  annual: boolean
  setAnnual: (v: boolean) => void
  openModal: (plan: string) => void
}>({
  annual: false,
  setAnnual: () => {},
  openModal: () => {},
})

// ── Star ───────────────────────────────────────────────────────────────────
function StarDot({
  mouse,
  containerRef,
}: {
  mouse: { x: number | null; y: number | null }
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const [pos] = useState({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 1.5,
    gold: Math.random() > 0.7,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5,
  })

  const cfg = { stiffness: 100, damping: 15, mass: 0.1 }
  const sx = useSpring(0, cfg)
  const sy = useSpring(0, cfg)

  useEffect(() => {
    if (!containerRef.current || mouse.x === null || mouse.y === null) {
      sx.set(0); sy.set(0); return
    }
    const rect = containerRef.current.getBoundingClientRect()
    const starX = rect.left + (parseFloat(pos.left) / 100) * rect.width
    const starY = rect.top + (parseFloat(pos.top) / 100) * rect.height
    const dx = mouse.x - starX
    const dy = mouse.y - starY
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 600) {
      const f = 1 - dist / 600
      sx.set(dx * f * 0.5)
      sy.set(dy * f * 0.5)
    } else {
      sx.set(0); sy.set(0)
    }
  }, [mouse, pos, containerRef, sx, sy])

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        width: pos.size,
        height: pos.size,
        borderRadius: '50%',
        background: pos.gold ? 'var(--gold)' : 'rgba(245,245,240,0.6)',
        x: sx,
        y: sy,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, pos.gold ? 0.8 : 0.4, 0] }}
      transition={{ duration: pos.duration, repeat: Infinity, delay: pos.delay }}
    />
  )
}

function Starfield({ mouse, containerRef }: {
  mouse: { x: number | null; y: number | null }
  containerRef: React.RefObject<HTMLDivElement>
}) {
  return (
    <div className={styles.starfield}>
      {Array.from({ length: 120 }).map((_, i) => (
        <StarDot key={i} mouse={mouse} containerRef={containerRef} />
      ))}
    </div>
  )
}


// ── Toggle ─────────────────────────────────────────────────────────────────
function Toggle() {
  const { annual, setAnnual } = useContext(PricingCtx)
  const monthRef = useRef<HTMLButtonElement>(null)
  const annualRef = useRef<HTMLButtonElement>(null)
  const [pill, setPill] = useState<{ width: number; x: number }>({ width: 0, x: 0 })

  useEffect(() => {
    const btn = annual ? annualRef.current : monthRef.current
    if (btn) setPill({ width: btn.offsetWidth, x: btn.offsetLeft })
  }, [annual])

  const fire = () => {
    const btn = annualRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    confetti({
      particleCount: 80, spread: 70,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      colors: ['#C9A84C', '#F5F5F0', '#E0BC6E'],
      ticks: 300, gravity: 1.2, decay: 0.94, startVelocity: 28,
    })
  }

  const toggle = (val: boolean) => {
    if (annual === val) return
    setAnnual(val)
    if (val) fire()
  }

  return (
    <div className={styles.toggle}>
      <motion.div
        className={styles.togglePill}
        animate={{ width: pill.width, x: pill.x }}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      />
      <button ref={monthRef} className={`${styles.toggleBtn} ${!annual ? styles.toggleBtnActive : ''}`} onClick={() => toggle(false)}>
        Monthly
      </button>
      <button ref={annualRef} className={`${styles.toggleBtn} ${annual ? styles.toggleBtnActive : ''}`} onClick={() => toggle(true)}>
        Annual <span className={styles.saveBadge}>Save 25%</span>
      </button>
    </div>
  )
}

// ── Carousel ───────────────────────────────────────────────────────────────
function Carousel() {
  const { annual, openModal } = useContext(PricingCtx)
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const DRAG_THRESHOLD = 60

  const goTo = (i: number) => {
    setCurrent(((i % plans.length) + plans.length) % plans.length)
  }

  // Sync x to current index
  useEffect(() => {
    if (!trackRef.current) return
    const w = trackRef.current.offsetWidth
    x.set(-current * w)
  }, [current, x])

  const handleDragEnd = (_: never, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = Math.abs(info.offset.x) > DRAG_THRESHOLD || Math.abs(info.velocity.x) > 300
    if (swipe) {
      if (info.offset.x < 0) goTo(current + 1)
      else goTo(current - 1)
    } else {
      // snap back
      if (trackRef.current) x.set(-current * trackRef.current.offsetWidth)
    }
  }

  return (
    <div className={styles.carouselWrap}>
      {/* clipper keeps carousel clipped, viewport allows hover overflow */}
      <div className={styles.carouselClipper}>
        <div className={styles.carouselViewport} ref={trackRef}>
          <motion.div
            className={styles.carouselTrack}
            drag="x"
            dragConstraints={{ left: -(plans.length - 1) * 9999, right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            animate={{ x: trackRef.current ? -current * trackRef.current.offsetWidth : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ width: `${plans.length * 100}%` }}
          >
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`${styles.card} ${plan.isPopular ? styles.cardPopular : ''}`}
                style={{ width: `${100 / plans.length}%` }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow: '0 24px 60px rgba(201,168,76,0.2), 0 8px 24px rgba(0,0,0,0.6)',
                  borderColor: 'rgba(201,168,76,0.4)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}
              >
              {plan.isPopular && (
                <div className={styles.popularBadge}>
                  <Star size={11} fill="currentColor" />
                  Most Popular
                </div>
              )}

              <div className={styles.cardTop}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDesc}>{plan.desc}</p>
                <div className={styles.priceRow}>
                  <span className={styles.priceCurrency}>$</span>
                  <span className={styles.priceAmount}>
                    <NumberFlow value={annual ? plan.yearlyPrice : plan.price} transformTiming={{ duration: 500, easing: 'ease-out' }} />
                  </span>
                  <span className={styles.pricePeriod}>/mo</span>
                </div>
                <p className={styles.priceBilling}>{annual ? 'Billed annually' : 'Billed monthly'}</p>
              </div>

              <div className={styles.divider} />

              <ul className={styles.features}>
                {plan.features.map(f => (
                  <li key={f} className={styles.feature}>
                    <Check size={14} strokeWidth={2.5} className={styles.featureIcon} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={plan.isPopular ? styles.ctaPrimary : styles.ctaSecondary}
                onClick={() => openModal(plan.name)}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
      </div>

      {/* Nav */}
      <div className={styles.carouselNav}>
        <button className={styles.navBtn} onClick={() => goTo(current - 1)}>
          <ChevronLeft size={18} />
        </button>
        <div className={styles.dots}>
          {plans.map((_, i) => (
            <button key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
        <button className={styles.navBtn} onClick={() => goTo(current + 1)}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [modalPlan, setModalPlan] = useState<string | null>(null)
  const openModal = (plan: string) => setModalPlan(plan)
  const closeModal = () => setModalPlan(null)
  return (
    <PricingCtx.Provider value={{ annual, setAnnual, openModal }}>
      <section id="pricing" className={styles.section}>
        <div className={styles.tileGrid} />

        <div className={styles.inner}>
          {/* Left */}
          <div className={styles.left}>
            <p className="section-label">Membership</p>
            <h2 className={styles.title}>
              Invest In<br />
              <span className={styles.accent}>Your Performance</span>
            </h2>
            <p className={styles.subtitle}>
              Choose the plan that matches your ambition.<br />All memberships include no joining fee and a 7-day free trial.
            </p>
            <Toggle />
          </div>

          {/* Right — carousel */}
          <Carousel />
        </div>
      </section>

      <ContactModal
        open={modalPlan !== null}
        planName={modalPlan ?? ''}
        onClose={closeModal}
      />
    </PricingCtx.Provider>
  )
}
