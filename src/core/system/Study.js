import eventsLiberary from '../EventsLiberary.js'
import { randCheck } from '../utils.js'

function Study(){
  this.yourLife = null
  this.knowledge = 0
  this.school = null
  this.ranking = 0 //百分制 1代表前1%
  this.school = []
  this.intoSchool = (level)=>{
    if(level=="primary"){
      this.school.push({
        type: "primary",
        name: "一小"
      })
      this.addEvent("你开始上小学")
    }
    else if(level=="junior"){
      this.school.push({
        type: "junior",
        name: "二中"
      })
      this.addEvent("你进入了初中")
    }
    else if(level=="senior"){
      this.school.push({
        type: "senior",
        name: "三中"
      })
      this.addEvent("你进入了高中")
    }
    else if(level=="high"){
      this.school.push({
        type: "high",
        name: "xx大学"
      })
    }
  }
  this.stepMonth = ()=>{
    this.mayDownKnowledge()
  }
  this.tryStudy = ()=>{
    this.mayUpKnowledge()
  }
  this.test = (intelligence)=>{
    this.ranking = (100-this.knowledge)
  }
  this.addEvent = (message)=>{
    eventsLiberary.addEvent(message,"study")
  }
  this.mayDownKnowledge = ()=>{
    if( randCheck(0.5) ){
      if( this.knowledge>0 )
        this.knowledge--
    }
  }
  this.mayUpKnowledge = ()=>{
    if( randCheck(0.5)){
      if( this.knowledge < 100 ){
        this.knowledge++
      }
    }
  }
}

export default Study