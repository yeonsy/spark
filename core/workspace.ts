import { mkdir } from 'node:fs/promises'

// todo: maybe make this configurable?
const WORKSPACE_PATH = '.spark/workspaces'

export const getWorkspacePath = (root: string, name: string) => {
	return `${root}/${WORKSPACE_PATH}/${name}`
}

export const createWorkspace = async (root: string, name: string) => {
	// recursive mkdir does not throw if the directory already exists
	// maybe worth checking if the directory exists ourselves?
	const path = getWorkspacePath(root, name)
	await mkdir(path, { recursive: true })
	console.log(`Created new workspace at ${path}`)
}

export class Workspace {
	root: string
	name: string

	constructor(root: string, name: string) {
		this.root = root
		this.name = name
	}

	get path() {
		return getWorkspacePath(this.root, this.name)
	}

	async init() {
		await createWorkspace(this.root, this.name)
	}
}
