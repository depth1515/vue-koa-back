const path = require('path')

const utils = require('./utils')
const nodeExternals = require('webpack-node-externals')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
// npx node --inspect-brk ./node_modules/webpack/bin/webpack --inline --progress

const webpackconfig = {
  /**
   * target 设置为 node，webpack 将在类 Node.js 环境编译代码。
   * (使用 Node.js 的 require 加载 chunk，而不加载任何内置模块，如 fs 或 path)。
   */
  target: 'node',
  entry: {
    server: path.join(utils.APP_PATH, 'index.js')
  },
  resolve: {
    // alias: {
    //   '@': utils.APP_PATH
    // }
    ...utils.getWebpackResolveConfig()
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        include: path.resolve(__dirname, '../src/'),
        exclude: path.resolve(__dirname, '../node_modules/'),
        // exclude: path.resolve(__dirname,'..','/node_modules/')
      }
    ]
  },
  externalsPresets: {
    node: true
  },
  //  webpack-node-externals
  externals: [nodeExternals()],
  /**
 [nodeExternals()]
 用于排除node_modules目录下的代码被打包进去，
 因为放在node_modules目录下的代码应该通过npm安装。
 没加上打包1.2m，加上打包11.7kb
  */
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': (process.env.NODE_ENV === 'production') ||
          process.env.NODE_ENV === 'prod' ? '"production"' : '"development"'
      }
    })
  ],
  node: {
    // polyfill node模块
    // console: true,
    global: true,
    // process: true,
    // Buffer: true,
    __dirname: true,
    __filename: true,
    // setImmediate:true,
    // path: true 
  }
}

module.exports = webpackconfig