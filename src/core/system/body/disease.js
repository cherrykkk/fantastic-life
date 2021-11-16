import {DiseaseLiberary} from '@/core/society/modern.js'
export { congentialDisease,geriatricDisease,normalDisease }

function Liberary(){
  let congentialExp = /先天/
  let geriatricExp = /老年病/
  let normalExp = /普适/
  this.congential = DiseaseLiberary.filter(function(e){
    return e.regularExpression.search(congentialExp)>=0
  })
  this.geriatric = DiseaseLiberary.filter(function(e){
    return e.regularExpression.search(geriatricExp)>=0
  })
  this.normal =  DiseaseLiberary.filter(function(e){
    return e.regularExpression.search(normalExp)>=0
  })
}
let liberary = new Liberary()

function congentialDisease(consititution){
  let rateMultiple = (10-consititution)
  return liberary.congential.filter(function(e){
    return Math.random() < e.probability*rateMultiple 
  })
}

function normalDisease(consititution){
  let rateMultiple = Math.pow(1.1,(10-consititution))/20
  return liberary.normal.filter(function(e){
    return Math.random() < e.probability*rateMultiple 
  })
}

function geriatricDisease(month,consititution){
  let rateMultiple = (month-40*12)*Math.pow(2,(10-consititution))/2
  return liberary.geriatric.filter(function(e){
    return Math.random() < e.probability*rateMultiple 
  })
}

function healing(){

}