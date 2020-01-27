const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
	
	const { mode = 'development' } = env;

	const isProd = mode === 'production';
	const isDev = mode === 'development';
	
	const getStyleLoaders = () => {
		return [
			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
			'css-loader'
		];
	};

	const getPlugins = () => {
		const plugins = [
			new HtmlWebpackPlugin({
				template: 'public/index.html'
			})			
		];
		if (isProd) {
			plugins.push(
				new MiniCssExtractPlugin({
					filename: 'main-[hash:8].css'
				})
			);
		}

		return plugins;
	};

	return {	
		mode: isProd ? 'production': isDev && 'development',

		output: {
			filename: isProd ? 'main-[hash:8].js' : undefined    // когда undefined, то имя будет по умолчанию
		}, 

		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				// Loading images
				// {
				// 	test: /\.(png|jpe?g|ico|gif)$/,
				// 	use: [
				// 		{ 
				// 			loader: 'file-loader',
				// 			options: {
				// 				// outputPath: 'images',
				// 				// name: '[name]-[sha1:hash:5].[ext]'
				// 				name: '[name].[ext]'
				// 			}
				// 		}
				// 	]
				// },
				{
					test: /\.(png|jpe|ico)$/,
					use: [
					  {
						loader: 'file-loader',
						options: {
						  name: '[name].[ext]'
						}
					  }
					]
				},
				// Loading fonts
				{   
					test: /\.(ttf|otf|eot|woff|woff2)$/,
					use: [
						{ 
							loader: 'file-loader',
							options: {
								outputPath: 'fonts',
								name: '[name].[ext]'
							}
						}
					]
				},
				// Loading CSS
				{   
					test: /\.(css)$/,
					use: getStyleLoaders()
				},
				// Loading SASS/SCSS
				{   
					test: /\.(s[ca]ss)$/,
					use: [ ...getStyleLoaders(), 'sass-loader' ]
				}
			]
		},

		plugins: getPlugins(),

		devServer: {
			open: true,      // чтобы при запуске открывалась страница в браузере
			historyApiFallback: true,   // чтобы корректно работал роутинк в React
			port: 3000
		}
	}
};