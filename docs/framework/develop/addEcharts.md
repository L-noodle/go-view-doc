### 以新增一个柱状图组件为例

1. 首先在 `packages` 的文件夹里新增基础配置文件

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

选择在 `packages/components/Informations/MORE` 下创建 `Image` 文件夹

2. 在文件夹内创建对应的文件 `index.ts`、`index.vue`、`config.ts`、`config.vue`

| 文件       | 功能             |
| ---------- | ---------------- |
| index.ts   | 图表声明文件     |
| index.vue  | 展示渲染文件     |
| config.ts  | 数据相关文件     |
| config.vue | 设置项内容     |
| data.json  | 静态数据（可无） |

`index.ts` 内容如下:
```ts
// 展示图片
import image from '@/assets/images/chart/charts/bar_x.png'
// 公共类型声明
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const BarCommonConfig: ConfigType = {
  // 唯一key
  key: 'BarCommon',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VBarCommon',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCBarCommon',
  // 名称
  title: '柱状图',
  // 子分类目录
  category: ChatCategoryEnum.BAR,
  // 子分类目录
  categoryName: ChatCategoryEnumName.BAR,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 图片
  image: image
}
```

`data.json` 内容如下:
```json
{
  "dimensions": ["product", "data1", "data2"],
  "source": [
    {
      "product": "Mon",
      "data1": 120,
      "data2": 130
    }
    {
      // ...
    }
  ]
}
```

`config.ts` 内容如下，在创建新图表时会执行 `new Config()`
```ts
// 公共类型和方法
import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
// 公共类型
import { CreateComponentType } from '@/packages/index.d'
// 获取上面的 index 配置内容
import { BarCommonConfig } from './index'
// 深拷贝
import cloneDeep from 'lodash/cloneDeep'
// 默认数据
import dataJson from './data.json'

// 从ECharts 的默认配置项里取出需要的部分,详见 `src/settings/chartThemes/index`
export const includes = ['legend', 'xAxis', 'yAxis']

export const option = {
  // ...很多的配置项,这里就不一一列举了
  dataset: { ...dataJson },
  series: [
    {
      type: 'bar',
      barWidth: null,
      itemStyle: {
        color: null,
        borderRadius: 0
      }
    },
    {
      type: 'bar',
      barWidth: null,
      itemStyle: {
        color: null,
        borderRadius: 0
      }
    }
  ]
}

// 柱状图类
export default class Config extends publicConfig implements CreateComponentType {
  public key = BarCommonConfig.key
  public chartConfig = cloneDeep(BarCommonConfig)
  // 进行样式合并
  public option = echartOptionProfixHandle(option, includes)
}

```

`index.vue` 内容如下:
```vue
<template>
  // 使用 vue-echarts 框架进行渲染
  <v-chart 
    ref="vChartRef" 
    :theme="themeColor" 
    :option="option" 
    :manual-update="isPreview()" 
    autoresize>
  </v-chart>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { includes } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'


// 这里的 themeSetting、themeColor的作用是监听全局样式主题并进行设置，chartConfig 为图表的配置项数据
const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

// 动态注册 ECharts 图表内容
use([
  DatasetComponent,
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

// 应用到图表的 option
const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// 数据更新 (默认更新 dataset，若更新之后有其它操作，可添加回调函数)
const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)

</script>
<style lang="scss" scoped>
</style>
```

`config.vue` 内容如下：

```vue
<template>
  <!-- 遍历 seriesList -->
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    :name="`柱状图-${index + 1}`"
    :expanded="true"
  >
    <SettingItemBox name="边框">
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.itemStyle.color"
        ></n-color-picker>
      </SettingItem>
      <!-- 颜色粗细等等... -->
    </SettingItemBox>
    <!-- Echarts 全局设置 --> 
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>
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
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

</script>
```

3. 然后把图片组件在 `src\packages\components\Charts\Bars\index.ts` 中进行导出
```ts
import { BarCommonConfig } from './BarCommon/index'
import { BarCrossrangeConfig } from './BarCrossrange/index'

// 这里的顺序决定着最终的展示顺序
export default [BarCommonConfig, BarCrossrangeConfig]
```

注意在 `src\packages\components\Charts\index.ts` 也有一个导出，这里是导出 `Charts` 模块的所有组件
```ts
import Bars from './Bars'

export const ChartList = [...Bars]
```

此时页面图表中将出现【柱状图】组件，试试把它拖拽到页面进行测试吧~