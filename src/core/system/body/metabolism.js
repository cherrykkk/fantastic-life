import {growthTalent} from "./growthTalent.js"
import { congentialDisease,geriatricDisease,normalDisease }  from './disease.js'
export {MontylyMetabolism}

function MontylyMetabolism(body) {
  body.month ++;
  growthTalent(body)
  monthCheckDisease(body)
}

function monthCheckDisease(body) {
  let gottenDisease
  gottenDisease = normalDisease(body.consititution)
  body.diseaseOnset = body.diseaseOnset.concat(gottenDisease)

  if(body.month>40*12){
    console.log("old")
    gottenDisease = geriatricDisease(body.month,body.consititution)
    body.diseaseOnset = body.diseaseOnset.concat(gottenDisease)
  }
}