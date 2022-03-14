<template>
  <div class="layout">
    <div v-if="Manager.GameWorld">
      {{Manager.GameWorld.calendar.year}}年
      {{Manager.GameWorld.calendar.month}}月
      {{Manager.GameWorld.calendar.date}}日</div>
    <router-view/>
    <div class="button-board" v-if="Manager.GameWorld">
      <div @click="toUrl('/SettingInGame')">设置</div>
      <div @click="saveArchive(Manager)">存档</div>
      <div @click="toUrl('/player-view')">个人</div>
      <div @click="toUrl('/Livelihood')">能力</div>
      <div @click="toUrl('/memory')">记忆</div>
      <div @click="toUrl('/relationship')">社交</div>
    </div>
    <div class="mask-layer" v-if="globalState.maskLayer" @click="closeMaskLayer">
      <div class="board">
        <div class="title">参数自定义与确认</div>
        <div v-for="(e,i) in Object.keys(config)" :key="i" class="cell">
          {{e}}: 
          <button class="less-more" @click="setting(e,-1)">&lt;</button>
          {{config[e]}}
          <button class="less-more" @click="setting(e,1)">&gt;</button>
        </div>
        <button @click="newGame()">创建世界</button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject,reactive } from 'vue'
export default {
  name: 'Layout',
  setup(){
    const Manager = inject("Manager").value
    const saveArchive = inject('saveArchive')
    const globalState = inject('globalState')
    const toUrl = inject('toUrl')
    const config = reactive({
      "出生前世界运行年份": 20,
      "出生后直接跳到年龄": 2,
      "女娲造人持续年份": 5,
      "世界创建之初的NPC个数": 10
    })
    const closeMaskLayer = (e)=>{
      if (e.path.shift().className=='mask-layer') {
        globalState.maskLayer = false
      }
    }
    const newGame = ()=>{
      globalState.gameLoaded = false
      globalState.maskLayer = false
      const t1 = Date.now()

      Manager.newGame(config).then(()=>{
        console.log('done')
        globalState.gameLoaded = true
        toUrl('/player-view')
        const t2 = Date.now()
        console.log(t2-t1)
      })
    }
    return {
      Manager,
      saveArchive,
      toUrl,
      newGame,
      globalState,
      closeMaskLayer,
      config,
      setting: (e, num)=>{
        config[e] += num
        if( config[e]<0 || config[e]>20) {
          config[e] -= num
        }
      },
    }
  }
}

function createWorker(f) {

  var blob = new Blob(['(' + f.toString() +  
  `self.addEventListener('message', function (e) {
    self.postMessage('You said: ' + e.data);
  }, false);`
  + ')()']);
  var blob = new Blob(['(' + f.toString()
  + ')()']);
  var url = window.URL.createObjectURL(blob);
  console.log(blob)
  var worker = new Worker(url);
  return worker;
}
</script>

<style lang='less' scoped>
.layout {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: auto;
  left: 0;
  top: 0;
  .buttons-desk {
    position: fixed;
    bottom: 0;
  }
  .mask-layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    .board {
      position: absolute;
      top: 0;
      width: 80%;
      height: 80%;
      margin: 10%;
      border: ridge 5px green;
      background-color: #f4fff4;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      .button-board {
        position: absolute;
        bottom: 20px;
        display: flex;
        justify-content: space-around;
        width: 100%;
      }
    }
  }
}

.button-board {
  position: fixed;
  bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  div {
    cursor: pointer;
    border: 1px grey solid;
    border-radius: 50%;
    padding: 10px;
    background-color: white;
    height: 20px;
    width: 40px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
