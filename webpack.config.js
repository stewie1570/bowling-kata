var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader" }
        ]
    },
    watch: true,
    devtool: 'source-map'
};