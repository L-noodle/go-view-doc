<script setup lang="ts">
import { VPHomeSponsors } from 'vitepress/theme'
import { useCooperative } from '../composables/cooperative'

const { data } = useCooperative()

</script>

<template>
  <!-- 首页底部的合作伙伴声明 -->
  <VPHomeSponsors
    v-if="false"
    message="开源与商业合作伙伴（部分）"
    :data="data"
  ></VPHomeSponsors>
</template>

<style scoped>
.vp-sponsor-grid-item {
  cursor: default;
}
</style>
