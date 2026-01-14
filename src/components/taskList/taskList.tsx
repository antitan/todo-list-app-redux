import styles from './TaskList.module.css'
import { TaskItem } from '../taskItem/taskItem'
import { type Task } from '../../types/Task'

interface TaskListProps {
  // Liste des tâches provenant du state Redux.
  taskList: Task[]
  // Compteur dérivé (calculé depuis Redux dans le container).
  incompletedTasks: number
  // Indique l'état de chargement issu du store Redux.
  loading: boolean
  // Message d'erreur issu du store Redux.
  error?: string
  // Handler qui finit par dispatcher une action Redux.
  updateTaskStatus: (id: number, completedValue: boolean) => void
  // Handler qui finit par dispatcher une action Redux.
  deleteTask: (id: number) => void
}

export const TaskList = ({
  taskList,
  incompletedTasks,
  updateTaskStatus,
  deleteTask,
  loading,
  error,
}: TaskListProps) => {
  // Si Redux indique un chargement, on affiche un état d'attente.
  if (loading) {
    return (
      <div className="box">
        <h2 className={styles.title}>Chargement des taches...</h2>
      </div>
    )
  }

  // Si Redux a signalé une erreur, on l'affiche.
  if (error) {
    return (
      <div className="box">
        <h2 className={styles.title}>Erreur lors de la récupération des taches</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (taskList && taskList.length > 0) {
    return (
      <div className="box">
        <h2 className={styles.title}>
          {incompletedTasks > 0 && <> Il reste {incompletedTasks} taches a faire</>}
          {incompletedTasks === 0 && <> Toutes les taches sont terminées</>}
        </h2>

        <ul className={styles.container}>
          {taskList.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div className="box">
        <h2 className={styles.title}>Aucune tache disponible</h2>
      </div>
    )
  }
}