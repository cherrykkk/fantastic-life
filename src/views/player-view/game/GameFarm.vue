<template> 
  <div v-if="farmland.length==0">你没有耕地可以种植！</div>
  <div v-if="farmland.length!=0" class="farmland-info-board">
    <div>耕地面积：{{chosen['尺寸']}}</div>
    <div>耕地质量：{{chosen['质量']}}</div>
    <template v-if="chosen.plant">
      <div>作物: {{chosen.plant["名称"]}}</div>
      <div>成长度: {{chosen.plant["成长度"]}}</div>
    </template>
  </div>  
  <div v-for="(e,i) in farmland" :key="i" @click="chosen=e" class="farmland"></div>
  <div class="button-board">
    <button @click="Manager.sow(you,chosen)">播种</button>
    <button @click="Manager.harvest(you,chosen)">收获</button>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
export default {
  setup() {
    const Manager = inject('Manager').value
    const you = Manager.you
    const farmland = you.不动产.reduce((e1,e2)=>{ 
      const object = Manager.getEstateById(e2)
      if (object['类型'] == '耕地') e1.push(object) 
      return e1
    },[])
    const chosen = ref(farmland[0])
    return {
      Manager,
      you,
      farmland,
      chosen
    }
  },
}
</script>
<style lang="less" scoped>
.farmland-info-board {

}
.farmland {
  width: 44vw;
  height: 44vw;
  border-radius: 2vw;
  border: 1px black solid;
  background-color: #4b5606; //土地色
  margin: 3vw;
}
</style>