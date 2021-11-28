
import { congentialDisease,geriatricDisease,normalDisease }  from './disease.js'
export { metabolism }

function metabolism(body) {
  monthCheckDisease(body)
}

function monthCheckDisease(body) {
  const { state } = body
  let gottenDisease
  gottenDisease = normalDisease(state.consititution)
  body.diseaseOnset = body.diseaseOnset.concat(gottenDisease)

  if(body.month>40*12){
    console.log("old")
    gottenDisease = geriatricDisease(body.month,state.consititution)
    body.diseaseOnset = body.diseaseOnset.concat(gottenDisease)
  }
}