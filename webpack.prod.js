const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'production',
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             styles: {
    //                 name: "styles",
    //                 type: "css/mini-extract",
    //                 chunks: "all",
    //                 enforce: true,
    //             },
    //         },
    //     },
    // },
    // devtool: 'source-map',
});
