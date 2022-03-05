
import { monthCharacter } from "./monthCharacter";

export function daySociety (Manager) {

}

export function monthSociety(Manager) {
  //每个人度过一月
  for( const character of Manager.GameWorld.society.characters) {
    monthCharacter(Manager,character)
  }
}

export function yearSociety (Manager) {

}