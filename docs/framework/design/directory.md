## 项目目录

| 路径(按照编辑器顺序)         | 功能                                   | 备注                 |
| ---------------------------- | -------------------------------------- | -------------------- |
| build/\*                     | 执行 `pnpm run build` 相关             |                      |
| doc/\*                       | 可执行文档                             |                      |
| plop/\*                      | 自动化生成相关                         | 懒癌                 |
| public/\*                    | 公共静态数据                           |                      |
| ---------- `src start` ----- |                                        |                      |
| **src**/api/\*               | 接口配置（`Axios`）+ 接口封装 + `Mock` |                      |
| **src**/assets/\*            | 静态资源，主要是图片                   |                      |
| **src**/components/\*        | 全局组件                               |                      |
| **src**/directives/\*        | 全局指令                               |                      |
| **src**/enums/\*             | 全局枚举属性                           |                      |
| **src**/hooks/\*             | 全局 `hooks`                           |                      |
| **src**/i18n/\*              | 多语言配置                             |                      |
| **src**/layout/\*            | 总体页面布局                           |                      |
| **src**/packages/\*          | 所有图表组件相关模块                   |                      |
| **src**/plugins/\*           | 全局第三方组件、数据的引入与注册位置   |                      |
| **src**/router/\*            | 路由模块                               |                      |
| **src**/settings/\*          | 全局静态配置                           |                      |
| **src**/store/\*             | `Pinia` 全局状态管理                   |                      |
| **src**/styles/\*            | 全局样式配置（包括明暗切换）           |                      |
| **src**utils/\*              | 全局工具模块                           |                      |
| **src**/views/\*             | 全局页面                               |                      |
| ---------- `src end` -----   |                                        |                      |
| types/\*                     | `TS` 全局类型相关                      |                      |
| .env                         | 开发环境全局变量                       |                      |
| index.html                   | 单页入口                               |                      |
| Makefile                     | 快速执行文件                           | Windows 需要配置环境 |
| tsconfig.json                | `TS` 配置项                            |                      |
| vite.config.ts               | `Vite` 配置项                          |                      |

## views/chart/\* 目录

| 路径(按照编辑器顺序)                                   | 功能                                                                                       |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| src/views/chart/index.vue                              | 工作空间入口，右键注册                                                                     |
| src/views/chart/ContentBox                             | 封装每一列的布局（顶部，内容，底部，滚动条），包括颜色深浅                                 |
| src/views/chart/ContentCharts                          | 左侧图表展示区域 `..\components\ChartsItemBox\index.vue` 文件里有拖拽起始代码，包括动态注册组件 |
| src/views/chart/ContentConfigurations                  | 目标图表的右侧的配置模块                                                                   |
| ---------- `edit start` -----                          |                                                                                            |
| src/views/chart/ContentEdit/index.vue                  | 画布，标尺，工具栏，底部控制                                                               |
| src/views/chart/ContentEdit/components/EditAlignLine   | 拖动时的对齐线                                                                             |
| src/views/chart/ContentEdit/components/EditBottom      | 底部区域-样式布局                                                                          |
| src/views/chart/ContentEdit/components/EditHistory     | 底部区域-历史记录                                                                          |
| src/views/chart/ContentEdit/components/EditRange       | 注册在 index.vue，包裹所有图表，注册内容： 水印、标尺、辅助线、透明遮罩，包括点击事件等    |
| src/views/chart/ContentEdit/components/EditRule        | 画布标尺                                                                                   |
| src/views/chart/ContentEdit/components/EditShapeBox    | 所有图表拖拽样式：锚点、选中样式、鼠标悬浮样式                                             |
| src/views/chart/ContentEdit/components/EditShortcutKey | 底部区域-快捷键展示                                                                        |
| src/views/chart/ContentEdit/components/EditTools       | 工具栏：dock/侧边模块                                                                      |
| src/views/chart/ContentEdit/hook/useDrag.hook          | 拖拽相关：拖拽到编辑区域、移动图表、鼠标移入/移出事件、移动锚点等                          |
| src/views/chart/ContentEdit/hook/useLayout.hook        | 布局处理（把 dom 发送到了 Pinia）                                                          |
| src/views/chart/ContentEdit/hook/useStyle.hook         | 样式渲染相关：大小、锚点位置等                                                             |
| ---------- `edit end` -----                            |                                                                                            |
| src/views/chart/ContentHeader/\*                       | 顶部位置相关                                                                               |
| src/views/chart/ContentLayers/\*                       | 图层相关                                                                                   |
| src/views/chart/hooks/useContextMenu.hook              | 右键处理                                                                                   |
| src/views/chart/hooks/useKeyboard.hook                 | 键盘快捷键                                                                                 |

## packages 图表目录

| 路径                             | 功能                             |
| -------------------------------- | -------------------------------- |
| packages/index                   | 所有图表导出，图表动态加载方法等 |
| packages/index.d                 | 类型定义                         |
| packages/public                  | 公共数据类，方法等               |
| packages/chartConfiguration      | 图表基础配置                     |
| packages/components/Charts       | 图表模块                         |
| packages/components/Informations | 信息模块                         |
| packages/components/Tables       | 表格模块                         |
| packages/components/Decorates    | 装饰模块                         |
