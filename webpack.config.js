const path = require("path");

module.exports = {
    entry: {
        app: "./src/index.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[chunkhash].bundle.js",
    },
};
