const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const env = "PROD";

module.exports = {
    entry: {
        app: "./src/index.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    env === "DEV"
                        ? "style-loader"
                        : MiniCSSExtractPlugin.loader,
                    "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: "[name].[chunkhash].css",
        }),
    ],
    devServer: {
        contentBase: "./dist",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[chunkhash].bundle.js",
    },
};