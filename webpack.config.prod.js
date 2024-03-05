const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const name = "[name].[contenthash].js";

module.exports = {
  mode: "production",
  entry: {
    "share-place": "./src/SharePlace.js",
    "my-place": "./src/MyPlace.js",
  },
  output: {
    filename: "assets/scripts/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devtool: "cheap-source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: { version: 3 } },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.API_KEY": JSON.stringify(dotenv.parsed.API_KEY),
      "process.env": JSON.stringify(dotenv.parsed),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      chunks: [],

      templateParameters: {
        apiKey: JSON.stringify(dotenv.parsed.API_KEY),
        html: name,
      },
    }),
    new HtmlWebpackPlugin({
      template: "src/my-place/index.html",
      filename: "my-place/index.html",
      chunks: [],

      templateParameters: {
        apiKey: JSON.stringify(dotenv.parsed.API_KEY),
        html: name,
      },
    }),
  ],
  
};
