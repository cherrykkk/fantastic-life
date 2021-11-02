import Family from './Family'
import Life from './Life'
import Body from './system/Body.js'
import Study from './system/Study'
import Society from './Society.js'
import {getName} from './utils.js'
import Intercourse from './system/Intercourse'
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
  let yourIntercourse = new Intercourse()
  let yourStudy =  new Study()
  
  yourLife.reference( theSociety , yourFamily , yourBody , yourIntercourse , yourStudy )
  yourFamily.yourLife = yourLife
  yourIntercourse.yourLife = yourLife
  theSociety.yourLife = yourLife

  return yourLife
}
