# 开始

![GoView Logo](./images/logo-t-x.png)

## 总览
GoView 是一个高效的拖拽式低代码数据可视化开发平台，将图表或页面元素封装为基础组件，无需编写代码即可制作数据大屏，减少心智负担。当然低代码也不是 “银弹”，希望所有人员都能理智看待此技术。

在线 Demo 地址：[https://www.mtruning.club](https://www.mtruning.club)

Gitee 源码地址：[https://gitee.com/MTrun/go-view](https://gitee.com/MTrun/go-view)

技术点：

- 框架：基于 `Vue3` 框架编写，使用 `hooks` 写法抽离部分逻辑，使代码结构更加清晰；

- 类型：使用 `TypeScript` 进行类型约束，减少未知错误发生概率，可以大胆修改逻辑内容；

- 性能：多处性能优化，使用页面懒加载、组件动态注册、数据滚动加载等方式，提升页面渲染速度；

- 存储：拥有本地记忆，部分配置项采用 `storage` 存储本地，提升使用体验；

- 封装：项目进行了详细的工具类封装如：路由、存储、加/解密、文件处理、主题、NaiveUI 全局方法、组件等；

- 注意：GoView 是纯前端项目，没有后台系统，已预装 axios，若需后台请自行二次开发；

部分技术栈为：

| 名称                | 版本  | 名称        | 版本   |
| ------------------- | ----- | ----------- | ------ |
| Vue                 | 3.2.x | TypeScript4 | 4.6.x  |
| Vite                | 2.9.x | NaiveUI     | 2.27.x |
| ECharts             | 5.3.x | Pinia       | 2.0.x  |
| 详见 `package.json` | 😁    | 🥰          | 🤗     |

开发环境:

| 名称 | 版本    | 名称    | 版本  |
| ---- | ------- | ------- | ----- |
| node | 16.14.x | npm     | 8.5.x |
| pnpm | 6.32.x  | windows | 11    |

已完成图表：

| 分类   | 名称             | 名称       | 名称     |
| ------ | ---------------- | ---------- | -------- |
| 图表   | 柱状图           | 横向柱状图 | 折线图   |
| \*     | 单/多 折线面积图 | 饼图       | 水球图   |
| 信息   | 文字             | 图片       | 😶       |
| 列表   | 滚动排名列表     | 🤠         | 🤓       |
| 小组件 | 边框-01~13       | 装饰-01~05 | 数字翻牌 |

## 浏览器支持

开发和测试平台均在 Google 和最新版 EDGE 上完成，暂未测试 IE11 等其它浏览器，如有需求请自行测试与兼容。

## 安装

经过反馈发现非 pnpm 安装方式会有异常报错，暂时只建议 pnpm 安装方式

```shell
#pnpm（建议使用nrm切换到淘宝源 https://registry.npmmirror.com/）
pnpm install

# npm（暂不建议）
# npm install

# yarn（暂不建议）
# yarn install

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

QQ 群：1030129384

![GoView 反馈交流群](./images/qq.png)

## 特别感谢

这里感谢开源社区的小伙伴们提供了很多的工具，除此之外还要感谢掘金社区里的文章作者们，此项目也是看了 `谭光志` ：[https://juejin.cn/user/1433418893103645](https://juejin.cn/user/1433418893103645) 大佬写的文章才开始规划的，文章提供了很多的思路，期间也看了很多其它的文章与开源项目。

虽然自己早已有可视化相关的开源项目（详见右上角关于作者），但是低代码领域从未涉及过，于是开始着手设计与开发，靠爱发电。也很愿意把这个项目开源出来，希望能帮助其它小伙伴。

## 赞助

非常感谢您的支持，若此项目能给您带来帮助，我也很开心哒！

<img src="./images/zfb.png" alt="支付宝" style="zoom:25%;" />

<img src="./images/wx.png" alt="微信" style="zoom:25%;" />
