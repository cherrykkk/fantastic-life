<template>
  <div class="head">
    <!-- <template v-for="(e,i) in sortedLayer" :key="i" :style="{height:size+'px',width:size+'px'}" >
        <img v-if="skinLayer.indexOf(e)>=0" class="skin" :style="{filter:`drop-shadow(0px 100px 0px ${head['skin-color']})`}"
       :src="`head@256/${e}-skin${head[e]}.png`" />
      <img v-if="hairLayer.indexOf(e)>=0" class="skin" :style="{filter:`drop-shadow(0px 100px 0px ${head['hair-color']})`}"
       :src="`head@256/${e}-color${head[e]}.png`" />
      <img :src="`head@256/${e+head[e]}.png`" />
    </template> -->
    <template v-for="(e,i) in sortedLayer" :key="i" :style="{height:size+'px',width:size+'px'}" >
      <img :src="`head@256/${e+head[e]}.png`" />
      <img v-if="hairLayer.indexOf(e)>=0" class="skin" :style="{filter:`drop-shadow(0px 200px 0px ${head['发色']})`}"
       :src="`head@256/${e+head[e]}.png`" />
      <img v-if="skinLayer.indexOf(e)>=0" class="skin" :style="{filter:`drop-shadow(0px 200px 0px ${head['肤色']})`}"
       :src="`head@256/${e+head[e]}.png`" />
    </template>
  </div>
</template>

<script>

export default {
  props: ["character","size"],
  setup(props) {
    const head = props.character.appearance
    const sortedLayer = '后发,脖子,耳朵,脸型,眉毛,眼睛,嘴,前发'.split(',')
    const skinLayer = ['脸型','耳朵','脖子'], hairLayer = ['后发','前发']
    return {
      sortedLayer,
      skinLayer,
      hairLayer,
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
    transform: translateY(-200px);
  }
}
</style>