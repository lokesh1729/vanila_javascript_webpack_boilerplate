const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
    const isProd = env && env.NODE_ENV === 'production';
    const config = {
        entry: {
            app: './src/index.js',
        },
        mode: isProd ? 'production' : 'development',
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
                        isProd
                            ? MiniCSSExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                        'sass-loader',
                        'postcss-loader'
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'public'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[chunkhash].bundle.js',
        },
    }
    if (isProd) {
        config.plugins.push(
            new MiniCSSExtractPlugin({
                filename: '[name].[chunkhash].css',
            })
        );
        config.plugins.push(new CssMinimizerPlugin());
    }
    return config;
}
