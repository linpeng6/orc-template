const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {merge} = require('webpack-merge');
const base = require('./webpack.config.base');

const commonPostCssLoader = [{
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                ["postcss-preset-env"]
            ]
        }
    }
}]

module.exports = merge(base, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    ...commonPostCssLoader
                ]
            }
        ]
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/index.[chunkhash:10].css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
})
