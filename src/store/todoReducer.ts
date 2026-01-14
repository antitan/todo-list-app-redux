import { type Task } from '../types/Task'

// Structure de l'état Redux pour les todos.
export interface TodoState {
  // Tableau de tâches chargées.
  items: Task[]
  // Indique si une requête est en cours.
  loading: boolean
  // Message d'erreur éventuel.
  error?: string
}

// Union d'actions : toutes les actions reconnues par le reducer.
export type TodoAction =
  // Début de chargement.
  | { type: 'todos/loadPending' }
  // Chargement réussi : on reçoit une liste de tâches.
  | { type: 'todos/loadSuccess'; payload: Task[] }
  // Chargement en échec : on reçoit un message d'erreur.
  | { type: 'todos/loadError'; payload: string }
  // Ajout réussi : on reçoit la tâche créée.
  | { type: 'todos/addSuccess'; payload: Task }
  // Mise à jour réussie : on reçoit la tâche modifiée.
  | { type: 'todos/updateSuccess'; payload: Task }
  // Suppression réussie : on reçoit l'id supprimé.
  | { type: 'todos/deleteSuccess'; payload: number }

// État initial : utilisé au démarrage du store.
export const initialTodoState: TodoState = {
  // Aucune tâche au départ.
  items: [],
  // Pas de chargement actif.
  loading: false,
  // Pas d'erreur au démarrage.
  error: undefined,
}

// Le reducer : applique les changements d'état selon l'action reçue.
export const todoReducer = (
  state: TodoState = initialTodoState,
  action: TodoAction,
): TodoState => {
  // Le switch permet de gérer chaque type d'action séparément.
  switch (action.type) {
    // Quand on commence un chargement.
    case 'todos/loadPending':
      // On met loading à true et on efface l'erreur précédente.
      return { ...state, loading: true, error: undefined }
    // Quand le chargement réussit.
    case 'todos/loadSuccess':
      // On met loading à false, on efface l'erreur, et on remplace la liste.
      return { ...state, loading: false, error: undefined, items: action.payload }
    // Quand le chargement échoue.
    case 'todos/loadError':
      // On met loading à false et on stocke le message d'erreur.
      return { ...state, loading: false, error: action.payload }
    // Quand un ajout réussit.
    case 'todos/addSuccess':
      // On ajoute la nouvelle tâche à la fin du tableau.
      return { ...state, loading: false, items: [...state.items, action.payload] }
    // Quand une mise à jour réussit.
    case 'todos/updateSuccess':
      // On remplace la tâche modifiée en la retrouvant par son id.
      return {
        ...state,
        loading: false,
        items: state.items.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      }
    // Quand une suppression réussit.
    case 'todos/deleteSuccess':
      // On retire la tâche dont l'id correspond.
      return {
        ...state,
        loading: false,
        items: state.items.filter((task) => task.id !== action.payload),
      }
    // Si l'action n'est pas reconnue, on renvoie l'état inchangé.
    default:
      return state
  }
}