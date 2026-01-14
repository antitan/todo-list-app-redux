import { type Task } from '../types/Task'

const buildUrl = (path: string, searchParams?: URLSearchParams) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost')

  const url = new URL(path, baseUrl)

  if (searchParams?.toString()) {
    url.search = searchParams.toString()
  }

  return url.toString()
}

export interface FetchTodosOptions {
  page?: number
  pageSize?: number
}

export interface FetchTodosResponse {
  todos: Task[]
  total: number
}

export const fetchTodos = async ({
  page = 1,
  pageSize,
}: FetchTodosOptions = {}): Promise<FetchTodosResponse> => {
  const searchParams = new URLSearchParams()
  searchParams.set('page', page.toString())
  if (pageSize) {
    searchParams.set('pageSize', pageSize.toString())
  }

  const response = await fetch(buildUrl('/todos/lists', searchParams))

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  const data = await response.json()

  if (Array.isArray(data)) {
    return { todos: data, total: data.length }
  }

  const todos = (data?.items ?? data?.todos ?? []) as Task[]
  const total = Number.isFinite(data?.total) ? data.total : todos.length

  return { todos, total }
}

export const createTodo = async (dto: Pick<Task, 'title'>): Promise<Task> => {
  const response = await fetch(buildUrl('/todos/add'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })

  if (!response.ok) {
    throw new Error('Failed to create todo')
  }

  return (await response.json()) as Task
}

export const updateTodoStatus = async (
  dto: Pick<Task, 'id' | 'completed'>,
): Promise<Task> => {
  const response = await fetch(buildUrl('/todos/update-status'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })

  if (!response.ok) {
    throw new Error('Failed to update todo')
  }

  return (await response.json()) as Task
}

export const removeTodo = async (id: number): Promise<void> => {
  const searchParams = new URLSearchParams()
  searchParams.set('id', id.toString())

  const response = await fetch(buildUrl('/todos/delete', searchParams), {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }
}