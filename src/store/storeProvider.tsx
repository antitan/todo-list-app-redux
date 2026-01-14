import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from './storeTypes'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useTodoState = () =>
  useAppSelector((state) => ({
    items: state.items,
    loading: state.loading,
    error: state.error,
  }))

export const useTodoCounts = () =>
  useAppSelector((state) => {
    const completedCount = state.items.filter((t) => t.completed).length
    return {
      completed: completedCount,
      incomplete: state.items.length - completedCount,
    }
  })
