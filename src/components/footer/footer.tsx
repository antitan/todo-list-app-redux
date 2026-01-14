import styles from './Footer.module.css'

interface FooterProps {
  // Compteur issu du store Redux (via selector dans le container).
  completedTasks: number
}

export const Footer = ({ completedTasks }: FooterProps) => {
  // Affiche un résumé seulement si Redux indique des tâches terminées.
  if (completedTasks > 0) {
    return (
      <footer>
        <code className={styles.footer}>{completedTasks} taches terminées</code>
      </footer>
    )
  }
  return null
}