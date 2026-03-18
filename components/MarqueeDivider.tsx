import styles from './MarqueeDivider.module.css'

const brands = ['ProForm', 'Technogym', 'NordicTrack', 'Life Fitness', 'Hammer', 'Bowflex', 'Rogue', 'Precor', 'Cybex', 'Matrix', 'Assault', 'Concept2', 'Eleiko', 'TechnoGym', 'ProForm', 'Technogym', 'NordicTrack', 'Life Fitness', 'Hammer', 'Bowflex', 'Rogue', 'Precor', 'Cybex', 'Matrix', 'Assault', 'Concept2', 'Eleiko', 'TechnoGym']

export default function MarqueeDivider() {
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {brands.map((b, i) => (
          <span key={i} className={styles.brand}>{b}</span>
        ))}
      </div>
    </div>
  )
}
