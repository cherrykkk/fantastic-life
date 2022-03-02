import defaultCharacter from '@/saveLoad/saveFiles/defaultCharacter.json'
import { Character } from '@/core/character/Character.js'
import { newBody } from '@/core/character/body/newBody.js'
import { Body } from '@/core/character/body/Body.js'

//此处函数都将被 World.prototype 绑定，所以 this 即是 World 实例

export function createCharacter() {
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
  //性格(大五)随机
  const theBigFive = ['Openness','Conscientiousness','Extraversion','Agreeableness','Neuroticism']
  for( const e of theBigFive) {
    character[`BIG_FIVE_${e}`] = Math.round(Math.random()*10)
  }
  return character
}

export function createCharacterByNvWa() { //女娲造人，天生技能
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
  //性格(大五)随机
  const theBigFive = ['Openness','Conscientiousness','Extraversion','Agreeableness','Neuroticism']
  for( const e of theBigFive) {
    character[`BIG_FIVE_${e}`] = Math.round(Math.random()*10)
  }

  //天生技能
  Object.keys(character.skills).forEach( e => {
    character.skills[e] = Math.floor(Math.random() * 40)
  })


  return character
}

export function createBody() {
  const body = new Body() 
  
  return body
}