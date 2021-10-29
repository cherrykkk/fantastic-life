import Body from './system/Body.js'
import Intercourse from './system/Intercourse.js'
import Study from './system/Study.js'
import {randCheck} from './utils.js'

export default Life

function Life(family){
  this.surname = null
  this.givenName = null
  this.intercourse = new Intercourse()
  this.family = family
  this.body = new Body()
  this.study = new Study()
  
  this.needs = []
  this.actionPoint = 0
  this.actionStrategy = ""
  
  this.setSex = sex => this.body.sex = sex
  this.getSex = () => this.body.sex
  this.setName = (surname,givenName) =>{
    this.surname = surname
    this.givenName = givenName
  }

  this.stepMonth = ()=>{
    this.body.stepMonth()
    this.family.stepMonth()
    this.intercourse.stepMonth()
    this.study.stepMonth()
    this.doAction()
    this.getMonthAction()
    this.study.test(this.body.intelligence)
    this.checkAge()

    // if(this.body.inNeed.length>0){
    //   this.family.familySupport(this.body)
    // }
    
    this.lookAfterYourself()

    if( randCheck(0.90) && randCheck((10-this.body.appearance)/10))
      this.intercourse.meetNew()
    
    return this.body.healthy > 0
  }
  this.checkAge = ()=>{
    if( this.body.month/12 == 7 ){
      this.study.intoSchool("primary")
    }
    else if( this.body.month/12 == 12){
      this.study.intoSchool("junior")
    }
    else if( this.body.month/12 == 15){
      this.study.intoSchool("senior")
    }
  }

  this.getMonthAction = ()=>{
    this.actionPoint = Math.floor((this.body.consititution-2)/5)+1
    console.log(this.actionPoint)
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

  this.getAge = ()=> {
    return [Math.floor(this.body.month/12),this.body.month%12]
  }
  this.init = ()=>{
    this.intercourse.familyInit(this.family)
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
}