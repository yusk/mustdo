import 'reflect-metadata'
import { container, DependencyContainer } from 'tsyringe'
import React, { ReactNode, createContext, useContext } from 'react'

type ContextType = {
  container: DependencyContainer
}
type Props = {
  container: DependencyContainer
  children: ReactNode
}
export const InjectionContext = createContext<ContextType>({ container: container })
export const InjectionProvider = (props: Props) => {
  const { container, children } = props
  return <InjectionContext.Provider value={{ container }}>{children}</InjectionContext.Provider>
}
export const useInjection = (): ContextType => useContext(InjectionContext)
