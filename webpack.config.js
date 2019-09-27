const path = require("path");
const webpack = require("webpack");
const os = require('os');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const ProgressBarWebpackPlugin = require("progress-bar-webpack-plugin");
const WebpackSftpClient = require('webpack-sftp-client');
// const DashboardPlugin = require('webpack-dashboard/plugin');


const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const smp = new SpeedMeasurePlugin();

module.exports = (env, argv) => {
  // 开发环境
  const devMode = argv.mode === 'development';
  return smp.wrap({
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].js"
    },
    devServer: {
      port: 4010,
      open: true,
      proxy: {
        "/api": {
          target: "http://120.77.239.216:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
          pathRewrite: { "^/api": "" } // 把 URL 中 path 部分的 `api` 移除掉
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          include: [path.resolve(__dirname, "src")],
          use: ["cache-loader", "babel-loader"]
        },
        {
          test: /\.vue$/,
          use: ["cache-loader", "vue-loader"]
        },
        {
          test: /\.css$/,
          use: [
            "cache-loader",
            devMode ? {
              loader: 'style-loader',
            } :
            MiniCssExtractPlugin.loader,
            {//css-loader 解释(interpret) @import 和 url()
              loader: 'css-loader',
              options: {
                // url:false, //false  css中加载图片的路径将不会被解析 不会改变
                // minimize:true, //压缩css
                importLoaders: 1//importLoaders代表import进来的资源；2代表css-loader后还需要使用几个loader
              }
            },
            {//需在css-loader/style-loader后面，在其他预处理前面
              loader: 'postcss-loader',
              options: {
  
                plugins: [
                  require('autoprefixer')
                ],
                browsers: [
                  '> 1%',
                  'last 5 versions',
                  'not ie <= 9',
                  'ios >= 8',
                  'android >= 4.0'
                ]
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            "cache-loader",
            devMode ? {
              loader: 'style-loader'
              /* options: {
                   singleton:true //处理为单个style标签
               }*/
            } :
            MiniCssExtractPlugin.loader,
            {//css-loader 解释(interpret) @import 和 url()
              loader: 'css-loader',
              options: {
                // url:false, //false  css中加载图片的路径将不会被解析 不会改变
                // minimize:true, //压缩css
                importLoaders: 1,
                sourceMap: devMode//importLoaders代表import进来的资源；2代表css-loader后还需要使用几个loader
              }
            },
            {//需在css-loader/style-loader后面，在其他预处理前面
              loader: 'postcss-loader',
              options: {
  
                plugins: [
                  require('autoprefixer')
                ],
                browsers: [
                  '> 1%',
                  'last 5 versions',
                  'not ie <= 9',
                  'ios >= 8',
                  'android >= 4.0'
                ],
                sourceMap: devMode
              }
            },
            "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
          ]
        },
        {
          test: /\.less$/,
          // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
          use: [
            "cache-loader",
            "style-loader",
            "css-loader",
            {//需在css-loader/style-loader后面，在其他预处理前面
              loader: 'postcss-loader',
              options: {
  
                plugins: [
                  require('autoprefixer')
                ],
                browsers: [
                  '> 1%',
                  'last 5 versions',
                  'not ie <= 9',
                  'ios >= 8',
                  'android >= 4.0'
                ],
                sourceMap: devMode
              }
            },
            {
              loader: "less-loader",
              // 不加javascriptEnabled: true 会报 .bezierEasingMixin(); 的错误
              options: {
                javascriptEnabled: true
              }
            }
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000
          }
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: ["cache-loader", "file-loader"]
        },
        // {
        //   //压缩图片
        //   loader: "image-webpack-loader",
        //   options: {
        //     bypassOnDebug: true
        //   }
        // }
      ]
    },
  
    // 代码模块路径解析的配置
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src") // 这里使用 path.resolve 和 __dirname 来获取绝对路径
      },
      extensions: [".js", ".json", ".jsx", ".vue", ".css", ".less", "scss"],
      modules: [
        path.resolve(__dirname, "node_modules") // 指定当前目录下的 node_modules 优先查找
      ]
    },
    plugins: [
      new HappyPack({
        id: 'less',//用id来标识 happypack处理那里类文件
        threadPool: happyThreadPool, //共享进程池
        loaders: [
          {
            loader: 'less-loader'
          }
        ]
      }),
      new VueLoaderPlugin(),
      // 展示构建进度的 Plugin
      new ProgressBarWebpackPlugin(),
      // 面板 Plugin
      // new DashboardPlugin(),
      // 通过 html-webpack-plugin 就可以将我们的页面和构建 JS 关联起来
      new HtmlWebpackPlugin({
        filename: "index.html", // 配置输出文件名和路径
        template: "src/assets/index.html" // 配置文件模板
      }),
      //上传到服务器发布
      // new WebpackSftpClient({
      //     port: '20020',
      //     host: '10.111.111.38',
      //     username: 'nginx',
      //     password: 'zlj@123',
      //     path: './dist/',//本地上传目录
      //     remotePath: '/usr/local/nginx/html/demo',//服务器目标目录
      //     verbose: true
      // }),
      // 有些文件没经过 webpack 处理，但是我们希望它们也能出现在 build 目录下，这时就可以使用 CopyWebpackPlugin 来处理了
      // new CopyWebpackPlugin([
      //   { from: "src/assets/favicon.ico", to: "favicon.ico" } // 顾名思义，from 配置来源，to 配置目标路径
      // ]),

      new MiniCssExtractPlugin({
        filename: '[name].[hash:5].css',
        chunkFilename: '[id].[hash].css',
        disable: false,  //是否禁用此插件
        allChunks: true
      }),

      // webpack的内置插件
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
        VERSION: JSON.stringify("5fa3b9"), // const VERSION = '5fa3b9'
        BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
        TWO: "1+1", // const TWO = 1 + 1,
        CONSTANTS: {
          APP_VERSION: JSON.stringify("1.1.2") // const CONSTANTS = { APP_VERSION: '1.1.2' }
        }
      }),
      new webpack.ProvidePlugin({
        _: "lodash"
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  });
} 

