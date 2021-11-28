import { randCheck,getName } from './utils.js'
import { tryExercise,tryIntercourse,tryStudy } from './system/useActionPoint/index.js'

export default Life
export { lifeCycle }
/*
人生状态，一切子系统的入口
*/
function Life(){
  this.surname = null
  this.givenName = null

  this.body =  null
  this.intercourse = null
  this.study = null
  this.society = null
  this.family = null
  
  this.actionPoint = 0
  this.actionStrategy = ""

  this.state = {
    born: false,
    living: false,
    died: false
  }

  this.doAction = ()=>{
    while(this.actionPoint>0){
      this.actionPoint--;
      if(this.actionStrategy=="运动"){
        tryExercise(this)
      }
      if(this.actionStrategy=="社交"){
        tryIntercourse(this)
      }
      if(this.actionStrategy=="学习"){
        tryStudy(this)
      }
    }
  }
  
  this.getAge = ()=> {
    return [Math.floor(this.body.month/12),this.body.month%12]
  }

  this.lookAfterYourself = ()=>{
    // for(let e of this.body.illness.disease){
    //   if(e.occured == true){
    //   }
    // }
  }
  this.init()
}

Life.prototype.init = function(){

}

const lifeCycle = {
  born: lifeCycleBorn,
  grow: lifeCycleGrow,
  died: lifeCycleDied
}

function lifeCycleBorn(life) {
  const { intercourse,body,family,state } = life
  intercourse.familyInit()
  body.born()
  getName( body.sex ).then( data =>{
    life.surname = family.surname
    life.givenName = data.givenName
  })
  state.born = true
  state.living = true
}

function lifeCycleGrow(life) {
  const { body,family,intercourse,study,society } = life
  body.stepMonth()
  family.stepMonth()
  intercourse.stepMonth()
  study.stepMonth()
  society.stepMonth()
  life.doAction()

  //行动力，取决于体质
  life.actionPoint = Math.floor((body.state.consititution-2)/5)+1

  study.test(body.intelligence)
  
  life.lookAfterYourself()

  if( randCheck(0.90) && randCheck((10-body.appearance)/10))
    intercourse.meetNew()

  return body.healthy > 0
}

function lifeCycleDied() {

}