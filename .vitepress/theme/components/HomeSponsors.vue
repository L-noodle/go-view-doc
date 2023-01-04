<script setup lang="ts">
import { VPHomeSponsors } from 'vitepress/theme'
import { useCooperative } from '../composables/cooperative'

const { data } = useCooperative()
</script>

<template>
  <!-- 首页底部的合作伙伴声明 -->
  <VPHomeSponsors
    message="特别赞助"
    actionText="查看合作伙伴"
    actionLink="./cooperative/"
    :data="data"
  ></VPHomeSponsors>
</template>

<style>
.vp-sponsor-grid-item {
  cursor: default;
}

/* 图片 */
.vp-sponsor-grid-image {
  filter: grayscale(0);
}

.vp-sponsor-grid.big .vp-sponsor-grid-image {
  max-width: 400px !important;
  max-height: 70px !important;
}
</style>
