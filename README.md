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

## 7. vite CSS

### 7.1 CSS Variable

```css
:root {
  --main-bg-color: red;
}

.root {
  background-color: var(--main-bg-color);
}
```

### 7.2 PostCSS

vite本身支持PostCSS，只需要在根目录下面添加postcss.config.js文件即可

### 7.3 @import alias

```js
  resolve: {
    alias: {
      '@style': path.resolve(__dirname, 'src/styles'),
    }
  }
```

### 7.4 CSS Modules

```js
import style from '@style/test.module.css'
```

### 7.5 CSS预处理器

vite天然支持Less/Scss/Stylus预处理器，比如当我们使用less时只需要安装less NPM包即可

```
yarn add less -D
```

## 8.typescript支持

vite只负责编译ts，不负责校验ts。如果我们需要校验ts，可以在build的时候，提前使用`tsc --noEmit`

```
"build": "tsc --noEmit && vite build",
```

新建一个tsconfig.json文件

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"]
  },
  "include": ["src/**/*.ts"]
}
```

可以使用vue-tsc来编译Vue SFC

```
"build": "vue-tsc --noEmit && tsc --noEmit && vite build"
```

## 9.静态文件处理
vite中对文件的操作，也已经封装好了。

```js
// 引用文件
import logo from './assets/logo.png'
// 返回文件的路径
import test from './test.ts?url'
// 返回文件的具体内容
import test from './test.ts?raw'
// 引用一个worker
import Worker from './worker?worker'
// 引用一个json文件
import pkg from './package.json'
```

## 10.eslint和prettier
如果项目中需要引入eslint，只需要在项目根目录下面添加`.eslintrc.js`文件

```
yarn add eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise -D
```

prettier需要借助vscode的prettier插件，将prettier设置为默认的formatter

```
# 对所有的js文件进行eslint校验
"lint": "eslint --ext js src/"
# 如果需要在build之前进行lint校验
"build": "npm run lint && tsc --noEmit && vite build"
```

eslint添加全局变量

```js
{
  globals: {
    postMessage: true
  }
}
```

## 11.环境变量
vite中环境变量存在于`import.meta.env`中。vite提供了4个默认的环境变量

1. MODE 区分开发环境和生产环境
2. DEV 是否是开发环境
3. PROD 是否是生产环境
4. BASE_URL

当然我们也可以通过添加`.env`文件来定义环境变量，自定义的环境变量需要以`VITE_`开头。

```
VITE_TITLE=hello
```

我们可以通过`.env`文件的名字，对不同的环境来注入不同的环境变量

- .env.development 开发环境的环境变量
- .env.production 生产环境的环境变量

对于ts的开发者，我们新注入的环境变量在ts中可能会没有类型声明，我们可以修改`vite-env.d.ts`文件来定义类型

```ts
interface ImportMetaEnv {
  VITE_TITLE: string
}
```

## 12. 热更新
vite中默认开启了热更新，对于不同的框架，热更新的实现不同。

```js
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    newModule.render()
  })
}
```

## 13. glob import
可以通过正则的形式，引入一组js文件

```js
// 引入glob文件夹下的所有js文件
const globModules = import.meta.glob('./glob/*.js')
Object.entries(globModules).forEach(([k, v]) => {
  // m.default就是模块的默认导出
  v().then(m => console.log(k + ':' + m.default))
})
```