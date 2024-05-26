import { readFileYaml, writeFileYaml, getCacheDir } from '@io/filesystem/file.js'
import { Index } from '@core/index.js'

// global index file
const indexFilename = 'index.yaml'
const indexFilepath = `${getCacheDir()}/${indexFilename}`

export class IndexFile {
	path: string
	#cachedIndex?: Index

	constructor(path: string) {
		this.path = path
	}

	async lazyLoadIndex() {
		if (!this.#cachedIndex) {
			console.log(`loading index from ${this.path}`)
			await this.loadIndex()
			console.log('loaded index:', await this.getEntries())
		}
	}

	async loadIndex() {
		const yaml = await readFileYaml(this.path)
		const libraries = yaml?.libraries || []

		this.#cachedIndex = new Index(libraries)
		return this.#cachedIndex
	}

	async #writeIndex() {
		const libraries = await this.getEntries()
		await writeFileYaml(this.path, { libraries })
	}

	async setIndex(index: Index) {
		this.#cachedIndex = index
		await this.#writeIndex()
	}

	async addEntry(name: string, location: string) {
		await this.lazyLoadIndex()
		this.#cachedIndex!.addEntry(name, location)
		await this.#writeIndex()
	}

	async hasEntry(name: string) {
		await this.lazyLoadIndex()
		return this.#cachedIndex!.hasEntry(name)
	}

	async getEntries() {
		await this.lazyLoadIndex()
		return this.#cachedIndex!.getEntries()
	}
}

export const globalIndex = new IndexFile(indexFilepath)
