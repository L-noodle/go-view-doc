import { ref } from 'vue'

interface Sponsors {
  special: Sponsor[]
  platinum: Sponsor[]
  platinum_china: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}

interface Sponsor {
  name: string
  img: string
  url: string
}

// shared data across instances so we load only once.
const data = ref()

const dataJson = {
  platinum: [
    {
      name: 'JNPF快速开发平台',
      logo: `/sponsor/jnpf.png`,
      img: `/sponsor/jnpf-banner.png`,
      url: 'https://www.jnpfsoft.com/index.html?from=goview',
      message: '基于工作流引擎和微服务架构，无代码快速构建企业管理系统'
    },
    {
      name: '多租户管理开发平台',
      logo: `/sponsor/iview.png`,
      img: `/sponsor/iview-banner.png`,
      url: 'https://www.iviewui.com/?utm_source=view_goview_gg',
      message: '基于 Vue.js 3的 中后台系统解决方案, 开箱即用，源码交付，高效解决项目难题'
    },
  ],
  gold: []
}
export function useCooperative() {
  data.value = mapCooperative(dataJson)
  return {
    data
  }
}

function mapCooperative(cooperative: Sponsors, splice = false) {
  return [
    {
      tier: '如需广告合作, 请前往 [权益 | 商业合作] 联系作者~',
      size: 'big',
      items: mapImgPath(cooperative['platinum'], splice)
    }
    // {
    //   tier: '代码贡献',
    //   size: 'medium',
    //   items: mapImgPath(cooperative['gold'], splice)
    // }
  ]
}

function mapImgPath(cooperative: Sponsor[], splice = false) {
  return cooperative.map(sponsor => ({
    ...sponsor
  }))
}
