const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/app/script.ts',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Planes',
            template: "./src/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/assets', to: 'assets' }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    // Bundle '.ts' files as well as '.js' files.
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },

};
