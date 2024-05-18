import { Surreal } from 'surrealdb.js'

const defaultPort = 8000
const surrealDB = new Surreal()

const createConnection = async (port: number = defaultPort) => {
	const connectStr = `http://127.0.0.1:${port}/rpc`
	console.log(`Attempting to connect to surrealdb at ${connectStr}`)

	await surrealDB.connect(connectStr)
	await surrealDB.use({
		namespace: 'spark',
		database: 'spark',
	})

	console.log('Connected to surrealdb successfully')
	// todo: handle errors
}

await createConnection()

// CREATE $identifier CONTENT $data
const create = (identifier: string, data: any) => {
	return surrealDB.create(identifier, data)
}

// SELECT * FROM $identifier
const select = (identifier: string) => {
	return surrealDB.select(identifier)
}

// INSERT INTO $identifier $data
const insert = (identifier: string, data: any) => {
	return surrealDB.insert(identifier, data)
}

// UPDATE $identifier CONTENT $data
const update = (identifier: string, data: any) => {
	return surrealDB.update(identifier, data)
}

// DELETE * FROM $identifier
const remove = (identifier: string) => {
	return surrealDB.delete(identifier)
}

// arbitrary queries
const query = (query: string, vars: any) => {
	return surrealDB.query(query, vars)
}

export { create, select, insert, update, remove as delete, query }
