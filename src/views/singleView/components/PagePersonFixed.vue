<template>
  <div class="fixed-card">
    <page-title title="角色卡"></page-title>
    <div class="basic"> 
      <div>姓名：{{name}}</div>
      <div>性别：{{sex}}</div>
      <div>年龄：{{age}}</div>
    </div>
    <div class="close" @click="closeFun"></div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle'
import PagePerson from '../components/PagePerson'

export default {
  components: {PageTitle,PagePerson},
  props: ["info","closeFun"],
  setup(props) {
    const info = props.info
    const name = info.surname+info.givenName
    const sex = info.sex
    const age = Math.floor(info.month/12)
    return {
      name,
      sex,
      age
    }
  },
}
</script>

<style lang="less" scoped>
.fixed-card {
  position: fixed;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
  padding: 20px;
  background-color: rgb(220,220,220);
  z-index: 1;
  .basic {
    div {
      text-align: left;
    }
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 20px;
    width: 20px;
    background-image: url("~@/assets/close.svg");
    background-size: 100%;
  }
}
</style>