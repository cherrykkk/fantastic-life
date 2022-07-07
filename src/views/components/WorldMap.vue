<template>
  世界地图
  <div class="area-list">
    <div v-for="(area,i) in Manager.World.areas" :key="i"
      :class="{'area-panel':true,'current-position':Manager.you.area==area}">
      {{area.name}}
      <span @click="Manager.you.goTo(area)" class="goto-button">前往</span>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const Manager = inject('Manager').value
    return {
      Manager
    }
  },
}
</script>
<style lang="less" scoped>
.area-list {
  display: flex;
  flex-shrink: 0;
  .area-panel {
    margin: 5px 10px;
    padding: 5px 10px;
    border: 2px solid @themeColor;
    .goto-button {
      background: @themeColor;
      height: auto;
      font-size: 12px;
    }
  }
  .current-position {
  }
}
</style>