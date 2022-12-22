# 引导

:::tip 介绍

GoView 是一个高效的拖拽式低代码数据可视化开发平台，将图表或页面元素封装为基础组件，无需编写代码即可制作数据大屏，减少心智负担。当然低代码也不是 “银弹”，希望所有人员都能理智看待此技术。

:::

:::warning 分支说明

😶 **纯前端** 分支： **`master`**

👻 **带后端** 请求分支: **`master-fetch`**

:::

`纯前端` Demo 地址：[https://vue.mtruning.club/](https://vue.mtruning.club/)

`带后端` Demo 地址：[https://demo.mtruning.club/](https://demo.mtruning.club/)

`GoView 源码`地址：[https://gitee.com/MTrun/go-view](https://gitee.com/MTrun/go-view)

`文档源码`地址：[https://gitee.com/MTrun/go-view-doc](https://gitee.com/MTrun/go-view-doc)

后端地址：

- `JAVA` [https://gitee.com/MTrun/go-view-serve](https://gitee.com/MTrun/go-view-serve) (当前使用)
- `.NET` [https://gitee.com/sun_xiang_yu/go-view-dotnet](https://gitee.com/sun_xiang_yu/go-view-dotnet)

---

技术点：

- 框架：基于 `Vue3` 框架编写，使用 `hooks` 写法抽离部分逻辑，使代码结构更加清晰；

- 类型：使用 `TypeScript` 进行类型约束，减少未知错误发生概率，可以大胆修改逻辑内容；

- 性能：多处性能优化，使用页面懒加载、组件动态注册、数据滚动加载等方式，提升页面渲染速度；

- 存储：拥有本地记忆，部分配置项采用 `storage` 存储本地，提升使用体验；

- 封装：项目进行了详细的工具类封装如：路由、存储、加/解密、文件处理、主题、NaiveUI 全局方法、组件等；

- 注意：GoView 是纯前端项目，没有后台系统，已预装 axios，若需后台请自行二次开发；

---

部分技术栈为：

| 名称                | 版本  | 名称        | 版本  |
| ------------------- | ----- | ----------- | ----- |
| Vue                 | 3.2.x | TypeScript4 | 4.6.x |
| Vite                | 2.9.x | NaiveUI     | 2.x.x |
| ECharts             | 5.3.x | Pinia       | 2.0.x |
| 详见 `package.json` | 😁    | 🥰          | 🤗    |

开发环境:

| 名称 | 版本    | 名称    | 版本  |
| ---- | ------- | ------- | ----- |
| node | 16.14.x | npm     | 8.5.x |
| pnpm | 7.1.x   | windows | 11    |

已完成图表：

| 分类   | 名称             | 名称       | 名称           | 名称                     |
| ------ | ---------------- | ---------- | -------------- | ------------------------ |
| 图表   | 柱状图           | 横向柱状图 | 折线图         | 单/多 折线面积图(渐变色) |
| \*     | 饼图             | 环形图     | 水球图         | 雷达图                   |
| \*     | NaiveUI 多种进度 | 散点图     | 对数回归散点图 | 热力图                   |
| \*     | 漏斗图           | 中国地图   | 🤪             | 🤖                       |
| 信息   | 文字             | 渐变文字   | 图片           | 😶                       |
| 列表   | 滚动排名列表     | 滚动表格   | 🤓             | 👻                       |
| 小组件 | 边框-01~13       | 装饰-01~05 | 数字翻牌       | 通用时间                 |

## 安装

推荐使用 pnpm 管理项目，并使用 nrm 切换到阿里镜像，整体安装步骤如下：

```shell
# 1. 安装 pnpm
npm install -g pnpm

# 2. 安装 nrm
npm install -g nrm

# 3. 使用 nrm 添加阿里镜像
nrm add taobao  https://registry.npmmirror.com/

# 4. nrm 查看镜像列表
nrm ls

# 5. nrm 应用对应镜像
nrm use taobao
```

安装项目依赖

```shell
# 推荐使用 pnpm
pnpm install

# 或 yarn
yarn install

```

## 启动

```shell
# 推荐使用 pnpm
pnpm dev

# 或 yarn
yarn dev

# 或 Makefile（需要自行配置系统环境，谷歌 make 命令环境搭建）
make dev
```

## 编译

```shell
# 推荐使用 pnpm
pnpm run build

# 或 yarn
yarn run build

# 或 Makefile
make dist
```

## 浏览器支持

开发和测试平台均在 Google 和最新版 EDGE 上完成，暂未测试 IE11 等其它浏览器，如有需求请自行测试与兼容。

## 交流

QQ 群(问题讨论)：1030129384 --------&&------------ 个人 QQ（商业授权）

<div style="display: flex; flex-wrap: wrap; gap: 10px">
  <img src="./images/qq.png" style="margin: 20px; height: 300px;"/>
  <img src="./images/qq-person.png" style="margin: 20px; height: 300px;"/>
</div>
## 特别感谢

这里感谢开源社区的小伙伴们提供了很多的工具，除此之外还要感谢掘金社区里的文章作者们，文章提供了很多的思路，期间也看了很多其它的文章与开源项目。

虽然自己早已有可视化相关的开源项目（详见右上角关于作者），但是低代码领域从未涉及过，于是开始着手设计与开发，靠爱发电。也很愿意把这个项目开源出来，希望能帮助其它小伙伴。
