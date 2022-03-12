<template>
  <!-- <div class="head">
    <img v-for="(e,i) in Object.keys(head)" :key="i" 
     :style="{height:size+'px'}" :class="{skin:e=='face'}"
     :src="`head/${e+head[e]}.png`" />
  </div> -->
  <canvas class="head" ref="headCanvas"></canvas>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  props: ["character","size"],
  setup(props) {
    const head = props.character.body.appearance
    const size = props.size || 100
    const headCanvas = ref(null)
    const arr = [] //保证图层的顺序执行
    let img = null
    onMounted(()=>{
      headCanvas.value.height = size 
      headCanvas.value.width = size
      const context = headCanvas.value.getContext("2d");
      for (const e in head) {
        img = new Image()
        img.src = `head/${e+head[e]}.png`
        arr.push(img)
        img.onerror = function(err) {
          console.log("error!",err)
        }
      }
      //最后一个图层加载完后开始绘制 canvas
      img.onload = function() {
        while (arr.length>0) {
          const img = arr.shift()
          context.drawImage(img, 0, 0, size, size);
        }
      }
      //变换肤色
      const imageData = context.getImageData(0, 0, size, size);
      var length = imageData.data.length;
      for (var index = 0; index < length; index += 4) {
        var r = imageData.data[index];
        var g = imageData.data[index + 1];
        var b = imageData.data[index + 2];
        //这里可以对 r g b 进行计算（这里的rgb是每个像素块的rgb颜色）
        imageData.data[index] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
              console.log(r,g,b)
      }
      // 更新新数据
      context.putImageData(imageData, 0, 0);

    })
    return {
      headCanvas
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