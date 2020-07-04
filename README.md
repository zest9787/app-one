

```shell script
npm i react react-dom
npm i -D @babel/core babel-loader @babel/preset-react @babel/preset-env
````

* @babel/core : 리액트는 es6를 사용하므로 여러 브라우저에서 사용가능하도록 es5문법으로 바꿔줌 
* @babel/preset-react : jsx -> js
* @babel/preset-env
    * es6 -> es5
    * es6 뿐 아니라 브라우저에 따라 알아서 컴파일 해줌
    * 좀 더 자세히 알아보고 싶다면 babel-preset-env는 무엇이고 왜 필요한가?를 참조하자
* @babel-loader<br>
    * 자바스크립트 파일을 babel preset/plugin과 webpack을 사용하여 es5로 컴파일 해주는 plugin
    * jsx -> javascript 로 컴파일
    * html webpack plugin

```shell script
npm i -D webpack webpack-dev-server webpack-cli html-webpack-plugin
```
* webpack  
    * 모든 리액트 파일을 하나의 컴파일된 하나의 자바스크립트 파일에 넣기 위해
* webpack-dev-server  
    * live reload
* webpack-cli  
    * build 스크립트를 통해 webpack 커맨드를 사용하기 위해
* html-webpack-plugin  
    * 나중에 webpack.config.js에서 사용할 플러그인

```javascript
const path = require('path')                                        // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const HtmlWebpackPlugin = require('html-webpack-plugin')            // index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성, 우리는 그냥 시작만 하고싶지 귀찮게 index.html 파일까지 만들고 싶지 않다.!!

module.exports = {                                      // moduel export (옛날 방식..)
    entry: './src/index.js',                            // 리액트 파일이 시작하는 곳
    output: {                                           // bundled compiled 파일
        path: path.join(__dirname, '/dist'),            //__dirname : 현재 디렉토리, dist 폴더에 모든 컴파일된 하나의 번들파일을 넣을 예정
        filename: 'index_bundle.js'
    },
    module: {                                           // javascript 모듈을 생성할 규칙을 지정 (node_module을 제외한.js 파일을 babel-loader로 불러와 모듈을 생성
        rules: [
            {
                test: /\.js$/,                          // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
                exclude: /node_module/,                 // node module 폴더는 babel 컴파일에서 제외
                use:{
                    loader: 'babel-loader'				// babel loader가 파이프를 통해 js 코드를 불러옴
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'                // 생성한 템플릿 파일
        })
    ]
}
```

* path
    * 파일의 경로를 지정
    * __dirname : 노드 변수로 현재 모듈의 디렉토리를 리턴합니다.
* HtmlWebpackPlugin
    * 컴파일 이후 index.html 파일을 생성
    * template에 지정된 index.html에 모든 static 파일들을 긁어모은 index_bundle.js 파일을 `<script src='index_bundle.js'></script>` 형식으로 연결해줍니다. 
* module.export
    * 출력할 모듈
* entry
    * 컴파일 할 파일
* output
    * 컴파일 이후 파일
    * __dirname/dist/index_bundle.js
    * [hash], [chunkhash], [name], [id], [query], [contenthash]
* module
    * 모듈의 컴파일 형식
    * es6 문법을 es5으로 바꾸기 위해 webpack이 js, jsx를 포함한 모든 파일을 babel을 통하여 컴파일 시킵니다.
* plugin
    * 사용할 plugins
    * 여기서는 htmlwebpackPlugin을 사용하여 index.html과 index_bundle.js에 연결해줍니다.
    
    
### babelrc
* babel-preset-env와 babel-preset-react와 같이 preset을 사용하고 싶으면 root폴더에 .babelrc을 생성하여 사용하고자할 preset을 설정하면 됩니다.
* plugin들을 각각의 npm dependency를 가지고 있습니다. 하지만 설치시 매번 .bablrc에 설정을 해야하므로 그 두가지를 모두 해결해줄 preset을 사용하면됩니다. preset을 설치하고 설정하므로서 preset이 가진 plugin들을 설정할 필요없이 사용할 수 있게 됩니다.
> @babel이 버전이 업데이트 되면서 더이상 babel-core 형태(-)의 dependency를 지원하지 않게되므로서 @babel/env 형태(/)를 사용해야 합니다.

package.json
```json
"scripts": {
    // webpack-dev-server, --open : 자동으로 브라우저 열어줌, --hot : hot realod 저장했을 때 자동적으로 reload 해줌
    "start":"webpack-dev-server --mode development --open --hot",
    // dist 폴더에 컴파일된 파일 다 넣어줌
    "build":"webpack --mode production"
  },
```