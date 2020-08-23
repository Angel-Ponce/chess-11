const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "production",
  devtool: "eval-source-map",
  entry: "./src/js/index.js",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./images",
              publicPath: "./images",
              name: "./[name].[ext]",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    path: __dirname + "/build",
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {from:'src/images',to:'images'} 
      ],
    }),
  ],
};
