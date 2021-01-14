import { useCallback, useState } from "react";
import { useInjection } from "../../../di_container/InjectionProvider"
import { Todo } from "../../entities";
import { LocalDatabaseRepository } from "../../repository";

export const useTodoHistory = () => {
  const { container } = useInjection()

  const localDatabaseRepository = container.resolve<LocalDatabaseRepository>('LocalDatabaseRepository');

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const fetchTodoHistory = useCallback(async (): Promise<Todo[] | undefined> => {
    console.log("fetchTodoHistory")
    if (loading) return undefined;
    setLoading(true)
    try {
      const result = await localDatabaseRepository.load<string[]>("todoHistory")
      if (result == null) {
        setLoading(false)
        return
      }
      const todoHistoryList = result.map(v => {
        const todo = JSON.parse(v)
        return new Todo(todo.title, new Date(todo.is_done))
      })
      setLoading(false)
      return todoHistoryList.reverse()
    } catch (e) {
      console.error('error', e)
      setError(e.message)
      setLoading(false)
    }
  }, [loading, localDatabaseRepository])

  const addTodoHistory = useCallback(async (todo: Todo): Promise<void> => {
    const todoHistoryList = await fetchTodoHistory()
    let stringList: string[] = []
    if (todoHistoryList !== undefined) {
      stringList = todoHistoryList.map(v => JSON.stringify(v))
    }
    stringList.push(JSON.stringify(todo))
    await localDatabaseRepository.save<String[]>("todoHistory", stringList)
  }, [localDatabaseRepository])

  const removeTodoHistory = useCallback(async (): Promise<void> => {
    await localDatabaseRepository.remove("todoHistory")
  }, [localDatabaseRepository])

  return {
    fetchTodoHistory,
    addTodoHistory,
    removeTodoHistory,
    error,
  }
}