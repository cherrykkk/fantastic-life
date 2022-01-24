
import { newSociety } from '../society/newSociety.js'
import { monthSociety } from '../a-month-go-by/monthSociety.js'

function World() {
  this.society = null
  this.natural = null
  this.theMainCharacterId = null
  this.world_month = 0
}

World.prototype.newGame = function() {
  return new Promise((resolve,reject)=>{
    //生成自然世界
    //game.natural = newWorld()
    //生成社会环境
    newSociety()
    .then((society)=>{
      console.log("society done")
      this.society = society
      resolve()
    })
    //初始化主角
    //game.theMainCharacter = new Character()
  })
}
World.prototype.aMonthGoBy = function() {
  this.world_month ++ 
  monthSociety(this)
}


World.prototype.getCharacterById = function(characterId) {
  const character = this.society.characters.find( item => {
    return item.characterId == characterId
  })
  return character || `找不到id为${characterId}的角色`
}



export { World }