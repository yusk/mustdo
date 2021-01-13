import 'reflect-metadata'
import { container } from 'tsyringe'
import {
  LocalDatabaseDataSource,
} from '../domain/repository/data_source'

// Repository bind DataSource
container.register("LocalDatabaseRepository", { useClass: LocalDatabaseDataSource });

export default container