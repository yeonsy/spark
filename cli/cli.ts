import { Command } from 'commander'

const program = new Command()

program
	.name('spark')
	.description('CLI tool for managing Spark libraries')
	.version('0.0.1')

program.parse()

console.log('parsed commands', program.args)
