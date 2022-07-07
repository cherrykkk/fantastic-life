<template>
  <div class="view view-page">
    <div class="friend-board">
      <div class="title">朋友</div>
      <div v-if="chosen" @click="chosen=null" class="button-red">取消选中</div>
      <div v-for="(e2) in you.relationships" :key="e2" class="relationship" @click="chosen=e2">
        <character-avater :character="e2.B" size="60" class="avater"></character-avater>
        <div class="name">{{e2.B.name}}</div>
        <div>熟悉{{e2.熟悉}}<br>纯洁{{e2.纯洁}}</div>
      </div>
    </div>
    <div class="title">{{you.surname+you.givenName}}的记忆</div>
    <div class="memory-board">
      <div v-for="(e,i) in memoryList" :key="i" class="memory-word">
        <span class="calendar">{{e.year}}-{{e.month}}-{{e.date}}</span>
        {{Manager.parseMemory(you,e)}}
      </div>
    </div>
  </div>
</template>
<script>
import { computed, inject, ref } from 'vue'
import CharacterAvater from './components/CharacterAvater.vue'
export default {
  components: {
    CharacterAvater
  },
  setup() {
    const Manager = inject("Manager").value
    const you = Manager.you
    const chosen = ref(null)
    const showSystemMessage = inject("showSystemMessage")
    const memoryList = computed(()=>{
      return Manager.you.memories.reduce((e1,e2)=>{
        if (chosen.value && e2.B != chosen.value.B)
          return e1
        if (Manager.World.config['记忆展示顺序']=='逆序') {
          e1.unshift(e2)
        } else {
          e1.push(e2)
        }
        return e1
      },[])
    })
    const 发送邀约 = function(content) {
      if (chosen.value) {
        you.makeInvation(chosen.value.B,content)
      }
      else {
        showSystemMessage('请先选择对象')
      }
    }
    return {
      Manager,
      you,
      memoryList,
      chosen,
      发送邀约
    }
  },
}
</script>
<style lang="less" scoped>
.view {
  display: flex;
  flex-direction: column;
  .friend-board {
    width: 100%;
    overflow: auto;
    left: 0;
    top: 60px;
    display: flex;
    background-color: white;
    font-size: 12px;
    .title {
      padding: 10px;
    }
    .button-red {
      background-color: red;
      color: white;
      padding: 10px;
    }
    .relationship {
      position: relative;
      height: 110px;
      width: 60px;
      text-align: left;
      border: 1px solid grey;
      margin: 1px;
      padding: 1px;
      flex-shrink: 0;
      text-align: center;
      .avater {
        position: relative;
        right: 0;
        top: 0;
        height: 60px;
        width: 60px;
      }
    }
  }
  .memory-board {
    position: relative;
    overflow: auto;
    flex: 1 1 200px;
    .memory-word {
      font-size: 16px;
      color: #666;
      text-align: left;
      .calendar {
        width: 40px;
      }
    }
  }
}
</style>