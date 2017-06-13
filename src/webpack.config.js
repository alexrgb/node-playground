/**
 * @author Aleksei Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17.
 */

const path = require("path");
let nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './app/index.ts',
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
        library: 'app',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            }
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    devtool: 'inline-source-map'
};