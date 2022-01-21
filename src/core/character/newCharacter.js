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
  return character
}