<template>
  <div class="pixi-map" ref="pixiMap"></div>
  <div v-if="!attackMode" class="attack" @click="changeMode">行</div>
  <div v-if="attackMode" class="attack" @click="changeMode">攻</div>
</template>

<script>
import { ref, inject, onMounted, reactive } from 'vue'
import { createMap } from './createPixiMap.js'
export default {
  setup() {
    const pixiHandler = createMap()  //同步返回 app、loader、mapContainer, 异步返回 tiling, moveControl
    const pixiMap = ref(null)
    onMounted(()=>{
      pixiMap.value.appendChild(pixiHandler.app.view)
    })
    const attackMode = ref(null)
    const changeMode = ()=>{
      attackMode.value = !attackMode.value
      if (attackMode.value) {
        pixiHandler.focus.setAttackMode()
        pixiHandler.moveControl.model = 'bow'
      } else {
        pixiHandler.focus.setWalkMode()
         pixiHandler.moveControl.model = 'person'
      }
    }
    return {
      pixiMap,
      attackMode,
      changeMode
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
.attack {
  position: absolute;
  width: 6vw;
  height: 6vw;
  border-radius: 50%;
  background-color: white;
  left: 5vw;
  bottom: 100px;
}
</style>