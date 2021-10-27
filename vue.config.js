module.exports = {
  publicPath: './',
  devServer: {
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
  }
}
