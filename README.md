# Vite

## 1. Vite优势
- 使用简单，上手速度快
- 编译速度快，开发效率极高
- 社区成本低（兼容rollup插件）
- 没有复杂晦涩的配置

## 2. 横向对比
- vue-cli，如果需要配置，需要使用到configureWebpack和chainWebpack
- create-react-app，如果想要修改配置，需要eject
- vite有自身的插件系统，同时兼容了rollup的插件，最大的优势就是快

## 3. 为什么vite如此之快？
因为传统的比如webpack之类的构建工具需要将一个个的module打包成bundle。vite采用的是Dynamic import，只会按需编译相关的文件。同时vite使用了ESBuild

## 4. 使用vite创建vue3项目

```js
// 使用Vite新建一个Vue项目
npm init @vitejs/app

// 使项目支持vue jsx的形式开发
yarn add @vitejs/plugin-vue-jsx

// 然后对vite.config.js进行配置
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJSX()]
})
```

使用jsx的形式开发vue3

```js
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return <div>hello jsx</div>
    }
  }
})
```

## 5. 使用vite创建vue2项目

新建一个空的项目

```
➜  Code npm init @vitejs/app
npx: 7 安装成功，用时 1.6 秒

@vitejs/create-app is deprecated, use npm init vite instead

✔ Project name: … vite-vue2-demo
✔ Select a framework: › vanilla
✔ Select a variant: › vanilla
```

添加vite与vue2相关的配置

```js
yarn add vite-plugin-vue2
// 添加与vue2开发相关的配置
yarn add vue vue-template-compiler

然后就可以开发与vue2相关的代码了
new Vue({
  el: '#app',
  render: (h) => {
    return h(App)
  }
}).$mount()
```

## 6. 使用vite创建react项目

```
➜  Code npm init vite
✔ Project name: … vite-react
✔ Select a framework: › react
✔ Select a variant: › react
```
