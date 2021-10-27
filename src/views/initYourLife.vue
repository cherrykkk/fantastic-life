<template>
  <div>
    体质{{initScore.body}}<br>
    家境{{initScore.family}}
  </div>
  <div class="buttons">
    <button @click="lottery()">随机天赋点</button>
    <button @click="onLifeStart()">进入人生</button>
  </div>
</template>

<script>
import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router'
export default ({
	setup() {
    const initScore = reactive({
      family: 5,
      body: 5
    })
    const router = useRouter()
    const onLifeStart = ()=>{
      router.push({path: "/yourLife", query:{bodyScore:initScore.body,familyScore:initScore.family}})
    }
    const lottery = ()=>{
      initScore.family = Math.floor(Math.random()*10)
      initScore.body = Math.floor(Math.random()*10)
    }
    return {
      initScore,
      onLifeStart,
      router,
      lottery
    }
  }
})
</script>

<style lang="less" scoped>

 .buttons{
    position: fixed;
    bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    button{
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
  }

</style>