import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import autoprefixer from 'autoprefixer'
import PurgeCSS from '@fullhuman/postcss-purgecss'

const __dirname = dirname(fileURLToPath(import.meta.url))

const isProduction = process.env.NODE_ENV === 'production'

const postCssPlugins = [autoprefixer]

const postCssProductionPlugins = [
    ...postCssPlugins,
    PurgeCSS({
        content: ['./dist/*.html', './dist/public/js/*.js'],
    }),
]

const config = {
    context: resolve(__dirname, 'src'),
    entry: {
        index: ['./ts/index.tsx', './scss/index.scss'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `public/css/[name].css`,
        }),
        new HtmlWebpackPlugin({
            template: './html/index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: ['index'],
            publicPath: '/',
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'asset', to: `public/asset` }],
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
                                plugins: isProduction
                                    ? postCssProductionPlugins
                                    : postCssPlugins,
                            },
                        },
                    },
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: `public/fonts/[name][ext]`,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss'],
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: `public/js/[name].js`,
        publicPath: '/',
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    devServer: {
        static: false,
        compress: true,
        port: 9000,
    },
    devtool: isProduction ? false : 'eval-source-map',
}

export default config
