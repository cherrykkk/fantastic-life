import { sports } from '@/core/society/index.js'
import { getArrayRandom } from '@/core/utils.js'
export { tryExercise }

function tryExercise(life) {
  const { body } = life
  let selectedSport = getArrayRandom(sports)
  if( Math.random()>0.96 ){
    if(body.state.consititution<10){
      body.addEvent("体质提高了！") 
      body.state.consititution++
    }
    else  
      body.addEvent("本月大力锻炼，你感觉很累")
  }
  else{
    body.addEvent(`本月${selectedSport.description}`)
  }
}
