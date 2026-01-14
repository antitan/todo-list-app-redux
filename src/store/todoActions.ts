import {
  // Appel API pour créer un todo.
  createTodo,
  // Appel API pour récupérer tous les todos.
  fetchTodos,
  // Appel API pour supprimer un todo.
  removeTodo,
  // Appel API pour mettre à jour le statut d'un todo.
  updateTodoStatus,
} from '../services/todoService'
import type { AppDispatch} from './storeTypes'

// Utilitaire pour transformer un objet d'erreur en message compréhensible.
const getErrorMessage = (error: unknown) => error instanceof Error ? error.message : 'Une erreur est survenue'

// Petite action helper : signale au reducer que le chargement commence.
const startLoading = (dispatch: AppDispatch) => dispatch({ type: 'todos/loadPending' })

// Action asynchrone qui charge la liste des todos.
export const loadTodos = async (dispatch: AppDispatch) => {
  // On déclenche l'état "loading" dans le store.
  startLoading(dispatch)
  try {
    // Appel API pour récupérer les todos.
    const { todos } = await fetchTodos()
    // On informe le reducer du succès et on passe les données.
    dispatch({ type: 'todos/loadSuccess', payload: todos })
  } catch (error) {
    // En cas d'erreur, on envoie un message d'erreur au reducer.
    dispatch({ type: 'todos/loadError', payload: getErrorMessage(error) })
  }
}

// Action asynchrone qui ajoute un nouveau todo.
export const addTodo = async (dispatch: AppDispatch, title: string) => {
  // Nettoyage de l'entrée utilisateur pour éviter les titres vides.
  const normalizedTitle = title.trim()
  // Si le titre est vide après nettoyage, on arrête ici.
  if (!normalizedTitle) return

  // On déclenche l'état "loading".
  startLoading(dispatch)
  try {
    // Appel API pour créer le todo côté serveur.
    const newTodo = await createTodo({ title: normalizedTitle })
    // On dispatch l'action de succès avec le todo créé.
    dispatch({ type: 'todos/addSuccess', payload: newTodo })
  } catch (error) {
    // En cas d'échec, on met l'erreur dans le store.
    dispatch({ type: 'todos/loadError', payload: getErrorMessage(error) })
  }
}

// Action asynchrone pour basculer le statut terminé/non terminé.
export const toggleTodoStatus = async (
  // Dispatch pour envoyer des actions au store.
  dispatch: AppDispatch,
  // Identifiant du todo à modifier.
  id: number,
  // Nouveau statut "completed" à appliquer.
  completed: boolean,
) => {
  // On passe en mode chargement.
  startLoading(dispatch)
  try {
    // Appel API pour mettre à jour le todo.
    const updatedTodo = await updateTodoStatus({
      id,
      completed,
    })
    // On envoie l'action de succès avec le todo mis à jour.
    dispatch({ type: 'todos/updateSuccess', payload: updatedTodo })
  } catch (error) {
    // En cas d'erreur, on informe le reducer.
    dispatch({ type: 'todos/loadError', payload: getErrorMessage(error) })
  }
}

// Action asynchrone qui supprime un todo.
export const deleteTodo = async (dispatch: AppDispatch, id: number) => {
  // On passe en mode chargement.
  startLoading(dispatch)
  try {
    // Appel API pour supprimer le todo.
    await removeTodo(id)
    // On informe le reducer que la suppression a réussi.
    dispatch({ type: 'todos/deleteSuccess', payload: id })
  } catch (error) {
    // En cas d'erreur, on stocke le message d'erreur.
    dispatch({ type: 'todos/loadError', payload: getErrorMessage(error) })
  }
}