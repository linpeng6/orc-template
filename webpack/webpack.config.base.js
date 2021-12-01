const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(__dirname)
module.exports = {
    entry: {
        index: resolve('./src/index')
    },
    output: {
        path: resolve(__dirname, '../dist'),
        filename: 'js/[name].bundle.[contenthash:8].js',
        chunkFilename: 'js/[name].chunk.[contenthash].js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx|ts|tsx|mjs|cjs)$/, exclude: /node_modules/, loader: 'babel-loader' },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                //webpack5
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator: {
                    filename: 'images/[base]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[base]',
                },
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: resolve('./public/favicon.ico'),
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:10].css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs', '.cjs', '.css', '.less']
    },
}