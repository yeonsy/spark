import { Surreal } from 'surrealdb.js'

const defaultHost = '127.0.0.1'
const defaultPort = 8000

export class SurrealDB {
	readonly #db
	readonly #host
	readonly #port

	constructor(host: string = defaultHost, port: number = defaultPort) {
		this.#db = new Surreal()
		this.#host = host
		this.#port = port
	}

	getConnectionStr() {
		return `http://${this.#host}:${this.#port}/rpc`
	}

	async connect() {
		const connectStr = this.getConnectionStr()
		console.log(`Attempting to connect to surrealdb at ${connectStr}`)

		await this.#db.connect(connectStr)
		await this.#db.use({
			namespace: 'spark',
			database: 'spark',
		})

		console.log('Connected to surrealdb successfully')
		// todo: handle error
	}

	// CREATE $identifier CONTENT $data
	create(identifier: string, data: any) {
		return this.#db.create(identifier, data)
	}

	// SELECT * FROM $identifier
	select(identifier: string) {
		return this.#db.select(identifier)
	}

	// INSERT INTO $identifier $data
	insert(identifier: string, data: any) {
		return this.#db.insert(identifier, data)
	}

	// UPDATE $identifier CONTENT $data
	update(identifier: string, data: any) {
		return this.#db.update(identifier, data)
	}

	// DELETE * FROM $identifier
	delete(identifier: string) {
		return this.#db.delete(identifier)
	}

	// arbitrary queries
	query(query: string, vars: any) {
		return this.#db.query(query, vars)
	}
}
