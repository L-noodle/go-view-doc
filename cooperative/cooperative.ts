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
let data: any = []
let membersData: any = []

const dataJson = {
  platinum: [
    {
      name: '码云',
      img: `/cooperative/码云.png`
    },
    {
      name: 'Dromara',
      img: `/cooperative/dromara.png`
    },
    {
      name: '中国能建天津电建',
      img: `/cooperative/中国能建天津电建.jpg`,
    },
    {
      name: '禅道',
      img: `/cooperative/禅道.png`
    },
    {
      name: '前海金顺',
      img: `/cooperative/前海金顺.png`
    },
    {
      name: '正方网络',
      img: `/cooperative/正方网络.png`
    },
    {
      name: '正舟信息',
      img: `/cooperative/正舟.png`
    },
    {
      name: '沙果文化',
      img: `/cooperative/沙果.png`
    },
    {
      name: '世纪易软',
      img: `/cooperative/世纪易软.png`
    },
    {
      name: '柳林',
      img: `/cooperative/柳林.png`
    },
    {
      name: 'wumei-smart',
      img: `/cooperative/wumei-smart.png`
    },
    {
      name: '菲玛斯（上海）',
      img: `/cooperative/菲玛斯.png`
    },
    {
      name: '众铱软件',
      img: `/cooperative/众铱软件.png`
    },
    {
      name: '万象云鼎',
      img: `/cooperative/万象云鼎.png`
    },
    {
      name: '三缔科技',
      img: `/cooperative/三缔科技.png`
    },
    {
      name: '慧购智能科技',
      img: `/cooperative/慧购智能科技.png`
    },
    {
      name: '水木宏创',
      img: `/cooperative/水木宏创.png`
    },
    {
      name: '祥和智能',
      img: `/cooperative/祥和智能.png`
    },
    {
      name: '明动软件',
      img: `/cooperative/明动软件.png`
    },
    {
      name: '啸锋科技.png',
      img: `/cooperative/啸锋科技.png`
    },
    {
      name: '万道通科技',
      img: `/cooperative/万道通科技.png`
    },
    {
      name: '云腾五洲',
      img: `/cooperative/云腾五洲.png`
    },
    {
      name: '真容软件',
      img: `/cooperative/真容软件.png`
    },
    {
      name: '时信软件',
      img: `/cooperative/时信软件.png`
    },
    {
      name: '南通汉联',
      img: `/cooperative/南通汉联.png`
    },
    {
      name: '绿住云',
      img: `/cooperative/绿住云.png`
    },
    {
      name: '星河千帆',
      img: `/cooperative/星河千帆.png`
    },
    {
      name: '轻易云.png',
      img: `/cooperative/轻易云.png`,
    },
    {
      name: '艾倍特斯.png',
      img: `/cooperative/艾倍特斯.png`,
    },
    {
      name: '依柯力.png',
      img: `/cooperative/依柯力.png`,
    },
    {
      name: '3dsworks .png',
      img: `/cooperative/3dsworks .png`,
    },
    {
      name: '万旺科技.png',
      img: `/cooperative/万旺科技.png`,
    },
    {
      name: '云创.png',
      img: `/cooperative/云创.png`,
    },
    {
      name: '禾店科技.png',
      img: `/cooperative/禾店科技.png`,
    },
    {
      name: '中航路通.png',
      img: `/cooperative/中航路通.png`,
    },
    {
      name: '小游.png',
      img: `/cooperative/小游.png`,
    }
  ],
  gold: []
}

export const membersJson = {
  platinum: [],
  gold: [
    {
      name: '开源oschina',
      img: 'https://portrait.gitee.com/uploads/avatars/user/41/123301_bdj_1593958517.png!avatar60'
    },
    {
      name: 'dodu',
      img: 'https://portrait.gitee.com/uploads/avatars/user/136/410525_dodu_1609556810.png!avatar60'
    },
    {
      name: 'daidai',
      img: 'https://portrait.gitee.com/uploads/avatars/user/1780/5340105_memeda520_1653537198.png!avatar60'
    },
    {
      name: 'jiangcheng',
      img: 'https://portrait.gitee.com/uploads/avatars/user/1841/5525823_jiang_cheng_1_1604547199.png!avatar60'
    },
    {
      name: 'wangzhiqiang',
      img: ''
    },
    {
      name: '蒋承',
      img: ''
    },
    {
      name: '潘潘',
      img: ''
    },
    {
      name: 'yangwq7',
      img: ''
    },
    {
      name: 'Ryker',
      img: ''
    },
    {
      name: '雪花酥',
      img: ''
    },
    {
      name: 'wuyuting1',
      img: ''
    },
    {
      name: '王志强',
      img: 'https://portrait.gitee.com/uploads/avatars/user/762/2288381_assxy_1654930289.png!avatar60'
    },
    {
      name: '坨坨的老父亲',
      img: ''
    },
    {
      name: 'alex',
      img: 'https://portrait.gitee.com/uploads/avatars/user/99/299176_alex_li_1620720471.png!avatar60'
    },
    {
      name: 'hguan',
      img: ''
    },
    {
      name: 'wkj',
      img: 'https://portrait.gitee.com/uploads/avatars/user/2593/7779169_jiangg21_1594002289.png!avatar60'
    },
    {
      name: 'zh',
      img: 'https://portrait.gitee.com/uploads/avatars/user/1803/5410478_zhanghan966_1633751606.png!avatar60'
    },
    {
      name: 'Mr.cao',
      img: ''
    },
    {
      name: 'alex li',
      img: ''
    },
    {
      name: 'Furoe',
      img: ''
    },
    {
      name: 'zhaolei-hu',
      img: ''
    },
    {
      name: '张传峰',
      img: ''
    },
    {
      name: 'Mr.cao',
      img: ''
    },
    {
      name: '',
      img: ''
    }
  ]
}

export function useCooperative() {
  data = mapCooperative(dataJson, true)
  membersData = mapCooperative(membersJson)
  return {
    data,
    membersData
  }
}

function mapCooperative(sponsors: Sponsors, splice = false) {
  return [
    {
      // size: 'big',
      size: 'medium',
      items: mapImgPath(sponsors['platinum'], splice)
    },
    {
      size: 'medium',
      items: mapImgPath(sponsors['gold'], splice)
    }
  ]
}

function mapImgPath(sponsors: Sponsor[], splice = false) {
  return sponsors.map(sponsor => ({
    ...sponsor
  }))
}
