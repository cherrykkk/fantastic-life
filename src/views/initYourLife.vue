<template>
  <div>
    体质{{initScore.body}}<br>
    家境{{initScore.family}}
  </div>
  <button @click="lottery()">随机天赋点</button>
  <button @click="onLifeStart()">start</button>
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
