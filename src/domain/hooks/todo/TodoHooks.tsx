import { useCallback, useState } from "react"
import { useInjection } from "../../../di_container/InjectionProvider"
import { Todo } from "../../entities/index"
import { LocalDatabaseRepository } from "../../repository"

export const useTodo = () => {
  const { container } = useInjection()
  // Repository
  const localDatabaseRepository = container.resolve<LocalDatabaseRepository>('LocalDatabaseRepository');

  // State
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // UseCase
  const fetchTodo = useCallback(async (): Promise<Todo | undefined> => {
    console.log("called fetchTodo")
    if (loading) return undefined;
    setLoading(true)
    try {
      // localStorageから取得
      const result = await localDatabaseRepository.load<string>("currentTodo");
      if (result == null) {
        setLoading(false)
        return
      }
      const todo = JSON.parse(result)
      setLoading(false)
      return todo
    } catch (e) {
      console.error('error', e)
      setError(e.message)
      setLoading(false)
    }
  }, [loading, localDatabaseRepository])

  const saveCurrentTodo = useCallback(async (title: string): Promise<Todo> => {
    console.log(`called saveTodo`)
    const todo = new Todo(title, null)
    await localDatabaseRepository.save<string>("currentTodo", JSON.stringify(todo))
    return todo
  }, [localDatabaseRepository])

  const doneCurrentTodo = useCallback(async (currentTodo: Todo): Promise<Todo> => {
    currentTodo.is_done = new Date()
    await localDatabaseRepository.remove("currentTodo")
    return currentTodo
  }, [localDatabaseRepository])

  return {
    fetchTodo,
    saveCurrentTodo,
    doneCurrentTodo,
    loading,
    error,
  }
}