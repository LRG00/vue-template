const path = require("path");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

const cdn = {
  css: [],
  // css: ["https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.8/dist/antd.min.css"],
  js: [
    // "https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.8/dist/antd.min.js",
    // "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.1.0/echarts.min.js"
    // "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"
  ]
};

const isProduction = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 基本路径
  // publicPath: "./",
  // 输出文件目录
  // outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // assetsDir: "./",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // indexPath: "./",
  // eslint-loader 是否在保存的时候检查
  // lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config
      .entry("index")
      .add("babel-polyfill")
      .end();
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@img", resolve("src/assets/images"))
      .set("@css", resolve("src/assets/styles/css"))
      .set("@scss", resolve("src/assets/styles/scss"));
    // 生产环境配置
    // 生产环境注入cdn
    // config.plugin("html").tap(args => {
    //   args[0].cdn = cdn;
    //   return args;
    // });
    if (isProduction) {
      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all"
      });
      // 生产环境注入cdn
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入
      config.externals = {
        // "ant-design-vue": "ant-design-vue",
        // "vue-router": "VueRouter",
        // vue: "Vue",
        // axios: "axios",
        echarts: "echarts"
        // moment: "moment"
      };
      // 为生产环境修改配置...
      config.plugins.push(
        //生产环境自动删除console
        new CompressionPlugin({
          //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 1024,
          minRatio: 0.8
        }),
        // new BundleAnalyzerPlugin(),
        // new UglifyJsPlugin({
        //   uglifyOptions: {
        //     compress: {
        //       warnings: false,
        //       drop_debugger: true,
        //       drop_console: true
        //     }
        //   },
        //   sourceMap: false,
        //   parallel: true
        // })
      );
    } else {
      // 为开发环境修改配置...
      config.externals = {
        // "ant-design-vue": "ANT",
        // "vue-router": "VueRouter",
        // vue: "Vue",
        // axios: "axios",
        // echarts: "echarts",
        // moment: "moment"
      };
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 9000,
    https: false,
    hotOnly: false,
    proxy: {
      // 设置代理
      api: {
        target: "http://localhost:3000", // 本地地址
        // target: "http://xinhua.xinqixinxikeji.com:8080", //线上地址
        // target: "http://152.12.12.171:8080", //新华
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
