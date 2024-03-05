const path = require("path");
const webpack = require("webpack");
const CleanPlugin = require("clean-webpack-plugin");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const HtmlWebpackPlugin = require("html-webpack-plugin");

const name = "[name].[contenthash].js";

module.exports = {
  mode: "development",
  entry: {
    SharePlace: "./src/SharePlace.js",
    MyPlace: "./src/MyPlace.js",
  },
 
  output: {
    filename: name
    ,
    path: path.resolve(__dirname, "dist", "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    index: "index.html",
  },
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
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      chunks: [],

      output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "",
      },
      templateParameters: {
        apiKey: JSON.stringify(dotenv.parsed.API_KEY),
        html: name,
      },
    }),
    new HtmlWebpackPlugin({
      template: "src/my-place/index.html",
      filename: "myPlace.html",
      chunks: [],

      output: {
        path: path.resolve(__dirname, "dist" ,"my-place"),
        publicPath: "my-place",
      },
      templateParameters: {
        apiKey: JSON.stringify(dotenv.parsed.API_KEY),
        html: name,
      },
    }),
  ],
};
