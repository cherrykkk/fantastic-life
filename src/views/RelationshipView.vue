<template>
  <div class="view-page">
    <div class="title">家族</div>
  
    <div class="family-board">
      <div>家庭</div>
      <div v-if='you.father'>父亲：{{you.father.name}} {{Math.floor(you.father.month/12)}}岁</div>
      <div v-if='you.mother'>母亲：{{you.mother.name}} {{Math.floor(you.mother.month/12)}}岁</div>
      <div v-if='you.mother'>兄弟姐妹
        <div v-for="(e,i) in you.mother.children" :key="i">{{e.name}} {{Math.floor(e.month/12)}}岁</div>
      </div>
      <div v-if='you.spouse'>配偶：{{you.spouse.name}} {{Math.floor(you.spouse.month/12)}}岁</div>
      子代
      <div class="character-list">
        <div v-for="e in you.children" :key="e" class="character-panel">
          {{e.name}} {{Math.floor(e.month/12)}}岁
          <character-avater :character="e" size="60" class="avater"></character-avater>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue'
import CharacterAvater from './components/CharacterAvater.vue'
export default {
  components: {
    CharacterAvater
  },
  setup() {
    const Manager = inject("Manager").value
    const you = Manager.you
    console.log(you)
    return {
      Manager,
      you
    }
  },
}


</script>
<style lang="less" scoped>
.family-board {
  position: absolute;
  width: 100%;
  top: 40px;
  .character-list {
    display: flex;
    .character-panel {
      height: 100px;
      border-right: 1px solid rgb(39, 20, 4);
      .avater {
        position: relative;
        right: 0;
        top: 0;
        height: 60px;
        width: 60px;
      }
    }
  }
}
.friend-board {
  position: absolute;
  width: 45%;
  left: 55%;
  top: 40px;
  .relationship {
    position: relative;
    height: 60px;
    text-align: left;
    border: 1px solid grey;
    margin: 1px;
    padding: 1px;
    .buff-area {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
    .buff {
      padding-right: 10px;
    }
    .avater {
      position: absolute;
      right: 0;
      top: 0;
      height: 60px;
      width: 60px;
    }
  }
  padding-bottom: 50px;
}
</style>