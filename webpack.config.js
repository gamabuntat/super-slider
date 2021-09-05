const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const alias = {
  'slider': path.resolve(__dirname, './src/slider'),
};

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  return {
    mode: 'development',
    devtool: isProd ? false : 'inline-source-map',
    entry: {
      slider: './src/slider/index.ts',
      demo: './src/demo/demo.ts',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'images/[name][ext][query]'
    },
    resolve: {
      extensions: [ '.ts', '.js' ],
      alias
    },
    externals: {
      jquery: 'jQuery',
    },
    devServer: {
      compress: true,
      port: 9000,
      liveReload: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
          },
        },
      }
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
          test: /\.sass/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.pug$/,
          use: 'pug3-loader',
        },
        {
          test: /\.(svg|ttf|otf|eot|woff[2]?)$/i,
          type: 'asset/resource',
          include: path.resolve(__dirname, 'src/fonts'),
          generator: {
            filename: 'fonts/[name][ext][query]'
          },
        },
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
        inject: 'body',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ]
  };
};

