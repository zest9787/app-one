const path = require('path')                                        // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')            // index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성, 우리는 그냥 시작만 하고싶지 귀찮게 index.html 파일까지 만들고 싶지 않다.!!
// console.log(path.resolve('../../'))
console.log('path : ', path.resolve(__dirname, "../app-one/src/AppOne.js"));
module.exports = {                                      // moduel export (옛날 방식..)
    mode: 'development',
    entry: {
        appOne: path.resolve(__dirname, "src/AppOne.js")
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].js",
        // publicPath: '/assets/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./src"),
        historyApiFallback: true
    }
}