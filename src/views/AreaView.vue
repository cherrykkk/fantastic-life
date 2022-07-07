<template>
  <div class="area-view view-page">
    <div class="area-name-panel">
      <div class="area-name-text">{{Manager.you.area.name}}</div>
    </div>
    <div class="buttons">
      <button @click="setMaskLayer('map')">世界地图</button>
      <button @click="setMaskLayer('市场',chosen.市场)">当地市场</button>
    </div>
    <div class="chosen-area">
      <div>布告板</div>
      <div class="events-board">
        <div v-for="event in chosen.broadcastBoard" :key="event" class="event-panel">
          <div>活动：{{event.活动名称}}</div>
          <div>举办方：{{event.举办方.name}}</div>
          <div>主持人：{{event.主持人.name}}</div>
        </div>
      </div>
      <div>当地角色</div>
      <div class="characters-board">
        <div v-for="(character) in characters" :key="character" class="character" @click="setMaskLayer('interact',character)">
          <character-avater :character="character" size="60" class="avater"></character-avater>
          {{character.name}}
        </div>
      </div>
      <div>当地民宅</div>
      <div class="estates-board">
        <div v-for="e in houses" :key="e" class="building">
          <img src="@/assets/茅草屋.png" v-if="e.name=='茅草屋'">
          <img src="@/assets/小木屋.png" v-if="e.name=='小木屋'">
          <div class="label">{{e.name}}</div>
          <div class="label">{{e.owner ? e.owner.name : '无主'}}</div>
        </div>
      </div>
      <div>当地商铺</div>
      <div class="estates-board">
        <div v-for="e in shops" :key="e">
          <div class="label">{{e.name}}</div>
          <div>{{e.营业中?'营业中':'未营业'}}</div>
        </div>
      </div>
      <div>当地农田</div>
      <div class="farmland-board">
        <div v-for="farmland in farmlands" :key="farmland" :class="{cell:true, planted:farmland.warehouse[0]}" @click="setMaskLayer('farmlandPanel',farmland)">
          <div class="label">{{farmland.owner.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, computed } from 'vue'
import CharacterAvater from './components/CharacterAvater.vue'
export default {
  components: {
    CharacterAvater
  },
  setup() {
    const Manager = inject("Manager").value
    const chosen = ref(Manager.World.areas[0])
    const chosenCharacter = ref(null)
    const characters = computed(() => Manager.World.characters.filter(character => character.area == Manager.you.area))
    const shops = computed(() => Manager.you.area.estates.filter(estate => estate.structure == '商铺'))
    const houses = computed(() => Manager.you.area.estates.filter(estate => estate.structure == '民宅'))
    const farmlands = computed(() => Manager.you.area.estates.filter(estate => estate.type == 'farmland'))
    return {
      Manager,
      chosen,
      setMaskLayer: inject('setMaskLayer'),
      characters,
      shops,
      houses,
      farmlands,
      chosenCharacter
    }
  },
}
    

</script>
<style lang="less" scoped>
.area-view {
  .area-name-panel {
    position: absolute;
    padding: 5px;
    .gapImage;
    .area-name-text {
      background: white;
      padding: 5px;
    }
  }
  .buttons {
    text-align: right;
  }
  .chosen-area {
    overflow: hidden;
    .interact-board {
      background-color: green;
    }
    .events-board {
      display: flex;
      .event-panel {
        margin: 0 5px;
        border: 2px dotted red;
        display: flex;
        flex-direction: column;
      }
    }
    .characters-board {
      overflow: auto;
      display: flex;
      .character {
        margin: 0 5px;
        .avater {
          width: 60px;
          height: 60px;
        }
      }
    }
    .estates-board {
      display: flex;
      flex-wrap: wrap;
      div {
        padding: 0 2px;
      }
      img {
        width: 50px;
      }
    }
    .farmland-board {
      display: flex;
      flex-wrap: wrap;
      .cell {
        padding: 0 2px;
        width: 40px;
        height: 40px;
        background-image: url('~@/assets/耕地.png');
        background-size: 100%;
      }
      .planted {
        background-image: url('~@/assets/有植物的耕地.png');
      }
    }
  }
  .label {
    font-size: 12px;
    color: #999
  }
}
</style>