var webpack = require("webpack");

module.exports = {
    entry: {
        bundle: "./src/index.js",
        "bundle.min": "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: "./built",
        library: "SharepearGallery",
        libraryTarget: "var"
    },
    module: {
        loaders: [
            { loader: 'babel-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
}
