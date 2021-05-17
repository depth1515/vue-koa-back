const webpackMerge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.config.base')

const TerserWebpackPlugin = require('terser-webpack-plugin')
/**
 * 打包优化
 * 
 */
const webpackConfig = webpackMerge.merge(baseWebpackConfig,{
  mode:'production',
  // 日志消息
  stats: {
    children:false,
    warnings:false
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          // parse: {},
          compress: {
            // 
            drop_console: false,
            // 删除无法到达的代码
            dead_code:true,
            // 删除对帐单debugger;
            drop_debugger:true 
          },
          sourceMap:false,
          mangle: true, // Note `mangle.properties` is `false` by default.
          // output
          format: {
            // 在构建时去除注释
            comments: false,
          },
        },
        extractComments: false,
        // 启用/禁用多进程并发运行功能。
        parallel: true,
      }),
    ],
    // 优化：避免重复引用依赖
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true
        },
      },
    },
  },
})

module.exports = webpackConfig