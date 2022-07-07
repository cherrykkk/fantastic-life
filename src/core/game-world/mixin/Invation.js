export default {
  init: function(that) {
    that.invations = []
  },

  mixin: {
    makeInvation(B,content) {
      const { year,month,date } = this.World.calendar 
      const invation = {
        A: this,
        B,
        year,month,date,
        content
      }
      this.invations.push(invation)
      B.invations.push(invation)
    },

    回应邀约(invation,replay,memoryKey,memoryData) {
      invation.replay = replay
      if (memoryKey) {
        this.addTemplateMemory(memoryKey,null,memoryData)
      }
    },
    邀约善后() {
      this.invations.forEach(invation=>{
        const { A, B, content, replay } = invation
        if (A == this && replay) {
          if (content == '求亲') {
            if (replay == 'ok') {
              this.addTemplateMemory('亲事-承-被同意',null,{B})
              this.娶(B)
            } else if (replay == 'no') {
              this.addTemplateMemory('亲事-承-被拒绝',null,{B})
              const re = this.relationships.find(_re=>_re.B == B)
              re.熟悉 -= 10
            }
          }
        }
      })
      this.invations = this.invations.filter(e=>!e.replay)
    },
  }
}