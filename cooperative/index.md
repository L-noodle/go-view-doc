# 合作伙伴

## 社区与商业合作伙伴（部分）

<script setup lang="ts">
import { computed, ref } from 'vue'
import { VPTeamMembers } from 'vitepress/theme'
import { useCooperative } from './cooperative'

const active = ref(null)
let { data, membersData } = useCooperative()

const cooperative = computed(() => {
  return (
    data?.map(item => {
      return {
        size: item.size === 'big' ? 'mini' : 'xmini',
        items: item.items
      }
    }) ?? []
  )
})
const members = computed(() => {
  return (
    membersData?.map(item => {
      return {
        size: item.size === 'big' ? 'mini' : 'xmini',
        items: item.items
      }
    }) ?? []
  )
})

// 数组打乱
const randomSort = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    var iRand = parseInt(arr.length * Math.random());
    var temp = arr[i];
    arr[i] = arr[iRand];
    arr[iRand] = temp;
  }
  return arr;
}
</script>

<div class="VPSponsors vp-sponsor aside">
  <section
    class="vp-sponsor-section"
    v-for="(item, index) in cooperative"
    :key="index"
  >
    <div
      class="VPSponsorsGrid vp-sponsor-grid"
      :class="[item.size === 'mini' ? 'mini' : 'xmini']"
      :data-vp-grid="item.size === 'mini' ? 2 : 3"
    >
      <div
        v-for="(iitem, ii) in item.items"
        :key="ii"
        class="vp-sponsor-grid-item vp-sponsor-grid-item-pd goview-sponsor"
        :class="{ alone: iitem.alone }"
        style="color: var(--vp-c-text-2)"
        @mouseenter="active = ii"
        @mouseleave="active = null"
      >
        <img v-if="iitem.img" :src="iitem.img" />
        <p v-else>{{ iitem.name }}</p>
      </div>
    </div>
  </section>
</div>

## 贡献者列表

:::tip 最新数据
详见：https://gitee.com/dromara/go-view/contributors?ref=master
:::

<div class="VPSponsors vp-sponsor aside gitee">
  <section
    class="vp-sponsor-section"
    v-for="(item, index) in randomSort(members)"
    :key="index"
  >
    <div
      class="VPSponsorsGrid vp-sponsor-grid"
      :class="[item.size === 'mini' ? 'mini' : 'xmini']"
      :data-vp-grid="item.size === 'mini' ? 2 : 3"
    >
      <div
        v-for="(iitem, ii) in item.items"
        :key="ii"
        class="vp-sponsor-grid-item vp-sponsor-grid-item-pd"
        style="color: var(--vp-c-text-2); display: flex; gap: 20px;"
      >
        <img v-if="iitem.img" :src="iitem.img" style="width: 50px; height: 50px; border-radius: 50%" />
        <div v-else-if="iitem.name" class="gitee-avatar"> {{ iitem.name.substr(0, 1) }}</div>
        <p v-if="iitem.name" class="gitee-name">{{ iitem.name }}</p>
        <p v-else class="gitee-name">...</p>
      </div>
    </div>
  </section>
</div>

<style scoped>
.vp-sponsor-grid-item-pd {
  flex-shrink: 0;
  padding: 10px 20px;
  cursor: default;
}
.vp-sponsor-grid-item {
  cursor: default;
}

.vp-sponsor-grid-item.alone {
  width: 100%;
}

.goview-sponsor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  line-height: 80px;
  overflow: hidden;
}

.goview-sponsor img {
  max-height: 50px;
}

.goview-sponsor.alone img {
  max-width: 100%;
}

.goview-sponsor p {
  color: #3c3c3c;
  font-size: 20px;
}

.dark .goview-sponsor {
  background: whitesmoke;
}

.gitee-avatar {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  background-color: var(--vp-c-brand);
}

.gitee-name {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dark .gitee .vp-sponsor-grid-item-pd:hover {
  background-color: var(--vp-c-bg-mute)!important;
}

.vp-sponsor-section {
  margin-top: 0px;
}

@media (max-width: 700px) {
  .VPSponsors.vp-sponsor.aside .vp-sponsor-section:first-child .vp-sponsor-grid-item {
    width: calc((100% - 4px * 2) / 2);
  }
   .vp-sponsor-grid-item-pd {
    justify-content: center;
  }
  .gitee-name {
    display: none;
  }
}

</style>
