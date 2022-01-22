import defaultCharacter from '@/saveLoad/saveFiles/defaultCharacter.json'
import { Character } from './Character'
import { newBody } from './body/newBody.js'

export function newCharacter( society ) {
  const character = new Character()
  Object.assign(character,defaultCharacter)
  character.body = newBody()
  //起名
  const { namesArr } = society
  const name = namesArr.pop()
  character.surname = name.surname
  character.givenName = name.givenName
  //随机ID
  
  character.characterId = Date.now() + (Math.random()*100).toFixed(0).padStart(2,'0')
  console.log("当前角色ID",character.characterId)
  return character
}