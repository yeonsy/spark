import * as fs from 'node:fs/promises'

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
