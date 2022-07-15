
import MemoryList from '../../../assets/文字表现形式.json'
import { Calendar } from '../World'
import { Character } from '../Character'

export interface Relationship {
  target: Character,
  熟悉: number,
  纯洁: number,
  buff: Set<string>,
}

export interface Requirement {
  action: string,
  eager: number,
}

export interface Activity {

}

export interface Memory {
  year: string,
  month: string,
  date: string,
  target?: object,
  AREA?: object,
}

// export function buildMemory(calendar: Calendar, topic: string, args: object): Memory {
//   const { year,month,date } = calendar 
//   const memory: Memory = Object.assign({year,month,date},args)

//   return memory
// }


/** AI行为控制器 */
/** 玩家操作辅助器 */

export class Brain {

  relationships: Array<Relationship> = []
  estates: Array<any> = []
  精力: number = 0
  需求: Array<Requirement> = []

  /* 性格(大五)初始化 */
  BIG_FIVE_Openness: number = Math.round(Math.random()*10)
  BIG_FIVE_Conscientiousness: number = Math.round(Math.random()*10)
  BIG_FIVE_Extraversion: number = Math.round(Math.random()*10)
  BIG_FIVE_Agreeableness: number = Math.round(Math.random()*10)
  BIG_FIVE_Neuroticism: number = Math.round(Math.random()*10)

  spouse?: Character

  constructor() {
    const 需求种类 = ['追求仙缘','孤独','想要结婚','滚床单','提升自我','休闲娱乐','需要住房','谋生']
    需求种类.forEach(e=>this.需求.push({
      action: e,
      eager: 0
    }))

    // 建筑归属权以 area 里储存的建筑的 owner 为准，这里 estates 的意义是该角色的认知，相当于缓存
    this.estates = []
  }

  /* npc 行为机制（每日） */
  tickerDay() {

    this.尝试进食()

    // if (this.工作点数 > 0) {
    //   this.工作点数 --
    //   this.维护日常工作()
    // }

    // this.邀约善后()

    // if (this.精力 > 0 && Math.random()>0.2) {
    //   this.精力 --
    //   this.释放需求()
    // }

    /* 结算 */
    // if (this.World.calendar.date == 1)
    //   this.tickerMonth()
  }

  
  tickerMonth() {
    this.精力 = 30

    /*********  当人活着，就要花精力干些各种各样的事  *********/  
    
    // this.产生需求()
    this.人的记忆是有限的()
  }

  // 释放需求() {
  //   this.需求 = this.需求.sort(function(a,b){
  //     return b.eager - a.eager;
  //   })
  //   const need = this.需求[0]
  //   if (need.eager > 0) {
  //     const satisfaction = this[need.action]() || 1
  //     need.eager -= satisfaction
  //     if (need.eager < 0) 
  //       need.eager = 0
  //   }
  // }

  孩子出生(child: Character) {

  }

  // 产生需求() {

  //   if (!this.sect && this.month>12*14) {
  //     this.调整需求('谋生',3)
  //   }
  
  //   if (!this.spouse && !this.sect && this.month>12*5 && this.month<12*30 && Math.random()>0.95) {
  //     this.addTemplateMemory("仙途-萌生求仙之意",null,{A:this})
  //     this.调整需求('追求仙缘',6)
  //   }

  //   this.调整需求('孤独',this.BIG_FIVE_Openness)

  
  //   if (!this.spouse && this.专职!='修士') {
  //     if (this.month > 12*15 && Math.random()>0.9) {
  //       this.调整需求('想要结婚',1)
  //     }
  //     if (this.month > 12*16 && Math.random()>0.9) {
  //       this.调整需求('想要结婚',1)
  //     }
  //     if (this.month > 12*20 && Math.random()>0.4) {
  //       this.调整需求('想要结婚',1)
  //     }
  //   } else if (this.专职!='修士') {
  //     this.调整需求('滚床单', 2)
  //   }

  //   if (!this.家) {
  //     this.调整需求('需要住房',10)
  //   }

  //   this.调整需求('休闲娱乐', 5)
  // }

  人的记忆是有限的() {
    //熟悉值为 0 的概率遗忘
    this.relationships = this.relationships.filter(re=>{
      if (re.熟悉 == 0 && Math.random()>0.5) return Math.random()>0.5
      else return true
    })
    this.relationships.sort((a,b)=>{
      return b.熟悉-a.熟悉
    })
  }

  // 试图拿出物品(type: string, number=1) {

  //   if (this.家) {
  //     const 可用物资 = this.家.warehouse

  //     /* 翻找 */
  //     let item
  //     if (type == '食物') {
  //       const foods = '小麦，水稻'
  //       item = 可用物资.find(e=>foods.indexOf(e.类型)>=0 && e.number > 0 )
  //     } else {
  //       item = 可用物资.find(e=>e.类型== type && e.number >= number)
  //     }
  
  //     if (item) {
  //       const getItem = [item.类型,number]
  //       item.number -= number
  //       return getItem
  //     } else {
  //       this.addTemplateMemory('系统-欲拿出没能拿出',null,{D1:`【${type}】*${number}`})
  //       return false
  //     }
  //   }
  // }

  // 调整需求(needName,num) {
  //   const need = this.需求.find(e=>e.action==needName)
  //   need.eager += num
  //   if (need.eager > 50) {
  //     need.eager = 50
  //   } else if ( need.eager < 0) {
  //     need.eager = 0
  //   }
  // }

  // 孤独() {
  //   if (this.relationships.length>0 && Math.random() > 0.9) {
  //     const re = _.sample(this.relationships)
  //     this.走访亲友(re)
  //   } else {
  //     const target = _.sample(this.World.characters.filter(character => character.area == this.area))  
      
  //     if (!target || target == this) {
  //       return 0
  //     } else {
  //       this.找话题搭话(target)
  //     }
  //   }
  //   return 1
  // }

  // 找话题搭话(target) {
  //   if (this.relationships.find(re => re.target == target)){
  //     const rule = '人际-闲聊'
  //     const topic = _.sample(['求仙','天气','吃饭','合欢宗'])
  //     this.interactWith(target,'主动搭话',[rule,topic])
  //   } else {
  //     const rule = '人际-初见-搭话'
  //     const topic = _.sample(['气宇轩昂','来处'])
  //     this.interactWith(target,'主动搭话',[rule,topic])
  //   }
  // }

  主动搭话(target: Character, args: any) {
    let rule, topic
    if (args) {
      rule = args[0]
      topic = args[1]  
    } else {
      rule = '人际-闲聊'
      topic = '天气'
    }

    // this.addTemplateMemory(rule+'-规则模板-主动', rule+'-'+topic, {target})
    this.增加面熟值(target, 1)
  }

  被搭话(target: Character, args: any) {
    let rule, topic
    if (args) {
      rule = args[0]
      topic = args[1]  
    } else {
      rule = '人际-闲聊'
      topic = '天气'
    }
    if (!topic) topic = '天气'
    // this.addTemplateMemory(rule+'-规则模板-被动', rule+'-'+topic, {target})
    this.增加面熟值(target,1)
  }

  增加面熟值(target: Character, num: number) {
    const re = this.relationships.find(_re=>{
      return _re.target == target
    })
    if (re) {
      re.熟悉 += num
    } else {
      this.buildRelationship(target, num, 0)
    }
  }

  // 被求亲(invation) {
  //   const target = invation.A
  //   this.addTemplateMemory('亲事-起-被求亲',null,{target})
  //   let replay = 'no'
  //   let memoryKey, memoryData = {target}
  //   if (this.spouse) {
  //     memoryKey = '亲事-承-拒绝-已成家'
  //   } else {
  //     const re = this.relationships.find(re=>re.target == target)
  //     if (re && re.熟悉 > 20) {
  //       memoryKey = '亲事-承-应允'
  //       replay = 'ok'
  //     } else {
  //       memoryKey = '亲事-承-拒绝-婉拒-好人卡'
  //     }
  //   }
  //   this.回应邀约(invation,replay,memoryKey,memoryData)
  // }

  // 需要住房() {
  //   /* 如果自己名下有房，直接入住 */
  //   const 住宅 = this.estates.find(e => e.structure == '民宅')
  //   if (住宅) {
  //     this.搬家(住宅)
  //     this.调整需求('需要住房', -50)
  //     return 
  //   }

  //   /* 如果当地有空屋，直接入住 */
  //   const 空屋 = this.area.estates.find(e => !e.owner)
  //   if (空屋) {
  //     this.estates.push(空屋)
  //     空屋.owner = this
  //     this.搬家(空屋)
  //     this.调整需求('需要住房', -50)
  //   } else {
  //     this.建造('茅草屋')
  //   }
  // }

  // 给自己确定一个专职(occupation) {
  //   if (occupation) {
  //     this.专职 = occupation
  //   } else if (this.sect) {
  //     this.专职 = '修士'
  //   } else {
  //     // AI 选择专职策略
      
  //     const chosen = 主专职信息表.reduce((e1,e2)=>{
  //       if (this.skillsLevel[e2.skill] > this.skillsLevel[e1.skill])
  //         return e2
  //       else return e1
  //     })
  //     this.专职 = chosen.occupation
  //   }
  // }

  尝试进食() {
    // const food = this.拿出物品('食物')
    const food = true

    // if (!food) {
    //   if (this.家) {
    //     const goods = this.前去采购('食材', 100)
    //     if (goods[1])
    //       this.装入仓库(goods[0],goods[1])
    //   }
    //   else {
    //     const restaurant = this.area.estates.find(estate => estate.name == '餐馆')
    //     if (restaurant) {
    //       restaurant.haveDinner()
    //     } else {
          
    //     }
    //   }
    // }
  }

  // 想要结婚() {
  //   const getLevel = (re) => {
  //     if(!re || re.target.spouse || re.target.sex == this.sex) return -1
  //     return re.熟悉-re.纯洁
  //   }
  //   const re = this.relationships.reduce((re1,re2)=>{
  //     if (getLevel(re1) < getLevel(re2)) {
  //       return re2
  //     } else {
  //       return re1
  //     }
  //   },null) //this.relationships 可能为空，所以需要初始值
  //   if (getLevel(re) > 20) {
  //     this.求亲(re.target)
  //   }
  //   return 1
  // }

  // 追求仙缘() {
  //   //到某地去寻找有没有升仙大会
  //   const area = _.sample(this.World.areas)
  //   this.goTo(area) 

  //   const event = this.area.targetroadcasttargetoard.find(e=>e.活动名称 == '升仙大会')
  //   if (event) this.interactWith(event.主持人, '参加升仙大会')
  //     else {
  //     this.addTemplateMemory('仙途-失败-没找到仙缘', null, {A: this, AREA: this.area})
  //     this.goTo('回家')
  //   }
  //   return 1
  // }

  // 休闲娱乐() {
  //   this.散步()
  //   return 1
  // }

  buildRelationship(target: Character, 熟悉: number, 纯洁: number, buff?: string) {
    const re: Relationship = {
      target,
      熟悉,
      纯洁,
      buff: new Set()
    }
    if (buff)
      re.buff.add(buff)

    this.relationships.push(re)
    return re
  }

  // 判断田里有工作() {
  //   const farmlands = this.estates.filter(artifact => artifact.type == 'farmland')
  //   if (farmlands.length == 0) { //根本没有田。这个农民是不是当的有点问题。 
  //     this.area.addFarmland(this)
  //     return
  //   }
    
  //   farmlands.forEach(farmland => {
  //     if (farmland.name == '开垦中的农田') {
  //       farmland.work(1)
  //     } else {
  //       const plant = farmland.warehouse[0]
  //       if (plant && plant.maturity != '成熟') {
  //         this.addTemplateMemory('工作-田间劳作',null)
  //       } else if (plant && plant.status == '成熟') {
  //         this.harvest(farmland)
  //       } else if (plant && plant.status == '枯草') {
  //         this.harvest(farmland)
  //       } else if (!plant) {
  //         this.sow(farmland)
  //       } else {
  //         console.log(new Error())
  //       }
  //     }
  //   })
  // }
}