const path = require('path')

const nodeExternals = require('webpack-node-externals')

const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
// npx node --inspect-brk ./node_modules/webpack/bin/webpack --inline --progress

const webpackconfig = {
  /**
   * target 设置为 node，webpack 将在类 Node.js 环境编译代码。
   * (使用 Node.js 的 require 加载 chunk，而不加载任何内置模块，如 fs 或 path)。
   */
  target:'node',
  mode:'development',
  entry:{
    server: path.join(__dirname, './src/index.js')
  },
  output:{
    filename: '[name].bundle.js',
    path: path.resolve(__dirname,'./dist')
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.join(__dirname, '/node_modules')]
      }
    ]
  },
  externalsPresets:{
    node:true
  },
  /**
  [nodeExternals()]
  用于排除node_modules目录下的代码被打包进去，
  因为放在node_modules目录下的代码应该通过npm安装。
  没加上打包1.2m，加上打包11.7kb
   */
  externals: [nodeExternals()],
  plugins:[
    new CleanWebpackPlugin()
  ],
  node:{
    // polyfill node模块
    // console: true,
    global: true,
    // process: true,
    // Buffer: true,
    __dirname:true,
    __filename:true,
    // setImmediate:true,
    // path: true
  }
}

console.log(webpackconfig)

module.exports = webpackconfig