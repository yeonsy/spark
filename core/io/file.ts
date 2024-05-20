import * as fs from 'node:fs/promises'

const indexFileName = 'index.yaml'

const getCacheDir = () => {
	const dir = process.env.XDG_CACHE_HOME || `${process.env.HOME}/.cache`
	return `${dir}/spark`
}

export const readFile = (path: string) => {
	return fs.readFile(path, 'utf8')
		.catch(err => {
			console.error(err)
			throw err
		})
}

export const readIndexFile = (path?: string) => {
	const resolvedPath = path || `${getCacheDir()}/${indexFileName}`
	console.log(`reading index file from ${resolvedPath}`)
	return readFile(resolvedPath)
}
