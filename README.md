## 这里是 GoView 文档，采用 VitePress 搭建

在线地址：http://www.mtruning.club/

启动代码：npm run dev

打包代码：npm run build

Make方式：make dev / make dist

VitePress 说明文档：https://vitepress.vuejs.org/

## 总览

GoView 是一个低代码数据可视化开发平台，将图表或页面元素封装为基础组件，无需编写代码即可完成业务需求。
它的技术栈为：**`Vue3 + TypeScript4 + Vite2 + NaiveUI + ECharts5  + Axios + Pinia2 + PlopJS`**

在线 Demo 地址：[https://www.mtruning.club](https://www.mtruning.club)

Gitee 源码地址：[https://gitee.com/MTrun](https://gitee.com/MTrun)

## 浏览器支持

开发和测试平台均在 Google 和最新版 EDGE 上完成，暂未测试 IE11 等其它浏览器，如有需求请自行测试。 

## 安装

本项目采用 pnpm 进行包管理，若要使用其它管理方式，请删除 `pnpm-lock.yaml` 并安装依赖

```shell
#pnpm（建议使用nrm切换到淘宝源）
pnpm install

# npm
npm install

# yarn
yarn install

```

## 启动

```shell
#pnpm
pnpm dev

# npm
npm run dev

#yarn
yarn dev

#Makefile
make dev
```

## 编译

```shell
#pnpm
pnpm run build

# npm
npm run build

#yarn
yarn run build

#Makefile
make dist

```
## 交流
QQ群：663629294