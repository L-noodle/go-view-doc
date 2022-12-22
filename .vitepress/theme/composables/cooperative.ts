import { ref, onMounted } from 'vue'

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
      name: 'Dromara',
      img: 'dromara'
    },
    {
      name: 'Dromara',
      img: 'dromara'
    }
  ],
  gold: [
    {
      name: '111',
      img: 'xxxx'
    },
    {
      name: '111',
      img: 'xxxx'
    }
  ]
}
export function useCooperative() {
  onMounted(async () => {
    data.value = mapCooperative(dataJson)
  })

  return {
    data
  }
}

function mapCooperative(sponsors: Sponsors) {
  return [
    {
      tier: '开源与商业合作伙伴（部分）',
      size: 'big',
      items: mapImgPath(sponsors['platinum'])
    },
    {
      tier: '代码贡献',
      size: 'medium',
      items: mapImgPath(sponsors['gold'])
    }
  ]
}

function mapImgPath(sponsors: Sponsor[]) {
  return sponsors.map(sponsor => ({
    ...sponsor,
    img: `/cooperative/images/${sponsor.img}.png`
  }))
}
