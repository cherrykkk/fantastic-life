
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

    //清除垃圾记忆
    character.memory = character.memory.filter( e=>{
      return e.event != 17
    })
  }

  //女娲造人期
  if (Manager.GameWorld.calendar.year < Manager.GameWorld.config.nvWaYears ) {
    const character = Manager.createCharacterByNvWa()
    Manager.GameWorld.society.characters.push(character)
  }
}

export function yearSociety (Manager) {

}

export function dailyWorld (Manager) {
  Manager.GameWorld.material.forEach(e=>{
    if (e['类型']=='耕地' && e.plant && e.plant['成长度']<100) {
      e.plant['成长度'] += 1
    }
  })
}