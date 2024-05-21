import { readFileYaml, getCacheDir } from '@core/io/file.js'
import { Index } from '@core/index.js'

const indexFilename = 'index.yaml'
const indexFilepath = `${getCacheDir()}/${indexFilename}`

export const loadIndex = async () => {
	console.log(`loading index from ${indexFilepath}`)

	const yaml = await readFileYaml(indexFilepath)
	const libraries = yaml?.libraries || []

	const index = new Index(libraries)
	console.log(`loaded index: ${JSON.stringify(index.getEntries())}`)

	return index
}