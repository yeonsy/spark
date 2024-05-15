import { mkdir } from 'node:fs/promises'

// todo: maybe make this configurable?
const WORKSPACE_PATH = '.spark/workspaces'

export class Workspace {
	root: string
	name: string

	constructor(root: string, name: string) {
		this.root = root
		this.name = name
	}

	static getPath(root: string, name: string) {
		return `${root}/${WORKSPACE_PATH}/${name}`
	}

	get path() {
		return Workspace.getPath(this.root, this.name)
	}

	static async init(root: string, name: string) {
		// recursive mkdir does not throw if the directory already exists
		// maybe worth checking if the directory exists ourselves?
		const path = Workspace.getPath(root, name)
		await mkdir(path, { recursive: true })
		console.log(`Created new workspace at ${path}`)
	}

	init() {
		Workspace.init(this.root, this.name)
	}
}
