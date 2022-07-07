import MemoryList from '@/assets/文字表现形式.json'

export default {
  init: function(that) {
    that.memories = []
    that.todayWork = []
    that.notificationList = []
  },

  mixin: {
    addTemplateMemory(rule, topic, args) {
      const { year,month,date } = this.World.calendar 
      const memory = Object.assign({year,month,date},args)
      this.memories.push(memory)
      this.notificationList.push(memory)
     
      //必要
      const ruleTemplate = MemoryList.find(e => e[0] == rule)
      if (ruleTemplate) memory.rule_ID = ruleTemplate[2]
      else  console.log('找不到名为'+rule+'的记忆事件',rule, topic, args)

      //topic 可为空，但如果不为空则必须要找到对象模板。
      if (topic) {
        const topicTemplate = MemoryList.find(e => e[0] == topic)
        if (topicTemplate)  memory.topic_ID = topicTemplate[2]
        else  console.log('找不到名为'+topic+'的记忆事件', rule, topic, args)
      }
    },
    getNewMemory() {
      const memory = this.memories[this.memories.length-1]
      if (memory.rule_ID) {
        const template = MemoryList.find(e => e[2] == memory.rule_ID)
        let text = template[1]
        if (memory.topic_ID) {
          const topicTemplate = MemoryList.find(e => e[2] == memory.topic_ID)
          text = text.replace(/【CONTENT】/g, topicTemplate[1])
        }
        text = text.replace(/【A】/g,'你')
        if (memory.B) text = text.replace(/【B】/g, memory.B.name)
        if (memory.SECT) text = text.replace(/【SECT】/g, memory.SECT.name)
        if (memory.D1) text = text.replace(/【D1】/g,memory.D1)
        if (memory.D2) text = text.replace(/【D2】/g,memory.D1)
        if (memory.AREA) text = text.replace(/【AREA】/g, memory.AREA.name)
        return text
      } else if (memory.content) {
        return memory.content
      } else {
        console.log(new Error())
        console.log(memory)
      }
    }
  },
}

export function parseMemory(A,memory) {
  if (memory.rule_ID) {
    const template = MemoryList.find(e => e[2] == memory.rule_ID)
    let text = template[1]
    if (memory.topic_ID) {
      const topicTemplate = MemoryList.find(e => e[2] == memory.topic_ID)
      text = text.replace(/【CONTENT】/g, topicTemplate[1])
    }
    text = text.replace(/【A】/g,'你')
    if (memory.B) text = text.replace(/【B】/g, memory.B.name)
    if (memory.SECT) text = text.replace(/【SECT】/g, memory.SECT.name)
    if (memory.D1) text = text.replace(/【D1】/g,memory.D1)
    if (memory.D2) text = text.replace(/【D2】/g,memory.D1)
    if (memory.AREA) text = text.replace(/【AREA】/g, memory.AREA.name)
    return text
  } else if (memory.content) {
    return memory.content
  } else {
    console.log(new Error())
    console.log(memory)
  }
}