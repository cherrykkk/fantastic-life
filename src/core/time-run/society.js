
import { monthCharacter } from "./monthCharacter";
import { dailyIntercourse } from "./utils";

export function daySociety (Manager) {
  for( const character of Manager.GameWorld.society.characters) {
    dailyIntercourse(Manager,character)
  }
}

export function monthSociety(Manager) {
  //每个人度过一月
  for( const character of Manager.GameWorld.society.characters) {
    monthCharacter(Manager,character)
  }

  //女娲造人期
  if (Manager.GameWorld.calendar.year < Manager.GameWorld.config.nvWaYears ) {
    const character = Manager.createCharacterByNvWa()
    Manager.GameWorld.society.characters.push(character)
    console.log(Manager.GameWorld.society.characters.length)
  }
}

export function yearSociety (Manager) {

}