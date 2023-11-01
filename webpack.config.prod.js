const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
    return {
        mode:'development',
        entry: {
            'index': './src/index.js',
        },
        devtool: 'eval-source-map',
        output: {
            filename: '[name].js', // [name]은 entry에서 정의한 키 값 (index 또는 dev.property)
            path: path.resolve(__dirname, 'dist'),
        },
        module:{
            rules:[
                {
                    test: /\.(ts|js)x?$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test : /\.json$/,
                    use: ['json-loader'],
                    type: 'javascript/auto'
                }]
        },
        devServer: {
            host: 'localhost',
            port: 3000,
            contentBase: './dist',
            historyApiFallback: true,
            open: true
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/"),
                "/assets": path.resolve(__dirname, "./assets"),
            },
            extensions:[".js",".jsx",".css", ".svg"]
        },
        plugins: [
            new HtmlPlugin({
                template: './public/index.html'
            }),
            new CopyPlugin({
                patterns: [
                    { from: './assets', to: './assets' }
                    // ,{ from: './config/prod.property.js', to: './property.js' }
                ]
            }),
            new webpack.ProgressPlugin()
        ]
    }
};




