const path = require("path");
const AutoPrefixer = require('autoprefixer');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const TailwindPlugin = require("tailwindcss");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
    return {
        entry: {
            app: './src/index.js',
        },
        devtool: 'eval-cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'],
                    exclude: /(node_modules|bower_components)/,
                },
                {
                    test: /(\.css|\.scss)$/,
                    use: [
                        env && env.NODE_ENV === 'production'
                            ? MiniCSSExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                        'sass-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    ident: 'postcss',
                                    plugins: [TailwindPlugin, AutoPrefixer],
                                },
                            },
                        },
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
            new CssMinimizerPlugin(),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'public'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[chunkhash].bundle.js',
        },
    }
}
