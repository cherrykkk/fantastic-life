
import { newSociety } from '../society/newSociety.js'
import { monthSociety } from '../a-month-go-by/monthSociety.js'
import defaultCharacter from '@/saveLoad/saveFiles/defaultCharacter.json'
import { Character } from '@/core/character/Character.js'
import { newBody } from '@/core/character/body/newBody.js'

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
  return character.surname+character.givenName+"("+(character.body.survived_month/12).toFixed(0)+")"
}

World.prototype.createCharacter = function () {
  const { namesArr } = this.society

  const character = new Character()
  Object.assign(character,defaultCharacter)
  character.body = newBody()
  //起名
  const name = namesArr.pop()
  character.surname = name.surname
  character.givenName = name.givenName
  //性别跟着名字走（就离谱）
  character.body.sex = name.sex
  //随机ID
  character.cId = Date.now() + (Math.random()*100).toFixed(0).padStart(2,'0')
  console.log("当前角色ID",character.cId)
  return character

}


export { World }