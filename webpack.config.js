const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
const fs = require('fs'); // to check if the file exists

module.exports =  (env) =>{

  const currentPath = path.join(__dirname);
  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';
  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + env.ENVIRONMENT;
  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.js",
    output: {
      //path: path.join(__dirname, "/dist"),
      filename: "dist/index-bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|j?g|svg|gif)?$/,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        baseUrl:  process.env.REACT_APP_BASE_URL
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
      
      historyApiFallback:true
    },
    node: { fs: 'empty' },
  }
};
