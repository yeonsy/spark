import { SurrealDB } from '@persistence/surreal.js'

const instance = new SurrealDB()
await instance.connect()

export { instance as SurrealDB }
