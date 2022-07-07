<template>
  <div class="title">{{farmland.name}}</div>
  <img src="@/assets/耕地.png" v-if="farmland.name=='农田'&& !farmland.warehouse[0]">
  <img src="@/assets/有植物的耕地.png" v-if="farmland.name=='农田' && farmland.warehouse[0]">
  <div class="operator-board">
    <div v-if="farmland.warehouse[0]">
      作物：{{farmland.warehouse[0].name}} <br>
      成熟度：{{farmland.warehouse[0].maturity}}<br>
      状态：{{farmland.warehouse[0].status}}<br>
      <button @click="Manager.you.harvest(farmland)" v-if="authority=='owner'">收获</button>
    </div>
    <div v-if="farmland.warehouse.length==0 && authority=='owner'">
      <div v-for="plant in Manager.creature_prefabs.filter(e=>e.domain=='plant')" :key="plant" class="collapse-accordion">
        <div class="panel-title" @click="chosen=plant">{{plant.name}}</div>
        <div class="panel-content" v-if="chosen==plant">
          <div>可播种于{{plant.播种月份}}月</div>
          <div>生长时间{{plant.生长天数}}天</div>
          <div>产出【{{plant.产出}}】*{{plant.产量}}</div>
          <button @click="Manager.you.sow(farmland,plant.name)">种植</button>
        </div>
      </div>
    </div>
    <div v-if="authority=='visitor'">
      产权所属：{{farmland.owner.name}}
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
export default {
  props: ['farmland'],
  setup(props) {
    const farmland = props.farmland
    console.log(props)
    const Manager = inject('Manager').value
    const chosen = ref(null)
    const authority = farmland.owner == Manager.you ? 'owner' : 'visitor'
    return {
      farmland,
      chosen,
      authority,
      Manager
    }
  },
}
</script>
<style lang="less" scoped>
.operator-board {
  position: absolute;
  bottom: 0;
  height: 300px;
  width: 100%;
  background-color: @lighterThemeColor;
}
.collapse-accordion {
  .panel-title {
    font-size: 20px;
  }
  .panel-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    span {
      padding: 0 2px;
    }
    button {
      .small-button;
    }
  }
}
</style>