import { Game } from './Game.js'
import { newWorld } from '@/core/world/newWorld'
import { Character } from '@/core/character/Character.js'
import { newSociety } from '@/core/society/newSociety.js'
import { monthGame } from './aMonthGoBy/monthGame.js'

export function newGame(){
  const game =  new Game()
  return new Promise((resolve,reject)=>{
    //生成物质世界
    game.world = newWorld()
    //生成社会环境
    newSociety()
    .then((society)=>{
      console.log("society done")
      game.society = society
      resolve(game)
    })
    //初始化主角
    //game.theMainCharacter = new Character()
  })
}