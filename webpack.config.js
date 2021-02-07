const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
	plugins: [
		new PrerenderSPAPlugin({
			// Required - The path to the webpack-outputted app to prerender.
			staticDir: path.join(__dirname, 'dist'),
			// Required - Routes to render.
			routes: ['/', '/m-home', 'projects'],
		})
	],
	module: {
		rules: [
			// ... other rules omitted

			// this will apply to both plain `.scss` files
			// AND `<style lang="scss">` blocks in `.vue` files
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'vue-style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'resolve-url-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sourceMapContents: false,
							// data: "@import './src/sass/_variables.scss'"
						}
					},
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					}

				]
				// 
			}
		]
	},
	// plugin omitted
}