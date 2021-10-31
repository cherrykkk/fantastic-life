import Family from './Family'
import Life from './Life'
import Body from './system/Body.js'
import Study from './system/Study'
import Society from './Society.js'
import {getName} from './utils.js'
export default initYourLife

function initYourLife(initScore){
  let initBodyConfig = {
    consititutionScore: initScore.body,
    apperanceScore: initScore.apperance,
    intelligenceScore: initScore.intelligence,
    age: 0
  }

  let theSociety = new Society()
  let yourFamily = new Family( initScore.family )
  let yourLife = new Life()
  let yourBody = new Body(initBodyConfig)
  
  yourFamily.reference( yourLife )
  yourLife.reference( theSociety , yourFamily , yourBody )

  theSociety.init( yourLife )
    
  return yourLife
}
