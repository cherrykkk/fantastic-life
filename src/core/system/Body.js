import eventsLiberary from '../EventsLiberary.js'
import randCheck from '../utils.js'

function Body(){
  this.month = 0
  this.sex = null

  this.consititution = 10
  this.healthy = 100
  this.healthyChange = 0.00
  this.illness = {
    unHealthy: [], //不健康，但不致死，如近视，唇裂 ， 最多占20%
    disease: [] //该单项分数满100才会死
  }
  
  this.intelligence = 10

  this.appearance = 10

  this.inNeed = []

  this.init = ( score, age=0 )=>{
    this.month = age*12
    this.consititution = Math.floor(score/2+Math.random()*score/2)
    this.appearance = Math.floor(score/2+Math.random()*score/2)
    this.intelligence =  Math.floor(score/3+Math.random()*score/3*2)
  
    if(this.consititution<4)
      this.addEvent("你的体质先天不足，需要长期调养")
    
    switch( age ){
      case 3 : this.walkAble = true
      case 0 : this.addEvent("你出生了")
    }
  }

  this.stepMonth = ()=>{
    this.month ++;
    if(!this.walkAble && this.month>5){
      if(Math.random()>0.9){
          this.addEvent("你学会了走路")
          this.walkAble = true
      }
    }
    this.fallIll()
    if( this.month > 4*12 && this.month%6==0){
      if(randCheck(0.9))
        this.consititution -= 1
    }
    if(this.consititution <= 0){
      this.addEvent("你死了")
    }
  }
  this.addEvent = (message)=>{
    eventsLiberary.addEvent(message,"body",this.month)
  }

  this.fallIll = ()=>{

    if( this.consititution<3 ){
      let disease = [ "气血两虚", this.consititution-3 ]
      this.illness.disease.push(disease)
    }


    this.healthyChange = this.healthyChange + this.consititution - 3
    this.healthy += Number(this.healthyChange)
    if( this.healthy>100 ) this.healthy = 100
    if( this.healthy<100 ){
      let cost = (100-this.healthy)*1000
      this.addNeed(cost)
    }

  }

  this.addNeed = (_cost)=>{
    this.inNeed.push({
      cost: _cost,
      success: function(){
        this.healthyChange += (100-this.healthy)*Math.random()*1.5
        this.addEvent("由于家庭的付出，你将恢复"+this.healthyChange+"的健康")
      },
      failure: function(){
        this.addEvent("你的家庭无力照护你的健康")
      }
    })
  }
}

let diseaseLiberary = [
  "哮喘","心脏病","先天不足"
] 
let unHealthyLiberary = [
  "近视"
]
let appearanceFlawLiberary = [
  "唇裂"
]



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

