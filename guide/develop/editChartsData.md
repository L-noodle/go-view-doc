注：现在数据请求功能可能不是特别的完善

现在数据处理主要是两种，一种是静态数据（较为推荐）, 第二种是接口请求。

1. 静态数据处理在创建新图表那里可以直接导入，聚焦目标之后，可以在数据设置。

2. 动态数据现仅有较为简单的 `get / post` 请求。
    * 支持定时请求，在页面 `页面设置 -> 数据配置` 里设置时间，还可以设置全局的 `根路径`。
    * 每个页面的 `数据` 可以设置单独的请求方式与接口；
    * 数据格式需要使用 `ECharts-setdata` 规范，支持数据映射校验。
  
数据处理内容详见：`src\views\chart\ContentConfigurations\components\ChartData\index.vue`。

3. 支持静态数据 `导出` 与 `导入`，注意需要符合 `setdata` 格式奥。

4. 数据请求的位置在每个图表的 `useChartDataFetch` 中，在创建新图表的教程中可以查看使用方式。

配置相关和useChartDataFetch 的内容如下：

```ts
// 数据相关
export enum RequestDataTypeEnum {
  // 静态数据
  STATIC = 0,
  // 请求数据
  AJAX = 1,
}

/**
 * @description: 请求方法
 */
export enum RequestHttpEnum {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}
```

```ts
// 单个图表请求配置
export type RequestConfigType = {
  // 获取数据的方式
  requestDataType: RequestDataTypeEnum
  // 请求方式 get/post/del/put/patch
  requestHttpType: RequestHttpEnum
  // 源后续的 url
  requestUrl?: string
}
```
```ts
import { ref, toRefs, watchEffect, nextTick } from 'vue'
import type VChart from 'vue-echarts'
import { http } from '@/api/http'
import { CreateComponentType, PackagesCategoryEnum } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { isPreview } from '@/utils'

// 获取类型
type ChartEditStoreType = typeof useChartEditStore

/**
 * setdata 数据监听与更改
 * @param targetComponent
 * @param useChartEditStore 若直接引会报错，只能动态传递
 * @param updateCallback 自定义更新函数
 */
export const useChartDataFetch = (
  targetComponent: CreateComponentType,
  useChartEditStore: ChartEditStoreType, 
  updateCallback?: (...args: any) => any
) => {
  const vChartRef = ref<typeof VChart | null>(null)
  let fetchInterval: any = 0

  isPreview() &&
    watchEffect(() => {
      clearInterval(fetchInterval)

      const chartEditStore = useChartEditStore()
      // 拿到全局根路劲和请求间隔
      const { requestOriginUrl, requestInterval } = toRefs(
        chartEditStore.getRequestGlobalConfig
      )
      // 获取目标图表的请求方式，请求类型，数据
      const { requestDataType, requestHttpType, requestUrl } = toRefs(
        targetComponent.data
      )
      if (requestDataType.value !== RequestDataTypeEnum.AJAX) return
      // 处理地址
      if (requestUrl?.value && requestInterval.value > 0) {
        // requestOriginUrl 允许为空
        const completePath =
          requestOriginUrl && requestOriginUrl.value + requestUrl.value
        if (!completePath) return

        fetchInterval = setInterval(async () => {
          const res:any = await http(requestHttpType.value)(completePath || '', {})
          if (res.data) {
            // 是否是 Echarts 组件
            const isECharts =
              targetComponent.chartConfig.package ===
              PackagesCategoryEnum.CHARTS

            try {
              // 是否是 echarts 则自动更新
              if (isECharts) {
                nextTick(() => {
                  if (vChartRef.value) {
                    vChartRef.value.setOption({ dataset: res.data })
                  }
                })
              } else {
                // 若遵守规范使用 datase 作为数据 key，则省自动赋值数据
                targetComponent.option.dataset && (targetComponent.option.dataset = res.data)
              }
              // 若有回调，执行回调
              if (updateCallback) {
                updateCallback(res.data)
              }
            } catch (error) {
              console.error(error)
            }
          }
        }, requestInterval.value * 1000)
      }
    })

  return { vChartRef }
}

```