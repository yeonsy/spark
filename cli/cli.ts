import path from 'node:path'
import { Command } from 'commander'
import { Workspace } from '@core/workspace.js'

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
		Workspace.init(targetDir, name)
	})

// seems to work with syncronous parse() too but docs say to use async
// https://github.com/tj/commander.js?tab=readme-ov-file#action-handler
await program.parseAsync()

