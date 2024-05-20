import { SurrealDB } from '@io/db/surreal.js'

const instance = new SurrealDB()
await instance.connect()

export { instance as SurrealDB }
