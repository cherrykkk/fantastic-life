/*
角色信息，pc与npc通用
*/
import NameList from '@/assets/name.json'
import Cultivation from './mixin/Cultivation'
import Memory from './mixin/Memory'
import Body from './mixin/Body'
import Invation from './mixin/Invation'
import Interaction from './mixin/Interaction'
import Work from './mixin/Work'
import Action from './mixin/Action'
import Brain from './mixin/Brain'
import Skill from './mixin/Skill'
import { mixinWithInit, mixinOnlyFunc, mixin} from '../utils/mixin.js'

export default class Character extends Cultivation {

  World
  isNpc = true
  area

  name
  surname
  givenName
  spouse
  家主
  relationships = []
  appointments = []
  家乡
  家

  sex
  healthy = 100
  consititution = 0
  intelligence = 0
  charm = 0
  walkAble = false
  living = true
  pregnent = -1
  mother = null //生物学母亲
  father = null //生物学父亲

  events = []
  children = []

  money = 0

  精力 = 0

  BIG_FIVE_Openness = 5 //开放性
  BIG_FIVE_Conscientiousness = 5 //尽责性
  BIG_FIVE_Extraversion = 5 //外倾性
  BIG_FIVE_Agreeableness = 5 //宜人性
  BIG_FIVE_Neuroticism = 5 //神经质

  今日已进食 = false

  /* 创建一个人 */
  constructor(World) {
    super()

    mixin(this, World, Skill)
    mixin(this, World, Memory)
    mixin(this, World, Body)
    mixin(this, World, Invation)
    mixin(this, World, Work)
    mixin(this, World, Action)
    mixin(this, World, Interaction)
    mixin(this, World, Brain)
    if (!World) return //如果没有传入 World，说明不是新建而是加载，无需后续步骤。

    /* 与世界建立联系 */
    this.World = World
    this.World.characters.push(this)

    /* 自动起名 */
    const name = createName(this.sex)
    this.surname = name.surname
    this.givenName = name.givenName
    this.name = this.surname + this.givenName //api糖
  }

  init_load(data) {
    Object.assign(this,data)
    this.name = this.surname+this.givenName
    this.area = _.sample(this.World.areas)
    this.家乡 = this.area
  }
  
  /* 14岁 */
  init_grown(area) {
    this.month = 12*14
    this.goTo(area)
    this.家乡 = area
    this.money = 2000
  }

  /* 新生儿 */
  init_neonate() {
    this.month = 0
  }
  
  出生(mother,father) {
    if (mother) {
      this.mother = mother
      this.buildRelationship(mother,30,100,'母亲') //家人的纯洁度极高
    }
    if (father) {
      this.father = father
      this.buildRelationship(father,30,100,'父亲')
    }
    this.获得长相(mother,father)
  }

  tickerDay() {
    /* 状态初始化 */
    this.今日已进食 = false
    this.todayWork = []
    /* 状态初始化结束 */

    this.想吃饭()

    if (this.工作点数 > 0) {
      this.工作点数 --
      this.维护日常工作()
    }

    if (this.isNpc && this.精力 && this.invations.length>0) {
      const todayReplay = this.invations.find(e=>e.B==this&&!e.replay)
      if (todayReplay) {
        this.精力 -- 
        if (todayReplay.content == '求亲') {
          this.被求亲(todayReplay)
        }
      }
    }

    this.邀约善后()

    if (this.精力 > 0 && Math.random()>0.2) {
      this.精力 --
      this.释放需求()
    }

    /* 结算 */
    if (!this.辟谷) {
      if (this.今日已进食){
        this.脂肪储量 < 15 && this.脂肪储量 ++
      } else {
        this.脂肪储量 --
      }
    }
    
    if (this.脂肪储量 == 0) {
      this.die()
      console.log(this.name +' 饿死了')
      this.addTemplateMemory('系统-饿死了', null, {A: this})
    }

    if (this.World.calendar.date == 1)
      this.tickerMonth()
  }

  tickerMonth() {
    this.精力 = 30
    this.month ++

    /*********  必测状态  *********/  

    if (this.month > 10*12 && this.month < 20*12)
      this.春心 ++

    //是否妊娠中
    if (this.pregnent != -1) {
      if (this.pregnent < 10)
        this.pregnent ++
      else 
        this.生子()
    }

    /*********  当人活着，就要花精力干些各种各样的事  *********/  
    
    this.产生需求()
    this.人的记忆是有限的()

    /*********  死吗  *********/
    if (this.month < 10*12) {
      if (Math.random() > 0.99) {
        console.log(this.name + '夭折了')
        this.die()
      }
    } else if (this.month < 30*12) {
      if (Math.random() > 0.999999) {
        console.log(this.name + '出意外死掉了')
        this.die()
      }
    } else if (this.month < 50*12) {
      if (Math.random() > 0.99) {
        console.log(this.name + '身体虚弱死掉了')
        this.die()
      }
    } else {
      console.log(this.name + '老死了')
      if (Math.random() > 0.9) this.die()
    }
  }

  人的记忆是有限的() {
    //熟悉值为 0 的概率遗忘
    this.relationships = this.relationships.filter(re=>{
      if (re.熟悉 == 0 && Math.random()>0.5) return Math.random()>0.5
      else return true
    })
    this.relationships.sort((a,b)=>{
      return b.level-a.level
    })
  }
  
  滚床单() {
    //结果: 如果性别为女，可能怀孕; 如果性别为男，获得愉悦。
    if (this.sex == '男') {
      //happy
    } else if (this.sex == '女') {
      if (this.pregnent == -1 && Math.random()>0.95) {
        this.pregnent = 0
      }
    }
    return 1
  }
  
  /*
  女性才有该功能事件。
  前提条件: 妊娠中
  */
  生子() {
  
    const father = this.spouse
    const mother = this
    const child = new Character(this.World,'init_neonate',null,this.area)
    child.出生(mother,father)
    child.搬家(this.家)
    this.pregnent = -1

    //绑定血缘母子、父子关系
    mother.children.push(child)
    if (father) {
      child.surname = father.surname
      father.children.push(child)
    } else {
      child.surname = mother.surname
    }
    child.name = child.surname + child.givenName
    
    //与其他人的两两关系
    mother.buildRelationship(child,50,100,'子女')
    father.buildRelationship(child,50,100,'子女')

    for (const _child of mother.children) {
      if (child == _child) return

      const BtoA = this.sex == '男' ? '哥哥' : '姐姐'
      child.buildRelationship(_child,10,100,BtoA)

      const AtoB = child.sex == '男' ? '弟弟' : '妹妹'
      _child.buildRelationship(child,10,100,AtoB)

    }
  }
}

function createName(sex) {
  let surname, givenName

  if (sex && Math.random() > 0.9) {
    if (sex == '男') {
      givenName =  _.sample(NameList.specialMale)
    } else if (sex == '女') {
      givenName =  _.sample(NameList.specialFemale)
    } 
  } else {
    const rand = Math.random()
    if (rand > 0.8) { //单字名
      givenName = _.sample(NameList.single)
    }
    else if (rand > 0.3) { //随机拼凑双字名
      givenName = _.sample(NameList.single) + _.sample(NameList.single)
    }
    else { //指定双字名
      givenName = _.sample(NameList.double)
    }
  }

  //姓
  if (Math.random() > 0.5) {
    surname = _.sample(NameList.surname)
  } else {
    surname = _.sample(NameList.surname, NameList.surnamedouble)
  }

  return {
    surname,
    givenName
  }
}