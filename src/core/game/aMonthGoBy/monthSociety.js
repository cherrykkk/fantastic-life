import { newCharacter } from "../../character/newCharacter";
import { monthCharacter } from "./monthCharacter";
export function monthSociety(game) {
  //前50年每月多一个人
  if(game.survived_month < 50*12) {
    const character = newCharacter(game.society)
    game.society.characters.push(character)
  }
  console.log("当前人数"+game.society.characters.length)
  //每个人度过一月
  for( const character of game.society.characters) {
    monthCharacter(game,character)
  }
}