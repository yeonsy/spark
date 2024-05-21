import { readFile, getCacheDir } from '@core/io/file.ts'

const indexFileName = 'index.yaml'

export const readIndexFile = (path?: string) => {
	const resolvedPath = path || `${getCacheDir()}/${indexFileName}`
	console.log(`reading index file from ${resolvedPath}`)
	return readFile(resolvedPath)
}
