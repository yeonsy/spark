export class Index {
	#index: { [key: string]: string } = {}

	// todo: typing
	constructor(entries: any[]) {
		for (const entry of entries) {
			if (entry?.name && entry?.location) {
				this.#index[entry.name] = entry.location
			} else {
				console.error('could not load library: missing name or location')
			}
		}
	}

	addEntry(name: string, location: string) {
		if (this.#index[name]) {
			console.error(`could not add index entry: ${name} already exists`)
			throw new Error()
		}

		this.#index[name] = location
	}

	hasEntry(name: string) {
		return !!this.#index[name]
	}

	getEntries() {
		return Object.entries(this.#index).map(
			([name, location]) => ({ name, location })
		)
	}
}
