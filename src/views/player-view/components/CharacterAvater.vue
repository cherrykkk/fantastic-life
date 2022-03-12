<template>
  <div class="head">
    <template v-for="(e,i) in sortedLayer" :key="i" :style="{height:size+'px',width:size+'px'}" >
      <img :src="`head/${e+head[e]}.png`" />
      <img v-if="skinLayer.indexOf(e)>=0" class="skin" :style="{filter:`drop-shadow(0px 100px 0px ${head['skin-color']})`}"
       :src="`head/${e}-skin${head[e]}.png`" />
    </template>
  </div>
</template>

<script>

export default {
  props: ["character","size"],
  setup(props) {
    const head = props.character.body.appearance
    const sortedLayer = 'back-hair,neck,ear,face,eyebrow,eye,mouth,front-hair'.split(',')
    const skinLayer = ['face','ear','neck']
    return {
      sortedLayer,
      skinLayer,
      head,
      size: props.size || 100
    }
  },
}
</script>
<style lang="less" scoped>
.head {
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    left: 0;
  }
  .skin {
    //filter: drop-shadow(0px 100px 0px black);
    transform: translateY(-99px); //正常是 -100, 美术上有点缺陷所以临时弥补一下，之后要改回来 
  }
}
</style>