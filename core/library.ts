export class Library {
	name: string
	#items: { [key: string]: any }

	// todo: types
	constructor(name: string, items?: any) {
		this.name = name
		this.#items = items || {}
	}

	getName() {
		return this.name
	}

	getItem(name: string) {
		return this.#items[name]
	}

	hasItem(name: string) {
		return !!this.#items[name]
	}

	addItem(name: string, item: any) {
		this.#items[name] = item
	}

	removeItem(name: string) {
		delete this.#items[name]
	}

	getItems() {
		return this.#items
	}
}
