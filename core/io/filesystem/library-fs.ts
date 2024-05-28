import { mkdir, readdir, readFile } from 'node:fs/promises'
import { readFileYaml, writeFileYaml } from '@io/filesystem/file.js'
import { Library } from '@core/library.js'

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

export const readLibrary = async (root: string, name: string) => {
	const path = getLibraryPath(root, name)
	const entries	= await readdir(path, { withFileTypes: true })
	const files = entries.filter(entry => entry.isFile())

	const items: Record<string, any> = {}

	for (const file of files) {
		const filepath = `${path}/${file.name}`
		const content = await readFileYaml(filepath)
		items[file.name] = content
	}

	return new Library(name, items)
}

export const importFile = async (root: string, name: string, file: string) => {
	const filepath = `${getLibraryPath(root, name)}/${file}.spark.yaml`
	await writeFileYaml(filepath, {})
}
