
import { newSociety } from '../society/newSociety.js'
import { monthSociety } from '../a-month-go-by/monthSociety.js'
import { createCharacter } from './createObject.js'

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

      //生成初始 npc
      for(let i = 0;i<10;i++) {
        const character = this.createCharacter()
        this.society.characters.push(character)
      }

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

World.prototype.giveBirth = function ( mother, father ) {
  const { characters } = this.society
  const child = this.createCharacter()
  characters.push(child)
  mother.children.push(child.cId)
  if ( father )
    father.children.push(child.cId)
  return child
}

World.prototype.getCharacterById = function(cId) {
  const character = this.society.characters.find( item => {
    return item.cId == cId
  })
  return character || `找不到id为${cId}的角色`
}

World.prototype.getName = function (c) {
  let character = null
  if( typeof c == 'number' || typeof c=='string' ) { //类型为id 
    character = this.society.characters.find( item => {
      return item.cId == c
    })
  }
  else {
    character = c
  }
  return character.surname+character.givenName+"("+(character.body.month/12).toFixed(0)+")"
}

World.prototype.makeArchive = function() {
  //存档 characters 信息
  const characters = []



  return JSON.stringify(this)
}

World.prototype.createCharacter = createCharacter

export { World }