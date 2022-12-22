import { defineConfig } from 'vitepress'
import renderPermaLink from './render-perma-link'
import MarkDownItCustomAnchor from './markdown-it-custom-anchor'

const ogDescription = '低代码数据可视化开发平台, 开源、精美、便捷、规范、交互自然。'
const ogImage = '/logo-t-y.png'
const ogTitle = 'GoView'
const ogUrl = 'https://www.mtruning.club/'

export default defineConfig({
  title: 'GoView 说明文档',
  description: '低代码数据可视化开发平台',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: 'GoView' }],
    ['meta', { name: 'theme-color', content: '#3f8bdb' }],
    [
      'script',
      {
        src: '',
        'data-site': '',
        'data-spa': '',
        defer: ''
      }
    ]
  ],

  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      text: '为此页提供修改建议',
      pattern: 'https://gitee.com/MTrun/go-view-doc'
    },

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/dromara/go-view' }
    ],

    algolia: {
      appId: '27GQF86TFH',
      apiKey: '5529275a1f0687fd78babb878f6c54a6',
      indexName: 'GoView',
      placeholder: '请输入关键词',
      buttonText: '搜索',
    },

    footer: {
      copyright: '本文档内容版权为 GoView 作者所有，保留所有权利。'
    },

    nav: [
      { text: '指引', link: '/guide/start/', activeMatch: '/guide/start/' },
      { text: '更新日志', link: '/updateLog/', activeMatch: '/updateLog/' },
      { text: '权益 | 商业合作', link: '/rights/', activeMatch: '/rights/' },
      { text: '合作伙伴', link: '/cooperative/', activeMatch: '/cooperative/' },
      {
        text: '相关链接',
        items: [
          {
            text: 'Vue3',
            link: 'https://cn.vuejs.org/'
          },
          {
            text: 'NaiveUI',
            link: 'https://www.naiveui.com/zh-CN/dark'
          },
          {
            text: 'Pinia',
            link: 'https://pinia.vuejs.org/'
          },
          {
            text: 'Vite',
            link: 'https://cn.vitejs.dev/'
          },
          {
            text: 'TypeScript',
            link: 'https://www.typescriptlang.org/'
          },
          {
            text: 'ECharts',
            link: 'https://echarts.apache.org/zh/index.html'
          },
        ]
      },
      { text: '关于作者 | 赞助', link: '/sponsor/', activeMatch: '/sponsor/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '引导',
          items: [
            {
              text: '开始',
              link: '/guide/start/index'
            },
            {
              text: '页面引导',
              link: '/guide/start/pageGuide'
            },
            {
              text: '设置介绍',
              link: '/guide/start/globalSetting'
            },
            {
              text: '常见问题',
              link: '/guide/start/more'
            }
          ]
        },
        {
          text: '设计',
          items: [
            {
              text: '目录结构',
              link: '/guide/design/directory'
            },
            {
              text: '工作空间',
              link: '/guide/design/canvas'
            },
            {
              text: '预览功能',
              link: '/guide/design/preview'
            },
            {
              text: '单个图表',
              link: '/guide/design/charts'
            },
            {
              text: '历史记录',
              link: '/guide/design/history'
            }
          ]
        },
        {
          text: '开发',
          items: [
            {
              text: '新增 ECharts 等复杂图表组件',
              link: '/guide/develop/addEcharts'
            },
            {
              text: '新增简单自定义图表组件',
              link: '/guide/develop/addCharts'
            },
            {
              text: '修改图表数据处理',
              link: '/guide/develop/editChartsData'
            },
            {
              text: '修改图表默认颜色',
              link: '/guide/develop/editGlobalColor'
            },
            {
              text: '修改右键功能',
              link: '/guide/develop/editRight'
            },
            {
              text: '修改快捷键功能',
              link: '/guide/develop/editKeyboard'
            },
            {
              text: '修改全局主题与颜色',
              link: '/guide/develop/editGlobalColor'
            },
            {
              text: '修改 SCSS 亮/暗 主题',
              link: '/guide/develop/scssColor'
            },
            {
              text: '修改全局语言',
              link: '/guide/develop/editGlobalLang'
            },
          ]
        },
        {
          text: '其它',
          items: [
            {
              text: 'Vue 大屏模板',
              link: '/guide/screenTemplate/vueScreenTemplate'
            },
            {
              text: 'React 大屏模板',
              link: '/guide/screenTemplate/reactScreenTemplate'
            },
          ]
        }
      ]
    }
  },

  markdown: {
    anchor: {
      permalink: renderPermaLink
    },
    config: md => {
      md.use(MarkDownItCustomAnchor)
    }
  }
})
