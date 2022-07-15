import NameList from '../../assets/name.json'
import { Area } from './Area'
import { Brain, Relationship } from './character/Brain'
import { Requirement } from './character/Brain'
import { Body } from './character/Body'

export interface Operation {
  name: string,
  args: Array<any>
}

export enum CharacterInitState {
  胚胎 = "胚胎",
  亚当夏娃 = "亚当夏娃",
  存档数据 = "存档数据"
}

export class Character {

  isNpc = true
  area?: Area
  body: Body
  brain: Brain

  get spouse() {
    return this.brain.spouse
  }

  get name() {
    return this.surname + this.givenName
  }
  surname
  givenName
  
  relationships: Array<Relationship> = []
  appointments = []

  家乡?: Area
  month: number = 0
  sex: string = '男'
  healthy = 100
  consititution = 0
  intelligence = 0
  charm = 0
  walkAble = false
  living = true
  pregnent = -1
  mother?: Character //生物学母亲
  father?: Character //生物学父亲

  events = []
  children: Array<Character> = []

  money = 0

  精力 = 0

  BIG_FIVE_Openness = 5 //开放性
  BIG_FIVE_Conscientiousness = 5 //尽责性
  BIG_FIVE_Extraversion = 5 //外倾性
  BIG_FIVE_Agreeableness = 5 //宜人性
  BIG_FIVE_Neuroticism = 5 //神经质


  动机 = []

  需求: Array<Requirement> = []

  taskList = []

  落脚点 = null


  // 建筑归属权以 area 里储存的建筑的 owner 为准，这里 estates 的意义是该角色的认知，相当于缓存
  estates = []

  /* 创建一个人 */
  constructor(type: CharacterInitState, mother?: Character, father?: Character) {
    if (type == "胚胎") {
      this.body = new Body(type, mother, father)
      this.brain = new Brain()
    }
    else if (type === "亚当夏娃") {
      this.body = new Body(type, mother, father)
      this.brain = new Brain()
      
      /* 自动起名 */
      const name = createName(this.sex)
      this.surname = name.surname
      this.givenName = name.givenName
    }
    else{
      this.body = new Body(type)
      this.brain = new Brain()
    }
  }

  // 出生() {
  //   if (this.mother && this.father) {
  //     this.buildRelationship(this.mother,30,100,'母亲') //家人的纯洁度极高
  //     this.buildRelationship(this.father,30,100,'父亲')
  //   }
  // }
  
  /* 14岁 */
  init_grown(area: Area) {
    this.month = 12*14
    this.goTo(area)
    this.家乡 = area
    this.money = 2000
  }

  /* 新生儿 */
  init_neonate() {
    this.month = 0
  }

  tickerDay() {

    // if (this.isNpc && this.精力 && this.invations.length>0) {

    //   const operationList = this.brain.tickerDay()

      // const todayReplay = this.invations.find(e=>e.B==this&&!e.replay)
      // if (todayReplay) {
      //   this.精力 -- 
      //   if (todayReplay.content == '求亲') {
      //     this.被求亲(todayReplay)
      //   }
      // }
    // }

    // if (this.World.calendar.date == 1)
    //   this.tickerMonth()
  }
  
  // 滚床单() {
  //   //结果: 如果性别为女，可能怀孕; 如果性别为男，获得愉悦。
  //   if (this.sex == '男') {
  //     //happy
  //   } else if (this.sex == '女') {
  //     if (this.pregnent == -1 && Math.random()>0.95) {
  //       this.pregnent = 0
  //     }
  //   }
  //   return 1
  // }

  // 搬家(newHome) {
  //   const oldHome = this.家 ? this.家 : null

  //   this.家 = newHome
  //   newHome.使用权.push(this)
  //   this.addTemplateMemory('系统-搬家', null, {AREA: this.家.area})

  //   if (oldHome) {
  //     oldHome.warehouse.forEach(e=>this.装入仓库(e.类型, e.number))
  //     oldHome.warehouse = []
  //     oldHome.使用权 = oldHome.使用权.filter(e=>e!=this)
  //   }
  // }

  // 求亲(B) {
  //   this.addTemplateMemory('亲事-起-发起方',null,{B})
  //   this.makeInvation(B,'求亲')
  // }

  // 娶(spouse) {
  //   this.spouse = spouse
  //   spouse.spouse = this
  //   this.家主 = this
  //   spouse.家主 = this
  //   spouse.搬家(this.家)

  //   this.调整需求('想要结婚',-50)
  //   spouse.调整需求('想要结婚',-50)
  // }

  // buildRelationship(B,熟悉,纯洁,buff) {
  //   if (!B) console.log(new Error())
  //   const re = {
  //     B,
  //     熟悉,
  //     纯洁,
  //     buff: new Set()
  //   }
  //   if (buff)
  //     re.buff.add(buff)

  //   this.relationships.push(re)
  //   return re
  // }

  // makeAppointment(year,month,date,B,content) {
  //   this.appointments.push({
  //     year,month,date,
  //     B,
  //     content
  //   })
  // }

  goTo(destination: Area | string) {
    let area = destination
    if (destination instanceof String) {
      // if (this.工作媒介) {
      //   area = this.工作媒介.area
      // } else {
      //   area = this.家乡
      // }
      if (!area) {
        console.log(this.name + '找不到回家的路', new Error())
      }
    } else if (destination instanceof Area) {
      this.area = destination
    }
    

    // 角色创建的时候， this.area 为 undefined
    // this.area && this.addTemplateMemory('系统-改变地点', null, {D1: this.area.name, D2: area.name})
  }

  // 前去采购(type,number) {
  //   let target
  //   if (type == '食材') {
  //     target = sample(['小麦','水稻'])
  //   } else {
  //     target = type
  //   }

  //   const onSale = this.area.市场.find(e=>e.物品 == target)
  //   const goods = []
  //   if (onSale) {
  //     onSale.市场量 -= number
  //     if (this.money >= onSale.市场价*number) {
  //     } else {
  //       number = Math.floor(this.money/onSale.市场价)
  //     }
  //     this.money -= onSale.市场价*number
  //   } else {
  //     console.log(new Error())
  //   }
  //   return [target, number]
  // }

  // /* 建造这个行为 */
  // 建造(prefabName) {
  //   const artifact = this.area.addBuilding(prefabName, this)
  // }

  // 找人滚床单() {
  //   const B = this.relationships.find(_B=>{
  //     if (_B.sex != this.sex) {
  //       return true
  //     }
  //   })
  
  //   if (B) {
  //     this.makeInvation(B,'滚床单')
  //   } else {
  //     // 找不到人滚床单
  //   }
  // }

  // sow(farmland,plantName) {
  //   if (!plantName) {
  //     plantName = 'auto_plant'
  //   }
  //   const plant = new Creature(plantName)
  //   farmland.warehouse.push(plant)

  //   this.addTemplateMemory('系统-种植',null,{A:this,D1:plant.name})
  // }

  // 上山砍柴() {
  //   const num = Math.floor(Math.random()* 30)
  //   this.家.柴火储量 += num
  // }

  // 给人测灵根(A){ //给 A 测灵根
  //   A.灵根 = ''
  //   '金 木 水 火 土'.split(' ').forEach(e=>{
  //     if(A[e]>5) {
  //       A.灵根 += e
  //     }
  //   })
  //   A.addTemplateMemory(`仙途-被测灵根`,null,{B:this,D1:A.灵根})
  // }

  // 举办升仙大会() {
  //   this.addTemplateMemory('仙途-举办升仙大会',null,{SECT:this.sect})
  //   this.area.addBroadcast('升仙大会',this.sect,this)
  //   this.setInteractionEvent('参加升仙大会',true)
  // }

  // 结束升仙大会() {
  //   this.setInteractionEvent('参加升仙大会',false)
  // }

  // 参加升仙大会(B) {
  //   const SECT = B.sect
  //   this.addTemplateMemory('仙途-报名',null,{SECT})
  // }

  // 主持升仙大会(B) {
  //   this.addTemplateMemory('仙途-遇到报名',null,{B})
    
  //   this.给人测灵根(B)
    
  //   if (B.灵根.length < 4) {
  //     this.sect.收入门下(B)
  //     B.加入宗门(this.sect)
  //     this.sect.addTemplateMemory('仙途-收弟子',null,{SECT:this,B})
  //     return true
  //   } else {
  //     this.sect.addTemplateMemory('仙途-表示对方没有修仙资质',null,{A:this,B})
  //     return false
  //   }
  // }

  // 装入仓库(type, number) {
  //   number || (number = 1)
  //   if (!this.家) {
  //     this.addTemplateMemory('系统-没地方放东西',null,{D1:`【${type}】*${number}`})
  //   } else {
  //     const warehouse = this.家.warehouse
  //     const sameThing = warehouse.find(e=> e.类型==type)
  //     if (sameThing) 
  //       sameThing.number += number
  //     else warehouse.push({
  //       '类型': type,
  //       number
  //     })
  //     this.addTemplateMemory(`系统-获得物品`,null,{D1:`【${type}】*${number}`})
  //   }
  // }

  // 散步() {
  //   //散步的过程与某人产生了些许关联
  //   if (Math.random() > 0.8) {
  //     const B = sample(this.World.characters.filter(character => character.area == this.area))  
      
  //     if (!B || B == this) {
  //       return 0
  //     }
      
  //     const re = this.relationships.find(_re=>_re.B==B)
  //     if (re) {
  //       re.熟悉 += 1
  //       this.addTemplateMemory('散步-规则模板', '散步-巧遇熟人', {B})
  //     } else {
  //       this.addTemplateMemory('散步-规则模板', '散步-相谈甚欢', {B})
  //       this.buildRelationship(B,1,0)
  //     }
  //   } else if (Math.random() > 0.4) {
  //     const event = sample(['看农田风景', '看天上风景', '晚风', '溪水', '星辰'])
  //     this.addTemplateMemory('散步-规则模板', '散步-'+event)
  //   } else {
  //   }
  // }
  
  // 走访亲友(re: Relationship) {
  //   if (!re) {
  //     re = sample(this.relationships)
  //   }
  //   //this.addTemplateMemory('人际-看望',null,{B:re.B})
  //   re.熟悉 += 1
  //   re.target.被人拜访(this)
  // }

  // 被人拜访(B: Character) {
  //   this.增加面熟值(B: Character,1)
  //   //this.addTemplateMemory('人际-被人拜访',null,{B})
  // }
}

function createName(sex: string) {
  let surname, givenName

  if (sex && Math.random() > 0.9) {
    if (sex == '男') {
      givenName =  sample(NameList.specialMale)
    } else if (sex == '女') {
      givenName =  sample(NameList.specialFemale)
    } 
  } else {
    const rand = Math.random()
    if (rand > 0.8) { //单字名
      givenName = sample(NameList.single)
    }
    else if (rand > 0.3) { //随机拼凑双字名
      givenName = sample(NameList.single) + sample(NameList.single)
    }
    else { //指定双字名
      givenName = sample(NameList.double)
    }
  }

  //姓
  if (Math.random() > 0.5) {
    surname = sample(NameList.surname)
  } else {
    surname = sample(NameList.surname, NameList.surnamedouble)
  }

  return {
    surname,
    givenName
  }
}

function sample(list1: Array<any>, list2?: Array<any>) {
  let list
  if (list2) {
    list = [...list1, ...list2]
  } else {
    list = list1
  }

  return list[Math.floor(Math.random() * list.length)]
}