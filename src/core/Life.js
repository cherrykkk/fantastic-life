import Body from './system/Body.js'
import Intercourse from './system/Intercourse.js'
import Study from './system/Study.js'
import {randCheck,getName} from './utils.js'

export default Life

function Life( family ){
  this.surname = null
  this.givenName = null
  this.body =  null
  this.intercourse = new Intercourse()
  this.study =  new Study()

  this.society
  this.family = family
  
  this.needs = []
  this.actionPoint = 0
  this.actionStrategy = ""

  this.stepMonth = ()=>{
    this.body.stepMonth()
    this.family.stepMonth()
    this.intercourse.stepMonth()
    this.study.stepMonth()
    this.society.stepMonth()
    this.doAction()
    this.getMonthAction()
    this.study.test(this.body.intelligence)
    this.checkAge()
    
    this.lookAfterYourself()

    if( randCheck(0.90) && randCheck((10-this.body.appearance)/10))
      this.intercourse.meetNew()
    
    return this.body.healthy > 0
  }
  this.checkAge = ()=>{
  }

  this.getMonthAction = ()=>{
    this.actionPoint = Math.floor((this.body.consititution-2)/5)+1
  }

  this.doAction = ()=>{
    while(this.actionPoint>0){
      this.actionPoint--;
      if(this.actionStrategy=="运动"){
        this.body.tryExercise()
      }
      if(this.actionStrategy=="社交"){
        this.intercourse.tryIntercourse()
      }
      if(this.actionStrategy=="学习"){
        this.study.tryStudy()
      }
    }
  }

  this.reference = ( society,family,body )=>{
    this.society = society
    this.family = family
    this.body = body
  }
  
  this.yourBorn = ()=>{
    this.intercourse.familyInit(this.family)
    getName(this.body.sex).then( data =>{
      this.surname = this.family.surname
      this.givenName = data.givenName
    })
  }

  this.getAge = ()=> {
    return [Math.floor(this.body.month/12),this.body.month%12]
  }
  this.living = ()=>{
    let died = this.body.consititution<=0 || this.body.healthy <=0
    return !died
  }

  this.lookAfterYourself = ()=>{
    for(let e of this.body.illness.disease){
      if(e.occured == true){
      }
    }
  }
  this.init()
}

Life.prototype.init = function(){

}