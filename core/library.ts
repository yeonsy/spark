import { mkdir } from 'node:fs/promises'

// todo: maybe make this configurable?
const LIBRARY_PATH = '.spark/libaries'

export class Library {
	root: string
	name: string

	constructor(root: string, name: string) {
		this.root = root
		this.name = name
	}

	static getPath(root: string, name: string) {
		return `${root}/${LIBRARY_PATH}/${name}`
	}

	get path() {
		return Library.getPath(this.root, this.name)
	}

	static async init(root: string, name: string) {
		// recursive mkdir does not throw if the directory already exists
		// maybe worth checking if the directory exists ourselves?
		const path = Library.getPath(root, name)
		await mkdir(path, { recursive: true })
		console.log(`Created new libary at ${path}`)
	}

	init() {
		Library.init(this.root, this.name)
	}
}
