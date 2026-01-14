import { useEffect } from 'react'
import { Header } from '../components/header/header'
import { TaskInput } from '../components/taskInput/taskInput'
import { TaskList } from './taskList/taskList'
import { Footer } from '../components/footer/footer'
// Actions Redux asynchrones pour interagir avec le store et l'API.
import { deleteTodo, addTodo, loadTodos, toggleTodoStatus } from '../store/todoActions'
// Hooks Redux "maison" pour dispatcher et lire l'état.
import { useTodoCounts, useTodoState } from '../store/storeProvider'
import { useDispatch } from 'react-redux'

export const TaskContainer = () => {
  // Récupère la fonction dispatch du store Redux.
  const dispatch = useDispatch()
  // Sélectionne les données Redux nécessaires à l'affichage.
  const { items, loading, error } = useTodoState()
  // Récupère des compteurs dérivés calculés depuis l'état Redux.
  const { completed, incomplete } = useTodoCounts()

  // Chargement initial des todos depuis le store/serveur.
  useEffect(() => {
    // Dispatch d'une action asynchrone qui alimente le store.
    void loadTodos(dispatch)
  }, [dispatch])

  // Handler de création de todo : déclenche une action Redux async.
  const handleAddNewTask = (title: string) => {
    void addTodo(dispatch, title)
  }

  const handleUpdateTaskStatus = (id: number, completedValue: boolean) => {
    // Lecture locale d'une tâche issue de l'état Redux (items).
    const currentTask = items.find((task) => task.id === id)

    // Si le statut est déjà identique, on évite un dispatch inutile.
    if (currentTask && currentTask.completed === completedValue) return

    // Sinon, on dispatch l'action de mise à jour.
    void toggleTodoStatus(dispatch, id, completedValue)
  }

  // Handler de suppression : déclenche une action Redux async.
  const handleDeleteTask = (id: number) => {
    void deleteTodo(dispatch, id)
  }

  return (
    <main>
      <Header />
      {/* On passe l'état Redux (loading) et le handler dispatché en props. */}
      <TaskInput addNewTask={handleAddNewTask} loading={loading} />
      {/* TaskList reçoit la liste issue du store Redux et les handlers Redux. */}
      <TaskList
        taskList={items}
        incompletedTasks={incomplete}
        updateTaskStatus={handleUpdateTaskStatus}
        deleteTask={handleDeleteTask}
        loading={loading}
        error={error}
      />
      {/* Le footer utilise le compteur dérivé du state Redux. */}
      <Footer completedTasks={completed} />
    </main>
  )
}