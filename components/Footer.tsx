import styles from './Footer.module.css'

const links = {
  Programs: ['Cardio', 'Strength Training', 'Yoga', 'Combat Sports', 'Personal Training'],
  Membership: ['Basic Plan', 'Performance Plan', 'Forzax Plan', 'Corporate', 'Student Discount'],
  Company: ['About Us', 'Trainers', 'Blog & News', 'Careers', 'Press'],
  Support: ['FAQ', 'Contact', 'Booking Policy', 'Terms', 'Privacy'],
}

const contact = [
  { label: 'Location', value: '14 Goldsmith Ave, City Center' },
  { label: 'Phone', value: '+1 (800) FORZAX' },
  { label: 'Email', value: 'hello@forzax.club' },
  { label: 'Hours', value: 'Mon – Sun, 5:00 AM – 11:00 PM' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              FORZAX<span className={styles.dot}>.</span>
            </a>
            <p className={styles.tagline}>
              Build your strongest body with world-class trainers and premium facilities.
            </p>
            <div className={styles.socials}>
              {['Instagram', 'YouTube', 'Twitter', 'TikTok'].map(s => (
                <a key={s} href="#" className={styles.social} aria-label={s}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group} className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>{group}</h4>
              <ul className={styles.linkList}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className={styles.link}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className={styles.contactStrip}>
          {contact.map(({ label, value }) => (
            <div key={label} className={styles.contactItem}>
              <span className={styles.contactLabel}>{label}</span>
              <span className={styles.contactValue}>{value}</span>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2026 FORZAX Fitness Club. All rights reserved.</p>
          <p className={styles.copy}>Designed for champions.</p>
        </div>
      </div>
    </footer>
  )
}
