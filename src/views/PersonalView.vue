<template>
  <div class="personal-view view-page">
  <div class="attribute-board">
    <div v-if="!you.living">已故</div>
      <character-avater :character="you" class="avater"></character-avater>
      <div class="object-list">
        姓名: {{you.name}}
        <div v-if="you.spouse">
          配偶：{{you.spouse.name}}
        </div>
        <div>所在地：{{you.area.name}}</div>
        <div>钱财：{{you.money}}</div>
        <div>脂肪储量：{{you.脂肪储量}}</div>
        <div v-if="you.专职">专职：{{you.专职}}</div>
        <div v-if="you.灵力">灵力：{{you.灵力}}</div>
        <div v-if="you.灵根">灵根：{{you.灵根}}</div>
        <div v-if="you.境界!='凡人'">境界：{{you.境界}}</div>
      </div>
      <div class="array-list">
        <span>{{(you.month/12).toFixed(0)}}岁</span>
        <span v-if="!you.spouse">未婚</span>
        <span>{{you.sex}}</span>
        <div v-if="you.pregnent!=-1">怀孕{{you.pregnent}}月</div>
        <div v-for="(e,i) in you.buff" :key="i">拥有状态:{{e}}</div> 
      </div>
      <div>精力：{{you.精力}}</div>
      <div class="fold-attribute">
        <div @click="chosenAttributesPanel='bigFive'" class="group-name">人格特征</div>
        <div v-if="chosenAttributesPanel=='bigFive'" class="group-content">
          <span v-for="(e,i) in Object.keys(bigFive)" :key="i">{{bigFive[e]}}:{{you[e]}} &nbsp;</span>
        </div>
        <div @click="chosenAttributesPanel='skillsLevel'" class="group-name">技能水平</div>
        <div v-if="chosenAttributesPanel=='skillsLevel'" class="group-content">
          <span v-for="(skillName,i) in Object.keys(you.skillsLevel)" :key="i">{{skillName}}:{{you.skillsLevel[skillName]}} &nbsp;</span>
        </div>
      </div>
    </div>
    <div class="foldable-board">
      <div v-if="!you.家" >没有家，所以没有仓库</div>
      <div v-if="you.家" class="title" @click="chosenAttributesPanel='home'">家宅信息</div>
      <div v-if="chosenAttributesPanel=='home' && you.家">
        <div>类型：{{you.家.structure}}</div>
        <div>人口:
          <span v-for="e in you.家.使用权" :key="e">| {{e.name}} |</span>
        </div>
        <div>柴火储量：{{you.家.柴火储量}}</div>
        <button @click="setMaskLayer('house')">更多信息</button>
        <button @click="setMaskLayer('warehouse')">家中仓库</button>
      </div>
      <button @click="setMaskLayer('邀约面板')">邀约({{you.invations.length}})</button>
    </div>
    <div class="recent-memories-board">
      最近记忆
      <div v-for="(e,i) in you.memories" :key="i">
        <div class="calendar">{{e.month}}/{{e.date}}</div>
        <div>{{Manager.parseMemory(you,e)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import CharacterAvater from './components/CharacterAvater.vue'
import MaskLayer from './components/MaskLayer.vue'
export default {
  components: {
    CharacterAvater,
    MaskLayer
  },
  setup() {
    const Manager = inject("Manager").value
    const you = Manager.you
    console.log(you)
    const bigFive = {
      BIG_FIVE_Openness: '开放性',
      BIG_FIVE_Conscientiousness: '尽责性',
      BIG_FIVE_Extraversion: '外倾性',
      BIG_FIVE_Agreeableness: '宜人性',
      BIG_FIVE_Neuroticism: '神经质'
    } 
    const chosenAttributesPanel = ref('bigFive')
    return {
      Manager,
      you,
      bigFive,
      setMaskLayer: inject('setMaskLayer'),
      chosenAttributesPanel
    }
  },
}
    

</script>
<style lang="less" scoped>
.personal-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .attribute-board {
    flex: 1 1 200px;
    .avater {
      margin: 0 auto;
    }
  }
  .array-list {
    span {
      padding: 0 2px;
    }
  }
  .avater {
    height: 100px;
    width: 100px;
  }
  .fold-attribute {
    font-size: 12px;
    background-color: @lighterThemeColor;
    border-bottom: grey 1px solid;
    flex: 1 1 100px;
    .group-name {
      border-top: grey 1px solid;
    }
    .group-content {
      color: #999;
      span {
        word-break: keep-all;
      }
    }
  }
  .foldable-board {
    width: 50vw;
    button {
      display: block;
      width: 8em;
    }
  }
  .recent-memories-board {
    padding-left: 10px;
    position: relative;
    height: 100%;
    font-size: 12px;
    text-align: left;
    flex: 1 1 200px;
    height: 300px;
    overflow: auto;
    >div {
      display: flex;
      .calendar {
        flex: 0 0 30px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .personal-view {
    .foldable-board {
      position: absolute;
      bottom: 0;
    }
    .recent-memories-board {
      width: 50%;
      flex: 0 0 50%;
    }
  }
}

</style>