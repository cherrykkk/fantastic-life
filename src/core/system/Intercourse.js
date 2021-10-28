import eventsLiberary from "../EventsLiberary.js"
import { getName,getArrayRandom, randCheck } from '../utils.js'

export default Intercourse

function Intercourse(){
  this.relationships = []

  this.meetNew = ()=>{
    let sex = Math.random()<0.5? "男":"女"
    getName(sex).then( data =>{
      let name = data.surname+data.givenName
      let relationship = new Relationship(name,sex,"朋友")
      this.relationships.push(relationship)
      this.addEvent(`认识了新朋友，叫做${name}`)
    })
  }

  this.stepMonth = ()=>{
    let rela = getArrayRandom(this.relationships)
    if(rela){
      let upgrade =  randCheck(0.4)
      let events = upgrade ? upgradeEvents : degradeEvents
      let event = getArrayRandom(events[rela.type]).replace("xxx",rela.target)

      this.addEvent(event)
      rela.level += upgrade ? 1 : -1
    }
  }

  this.familyInit = (family)=>{
    if(family.state.mother){
      this.addEvent("记住了母亲")
      let relationship = new Relationship("母亲","女","直系",5)
      this.relationships.push(relationship)
    }
    else 
      this.addEvent("你自小失去了母亲")
    if(family.state.father){
      this.addEvent("记住了父亲")
      let relationship = new Relationship("父亲","男","直系",5)
      this.relationships.push(relationship)
    }
    else       
      this.addEvent("你自小失去了父亲")
  }

  this.addEvent = (message)=>{
    eventsLiberary.addEvent(message,"intercourse")
  }
}

function Relationship(_target,_targetSex,_type,_level = 1){
  this.target = _target
  this.targetSex = _targetSex
  this.type = _type
  this.level = _level
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
  ]
}