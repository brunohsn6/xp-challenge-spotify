const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');
const fs = require('fs');

function getConfigs() {
  let modeIdx = process.argv.findIndex(value => value === '--env');
  let mode = process.argv[++modeIdx];
  switch (mode) {
    case 'DSV':
      mode = 'development';
      break;
    case 'HML':
      mode = 'homolog';
      break;
    case 'PRD':
      mode = 'production';
      break;
    default:
      mode = 'development';
  }
  const fileEnvPath = path.join(__dirname, 'configs', `${mode}.js`);

  if (mode != '' && fs.existsSync(fileEnvPath)) {
    console.info(`[INF] Environment mode: ${mode}`);
    return require(fileEnvPath);
  } else {
    throw new Error(
      "The informed mode type doesn't have an environment configuration. Check if configs folder has the configuration file to the requested mode.",
    );
  }
}
const configs = getConfigs();

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'awesome-typescript-loader',
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: {
          loader: 'source-map-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './src/assets/styles/App.scss',
    }),
    new Webpack.DefinePlugin({
      ...configs,
    }),
  ],
};
