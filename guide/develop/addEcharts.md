## 以新增一个柱状图组件为例

::: danger
注意：目前并非所有图表都支持 dataset。支持 dataset 的图表有： line、bar、pie、scatter、effectScatter、parallel、candlestick、map、funnel、custom。 

关于dataset 具体文档 [https://echarts.apache.org/handbook/zh/concepts/dataset](https://echarts.apache.org/handbook/zh/concepts/dataset)。
:::

::: tip
不支持 dataset 的组件创建方式可以参考: 

  雷达图 【src\packages\components\Charts\Mores\Radar】
  
  水球图 【src\packages\components\Charts\Mores\WaterPolo】

  多看几个没坏处，你也可以根据你自己喜欢的写法来
:::

::: warning
务必进行的测试: 

  * 右侧属性响应式测试
  
  * 数据->动态数据更新测试

  * 使用 mock 数据，更新时间设置为5S，点击预览查看 5S 后图表是否进行了更新

  * 打包编译测试，编译会报 TS 错误，请及时修改
:::

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

选择在 `packages/components/Charts/Bars` 下创建 `BarCommon` 文件夹

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
// 公共类型声明
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const BarCommonConfig: ConfigType = {
  // 唯一key，注意！！！文件夹名称需要修改成与当前组件一致！！！
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
  // 组件框架类型 (注意！若此 Echarts 图表不支持 dataset 格式，则使用 ChartFrameEnum.COMMON)
  chartFrame: ChartFrameEnum.ECHARTS,
  // 图片 (注意！图片存放的路径必须在 src/assets/images/chart/包分类名称/*)
  // 文件夹名称需要和包分类名称一致: PackagesCategoryEnum.CHARTS
  image: 'bar_x.png'
}
```

:::warning 注意！
  `v1.1.9 / v2.1.6` 版本以下，图片需要直接引入。但是开发环境生成的组件，在生产环境的层级展示中图片会有问题。
:::

使用方式如下：
```ts
// 展示图片
import image from '@/assets/images/chart/charts/bar_x.png'

export const BarCommonConfig: ConfigType = {
  // .....和上面一致
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
import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
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
export default class Config extends PublicConfigClass implements CreateComponentType {
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

// 若使用的是 Echarts 原生 dataset 控制需要解决一个bug
// 假设默认的 dadaset 渲染两个柱状图，从后台读取时返回一个柱状图的数据，只更新 dataset 是无效的，依然会渲染两个，需要手动修改 series

// 注：未使用 Echarts 原生 dataset 或此图表只能渲染一个实例，则不需要额外添加此监听
/* start---
watch(
  () => props.chartConfig.option.dataset,
  (newData, oldData) => {
    if (newData.dimensions.length !== oldData.dimensions.length) {
      const seriesArr = []
      for (let i = 0; i < newData.dimensions.length - 1; i++) {
        seriesArr.push(seriesItem)
      }
      replaceMergeArr.value = ['series']
      props.chartConfig.option.series = seriesArr
      nextTick(() => {
        replaceMergeArr.value = []
      })
    }
  },
  {
    deep: false
  }
)
end--- */

// 数据更新处理，使用 dataset 的 Eharts 图表不需要额外处理，hooks 会借助 vChartRef 自动更新
// 若每次更新需要修改其它属性，可添加回调函数处理，参考：src\packages\components\Charts\Pies\PieCircle
const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
</script>
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