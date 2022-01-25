import { newCharacter } from "../character/newCharacter";
import { monthCharacter } from "./monthCharacter";
export function monthSociety(GameWorld) {
  //前10年每月多一个人
  if(GameWorld.world_month < 10*12 ) {
    const character = GameWorld.createCharacter()
    GameWorld.society.characters.push(character)
    console.log("当前人数"+GameWorld.society.characters.length)
  }
  //每个人度过一月
  for( const character of GameWorld.society.characters) {
    monthCharacter(GameWorld,character)
  }
}