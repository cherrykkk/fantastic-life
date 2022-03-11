<template>
  <div class="head">
    <img v-for="(e,i) in Object.keys(head)" :key="i" :style="{height:size+'px'}" :src="`head/${e+head[e]}.png`" />
    <!-- <img :src="`head/back-hair${head['back-hair']}.png`" />
    <img :src="`head/face${head.face}.png`" />
    <img :src="`head/eye${head.eye}.png`" />
    <img :src="`head/mouth${head.mouth}.png`" />
    <img :src="`head/ear${head.ear}.png`" />
    <img :src="`head/front-hair${head['front-hair']}.png`" />
    <img :src="`head/neck${head['neck']}.png`" /> -->
  </div>
</template>

<script>

export default {
  props: ["character","size"],
  setup(props) {
    console.log(props.character)
    return {
      head: props.character.body.appearance,
      size: props.size
    }
  },
}
</script>
<style lang="less" scoped>
.head {
  position: relative;
  img {
    position: absolute;
  }
}
</style>