// import MemoryList from '../../../assets/文字表现形式.json'

// interface Memroy {
  
// }



// export function buildMemory() {

// }



// export function addTemplateMemory(rule, topic, args) {
//   const { year,month,date } = this.World.calendar 
//   const memory = Object.assign({year,month,date},args)
//   this.memories.push(memory)
 
//   //必要
//   const ruleTemplate = MemoryList.find(e => e[0] == rule)
//   if (ruleTemplate) memory.rule_ID = ruleTemplate[2]
//   else  console.log('找不到名为'+rule+'的记忆事件',rule, topic, args)

//   //topic 可为空，但如果不为空则必须要找到对象模板。
//   if (topic) {
//     const topicTemplate = MemoryList.find(e => e[0] == topic)
//     if (topicTemplate)  memory.topic_ID = topicTemplate[2]
//     else  console.log('找不到名为'+topic+'的记忆事件', rule, topic, args)
//   }
// }