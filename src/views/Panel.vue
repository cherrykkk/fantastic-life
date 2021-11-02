<template>
  <div class="body window">
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
    <div class="events" v-if="info.events">
      <div v-for="(e,i) in info.events" :key="i">
        {{e.message}}
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
export default ({  
  props:["info"],
  setup ( props ) {
    const info = ref(props.info)
    return {
      info
    }
  }

})


</script>


<style lang="less" scoped>
.page{
  position: fixed;
  height: 100%;
  width: 100%;
  .buttons{
    position: fixed;
    bottom: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 20%;
    width: 120px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    button{
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
  }
  .edit-board{
    position: fixed;
    width: 150px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    button{
      width: 50%;
      height: 50%;
    }
    .actived{
      border: inset;
    }
  }
  .body{
    width: 200px;
  }
  .window{
    float: left;
    display: flex;
    flex-direction: column;
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
    .events{
      width: 100%;
      max-height: 60%;
      overflow: auto;
      font-size: 12px;
      border-top: 1px solid #333333;
      margin-top: 5px;
      padding-top: 5px;
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
}

.boy{
  .window{
    box-shadow: 0 0 3px 0 blue;
  }
  button{
    box-shadow: 0 0 3px 0 blue;
  }
  .actived{
    color: blue;
  }
}
.girl{
  .window{
    box-shadow: 0 0 3px 0 red;
  }
  button{
    box-shadow: 0 0 3px 0 red;
  }
  .actived{
    color: red;
  }
}

.mobile{
  position: fixed;
  overflow-y: auto;
  height: 80%;
  .window{
    width: 90%;
    height: 40%;
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