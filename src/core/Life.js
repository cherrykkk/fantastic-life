import { randCheck,getName } from './utils.js'
import { tryExercise,tryIntercourse,tryStudy } from './system/useActionPoint/index.js'
import { newIntercourse } from './system/intercourse/newIntercourse.js'
import { addMember } from './system/family/addMember.js'
export default Life
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

  this.lifeCycle = {
    born: lifeCycleBorn.bind(this),
    grow: lifeCycleGrow.bind(this),
    died: lifeCycleDied.bind(this)
  }

}

function lifeCycleBorn() {
  const life = this
  const { body,family,state } = life
  body.born()
  life.intercourse =  newIntercourse(family)
  addMember(family,"child",life)
  getName( body.sex ).then( data =>{
    life.surname = family.familyMembers.host.surname
    life.givenName = data.givenName
    console.log(life)
  })
  state.born = true
  state.living = true
}

function lifeCycleGrow() {
  const life = this
  const { body,family,intercourse,study,society } = life
  body.stepMonth()
  study.stepMonth()
  society.stepMonth()
  life.doAction()

  //行动力，取决于体质
  life.actionPoint = Math.floor((body.state.consititution-2)/5)+1

  study.test(body.intelligence)

  if( randCheck(0.90) && randCheck((10-body.appearance)/10))
    intercourse.meetNew()

  return body.healthy > 0
}

function lifeCycleDied() {

}