const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: './src/index.ts',
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader",
            },
            {
                test: /\.pcss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-import",
                                    "postcss-nested"
                                ]
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.json', '.ts', '.js', ".hbs", ".d.ts", '.html', '.svg'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};
