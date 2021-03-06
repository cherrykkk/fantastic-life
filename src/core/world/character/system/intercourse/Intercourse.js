import eventsLiberary from "../../EventsLiberary.js"
import Npc from "./Npc.js"
import Relationship from "./Relationship.js"
import { getName,getArrayRandom, randCheck } from '../../utils.js'

export default Intercourse

function Intercourse(){
  this.yourLife = null
  this.relationships = []

  this.meetNew = ()=>{
    let npc = this.yourLife.society.npcs.shift()

    let ageDifference = Math.abs(npc.month-this.yourLife.body.month)
    console.log("年龄差",ageDifference)

    if( ageDifference < 12*10 ){
      this.relationships.push(new Relationship(npc,"朋友"))
      this.addEvent(`认识了新朋友，叫做${npc.name()}`)
    }
    else if( ageDifference < 12*20 ){
      this.relationships.push(new Relationship(npc,"朋友"))
      this.addEvent(`认识了新网友，叫做${npc.name()}`)
    }
    else {
      this.relationships.push(new Relationship(npc,"路人"))
      this.addEvent(`人来人往，均为路人`)
    }
  }

  this.stepMonth = ()=>{
    let rela = getArrayRandom(this.relationships)
    if(rela){
      let upgrade =  randCheck(0.4)
      let events = upgrade ? upgradeEvents : degradeEvents
      let event = getArrayRandom(events[rela.type]).replace("xxx",rela.target.name())

      this.addEvent(event)
      rela.level += upgrade ? 1 : -1
    }
  }

  this.addEvent = (message)=>{
    eventsLiberary.addEvent(message,"intercourse")
  }
}

let relationshipType = [
  "直系","旁系","同学","同事","朋友","恋人","夫妻"
]


let upgradeEvents = {
  "直系":[
    "与xxx一起做饭",
    "和xxx一起在沙发上看新闻",
    "和xxx饭后一起散步",
    "与xxx一起去超市买菜准备回家烧晚饭，饭后一起打羽毛球",
    "与xxx一起去爬山，拍了很多漂亮的照片"
  ],
  "朋友":[
    "和xxx出去逛了一圈。",
    "和xxx一起打游戏",
    "被xxx喊去看电影",
    "与xxx一起去爬山，拍了很多漂亮的照片"
  ],
  "同学":[
    "向xxx请教了一个问题。",
    "向xxx借作业参考，对方虽然给了，但是看起来好像不是很乐意。",
    "把作业借给了xxx。"
  ],
  "路人":[
    ""
  ]
}

let degradeEvents = {
  "直系":[
    "与xxx闹冷战",
    "指责xxx做的饭不好吃",
    "说xxx做的菜不好吃"
  ],
  "朋友":[
    "拒绝了xxx一起打游戏的邀请",
    "因没空而拒绝xxx的一起看电影"
  ],
  "同学":[
    "向xxx借作业参考，但对方说也没有写完。"
  ],
  "路人":[
    ""
  ]
}