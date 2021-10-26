import Body from './system/Body.js'
import Family from './system/Family.js'
import Intercourse from './system/Intercourse.js'
import Study from './system/Study.js'
import randCheck from './utils.js'


function Life(){
  this.surname = null
  this.givenName = null
  this.intercourse = new Intercourse()
  this.family = new Family()
  this.body = new Body()
  this.study = new Study()
  
  this.setSex = sex => this.body.sex = sex
  this.getSex = () => this.body.sex
  this.setName = (surname,givenName) =>{
    this.surname = surname
    this.givenName = givenName
  }
  this.stepMonth = ()=>{
    this.body.stepMonth();
    this.family.stepMonth()
    if(this.body.inNeed.length>0){
      this.family.familySupport(this.body)
    }
    
    if(randCheck(0.96))
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
}

export default Life