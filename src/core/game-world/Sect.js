import Memory from './mixin/Memory'
import { mixin } from '../utils/mixin'

export default class Sect {
  name = '合欢派'
  World
  characters = []
  master = null
  memories = []
  可执行事件 = []
  masterEvents = ['主持灵根测试']
  area = null
  宗门事务 = []

  constructor (World,name) {
    mixin(this, World, Memory)
    if (!World) return
    
    this.name = name
    this.World = World
  }

  tickerMonth() {
    const { month, date } = this.World.calendar
    if (month == 2) {
      this.宗门事务.举办升仙大会 = 1
    } else {
      this.宗门事务.举办升仙大会 = 0
    }
  }

  tickerDay() {
    Object.keys(this.宗门事务).forEach(key=>{
      if (this.宗门事务[key] > 0) {
        if (this.master) {
          this[key](this.master)
        }
      }
    })
  }

  任命掌门(character) {
    this.master = character  //掌门
  }

  收入门下(character) {
    this.characters.push(character)
    if (this.characters.length == 1) {
      this.任命掌门(character)
    }
  }

  举办升仙大会(host) {
    host.举办升仙大会()
    this.宗门事务.举办升仙大会 = 0
  }

  发布宗门任务() { 
  }
  举办外门比试赛() {
  }
  调配物资() { 
  }
}

const 宗门事务 = {
  举办升仙大会: 0
}