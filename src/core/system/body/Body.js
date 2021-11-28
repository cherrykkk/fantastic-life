import eventsLiberary from '@/core/EventsLiberary.js'
import { congentialDisease,geriatricDisease,normalDisease }  from './disease.js'
import { metabolism } from "./metabolism.js"
import { randCheck } from '../../utils.js'
import { growthTalent } from "./growthTalent.js"
export default Body

function Body( config ){
  this.month = 0
  this.sex = null

  this.healthy = 100
  this.healthyChange = 0.00
  this.uncomfort = {}
  
  this.identified = []
  this.diseaseOnset = []
  this.diseaseHidden = []
  this.symptom = []

  this.intelligence = 10
  this.appearance = 10

  this.state = {
    month: 0,
    sex: null,
    healthy: 100,
    consititution: 0,
    intelligence: 0,
    appearance: 0,
    aging: 0  //老化至 100 则会死于衰老
  }

  this.abilityState = {
    walkAble: false
  }

  this.stepMonth = ()=>{
    const { state } = this
    state.month ++;
    growthTalent(this)
    metabolism(this)
  }

  this.init( config )
}



Body.prototype.addEvent = function(message){
  eventsLiberary.addEvent(message,"body",this.month)
}


Body.prototype.init = function( config ){
  const { state } = this
  state.sex = randCheck(0.5) ? "男":"女"
  state.month = `${config.age||0}`*12
  initRandom( this , config.consititutionScore, config.apperanceScore , config.intelligenceScore )

  bodyCorrection(this)
}

Body.prototype.born = function(){
  const { state } = this
  let gottenDisease = congentialDisease( state.consititution )
  this.diseaseOnset = this.diseaseOnset.concat(gottenDisease)
}

function bodyCorrection(body) {
  const { state,abilityState } = body

  //根据年龄进行修正
  switch( state.month ){
    case 3*12 : abilityState.walkAble = true
  }
}

function initRandom(body,consititutionScore,apperanceScore,intelligenceScore){
  const { state } = body
  state.consititution = randCheck(0.5) ? consititutionScore : ( randCheck(0.5) ? consititutionScore+1 : consititutionScore-1 )
  state.appearance =  randCheck(0.5) ? apperanceScore : ( randCheck(0.5) ? apperanceScore+1 : apperanceScore-1 )
  state.intelligence =  randCheck(0.5) ? intelligenceScore : ( randCheck(0.5) ? intelligenceScore+1 : intelligenceScore-1 )
}
