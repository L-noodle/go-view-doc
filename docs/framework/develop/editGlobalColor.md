修改主题和颜色都在 `Pinia-useDesignStore` 中并搭配全局hook使用 `src\hooks\useTheme.hook.ts`

```vue
<template>
  <n-config-provider
    :locale="zhCN"
    :theme="darkTheme"
    :hljs="hljsTheme"
    :date-locale="dateZhCN"
    :theme-overrides="overridesTheme"
  >
  ...
```
Pinia 主题修改需要使用组件：`n-config-provider`，并在 `app.vue` 中注册。

Naive 设置主题深浅色文档：[https://www.naiveui.com/zh-CN/light/docs/customize-theme](https://www.naiveui.com/zh-CN/light/docs/customize-theme)

枚举内容：
```ts
export enum ThemeEnum {
  dark = 'dark',
  light = 'light'
}
```
store 中的内容：
```ts
import { defineStore } from 'pinia'
// 默认设置
import { theme } from '@/settings/designSetting'
import { DesignStateType, AppThemeColorType } from './designStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
// 主题枚举
import { ThemeEnum } from '@/enums/styleEnum'

const { GO_DESIGN_STORE } = StorageEnum

const { darkTheme, appTheme, appThemeDetail } = theme

const storageDesign = getLocalStorage(GO_DESIGN_STORE)

export const useDesignStore = defineStore({
  id: 'useDesignStore',
  state: (): DesignStateType =>
    storageDesign || {
      // 是否暗黑
      darkTheme,
      // 主题名称
      themeName: (darkTheme && ThemeEnum.dark) || ThemeEnum.light,
      // 颜色色号
      appTheme,
      appThemeDetail,
    },
  getters: {
    getDarkTheme(e): boolean {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeDetail(): AppThemeColorType | null {
      return this.appThemeDetail
    }
  },
  actions: {
    // 切换主题
    changeTheme(): void {
      this.darkTheme = !this.darkTheme
      this.themeName = this.darkTheme ? ThemeEnum.dark : ThemeEnum.light
      setLocalStorage(GO_DESIGN_STORE, this.$state)
    },
    // 设置颜色
    setAppColor(color: AppThemeColorType): void {
      this.appTheme = color.hex
      this.appThemeDetail = color
      setLocalStorage(GO_DESIGN_STORE, this.$state)
    }
  }
})
```

hooks 中的内容：
```ts
import { computed, toRefs } from 'vue'
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { useDesignStore } from '@/store/modules/designStore/designStore'
// 全局配置圆角数值
import { borderRadius } from '@/settings/designSetting'
// 修改颜色数值
import { alpha, lighten } from '@/utils'

/**
 * * 设置全局主题
 */
export const useThemeOverridesHook = () => {
  const designStore = useDesignStore()
  const { getAppTheme } = toRefs(designStore)
  const darkTheme = computed(
    (): GlobalThemeOverrides => {
      // 通用
      const commonObj = {
        common: {
          primaryColor: getAppTheme.value,
          primaryColorHover: lighten(alpha(getAppTheme.value), 0.1),
          primaryColorPressed: lighten(alpha(getAppTheme.value), 0.1),
          primaryColorSuppl: getAppTheme.value,
          borderRadius
        }
      }
      // 亮色主题
      const lightObject = {
        common: {
          ...commonObj.common
        }
      }
      // 暗色主题
      const dartObject = {
        common: {
          ...commonObj.common
        },
        LoadingBar: {
          colorLoading: getAppTheme.value
        }
      }
      return designStore.getDarkTheme ? dartObject : lightObject
    }
  )
  return darkTheme
}

// 返回暗黑主题
export const useDarkThemeHook = () => {
  const designStore = useDesignStore()
  return computed(() => (designStore.getDarkTheme ? darkTheme : undefined))
}
```

所有的古典颜色在：`src\settings\designColor.json`，推荐色在: `src\settings\designColorRecommend.json`

弹窗的代码在：`src\components\Pages\ThemeColorSelect\index.vue`