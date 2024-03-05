const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
module.exports = {
  mode: "production",
  entry: {
    "share-place": "./src/SharePlace.js",
    "my-place": "./src/MyPlace.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist", "assets", "scripts"),
    publicPath: "dist/assets/scripts/",
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
  ],
};
