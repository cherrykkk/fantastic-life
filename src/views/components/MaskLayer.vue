<template>
  <template v-if="type=='新游戏参数'">
    <new-game-setting></new-game-setting>
  </template>
  <div v-if="type=='map'" class="board"><world-map></world-map></div>
  <div v-if="type=='interact'" class="board"><interact-with :character="data"></interact-with></div>
  <div v-if="type=='邀约面板'" class="board">
    我的邀约
    <div v-for="invation in you.invations" :key="invation">
      {{invation.content}}
      {{invation.A.name}}->{{invation.B.name}}
      <div v-if="you==invation.A">待对方回应</div>
      <div v-if="you==invation.B && !invation.replay">
        <div @click="you.回应邀约(invation,'ok')">同意</div>
        <div @click="you.回应邀约(invation,'no')">拒绝</div>
      </div>
      <div v-if="invation.replay">
        已{{invation.replay=='ok'?'同意':'拒绝'}}
      </div>
    </div>
  </div>
  <div v-if="type=='artifact'" class="board">
    <artifact-panel :artifact="data"></artifact-panel>
  </div>
  <div v-if="type=='farmlandPanel'" class="board">
    <farmland-panel :farmland="data"></farmland-panel>
  </div>
  <div v-if="type=='house'" class="board">
    <home-panel></home-panel>
  </div>
  <div v-if="type=='warehouse'" class="board">
    <warehouse></warehouse>
  </div>
  <div v-if="type=='ChooseOccupation'">
    <choose-occupation></choose-occupation>
  </div>
  <div v-if="type=='市场'" class="board market">
    <div class="title">{{you.area.name}}市场</div>
    <div class="content">
      <div v-for="(e,i) in you.area.市场" :key="i" class="cell">
        <div>{{e.物品}}</div>
        <div>市场价: {{e.市场价}}</div>
        <div>市场量: {{e.市场量}}</div>
        <button @click="you.从当地市场买东西(e.物品,100)">购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, inject } from 'vue'
import Warehouse from './Warehouse.vue'
import NewGameSetting from './NewGameSetting.vue'
import InteractWith from './InteractWith.vue'
import WorldMap from './WorldMap.vue'
import ArtifactPanel from './ArtifactPanel.vue'
import FarmlandPanel from './FarmlandPanel.vue'
import HomePanel from './HomePanel.vue'
import ChooseOccupation from './ChooseOccupation.vue'
export default {
  props: ['type','data'],
  components: {
    Warehouse,
    NewGameSetting,
    InteractWith,
    WorldMap,
    ArtifactPanel,
    HomePanel,
    ChooseOccupation,
    FarmlandPanel
  },
  setup(props) {
    const you = inject('Manager').value.you
    return {
      type: props.type,
      data: props.data,
      you
    }
  },
}
</script>

<style lang="less" scoped>
.board {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  top: 10%;
  bottom: 10%;
  border: @borderStyle;
  background-color: #f4fff4;
  overflow: hidden; 
  .title {
    position: relative;
    font-size: 20px;
    margin: 10px 0;
    text-align: center;
  }
  .content {
    position: relative;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;  
    .cell {
      width: 50px;
      height: 50px;
    }
  }
}

.market {
  font-size: 12px;
  .content {
    .cell {
      border: grey 1px solid;
      width: 100px;
      height: 100px;
    }
  }
}
</style>