import Family from './Family'
import Life from './Life'
import {getName} from './utils.js'
export default initYourLife

function initYourLife(initScore){

  let yourFamily = new Family()
  let yourLife = new Life(yourFamily)

  let sex = Math.random()<0.5 ? "男":"女"

  getName().then( data =>{
    yourLife.setName(data.surname, data.givenName) 
  })

  yourLife.setSex(sex)

  let initBody = {
    consititutionScore: initScore.body,
    apperanceScore: initScore.apperance,
    intelligenceScore: initScore.intelligence,
    age: 0
  }
  yourLife.body.init( initBody )

  yourFamily.init( yourLife,initScore.family )

  yourLife.init()
  
  return yourLife
}
