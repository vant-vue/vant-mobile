const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  outputDir: 'qmgd',
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  assetsDir: './static', // 静态资源目录 (js, css, img, fonts)
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  //生产环境取消 console.log
 /* configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  }, */
  devServer: {
    port: 8008,
    host: 'localhost',
    proxy: {
      '/proxyApi': {
        target: 'http://wxt1.leye.ccb.com/phjr', //源地址 
        ws: false,
        changeOrigin: true,//改变源
        pathRewrite: {
          '^/proxyApi': ''//路径重写 
        }
      }
    }
  },
  lintOnSave: false
};
