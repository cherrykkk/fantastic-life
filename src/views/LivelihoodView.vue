<template>
  <div class="skill-board view-page">
    <div>
      专职：{{you.专职}}       
      <div @click="setMaskLayer('ChooseOccupation')" class="small-button">选择专职</div>
    </div>
    我的财产资源
    <div class="artifact-list">
      <div v-for="estate in you.estates" :key="estate" class="artifact button">
        <div v-if="estate.type == 'farmland'" @click="setMaskLayer('farmlandPanel',estate)">{{estate.name}}</div>
        <div v-if="estate.type != 'farmland'" @click="setMaskLayer('artifact',estate)">{{estate.name}}</div>
      </div>
    </div>
    主动行为
    <div class="action-list">
      <div @click="you.area.addFarmland(you)" class="button">开垦农田</div>
      <div @click="you.散步()" class="button">散步</div>
      <div @click="you.建造('医馆')" class="button">建造医馆</div>
      <div @click="you.维护日常工作()" class="button">工作</div>
      <div @click="you.上山砍柴()" class="button">上山砍柴</div>
    </div>
    <div class="attribute-list">
      <div class="group-name">需求状态</div>
      <div class="group-content">
        <span v-for="(e,i) in you.需求" :key="i">
          {{e.action}}：{{e.level}} &nbsp;
        </span>
      </div>
      <div class="group-name">技能水平</div>
      <div class="group-content">
      <span v-for="(skillName,i) in Object.keys(you.skillsLevel)" :key="i">
        {{skillName}}:{{you.skillsLevel[skillName]}} &nbsp;
      </span>
    </div>
    </div>
  </div>
</template>
<script>
import { inject, ref } from 'vue'
export default {
  setup() {
    return {
      you: inject("Manager").value.you,
      toUrl: inject('toUrl'),
      setMaskLayer: inject('setMaskLayer')
    }
  },
}
</script>

<style lang="less" scoped>
@color: red;
.skill-board {
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .name {
    font-size: 30px;
  }
  .level {
    color: #333;
    div {
      font-size: 30px;
    }
  }
  .artifact-list, .action-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .button {
      background: @borderColor;
      border-radius: 5px;
      padding: 5px 10px;
      margin: 5px;
      cursor: pointer;
    }
  }
  .attribute-list {
    font-size: 12px;
    background-color: @lighterThemeColor;
    border-bottom: grey 1px solid;
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
}
</style>