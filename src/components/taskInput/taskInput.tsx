// Ce composant est utilisé pour afficher le champ de saisie de tâche.

import { type ChangeEvent, type FormEvent, useState } from 'react'
import styles from './TaskInput.module.css'

interface TaskInputProps {
  // Fonction fournie par le container : déclenche une action Redux.
  addNewTask: (title: string) => void
  // Indique l'état de chargement provenant du store Redux.
  loading?: boolean
}

export const TaskInput = ({ addNewTask, loading = false }: TaskInputProps) => {
  const [taskTitle, setTaskTitle] = useState('')

  const handleinputChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Appelle le handler qui dispatch l'action Redux d'ajout.
    addNewTask(taskTitle)
    setTaskTitle('')
  }

  return (
    <div className={`box ${styles.element}`}>
      <h2 className={styles.title}>Ajouter nouvelle tache</h2>
      <form className={styles.container} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Tache"
          value={taskTitle}
          onChange={handleinputChangeEvent}
        />
        {/* Le bouton est désactivé si le store Redux est en chargement. */}
        <button className="button-primary" type="submit" disabled={loading}>
          Ajouter
        </button>
      </form>
    </div>
  )
}