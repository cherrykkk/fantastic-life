import Area from "./Area"
import Character from "./Character"
import Sect from "./Sect"
import masterData from '/public/fixedNPC/飞雪.json'
import Artifact from "./Artifact"

export interface Calendar {
  year: number,
  month: number,
  date: number
}

export default class World {
  characters: Array<Character> = []
  sects = []
  areas: Array<Area> = []

  社会安定度 = 50

  calendar: Calendar = {
    year: 0,
    month: 0,
    date: 25
  }
  temperature: number = 20
  maxId = 0

  config = {
    游戏速度: 2,
    记忆展示顺序: "逆序",
    快进到某年: 1,
    初始角色数: 10,
  }
  constructor(config) {
    /* 初始世界设定 */
    const area1 = this.addArea('平山镇')
    for (let i = 0; i< 10;i ++) {
      const npc = new Character(this)
      npc.init_grown(area1)
      npc.建造('小木屋')
    }

    const area2 = this.addArea('落霞村')
    for (let i = 0; i< 5;i ++) {
      const npc = new Character(this)
      npc.init_grown(area2)
      npc.建造('茅草屋')
    }

    this.addArea('昆仑山')
    Object.assign(this.config, config)

    const character = new Character(this)
    character.init_load(masterData)
    this.addSect('合欢宗',character)
  }

  tickerDay() {

    this.areas.forEach(area=>area.tickerDay())
  
    //过程
    this.characters.forEach(character=>{
      if (character.living)
        character.tickerDay()
    })

    this.sects.forEach(sect=>sect.tickerDay())
    //收尾
    if (this.date == 1)
      this.World.tickerMonth()
  }

  tickerMonth() {
    for( const character of this.characters) {
      if (character.living)
        character.tickerMonth()
    }
  
    this.sects.forEach(sect=>sect.tickerMonth())
  }

  addSect(name,master) {
    /* 新成立一个宗派，会带来以下影响 */
    const sect = new Sect(this,name)
    this.sects.push(sect)
    sect.area = this.addArea(name+'地界') 

    sect.收入门下(master)
    master.sect = sect
    return sect
  }

  addArea(name) {
    const area = new Area(name)
    this.areas.push(area)
    return area
  }
}