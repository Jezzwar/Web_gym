"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"

export type LayoutMode = "stack" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
}

const SWIPE_THRESHOLD = 50

export function MorphingCardStack({
  cards = [],
  defaultLayout = "stack",
  onCardClick,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (!cards || cards.length === 0) return null

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x
    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse()
  }

  const getStackStyles = (stackPosition: number) => ({
    top: stackPosition * 12,
    left: stackPosition * 8,
    zIndex: cards.length - stackPosition,
    rotate: (stackPosition - 1) * 2,
  })

  const displayCards = layout === "stack"
    ? getStackOrder()
    : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Cards */}
      <LayoutGroup>
        <motion.div
          layout
          style={{
            position: layout === 'stack' ? 'relative' : 'static',
            height: layout === 'stack' ? 393 : 'auto',
            width: layout === 'stack' ? '100%' : '100%',
            display: layout === 'list' ? 'flex' : 'block',
            flexDirection: 'column',
            gap: layout === 'list' ? 14 : 0,
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === "stack" && card.stackPosition === 0
              const stackStyles = layout === 'stack' ? getStackStyles(card.stackPosition) : {}

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    scale: layout === 'stack' && isExpanded ? 1.03 : 1,
                    x: 0,
                    ...stackStyles,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02 }}
                  onClick={() => {
                    if (isDragging) return
                    setExpandedCard(isExpanded ? null : card.id)
                    onCardClick?.(card)
                  }}
                  style={{
                    position: layout === 'stack' ? 'absolute' : 'relative',
                    width: layout === 'stack' ? '92%' : '100%',
                    height: layout === 'stack' ? 281 : 'auto',
                    background: 'rgba(30, 30, 30, 0.20)',
                    border: `1px solid ${isExpanded ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 16,
                    padding: '30px 34px',
                    cursor: isTopCard ? 'grab' : 'pointer',
                    backdropFilter: 'blur(16px)',
                    boxShadow: isExpanded
                      ? '0 0 0 1px var(--gold), 0 24px 48px rgba(0,0,0,0.6)'
                      : '0 16px 40px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    {card.icon && !isMobile && (
                      <div style={{
                        width: 52, height: 52,
                        background: 'var(--gold-dim)',
                        borderRadius: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        color: 'var(--gold)',
                      }}>
                        {card.icon}
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 36,
                        letterSpacing: '0.04em',
                        color: 'var(--white)',
                        marginBottom: 6,
                        lineHeight: 1,
                      }}>{card.title}</h3>
                      <p style={{
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: 'rgba(245,245,240,0.5)',
                        ...(layout === 'stack' || !isExpanded ? {
                          display: '-webkit-box',
                          WebkitLineClamp: layout === 'stack' ? 3 : 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        } : {}),
                      }}>{card.description}</p>
                    </div>
                  </div>

                  {isTopCard && layout === 'stack' && (
                    <p style={{
                      position: 'absolute', bottom: 12, left: 0, right: 0,
                      textAlign: 'center', fontSize: 10,
                      color: 'rgba(245,245,240,0.25)',
                      letterSpacing: '0.08em',
                    }}>SWIPE TO NAVIGATE</p>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Dots */}
      {layout === "stack" && cards.length > 1 && (
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-start', paddingTop: 8 }}>
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                height: 4,
                width: i === activeIndex ? 20 : 6,
                borderRadius: 2,
                background: i === activeIndex ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
