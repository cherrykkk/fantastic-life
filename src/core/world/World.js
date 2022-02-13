
import { newSociety } from '../society/newSociety.js'
import { monthSociety } from '../a-month-go-by/monthSociety.js'
import { createCharacter, createCharacterByNvWa } from './createObject.js'
import SocietySetting from '../../DLC/generalWorld/societySetting.json'

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
        const character = this.createCharacterByNvWa()
        this.society.characters.push(character)
      }

      resolve()
    })
    //初始化主角
    //game.theMainCharacter = new Character()
  })
}

World.prototype.runNaturally = function( totalYear, noParentYear) {
  for( let i = 0;i<totalYear*12;i++) {
    this.aMonthGoBy()
      //前n年每月多一个人
    if(this.world_month < noParentYear*12 ) {
      const character = this.createCharacterByNvWa()
      this.society.characters.push(character)
    }
  }
}

World.prototype.aMonthGoBy = function() {
  this.world_month ++ 
  monthSociety(this)
}

World.prototype.giveBirth = function ( mother, father ) {
  const { characters } = this.society
  const child = this.createCharacter()
  characters.push(child)
  //绑定母子、父子关系
  mother.children.push(child.cId)
  child.body.mother = mother.cId
  if ( father ) {
    father.children.push(child.cId)
    child.body.father = father.cId
  }
  
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

World.prototype.createCharacterByNvWa = createCharacterByNvWa

World.prototype.addMemory = function(A,B,eventName) {
  const eventNameList = Object.keys( SocietySetting.events )
  const eventId = eventNameList.indexOf(eventName)
  if( eventId >= 0 ) {
    A.memory.unshift({
      "BId": B.cId,
      "eventId": eventId
    })
  }
  else {
    console.log("不存在事件："+eventName,",A:",A,",B:",B)
  }
}

World.prototype.parseMemory = function(A,memory) {
  const { BId, eventId } = memory
  const B = this.getCharacterById(BId)
  const eventName = Object.keys( SocietySetting.events )[eventId]
  const events = SocietySetting.events
  if( events[eventName] ) {
    let ev = events[eventName]
    ev = ev.replace('[A]',A.surname+A.givenName)
    ev = ev.replace('[B]',B.surname+B.givenName)
    return ev
  }
}


export { World }