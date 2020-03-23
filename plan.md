# 计划

## 构想

做一个综合了个人、工作这 2 个板块的 Web App。使用场景是用于工作和摸鱼。

## 工作

## 个人

## 加载性能提升

目前构建打包生成的 JavaScript 文件一共有 3 个（在 `my-console/build/static/js` 路径下可以找到）：

- `main.[hash].chunk.js` 这是我的应用程序代码，大小为 71kb
- `[number].[hash].chunk.js` 这是应用程序用到的库的代码，或者使用代码分割得到的代码。目前这里是用到的库的代码，大小为 2148kb
- `runtime-main.[hash].chunk.js` 这是用于加载和运行应用程序的 Webpack 运行时代码。这部分代码默认会被嵌入到构建好的 `index.html` 文件内，以节省一次网络请求。大小为 2kb

### `antd` 升级与优化

其中 `antd` 这个库有几点可以优化：

- 升级到 4.0 版本，`Icon` 组件将单独作为一个包，从而实现 Tree Shaking，减小打包体积
- 使用 `day.js` 替换 `moment.js` 大幅减少打包体积

### 代码分割

基于路由的懒加载。由于我将应用程序部署在 GitHub Pages，其服务器是支持 HTTP 2.0 的，使用一个 TPC 连接即可并行发送多个请求和响应。因此，可以考虑将初次加载页面时用不到的部分组件懒加载。

## 初次性能提升

- `main.[hash].chunk.js` 这是我的应用程序代码，大小为 23.8kb
- `[number].[hash].chunk.js` 代码分割包，一共 14 个包，共计 1750kb
- `runtime-main.[hash].chunk.js` 4kb

## Todo

- 重新设计 Firebase 数据库内数据的结构。避免出现元素为对象类型的数组，比如：`[{id: 1, text: 'Hi'}, {id: 2, text: 'Bye}]`
