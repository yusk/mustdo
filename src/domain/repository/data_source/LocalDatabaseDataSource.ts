import localforage from "localforage"
import { injectable } from "tsyringe"
import { localDatabaseKey } from "../dto/input/LocalDatabase"
import { LocalDatabaseRepository } from "../LocalDatabaseRepository"

@injectable()
export class LocalDatabaseDataSource implements LocalDatabaseRepository {
  async save<T> (key: keyof typeof localDatabaseKey, value: T) {
    try {
      return await localforage.setItem<T>(localDatabaseKey[key], value)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async load<T> (key: keyof typeof localDatabaseKey): Promise<T> {
    try {
      return await localforage.getItem<T>(localDatabaseKey[key])
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async remove (key: keyof typeof localDatabaseKey) {
    try {
      await localforage.removeItem(localDatabaseKey[key])
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}