---
layout: home

title: GoView 说明文档
titleTemplate: 低代码数据可视化开发平台

hero:
  name: GoView
  text: 低代码数据可视化
  tagline: '开源、精美、便捷、规范、交互自然 '
  image:
    src: /logo-with-shadow.png
    alt: GoView
    width: 250
  actions:
    - theme: brand
      text: 开始 👆
      link: /guide/start/
    - theme: alt
      text: 权益与商业合作
      link: /rights/
    - theme: alt
      text: GoView 源码
      link: https://gitee.com/dromara/go-view
    - theme: alt
      text: Dromara 组织
      link: https://dromara.org/zh/awesome/

features:
  - icon: 💡
    title: 最新技术
    details: 基于 Vue3 & TypeScript框架编写，使用 hooks 写法抽离部分逻辑，代码结构更加清晰。
  - icon: ⚡️
    title: 优异性能
    details: 多处性能优化，使用页面懒加载、组件动态注册、数据滚动加载等方式，提升页面渲染速度。
  - icon: 🛠️
    title: 高效代码封装
    details: 详细的工具类封装如：路由、存储、加/解密、文件处理、主题、NaiveUI 全局方法、组件等。
  - icon: 🛡️
    title: 完备的功能
    details: 提供项目控制、全局控制、组件基础配置、动画配置、请求配置、事件配置等。
  - icon: 📦
    title: 丰富的组件
    details: 拥有丰富的内容组件，内置 50+ 个组件内容，并且在不断更新升级中。 
  - icon: 🔔
    title: 优雅交互
    details: 精美的页面设计，支持明/暗切换，主题色变更。人性化的交互方式，内置丰富快捷方案。
---

<script setup>
import { onMounted } from 'vue'
import { fetchReleaseTag } from './.vitepress/utils/fetchReleaseTag.js'

onMounted(() => {
  fetchReleaseTag('v1.2.4')
})
</script>