<template>
  <div class="view">
    <div class="json">{{json}}
    </div>
  </div>
</template>

<script>
import { save } from '@/saveLoad/lib/save.js'
import { ref, inject } from 'vue'
export default {
  setup() {
    const game = inject("game")
    const json = JSON.stringify(game.value)
    //json.value = save(game)
    console.log(game.value)
    return {
      json
    }
  },
}
</script>
<style lang="less" scoped>
.view {
  overflow: scroll;
  height: 3000px;
  margin: 40px 0;
  .json {
    position: relative;
    height: 3000px;
  }
}
</style>