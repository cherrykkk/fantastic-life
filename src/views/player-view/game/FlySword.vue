<template>
  <div class="pixi-map" ref="pixiMap"></div>
</template>

<script>
import { ref, inject, onMounted, reactive } from 'vue'
import { createMap } from './createPixiMap.js'
export default {
  setup() {
    const pixiHandler = createMap()  //同步返回 app、loader、mapContainer, 异步返回 tiling
    const { app,loader,mapContainer } = pixiHandler
    const pixiMap = ref(null)
    const moveControl = reactive({
      vx: 0,
      vy: 0,
      time: 0,
      rotation: 0,
      pointerdown: false
    })
    app.stage.on("pointermove",(e)=>{
      if (moveControl.pointerdown) {
        const { x, y } = e.data.global
        const vx = (x - app.screen.width/2)/20, vy = (y - app.screen.height/2)/20
        moveControl.vx = vx
        moveControl.vy = vy
        moveControl.rotation = Math.atan2(vy , vx)
      }
    })
    app.stage.on("pointerdown",()=>{
      moveControl.pointerdown = true
    })
    app.stage.on("pointerup",(e)=>{
      moveControl.pointerdown = false
    })
    app.stage.on("pointerout",(e)=>{
      moveControl.pointerdown = false
    })
    onMounted(()=>{
      pixiMap.value.appendChild(app.view)
      loader.load(() => {
        app.ticker.maxFPS = 60
        console.log(pixiHandler.focus)
        app.ticker.add(()=>{
          const { focus } = pixiHandler
          const { vx, vy, rotation, pointerdown } = moveControl
          focus.x += vx
          focus.y += vy
          focus.rotation = rotation
          mapContainer.x -= vx
          mapContainer.y -= vy
          if (!pointerdown) {
            const a = 0.95
            if (vx+vy < 0.05) {
              moveControl.vx = 0
              moveControl.vy = 0
            }
            else {
              moveControl.vx = vx*a
              moveControl.vy = vy*a
            }
          }
        })
      })
    })
    return {
      pixiMap
    }
  },
}
    

</script>
<style lang="less" scoped>
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