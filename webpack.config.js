module.exports = (_, argv) => {
    const path = require('path')

    /**
     * Plugins.
     */
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
    const TerserWebpackPlugin = require('terser-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    /**
     * Current webpack mode.
     */
    const devMode = argv.mode === 'development'

    return {
        target: 'electron-main',
        entry: {
            main: ['./src/ts/main.ts'],
            index: ['./src/ts/index.tsx', './src/scss/index.scss'],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/index.css',
            }),
            new HtmlWebpackPlugin({
                template: './src/html/index.html',
                inject: 'body',
                chunks: ['index'],
                publicPath: '.',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/i,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer'),
                                        require('tailwindcss'),
                                    ],
                                },
                            },
                        },
                        'resolve-url-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.scss'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].js',
            publicPath: '/',
        },
        optimization: {
            minimize: !devMode,
            minimizer: [
                new TerserWebpackPlugin({
                    extractComments: 'some',
                }),
                new CssMinimizerWebpackPlugin(),
            ],
            moduleIds: 'deterministic',
        },
        devtool: devMode ? 'inline-source-map' : false,
    }
}
