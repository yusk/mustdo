import { createContext, ReactNode, useEffect, useState } from "react"
import { Todo } from "../../entities/todo"
import { useInjection } from "../../../di_container/InjectionProvider"
import { LocalDatabaseRepository } from "../../repository"

export const _useSample = () => {
  const { container } = useInjection()

  // Repository
  const localDatabaseRepository = container.resolve<LocalDatabaseRepository>('LocalDatabaseRepository');

  // State
  const [state, setState] = useState<SampleContextType>({ loading: true })

  useEffect(() => {
    console.log("called _useSample useEffect ")

    const fetchSample = async () => {
      console.log("called fetchSample ")
      /// LocalStorageから進行系のSampleを取得 
      const result = await localDatabaseRepository.load<string>("currentTodo");
      console.log(result)
      if (result == null) {
        setState({ loading: false })
        return
      }
      const todo = JSON.parse(result)
      setState({
        todo: todo,
        loading: false,
      })
    }
    fetchSample()
    return () => { }
  }, [])

  return {
    todo: state.todo,
    loading: state.loading,

  }
}

type SampleContextType = {
  todo?: Todo
  loading: boolean
}

export const SampleContext = createContext<SampleContextType>({ loading: false });
export const SampleProvider = ({ children }: { children: ReactNode }) => {
  const { todo, loading } = _useSample()
  return (
    <SampleContext.Provider
      value={{
        todo: todo,
        loading: loading,
      }}
    >
      {children}
    </SampleContext.Provider>
  )
}