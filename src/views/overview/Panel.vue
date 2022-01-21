<template>
  <div class="body pannel">
    <div class="title">{{info.title}}</div>
    <div class="basic-info">
      <span v-for="(e,i) in info.basicInfo" :key="i">{{e}}</span>
    </div>
    <ul class="list-info" v-if="info.listInfo">
      <li v-for="(e) in info.listInfo" :key="e">
        <span :class="{boy:e[2]=='男',girl:e[2]=='女'}">{{e[0]}}</span><br>
        <span class="extra" v-if="e[1]">{{e[1]}}</span>
      </li>
    </ul>
    <router-link :to="nextUrl" class="go-next"><img src="@/assets/goIn.svg" /></router-link>
  </div>
</template>
<script>

import {ref,watch} from 'vue'
export default ({  
  props:["info","nextUrl"],
  setup ( props ) {
    const info = ref(props.info)
    const nextUrl = props.nextUrl || "/yourLife"
    const eventsWindow = ref(null)
    return {
      info,
      nextUrl,
      eventsWindow
    }
  }
})

</script>
<style lang="less" scoped>
.pannel {
  position: relative;
  float: left;
  display: flex;
  box-shadow: 0 0 3px 0 black;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  width: 45%;
  height: 40%;
  .title{
    font-weight: 600;
    flex-shrink: 0;
  }
  .basic-info{
    span{
      margin-right: 5px;
    }
    flex-shrink: 0;
  }
  .go-next {
    position: absolute;
    right: -20px;
    top: 25%;
    height: 50%;
    img {
      height: 100%;
    }
  }
  .list-info{
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    max-height: 60px;
    margin: 0;
    li{
      padding-right: 20px;
      .extra{
        font-size: 12px;
      }
    }
    .boy{
      border: solid 1px blue;
      border-radius: 10%;
    }
    .girl{
      border: solid 1px red;
      border-radius: 10%;
    }
  }
}
.mobile{
  position: fixed;
  overflow-y: auto;
  height: 80%;
  .pannel{
    margin: 5px;
    padding: 5px;
  }
  .buttons{
    position: fixed;
    height: 70px;
    width: 100%;
    left: 0;
    top: auto;
    bottom: 0;
    transform: none;
  }
}
</style>