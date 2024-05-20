import * as fs from 'node:fs/promises'

const indexFileName = 'index.yaml'

export const readFile = (path: string) => {
	return fs.readFile(path, 'utf8')
		.catch(err => {
			console.error(err)
			throw err
		})
}
