### 以新增一个图片组件为例

1. 首先在 `packages` 的文件夹里新增基础配置文件 (packages 结构详见新增 ECharts 说明)

选择在 `packages/components/Informations/MORE` 下创建 `Image` 文件夹

2. 在文件夹内创建对应的文件 `index.ts`、`index.vue`、`config.ts`、`config.vue`

`index.ts` 内容如下：

```ts
// 展示图片
import image from '@/assets/images/chart/informations/photo.png'
// 公共类型声明
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ImageConfig: ConfigType = {
  // 唯一key
  key: 'Image',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VImage',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCImage',
  // 名称
  title: '图片',
  // 子分类目录
  category: ChatCategoryEnum.MORE,
  // 子分类目录
  categoryName: ChatCategoryEnumName.MORE,
  // 包分类
  package: PackagesCategoryEnum.INFORMATIONS,
  // 图片
  image: image
}
```

`config.ts` 内容如下，在创建新图表时会执行 `new Config()`
```ts
// 公共类型
import { publicConfig } from '@/packages/public'
// 公共类型
import { CreateComponentType } from '@/packages/index.d'
// 获取上面的 index 配置内容
import { ImageConfig } from './index'
// 深拷贝
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 数据来源(可以不取这个名字, 异步请求的时候需要自行处理)
  dataset: [],
  options1: '',
  options2: ''
  // ...
}

// 图表类
export default class Config extends publicConfig implements CreateComponentType {
  public key = ImageConfig.key
  public chartConfig = cloneDeep(ImageConfig)
  public option = cloneDeep(option)
}

```

`index.vue` 内容如下:
```vue
<template>
  <!-- img ...内容渲染 -->
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

// 这里能拿到图表宽高等
const { w, h } = toRefs(props.chartConfig.attr)
// 这里能拿到上面 config.ts 里的 option 数据
const { colors, dur, backgroundColor } = toRefs(props.chartConfig.option)

// 数据更新 (默认更新 dataset，若更新之后有其它操作，可添加回调函数)
useChartDataFetch(props.chartConfig, useChartEditStore)

</script>
<style lang="scss" scoped>
</style>
```

`config.vue` 内容如下：

```vue
<template>
  <!-- 默认展开 -->
  <CollapseItem name="样式" :expanded="true">
    <SettingItemBox name="边框">
      <SettingItem name="圆角">
        <!-- 与 config.ts 里的 option 对应 -->
        <!-- n-input-number 是 NaiveUI 的控件 -->
        <n-input-number
          v-model:value="optionData.options1"
          size="small"
          :min="0"
          placeholder="图片圆角"
        ></n-input-number>
      </SettingItem>
      <!-- 颜色粗细等等... -->
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import {
  GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
// 获取 option 的数据，便于使用 typeof 获取类型
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

</script>
```

3. 然后把图片组件在 `src\packages\components\Informations\Mores\index.ts` 中进行导出

```ts
// 图片组件
import { ImageConfig } from './Image/index'、
// 其它组件
import { TextCloudConfig } from './TextCloud/index'

// 这里的顺序决定着最终的展示顺序
export default [TextCloudConfig, ImageConfig]
```

此时页面图表中将出现【图片】组件，试试把它拖拽到页面进行测试吧~