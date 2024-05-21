import path from 'node:path'
import { Command } from 'commander'
import { getIndex, writeIndex } from '@core/io/index-file.js'
import { createWorkspace } from '@core/workspace.js'
import { createLibrary } from '@core/library.js'

const program = new Command()

program
	.name('spark')
	.version('0.0.1')

const workspace =
	program.command('workspace')

workspace
	.command('init')
	.description('Create a new workspace')
	.argument('<name>', 'Name of the workspace')
	.option('-d, --dir <dir>', 'Directory to create the workspace in', '.')
	.action(async (name: string, options) => {
		const targetDir = path.resolve(process.cwd(), options.dir)
		await createWorkspace(targetDir, name)
	})

const library =
	program.command('library')

library
	.command('init')
	.description('Create a new library')
	.argument('<name>', 'Name of the library')
	.option('-d, --dir <dir>', 'Directory to create the library in', '.')
	.action(async (name: string, options) => {
		const index = await getIndex()
		if (index.hasEntry(name)) {
			console.error(`Error: Library ${name} already exists`)
			return
		}

		const targetDir = path.resolve(process.cwd(), options.dir)
		await	createLibrary(targetDir, name)

		index.addEntry(name, targetDir)
		await writeIndex(index)
	})

// seems to work with syncronous parse() too but docs say to use async
// https://github.com/tj/commander.js?tab=readme-ov-file#action-handler
await program.parseAsync()

