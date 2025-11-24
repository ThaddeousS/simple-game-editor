const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './app.js',
    mode: 'development',
    output: {
        filename: 'main.js',
    },
    devServer: {
        static: {
            directory: './dist',
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // Injects CSS into the DOM
                    'css-loader',   // Interprets @import and url()
                    'sass-loader',  // Compiles SCSS to CSS
                ],
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()],
};