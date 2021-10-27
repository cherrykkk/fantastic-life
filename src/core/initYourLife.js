import Family from './Family'
import Life from './Life'
import {getName} from './utils.js'
export default initYourLife

function initYourLife(bodyScore,familyScore){

  let yourFamily = new Family()
  let yourLife = new Life(yourFamily)

  let sex = Math.random()<0.5 ? "男":"女"

  getName().then( data =>{
    yourLife.setName(data.surname, data.givenName) 
  })

  yourLife.setSex(sex)

  yourLife.body.init(bodyScore,0)

  yourFamily.init(yourLife,familyScore)

  yourLife.init()
  
  return yourLife
}
