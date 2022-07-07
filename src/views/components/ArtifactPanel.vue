<template>
  <div class="title">{{artifact.name}}</div>
  <div>结构：{{artifact.structure}}</div>
  <div>建造材料：{{artifact.material}}</div>
  <img src="@/assets/茅草屋.png" v-if="artifact.name=='茅草屋'">
  <img src="@/assets/小木屋.png" v-if="artifact.name=='小木屋'">
  <img src="@/assets/耕地.png" v-if="artifact.name=='农田'&& !artifact.warehouse[0]">
  <img src="@/assets/有植物的耕地.png" v-if="artifact.name=='农田' && artifact.warehouse[0]">
  <div class="operator-board">
    <div v-if="artifact.type=='farmland'">
      <div v-if="artifact.warehouse[0]">
        作物：{{artifact.warehouse[0].name}} <br>
        成熟度：{{artifact.warehouse[0].maturity}}<br>
        状态：{{artifact.warehouse[0].status}}<br>
        <button @click="Manager.you.harvest(artifact)" v-if="authority=='owner'">收获</button>
      </div>
      <div v-if="artifact.warehouse.length==0 && authority=='owner'">
        <div v-for="plant in Manager.creature_prefabs.filter(e=>e.domain=='plant')" :key="plant" class="collapse-accordion">
          <div class="panel-title" @click="chosen=plant">{{plant.name}}</div>
          <div class="panel-content" v-if="chosen==plant">
            <div>可播种于{{plant.播种月份}}月</div>
            <div>生长时间{{plant.生长天数}}天</div>
            <div>产出【{{plant.产出}}】*{{plant.产量}}</div>
            <button @click="Manager.you.sow(artifact,plant.name)">种植</button>
            </div>
        </div>
      </div>
      <div v-if="authority=='visitor'">
        产权所属：{{artifact.owner.name}}
      </div>
    </div>
    <div v-if="artifact.structure=='商铺'">
      商品
      <div v-if="artifact.warehouse[0]">
        {{artifact.warehouse[0].type}}
      </div>
      <div v-if="artifact.warehouse.length==0">
        <button>上架</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
export default {
  props: ['artifact'],
  setup(props) {
    const artifact = props.artifact
    console.log(props)
    const Manager = inject('Manager').value
    const chosen = ref(null)
    const authority = artifact.owner == Manager.you ? 'owner' : 'visitor'
    return {
      artifact,
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