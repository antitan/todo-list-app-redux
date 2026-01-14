import { type MouseEvent } from 'react'
import styles from './TaskItem.module.css'
import { type Task } from '../../types/Task'

interface TaskItemProps {
  // Tâche issue du store Redux.
  task: Task
  // Handler qui déclenche une action Redux de mise à jour.
  updateTaskStatus: (id: number, completedValue: boolean) => void
  // Handler qui déclenche une action Redux de suppression.
  deleteTask: (id: number) => void
}

export const TaskItem = ({
  task,
  updateTaskStatus,
  deleteTask,
}: TaskItemProps) => {
  const handleToggle = () => {
    // Appelle le handler qui dispatch la mise à jour dans Redux.
    updateTaskStatus(task.id, !task.completed)
  }

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    // Appelle le handler qui dispatch la suppression dans Redux.
    deleteTask(task.id)
  }

  return (
    <li
      onClick={handleToggle}
      className={`${styles.container} ${task.completed ? styles.success : styles.default}`}
    >
      <div className={styles.item}>
        <div className={`${styles.id} ${task.completed ? styles.success : styles.idDefault}`}>
          {task.id}
        </div>
        <div className={task.completed ? styles.contentSuccess : styles.contentDefault}>
          {task.title}
        </div>
      </div>
      <button onClick={handleDelete} className="button-primary">
        X
      </button>
    </li>
  )
}