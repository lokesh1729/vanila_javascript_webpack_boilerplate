const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
    return {
        entry: {
            app: './src/index.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'],
                    exclude: /(node_modules|bower_components)/,
                },
                {
                    test: /\.css$/,
                    use: [
                        env && env.NODE_ENV === 'production'
                            ? MiniCSSExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
            }),
            new MiniCSSExtractPlugin({
                filename: '[name].[chunkhash].css',
            }),
        ],
        devServer: {
            contentBase: './dist',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[chunkhash].bundle.js',
        },
    }
}