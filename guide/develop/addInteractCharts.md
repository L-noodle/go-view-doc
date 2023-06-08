## 以新增一个下拉选择组件为例

::: warning
务必进行的测试: 

  * 右侧属性响应式测试

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

选择在 `packages/components/Informations/Inputs` 下创建 `InputsSelect` 文件夹

2. 在文件夹内创建对应的文件 `index.ts`、`index.vue`、`config.ts`、`config.vue`、`interact.ts`

`index.ts` 内容如下：

```ts
// 公共类型声明
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ImageConfig: ConfigType = {
  // 唯一key，注意！！！文件夹名称需要修改成与当前组件一致！！！
  key: 'Image',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VImage',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCImage',
  // 名称
  title: '图片',
  // 子分类目录
  category: ChatCategoryEnum.INPUTS,
  // 子分类目录
  categoryName: ChatCategoryEnumName.INPUTS,
  // 包分类
  package: PackagesCategoryEnum.INFORMATIONS,
  // 设置成静态类型，这样就无能选择动态请求
  chartFrame: ChartFrameEnum.STATIC,
  // 图片 (注意！图片存放的路径必须在 src/assets/images/chart/包分类名称/*)
  // 文件夹名称需要和包分类名称一致: PackagesCategoryEnum.INFORMATIONS
  image: 'inputs_select.png'
}

```

`cinteract.ts` 内容如下，定义了所有的关联类型和参数
```ts
import { InteractEventOn, InteractActionsType } from '@/enums/eventEnum'

// 时间组件类型
export enum ComponentInteractEventEnum {
  DATA = 'data'
}

// 联动参数, 这个值就是传给其它组件的的 key
export enum ComponentInteractParamsEnum {
  DATA = 'data'
}

// 定义组件触发回调事件
export const interactActions: InteractActionsType[] = [
  {
    // 这里是事件触发的方式
    interactType: InteractEventOn.CHANGE,
    interactName: '选择完成',
    componentEmitEvents: {
      // 这个是组件的类型,大部分组件只有一种展示类型, 多种类型的写法参考【时间选择】组件
      [ComponentInteractEventEnum.DATA]: [
        {
          value: ComponentInteractParamsEnum.DATA,
          label: '选择项'
        }
      ]
    }
  }
]
```

`config.ts` 内容如下，在创建新图表时会执行 `new Config()`
```ts
import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import { InputsSelectConfig } from './index'

export const option = {
  // 这个值必须要有，定义组件触发的类型，必须和 interactActions 中定义的数据一致
  // 因为有的组件会有多种类型，不同的类型触发的参数还不一样比如【时间选择】组件
  // select 组件只有一种类型，所以不需要动态修改，直接写死就可以
  [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
  // 默认值，这个值在组件内部流转使用
  selectValue: '1',
  // 这里面的值要放暴露给用户的配置内容，让用户自己去改的
  dataset: [
    {
      label: '选项1',
      value: '1'
    },
    {
      label: '选项2',
      value: '2'
    },
    {
      label: '选项3',
      value: '3'
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = InputsSelectConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(InputsSelectConfig)
  // 这个值很重要，和隔壁 interact.ts文件关联在一起，定义所有的关联类型和参数等等
  public interactActions = interactActions
  public option = cloneDeep(option)
}
```

`index.vue` 内容如下, 大家基本上按照这个格式去写就没问题
```vue
<template>
  <n-tabs :type="option.value.tabType" @update:value="onChange">
    <n-tab v-for="(item, index) in option.value.dataset" :name="item.label" :key="index"> {{ item.label }} </n-tab>
  </n-tabs>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
// 最好保持写法一致
const option = shallowReactive({
  value: cloneDeep(props.chartConfig.option)
})

// 监听事件改变
const onChange = (v: string) => {
  if (v === undefined) return
  // 想传什么值给其它组件都可以自行处理
  const selectItem = option.value.dataset.find((item: { label: string; value: any }) => item.label === v)

  // 这里很重要，把值存储到联动数据
  useChartInteract(
    // 固定参数
    props.chartConfig,
    // 固定参数
    useChartEditStore,
    // 定义的类型和对应的值
    { [ComponentInteractParamsEnum.DATA]: selectItem.value },
    // 事件类型
    InteractEventOn.CHANGE
  )
}

// 手动更新
watch(
  () => props.chartConfig.option,
  (newData: any) => {
    // 这个决定修改
    option.value = newData
    onChange(newData.tabValue)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
```

`config.vue` 内容如下：
```vue
<template>
  <collapse-item name="标签页配置" :expanded="true">
    <setting-item-box name="默认值" :alone="true">
      <n-select size="small" v-model:value="optionData.tabType" :options="tabTypeOptions" />
    </setting-item-box>
  </collapse-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const tabTypeOptions = [
  {
    label: '线条',
    value: 'bar'
  },
  {
    label: '分段',
    value: 'segment'
  }
]
</script>

```

3. 然后把组件在 `src\packages\components\Informations\Mores\index.ts` 中进行导出

```ts
import { InputsSelectConfig } from './InputsSelect/index'

// 这里的顺序决定着最终的展示顺序
export default [InputsSelectConfig]
```