import { merge } from 'webpack-merge'
const rootDir = import.meta.dirname

const commonConfig = {
	mode: 'development',
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
		}
	}
}

const webConfig = merge(commonConfig, {
	target: 'web',
	entry: './web/web.ts',
})

const nodeConfig = merge(commonConfig, {
	target: 'node20',
	entry: {
		cli: {
			import: './cli/cli.ts',
			chunkLoading: false,
			filename: 'spark',
		},
		server: {
			import: './server/server.ts',
			chunkLoading: false,
		},
	},
	output: {
		module: true,
	},
	resolve: {
		alias: {
			"@core": `${rootDir}/core`,
			"@io": `${rootDir}/core/io`,
			"@cli": `${rootDir}/cli`,
			"@server": `${rootDir}/server`,
		}
	},
	experiments: {
		outputModule: true,
	}
})

export default [webConfig, nodeConfig]
