<template>
  <div class="pixi-map" ref="pixiMap"></div>
</template>

<script>
import { ref, inject, onMounted, reactive } from 'vue'
import { createMap } from './createPixiMap.js'
import { MoveControl } from './MoveControl.js' 
export default {
  setup() {
    const pixiHandler = createMap()  //同步返回 app、loader、mapContainer, 异步返回 tiling
    const pixiMap = ref(null)
    onMounted(()=>{
      pixiMap.value.appendChild(pixiHandler.app.view)
      pixiHandler.loader.load(() => {
        new MoveControl(pixiHandler.focus,pixiHandler.mapContainer,pixiHandler.app,'person')
      })
    })
    return {
      pixiMap
    }
  },
}
    

</script>
<style lang="less" scoped>
.pixi-map {
  position: absolute;
  top: 0;
  z-index: -1;
}
.view {
  margin: 40px 0;
}
.button-board {
  position: absolute;
  bottom: 20px;
  cursor: pointer;
}
.operator-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,200,0.1);
}
</style>