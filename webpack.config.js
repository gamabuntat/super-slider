const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  return {
    mode: 'development',
    devtool: isProd ? false : 'inline-source-map',
    entry: {
      index: './src/index.ts',
    },
    output: {
      filename: 'slider.js',
      path: path.resolve(__dirname, 'docs'),
    },
    resolve: {
      extensions: [ '.ts', '.js' ],
    },
    devServer: {
      noInfo: true,
      compress: true,
      open: false,
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {loader: 'ts-loader', options: {transpileOnly: true}}
          ],
          exclude: /node_modules/,
        },
        {
          test: /slider\.sass/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.pug$/,
          use: 
          {
            loader: 'pug3-loader',
            options: {
              root: path.resolve(__dirname, 'src/library.blocks')
            },
          }
        }
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: ['./src/**/*.{ts,tsx,js,jsx}']
        }
      }),
      new HtmlWebpackPlugin({
        filename: 'demo.html',
        template: './src/demo/demo.pug',
        minify: false,
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        filename: 'slider.css'
      }),
    ]
  };
};

