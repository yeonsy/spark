const rootDir = import.meta.dirname

export default {
	mode: 'development',
	entry: {
		cli: {
			import: './cli/cli.ts',
			chunkLoading: false,
		},
		server: {
			import: './server/server.ts',
			chunkLoading: false,
		},
		web: './web/web.ts',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					'loader': 'ts-loader',
					'options': {
						'projectReferences': true,
					}
				}
			}
		]
	},
	output: {
		path:	`${rootDir}/.built`,
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
		extensionAlias: {
			'.js': ['.js', '.ts'],
		},
		alias: {
			"@": `${rootDir}`,
			"@core": `${rootDir}/core`,
			"@cli": `${rootDir}/cli`,
			"@web": `${rootDir}/web`,
			"@server": `${rootDir}/server`,
		}
	}
}
