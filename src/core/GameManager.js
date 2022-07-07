import Character from './game-world/Character.js'
import World from './game-world/World.js'
import EVENT from './game-world/Events.js'
import { parseMemory } from './game-world/mixin/Memory'
import { saveWorld, loadWorld } from './utils/save-load' 
import { creature_prefabs } from './game-world/Creature'
import { 主专职信息表 } from './game-world/mixin/Work'

function GameManager () {
  this.World
  this.you = null
  this.namesArr = []
  this.playing = false
  this.fastRunning = false
}

GameManager.prototype.makeArchive = saveWorld
GameManager.prototype.loadArchive = loadWorld
GameManager.prototype.creature_prefabs = creature_prefabs
GameManager.prototype.主专职信息表 = 主专职信息表

const 角色配置 = [{
  专职: '掌柜',
  财产: ['茶馆'],
},{
  专职: '大夫',
  财产: ['医馆']
}]

GameManager.prototype.newGame = function(config) {
  this.World = new World(config)

  return new Promise((resolve)=>{

    this.fastRunning = true
    const fastRun = ()=>setTimeout(()=>{ //使用 setTimeout 把主线任务变成宏任务，使得每运行完一个宏任务都重新渲染一次UI
      this.aDayGoBy(this)
      if (this.World.calendar.year < config.快进到某年) 
        fastRun()
      else if (!this.you) {
        this.setYou(this.World.characters[this.World.characters.length-1])
        fastRun()
      } else if (this.you.month <= 0*12) {
        fastRun()
      } else {
        this.fastRunning = false
        this.play()
        resolve()
      }
    },0)
    fastRun()
  })
}

GameManager.prototype.play = function () {
  this.stop() //避免重复 play
  this.playing = true
  const speed = 1000/this.World.config.游戏速度
  this.clock = setInterval(()=>{
    this.aDayGoBy(this)
    this.playing = true
  },speed)
}
GameManager.prototype.stop = function () {
  clearInterval(this.clock)
  this.playing = false
}

GameManager.prototype.aDayGoBy = function () {
  const calendar = this.World.calendar
  calendar.date += 1
  if (calendar.date == 31) {
    calendar.date = 1
    calendar.month += 1
    if (calendar.month == 13) {
      calendar.month = 1
      calendar.year += 1
      //yearSociety(this)
    }
  }
  this.World.tickerDay()
}

GameManager.prototype.parseMemory = parseMemory

GameManager.prototype.setYou = function(character) {
  if (this.you) {
    this.you.isNpc = true
  }
  this.you = character
  this.you.isNpc = false
}

export { GameManager }