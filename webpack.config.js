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
        content: ['./dist/*.html', './dist/js/index.js'],
        safelist: [/notification/, /card/],
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
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './html/index.html',
            inject: 'body',
            chunks: ['index'],
            publicPath: '.',
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'asset', to: 'asset' }],
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
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss'],
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/',
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
        moduleIds: 'hashed',
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
}

export default config
