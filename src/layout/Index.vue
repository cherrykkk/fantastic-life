<template>
  <div class="layout">
    <router-view/>
    <!-- <buttons-desk class="buttons-desk"></buttons-desk> -->
  </div>
</template>

<script>
import { onBeforeMount,onMounted,provide,reactive,ref,watch,watchEffect } from 'vue'
import ButtonsDesk from './ButtonsDesk.vue'
export default {
  name: 'Layout',
  components: {
    ButtonsDesk
  },
  setup(){
    const resizeArgs = reactive({
      bodyWidth:0,
      usableWidth:0,
      mobile:false,
      safeWidth:1190
    })
    const currentLife = ref(null)
    const setCurrentLife = (life)=>{
      currentLife.value = life
    }
    provide('getCurrentLife',()=>currentLife.value)
    provide('setCurrentLife',setCurrentLife)
    provide('resizeSymbol',resizeArgs)
    onBeforeMount(()=>{
      window.addEventListener('resize', resize)
      resize()
    })
    onMounted(()=>{
      console.log("mounted")
    })
    let resize = ()=>{
      resizeArgs.bodyWidth = document.body.clientWidth
      resizeArgs.usableWidth = (resizeArgs.bodyWidth>resizeArgs.safeWidth)? resizeArgs.safeWidth : resizeArgs.bodyWidth
      resizeArgs.mobile = resizeArgs.bodyWidth < 600
    }
  }
}
</script>

<style lang='less' scoped>
.layout {
  position: fixed;
  height: 100%;
  width: 100%;
  .buttons-desk {
    position: fixed;
    bottom: 0;
  }
}
</style>
