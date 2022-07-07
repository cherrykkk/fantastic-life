<template>
  <div class="layout">
    <router-view />
    <div class="button-board" v-if="Manager.World">
      <div class="page-router" @click="toUrl('/SettingInGame')">设置</div>
      <div class="page-router" @click="toUrl('/personal-view')">客观</div>
      <div class="page-router" @click="toUrl('/Livelihood')">行为</div>
      <div class="page-router" @click="toUrl('/area-view')">出门</div>
      <div class="page-router" @click="toUrl('/memory-view')">记忆</div>
      <div class="page-router" @click="toUrl('/relationship')">家族</div>
    </div>
    <div class="time" v-if="Manager.World">
      {{Manager.World.calendar.year}}年
      {{Manager.World.calendar.month==1?'正':Manager.World.calendar.month}}月
      {{Manager.World.calendar.date}}日
      <button v-if="!Manager.playing" @click="Manager.play()">继续生活</button>
      <button v-if="!Manager.playing" @click="Manager.aDayGoBy()">下一天</button>
      <button v-if="Manager.playing" @click="Manager.stop()">暂停</button>
    </div>
    <div class="mask-layer" v-if="globalState.maskLayer" @click="closeMaskLayer"  @contextmenu.prevent="closeMaskLayer">
      <mask-layer :type="globalState.maskLayerType" :data="globalState.maskLayerData"></mask-layer>
    </div>
    <template v-if="Manager.you && Manager.you.newMemory">
      <story-talker></story-talker>
    </template>
  </div>
</template>

<script>
import { inject,reactive,provide } from 'vue'
import maskLayer from '@/views/components/MaskLayer'
import StoryTalker from './StoryTalker.vue'
export default {
  name: 'Layout',
  components: {
    maskLayer,
    StoryTalker
  },
  setup(){
    const Manager = inject("Manager").value
    const globalState = inject('globalState')
    const toUrl = inject('toUrl')

    document.oncontextmenu = function(e){
      e.preventDefault();
    };
    
    const closeMaskLayer = (e)=>{
      if (e.button==0 && e.path.shift().className=='mask-layer') {
        globalState.maskLayer = false
      } else if (e.button==2) {
        globalState.maskLayer = false
      }
    }

    provide('setMaskLayer',(type,data)=>{
      globalState.maskLayer = type ? true : false
      globalState.maskLayerType = type
      globalState.maskLayerData = data
    })
    return {
      Manager,
      toUrl,
      globalState,
      closeMaskLayer,
    }
  }
}
</script>

<style lang='less' scoped>
.layout {
  position: fixed;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  left: 0;
  top: 0;
  display: flex;
  button {
    padding: 5px;
  }
  .button-board {
    position: relative;
    display: flex;
    background-color: @themeColor;
    .page-router {
      cursor: pointer;
      padding: 5px;
      height: 20px;
      width: 40px;
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active-page-router {
      background-color: white;
    }
  }
  .time {
    position: absolute;
    right: 0;
    bottom: 2px;
    text-align: right;
  }
  .mask-layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
  }
}

@media screen and (max-width: 600px ){
  .layout {
    .time {
      position: relative;
      background-color: @themeColor;
    }
  }
}

/deep/ .view-page {
  border: 10px solid @themeColor;
  position: relative;
  flex: 1;
}
/deep/ button {
  background: @borderColor;
  border: none;
  padding: 10px;
  color: white;
  font-weight: 900;
}
/deep/ .board-in-mask {
  position: absolute;
  top: 0;
  width: 80%;
  height: 80%;
  margin: 10%;
  border: @borderStyle;
  background-color: #f4fff4;
  overflow: hidden; 
}
/deep/ .collapse-accordion {
  font-size: 12px;
  background-color: @lighterThemeColor;
  border-bottom: grey 1px solid;
  .panel-title {
    border-top: grey 1px solid;
  }
  .panel-content {
    color: #999;
    span {
      word-break: keep-all;
    }
  }
}
</style>
