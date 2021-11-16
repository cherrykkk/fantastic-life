import eventsLiberary from '@/core/EventsLiberary.js'
import { congentialDisease,geriatricDisease,normalDisease }  from './disease.js'
import { MontylyMetabolism } from "./metabolism.js"
import {randCheck} from '../../utils.js'

function Body( config ){
  this.month = 0
  this.sex = null

  this.consititution
  this.healthy = 100
  this.healthyChange = 0.00
  this.uncomfort = {}
  
  this.identified = []
  this.diseaseOnset = []
  this.diseaseHidden = []
  this.symptom = []

  this.intelligence = 10
  this.appearance = 10

  this.stepMonth = ()=>{
    MontylyMetabolism(this)
  }

  this.init( config )
}

export default Body



Body.prototype.addEvent = function(message){
  eventsLiberary.addEvent(message,"body",this.month)
}


Body.prototype.init = function( config ){
  let age = config.age || 0
  this.sex = randCheck(0.5) ? "男":"女"
  this.month = age*12
  initRandom( this , config.consititutionScore, config.apperanceScore , config.intelligenceScore )
  
  initAlreadyGrowth( this , age )

  function initRandom(context,consititutionScore,apperanceScore,intelligenceScore){
    context.consititution = randCheck(0.5) ? consititutionScore : ( randCheck(0.5) ? consititutionScore+1 : consititutionScore-1 )
    context.appearance =  randCheck(0.5) ? apperanceScore : ( randCheck(0.5) ? apperanceScore+1 : apperanceScore-1 )
    context.intelligence =  randCheck(0.5) ? intelligenceScore : ( randCheck(0.5) ? intelligenceScore+1 : intelligenceScore-1 )
  }
  function initAlreadyGrowth(context,age){
    switch( age ){
      case 3 : context.walkAble = true
      case 0 : context.addEvent("你出生了")
    }
  }
}
Body.prototype.born = function(){
  let gottenDisease = congentialDisease( this.consititution )
  this.diseaseOnset = this.diseaseOnset.concat(gottenDisease)
}