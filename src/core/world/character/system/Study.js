import eventsLiberary from '../EventsLiberary.js'
import { randCheck } from '../utils.js'

function Study(){
  this.knowledge = 0
  this.school = null
  this.ranking = 0 //百分制 1代表前1%
  this.school = []
  this.intoSchool = ( school )=>{
    this.school.push({
      type: school.type,
      schoolName: school.schoolName
    })
    console.log(school)
    this.addEvent("你进入了"+school.schoolName)
  }
  this.stepMonth = ()=>{
    this.mayDownKnowledge()
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
}

export default Study