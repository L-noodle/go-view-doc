module.exports = {
  title: 'GoView 说明文档',
  description: '低代码数据可视化开发平台',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: './favicon.ico',
      },
    ],
  ],
  themeConfig: {
    //导航栏
    nav: [
      { text: '主页', link: '/' },
      { text: '问题反馈', link: '/more/question.md' },
      { text: '关于作者/赞助', link: '/more/sponsor.md' },
    ],
    //侧边栏
    sidebar: [
      ['/more/updateLog.md', '更新日志'],
      {
        title: '开始',
        collapsable: true,
        children: [
          ['/framework/start/introduction.md', '初始化'],
          ['/framework/start/pageGuide.md', '页面引导'],
          ['/framework/start/globalSetting.md', '设置介绍'],
          ['/framework/start/more.md', '更多使用'],
        ],
      },
      {
        title: '设计',
        collapsable: true,
        children: [
          ['/framework/design/directory.md', '目录结构'],
          ['/framework/design/canvas.md', '工作空间'],
          ['/framework/design/preview.md', '预览功能'],
          ['/framework/design/charts.md', '单个图表'],
          ['/framework/design/history.md', '历史记录'],
        ],
      },
      {
        title: '开发',
        collapsable: true,
        children: [
          ['/framework/develop/addEcharts.md', '新增 ECharts 图表组件'],
          ['/framework/develop/addCharts.md', '新增自定义图表组件'],
          ['/framework/develop/editChartsData.md', '修改图表数据处理'],
          ['/framework/develop/editChartsColor.md', '修改图表默认颜色'],
          ['/framework/develop/editRight.md', '修改右键功能'],
          ['/framework/develop/editKeyboard.md', '修改快捷键功能'],
          ['/framework/develop/editGlobalColor.md', '修改全局主题与颜色'],
          ['/framework/develop/scssColor.md', '修改 SCSS 亮/暗 主题'],
          ['/framework/develop/editGlobalLang.md', '修改全局语言'],
          ['/framework/develop/more.md', '更多内容'],
        ],
      },
      ['/framework/upgrade/upgrade.md', '优化'],
      ['/framework/planning/planning.md', 'V2.0 规划'],
      {
        title: '大屏模板',
        collapsable: true,
        children: [
          ['/framework/screenTemplate/vueScreenTemplate.md', 'Vue大屏模板'],
          ['/framework/screenTemplate/reactScreenTemplate.md', 'React大屏模板'],
        ],
      },
      ['/framework/disclaimer/disclaimer.md', '免责声明'],
    ],
  },
  base: '',
  host: '0.0.0.0',
  port: 9001,
  dest: './dist',
  evergreen: true,
  // 可选，默认为 master
  docsBranch: 'master',
  // 默认为 true，设置为 false 来禁用
  editLinks: true,
  //代码块显示行号
  markdown: {
    lineNumbers: true,
  },
};
