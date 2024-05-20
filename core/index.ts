import { readFile } from '@core/io.js'
import { parse } from 'yaml'

export class Index {
	#index: string[] = []

	// todo: typing
	constructor(yaml: any) {
		this.#index = yaml.libraries
		console.log(`loaded index: ${JSON.stringify(this.#index)}`)
	}

	static async fromFile(path: string) {
		const file = await readFile(path)
		const yaml = parse(file)

		return new Index(yaml)
	}
}
