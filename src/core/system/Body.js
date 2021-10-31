import eventsLiberary from '../EventsLiberary.js'
import {randCheck} from '../utils.js'

function Body( config ){
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

  this.init( config )
}


let illnessLiberary = {
  disease: ["哮喘","心脏病","鼻炎","感冒","发烧","冠心病","心绞痛","心肌梗塞","中暑","急性肠道疾病"],
  unHealthy: ["近视","过敏"],
  appearanceFlaw: ["唇裂"],
  congenital: [
    {
      probability: 0.0029,
      name: "先天性心脏病",
      curable: true,
      cost: 5*10000
    },{
      probability: 0.0015,
      name: "21三体综合征",
      curable: false
    }
  ]
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


Body.prototype.init = function( config ){
  let age = config.age || 0
  this.sex = randCheck(0.5) ? "男":"女"
  this.month = age*12
  initRandom( this , config.consititutionScore, config.apperanceScore , config.intelligenceScore )
  initIllness( this , this.consititution )
  initAlreadyGrowth( this , age )

  function initRandom(context,consititutionScore,apperanceScore,intelligenceScore){
    context.consititution = randCheck(0.5) ? consititutionScore : ( randCheck(0.5) ? consititutionScore+1 : consititutionScore-1 )
    context.appearance =  randCheck(0.5) ? apperanceScore : ( randCheck(0.5) ? apperanceScore+1 : apperanceScore-1 )
    context.intelligence =  randCheck(0.5) ? intelligenceScore : ( randCheck(0.5) ? intelligenceScore+1 : intelligenceScore-1 )
  }
  function initIllness(context,consititution){
    if( consititution<3 ){
      for( let e of illnessLiberary.congenital  ){
        if( randCheck( e.probability*10 ) ){
          let disease = {
            title: e.name,
            curable: e.curable,
            type: "congential"
          }
          context.illness.disease.push(disease)
        }
      }
    }
    else if(consititution<4){
      context.addEvent("你的体质先天不足，需要长期调养")
      let disease = {
        "title": "先天不足",
        "cost": (4-consititution)*2000,
        "recurrence": 2,
        "latent": 0,
        "occured": true,
        "hurt": (4-consititution),
      }
      context.illness.disease.push(disease)
    }
  }
  function initAlreadyGrowth(context,age){
    switch( age ){
      case 3 : context.walkAble = true
      case 0 : context.addEvent("你出生了")
    }
  }
}