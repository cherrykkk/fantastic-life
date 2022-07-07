
const path = require('path')
module.exports = {
  // publicPath: './',
  publicPath: './',

  devServer: {
    host: '0.0.0.0',
    port: 8080, 
    proxy: {
      '/api': {
        target: 'http://47.97.42.118/html/steplife/api', 
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/base.less')]
    }
  }
}
