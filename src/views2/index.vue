<template>
  <div class="view">
    <div class="json">{{json}}
    </div>
  </div>
</template>

<script>
import { GAME } from '@/core/apiForView/theGame.js'
import { save } from '@/saveLoad/lib/save.js'
import { ref } from 'vue'
export default {
  setup() {
    const json = ref(null)
    function onGameLoadDown(game) {
      //主角降生前，社会运行10年(120月)
      for( let i = 0;i<12;i++) {
        GAME.monthGame(game)
      }
      json.value = save(game)
    }
    GAME.newGame()
    .then((game)=>onGameLoadDown(game))
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