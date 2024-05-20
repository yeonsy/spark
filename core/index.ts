import { readIndexFile } from '@core/io/file.js'
import { parse } from 'yaml'

export class Index {
	#index: { [key: string]: string } = {}

	// todo: typing
	constructor(yaml: any) {
		const libraries = yaml?.libraries

		if (!libraries?.[Symbol.iterator]) {
			console.error('no libraries found in index')
			return
		}

		for (const library of libraries) {
			if (library?.name && library?.location) {
				this.#index[library.name] = library.location
			} else {
				console.error('could not load library: missing name or location')
			}
		}

		console.log(`loaded index: ${JSON.stringify(this.#index)}`)
	}

	static async fromFile(path?: string) {
		const file = await readIndexFile(path)
		const yaml = parse(file)

		return new Index(yaml)
	}
}
