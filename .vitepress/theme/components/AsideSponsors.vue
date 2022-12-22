<script setup lang="ts">
import { computed } from 'vue'
import { VPDocAsideSponsors } from 'vitepress/theme'
import { useSponsor } from '../composables/sponsor'

const { data } = useSponsor()

const sponsors = computed(() => {
  return (
    data?.value.map(sponsor => {
      return {
        size: sponsor.size === 'big' ? 'mini' : 'xmini',
        items: sponsor.items
      }
    }) ?? []
  )
})
</script>

<template>
  <div class="go-view-tip">
    <img width="22" height="22" src="/go-view-tip.svg" />
    <span>
      <p class="extra-info">&nbsp;</p>
      <p class="heading">致敬所有的美好</p>
      <p class="extra-info">欢迎更多小伙伴参与建设！</p>
    </span>
  </div>
  <div class="VPDocAsideSponsors" v-if="data">
    <div class="VPSponsors vp-sponsor aside">
      <section
        class="vp-sponsor-section"
        v-for="(item, index) in sponsors"
        :key="index"
      >
        <div
          class="VPSponsorsGrid vp-sponsor-grid"
          :class="[item.size === 'mini' ? 'mini' : 'xmini']"
          :data-vp-grid="item.size === 'mini' ? 1 : 2"
        >
          <div
            v-for="(iitem, ii) in item.items"
            :key="ii"
            class="vp-sponsor-grid-item vp-sponsor-grid-item-pd"
            style="color: var(--vp-c-text-2)"
          >
            <p>{{ iitem.name }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.go-view-tip {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 14px;
  padding-left: 2.5rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  position: relative;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.1rem;
  filter: grayscale(100%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-bg-alt);
  transition: border-color 0.5s;
}
/* 原hover */
.go-view-tip {
  filter: grayscale(0%);
  border: 2px solid var(--vp-c-brand-light);
}
.go-view-tip img {
  position: absolute;
  left: 1.5rem;
  transition: transform 0.5s;
}
.go-view-tip:hover img {
  transform: scale(1.75);
}

/* 原hover */
.go-view-tip .heading {
  background-image: linear-gradient(
    120deg,
    #54b6d0 16%,
    var(--vp-c-brand-light),
    var(--vp-c-brand-light)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.go-view-tip .extra-info {
  color: var(--vp-c-text-1);
  opacity: 0;
  font-size: 0.7rem;
  padding-left: 0.1rem;
  transition: opacity 0.5s;
}
.go-view-tip:hover .extra-info {
  opacity: 0.9;
}
.vp-sponsor-grid-item-pd {
  padding: 10px 20px;
  cursor: default;
}
.dark .aside .vp-sponsor-grid-item-pd:hover {
  background-color: var(--vp-c-bg-mute)!important;
}
</style>
