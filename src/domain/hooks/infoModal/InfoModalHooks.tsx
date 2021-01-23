import { useCallback, useState } from "react";
import { useInjection } from "../../../di_container/InjectionProvider"
import { LocalDatabaseRepository } from "../../repository";

export const useInfoModal = () => {
  const { container } = useInjection();

  const localDatabaseRepository = container.resolve<LocalDatabaseRepository>('LocalDatabaseRepository');

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const checkIsInitialStartup = useCallback(async (): Promise<boolean | undefined> => {
    console.log("called fetchTodo")
    if (loading) return undefined;
    setLoading(true)
    try {
      const result = await localDatabaseRepository.load<string>("isInitialStartup");
      if (result == null) {
        return false
      }
      setLoading(false)
      return result == 'true'
    } catch (e) {
      console.error('error', e)
      setError(e.message)
      setLoading(false)
    }
  }, [loading, localDatabaseRepository])

  const saveIsInitialStartup = useCallback(async (): Promise<void> => {
    await localDatabaseRepository.save<string>("isInitialStartup", true.toString());
  }, [localDatabaseRepository])

  return {
    loading,
    error,
    checkIsInitialStartup,
    saveIsInitialStartup,
  }
}
