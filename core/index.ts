import { readIndexFile } from '@core/io/file.js'
import { parse } from 'yaml'

export class Index {
	#index: string[] = []

	// todo: typing
	constructor(yaml: any) {
		if (yaml && yaml.libraries) {
			this.#index = yaml.libraries
			console.log(`loaded index: ${JSON.stringify(this.#index)}`)
		} else {
			console.log('no libraries found in index')
		}
	}

	static async fromFile(path?: string) {
		const file = await readIndexFile(path)
		const yaml = parse(file)

		return new Index(yaml)
	}
}
