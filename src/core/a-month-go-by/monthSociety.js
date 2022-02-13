import { newCharacter } from "../character/newCharacter";
import { monthCharacter } from "./monthCharacter";
export function monthSociety(GameWorld) {
  //每个人度过一月
  for( const character of GameWorld.society.characters) {
    monthCharacter(GameWorld,character)
  }
}