const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge(base, {
    mode: 'development',
    optimization: {
        moduleIds: 'named',
        chunkIds: 'named',
        minimize: false,
    },
    devtool: 'eval-source-map',
    devServer: {
        static:{
            directory: path.join(__dirname, 'dist'),
        },
        //gzip压缩
        compress: true,
        port: 9000,
        //自动打开浏览器
        open: true,
        hot: true
    }
})