import { store } from "./store"


// RootState = état racine du store (ici = TodoState)
export type RootState = ReturnType<typeof store.getState>
// Dispatch typé (utile si thunks / RTK async)
export type AppDispatch = typeof store.dispatch