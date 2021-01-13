import { localDatabaseKey } from './dto/input/LocalDatabase'

export interface LocalDatabaseRepository {
  save<T> (key: keyof typeof localDatabaseKey, value: T): Promise<T>
  load<T> (key: keyof typeof localDatabaseKey): Promise<T>
  remove (key: keyof typeof localDatabaseKey): Promise<void>
}