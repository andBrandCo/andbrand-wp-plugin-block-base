/**
 * This is a main entrypoint for Webpack config.
 * All the settings are pulled from node_modules/@eightshift/frontend-libs/webpack.
 * We are loading mostly used configuration but you can always override or turn off the default setup and provide your own.
 * Please referer to Eightshift-libs wiki for details.
 * Docs: https://infinum.github.io/eightshift-docs/docs/basics/webpack
 * Config options :
 * projectDir
 * projectUrl
 * projectPath
 * assetsPath
 * blocksAssetsPath
 * outputPath
 * blocksManifestSettingsPath
 * useSsl
 */

 module.exports = (env, argv) => {

	const projectConfig = {
		config: {
			projectDir: __dirname, // Current project directory absolute path.
			projectUrl: 'andbrand.co.lndo.site', // Used for providing browsersync functionality.
			projectPath: 'wp-content/plugins/andbrand-wp-plugin-block-base', // Project path relative to project root.
		},
	};

	//return require('./node_modules/@eightshift/frontend-libs/webpack')(argv.mode, projectConfig);


	//Generate Webpack config for this project using options object.
  	const project = require('./node_modules/@eightshift/frontend-libs/webpack')(argv.mode, projectConfig);

	const resolve = {
		symlinks: false,
		fallback: {
			crypto: require.resolve("crypto-browserify"),
			stream: require.resolve("stream-browserify"),
		}
	}


	return {
		// Load all projects config from eightshift-frontend-libs.
		...project,

		plugins: [
			// Load all plugins config from eightshift-frontend-libs.
			...project.plugins,
		],
		resolve,

	}
};