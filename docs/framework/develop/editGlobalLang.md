语言切换使用的是 vue-i18n 9.x 版本

官方文档： [https://vue-i18n.intlify.dev](https://vue-i18n.intlify.dev)

官方仓库：[https://github.com/intlify/vue-i18n-next](https://github.com/intlify/vue-i18n-next)

`i8n` 的引用已经注册到全局：`window['$t']`，注册位置：`src\components\I18n\index.vue`，并在 `app.vue` 中注册。

```vue
<template></template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
window['$t'] = t
</script>
```

直接渲染使用方式（看个人习惯）：
```vue
<template>
{{ $t('login.form_account') }}
</template>
<script lang="ts" setup>
const t = window['$t']
</script>
```
函数传递使用方式：
```vue
<template></template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { renderLang } from '@/utils'
const list = [
  {
    label: renderLang('global.r_edit'),
    key: 'edit',
  }
]
</script>
```
renderLang 内容：
```ts
/**
 * * render 语言
 *  @param lang 语言标识
 *  @param set 设置项
 *  @param tag 要渲染成的标签
 */
export const renderLang = (lang: string, set = {}, tag = 'span') => {
  return () => h(tag, set, { default: () => window['$t'](lang) })
}
```

GoView 配置位置在：`src\i18n\index.ts`

```ts
// 默认配置语言
import { lang } from '@/settings/designSetting'
import { createI18n } from 'vue-i18n' //引入vue-i18n组件
// 获取本地存储
import { getLocalStorage } from '@/utils'
// 本地存储名
import { StorageEnum }from '@/enums/storageEnum'
// 切换枚举
import { LangEnum } from '@/enums/styleEnum'
import { LangStateType } from '@/store/modules/langStore/langStore.d'
// 中文
import zh from './zh/index'
// 英文
import en from './en/index'

const langStorage: LangStateType = getLocalStorage(StorageEnum.GO_LANG_STORE)

// 语言数组
export const langList = [
  {
    label: '中文',
    key: LangEnum.zh
  },
  {
    label: 'English',
    key: LangEnum.en
  }
]

const i18n = createI18n({
  locale: langStorage?.lang || lang,
  fallbackLocale: langStorage?.lang || lang,
  messages: {
    [LangEnum.zh]: zh,
    [LangEnum.en]: en
  }
})

export default i18n
```

修改语言使用 `Pinia-Store`，位置：`src\store\modules\langStore\langStore.ts`
```ts
import { defineStore } from 'pinia'
import { lang } from '@/settings/designSetting'
import { LangStateType } from './langStore.d'
import { LangEnum } from '@/enums/styleEnum'
import i18n from '@/i18n/index'
import { setLocalStorage, getLocalStorage, reloadRoutePage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
const settingStore = useSettingStore()

const { GO_LANG_STORE } = StorageEnum

const storageLang: LangStateType = getLocalStorage(GO_LANG_STORE)

// 语言
export const useLangStore = defineStore({
  id: 'useLangStore',
  state: (): LangStateType =>
    storageLang || {
      lang,
    },
  getters: {
    getLang(): LangEnum {
      return this.lang
    }
  },
  actions: {
    // 修改语言
    changeLang(lang: LangEnum): void {
      if (this.lang === lang) return
      this.lang = lang
      i18n.global.locale = lang
      setLocalStorage(GO_LANG_STORE, this.$state)

      if (settingStore.getChangeLangReload) {
        reloadRoutePage()
      }
    }
  }
})

```