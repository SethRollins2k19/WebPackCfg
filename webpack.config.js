const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"]}
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.(git|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true,
                            disable: true,
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ["*",".js",".jsx"]
    },
    output: {
        path: path.resolve(__dirname ,"dist/"),
        publicPath: "../dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: __dirname + "/public/index.html",
            template: "./src/htmlTemplate.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};