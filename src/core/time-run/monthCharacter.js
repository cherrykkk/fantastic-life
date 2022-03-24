import { monthBody } from "./monthBody"
import { intercourse, giveBirth, upDateActive } from './utils.js'
export function monthCharacter(Manager,character) {
  //身体成长
  monthBody(character)

  //照护自己
  //careBody(game,character)

  //交际需求
  //intercourse(Manager,character)

  //生子
  giveBirth(Manager,character)  

  //本月新的行为策略
  upDateActive(Manager,character)
}