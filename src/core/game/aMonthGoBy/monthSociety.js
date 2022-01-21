import { newCharacter } from "../../character/newCharacter";
export function monthSociety(game) {
  if(game.survived_month < 50*12) {
    const character = newCharacter(game.society)
    game.society.characters.push(character)
  }
  console.log("当前人数"+game.society.characters.length)
}