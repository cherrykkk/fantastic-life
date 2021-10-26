import eventsLiberary from '../EventsLiberary.js'

function Study(){
  this.school = null
  this.ranking = 0 //百分制 1代表前1%
  this.stepMonth = ()=>{
  }
  this.init = (score)=>{
    this.ranking = (10-score)*10
    this.addEvent("照你的天赋，随便学学大概能排"+this.ranking+"%")
  }
  this.addEvent = (message)=>{
    eventsLiberary.addEvent(message,"study")
  }
}

export default Study