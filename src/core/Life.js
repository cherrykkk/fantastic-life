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

    // if(this.body.inNeed.length>0){
    //   this.family.familySupport(this.body)
    // }
    
    this.lookAfterYourself()

    if( randCheck(0.90) && randCheck((10-this.body.appearance)/10))
      this.intercourse.meetNew()
    
    return this.body.healthy > 0
  }

  this.getAge = ()=> {
    return [Math.floor(this.body.month/12),this.body.month%12]
  }
  this.init = ()=>{
    this.intercourse.familyInit(this.family)
    this.study.init(this.body.intelligence)
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