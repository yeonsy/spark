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

	getEntries() {
		return Object.entries(this.#index).map(
			([name, location]) => ({ name, location })
		)
	}
}
