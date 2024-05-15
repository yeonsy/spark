import { mkdir } from 'node:fs/promises'

// todo: maybe make this configurable?
const LIBRARY_PATH = '.spark/libaries'

export const getLibraryPath = (root: string, name: string) => {
	return `${root}/${LIBRARY_PATH}/${name}`
}

export const createLibrary = async (root: string, name: string) => {
	// recursive mkdir does not throw if the directory already exists
	// maybe worth checking if the directory exists ourselves?
	const path = getLibraryPath(root, name)
	await mkdir(path, { recursive: true })
	console.log(`Created new libary at ${path}`)
}

export class Library {
	root: string
	name: string

	constructor(root: string, name: string) {
		this.root = root
		this.name = name
	}

	get path() {
		return getLibraryPath(this.root, this.name)
	}

	async init() {
		await createLibrary(this.root, this.name)
	}
}
