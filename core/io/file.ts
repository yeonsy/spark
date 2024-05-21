import * as fs from 'node:fs/promises'
import { parse, stringify } from 'yaml'
import writeFileAtomic from 'write-file-atomic'

export const getCacheDir = () => {
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

export const readFileYaml = (path: string) => {
	return readFile(path).then(parse)
}

export const writeFile = (path: string, data: string) => {
	return writeFileAtomic(path, data)
		.catch(err => {
			console.error(err)
			throw err
		})
}

export const writeFileYaml = (path: string, data: any) => {
	return writeFile(path, stringify(data))
}
