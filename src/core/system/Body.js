import eventsLiberary from '../EventsLiberary.js'
import {randCheck} from '../utils.js'

function Body(){
  this.month = 0
  this.sex = null

  this.consititution = 10
  this.healthy = 100
  this.healthyChange = 0.00
  this.illness = {
    unHealthy: [], //不健康，但不致死，如近视，唇裂 
    disease: [] 
  }
  
  this.intelligence = 10
  this.appearance = 10

  this.stepMonth = ()=>{
    this.month ++;

    this.monthCheckIllness()
    this.monthCheckAge()

  }
  
  this.tryExercise = ()=>{
    if( randCheck(0.96) ){
      if(this.consititution<10){
        this.addEvent("努力运动...体质真的提高了！") 
        this.consititution++
      }
      else  
        this.addEvent("努力运动...体质已经很棒了")
    }
    else{
      this.addEvent("努力运动...体质好像提高了？")
    }
  }

  this.monthCheckIllness = ()=>{
    this.healthyChange = 0
    for( let e of this.illness.disease){
      if( randCheck(0.9-this.consititution/20) ){
        e.occured = false
        e.latent = e.recurrence
        this.addEvent(`你的${e.title}自愈了`)
      }
      else if( e.occured ){
        this.healthyChange -= e.hurt
        this.addEvent(`你的${e.title}未得到合适的照料（-${e.hurt}）`)
      }
      else if( e.latent>0 )
        e.latent--
      else if( e.latent==0 )
        e.occured = true
    }
    this.healthy += this.healthyChange
    removeCured(this,this.illness)

    if( randCheck(0.5+this.consititution/20) )
      newIllness(this,illnessLiberary.disease)
      
    function newIllness(context,liberary,consititution){
      let target = liberary[Math.floor(Math.random()*liberary.length)]
      let disease = {
        "title": target,
        "cost": 5000,
        "recurrence": Infinity,
        "latent": Infinity,
        "occured": true,
        "hurt": 5,
      }
      context.illness.disease.push(disease)
    }

    function removeCured(context,illness){
      let disease = []
      for(let e of illness.disease){
        if( e.occured==false && e.recurrence==Infinity){
          context.addEvent(`你的${e.title}被治好了`)
        }
        else{
          disease.push(e)
        }
      }
      illness.disease = disease
    }

  }

  this.monthCheckAge = ()=>{
    if( !this.walkAble && this.month>5 && randCheck(0.9) ){
      this.addEvent("你学会了走路")
      this.walkAble = true
    }
    else if( !this.walkAble && this.month>12 && randCheck(0.8) ){
      this.addEvent("你学会了走路")
      this.walkAble = true
    }

    if( this.month > 40*12 && this.month%6==0 && randCheck(0.9) ){
      let disease = {
        "title": "衰老",
        "cost": Infinity,
        "recurrence": 3,
        "latent": 5,
        "occured": true,
        "hurt": (11-this.consititution)/2,
      }
      this.illness.disease.push(disease)
    }
  }

  this.init = ( config )=>{
    let age = config.age || 0
    this.month = age*12
    this.initRandom(config.consititutionScore,config.apperanceScore,config.intelligenceScore,)
    this.initIllness()
    this.initAlreadyGrowth(age)
  }
  this.initRandom = (consititutionScore,apperanceScore,intelligenceScore)=>{
    this.consititution = randCheck(0.5) ? consititutionScore : ( randCheck(0.5) ? consititutionScore+1 : consititutionScore-1 )
    this.appearance =  randCheck(0.5) ? apperanceScore : ( randCheck(0.5) ? apperanceScore+1 : apperanceScore-1 )
    this.intelligence =  randCheck(0.5) ? intelligenceScore : ( randCheck(0.5) ? intelligenceScore+1 : intelligenceScore-1 )
  }
  this.initIllness = ()=>{
    if(this.consititution<4){
      this.addEvent("你的体质先天不足，需要长期调养")
      let disease = {
        "title": "先天不足",
        "cost": (4-this.consititution)*2000,
        "recurrence": 2,
        "latent": 0,
        "occured": true,
        "hurt": (4-this.consititution),
      }
      this.illness.disease.push(disease)
    }
  }
  this.initAlreadyGrowth = (age)=>{
    switch( age ){
      case 3 : this.walkAble = true
      case 0 : this.addEvent("你出生了")
    }
  }
}


let illnessLiberary = {
  disease: ["哮喘","心脏病","鼻炎","感冒","发烧","冠心病","心绞痛","心肌梗塞","中暑","急性肠道疾病"],
  unHealthy: ["近视","过敏"],
  appearanceFlaw: ["唇裂"]
}


let events = [
  "你出生了",
  "你学会了走路"
]

let descriptin = [
  "心闷气短，非常难受",
  "你感觉有些不舒服，不过很快就恢复了。",
  "你感觉有些不舒服，难受了很久才感觉好了一些",
  "你感觉有些不舒服，不过很快就忘了这回事"
]

export default Body



Body.prototype.addEvent = function(message){
  eventsLiberary.addEvent(message,"body",this.month)
}
