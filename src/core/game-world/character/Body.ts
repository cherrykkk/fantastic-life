
import { Character } from "../Character"

export interface Appearance {
  前发: number,
  后发: number,
  脸型: number,
  眉毛: number,
  眼睛: number,
  耳朵: number,
  嘴: number,
  脖子: number,
  肤色: number,
  发色: number,
}

export class Body {
  charm: number = Math.round(Math.random()*10) //魅力值
  appearance: Appearance
  sex: string = Math.random() > 0.5 ? '男' : '女'
  脂肪储量: number = 15 // 10+ 是标准身材，20+是胖子，10- 是超级瘦弱
  living: Boolean = true
  今日饱腹: Boolean = false
  辟谷: Boolean = false
  pregnentMonth: number = -1
  fetus?: Character 
  month: number = 0
  死因: string = ""
  体力: number = 0
  father?: Character
  mother?: Character
  
  constructor (type: string, mother?: Character, father?: Character) {
    this.appearance = this.获得长相(father, mother)

    if (type == "胚胎") {
    }
    else if (type === "亚当夏娃") {
      this.month = 14
    }
    else if (type === "存档数据") {
    }
  }

  出生() {
    this.month = 0
  }

  /* 每日状态更新与消耗 */
  dayStart () {
    this.今日饱腹 = false

    //是否妊娠中
    if (this.pregnentMonth != -1) {
      if (this.pregnentMonth < 10)
        this.pregnentMonth ++
      else 
        this.分娩()
    }
  }

  dayEnd() {
    if (!this.辟谷) {
      if (this.今日饱腹){
        this.脂肪储量 < 15 && this.脂肪储量 ++
      } else {
        this.脂肪储量 --
      }
    }

    if (this.脂肪储量 == 0) {
      this.die()
    }
  }

  tickerMonth() {

    this.month ++

    /*********  死吗  *********/
    if (this.month < 10*12) {
      if (Math.random() > 0.99) {
        this.死因 = "夭折"
        this.die()
      }
    } else if (this.month < 30*12) {
      if (Math.random() > 0.999999) {
        this.死因 = "意外"
        this.die()
      }
    } else if (this.month < 50*12) {
      if (Math.random() > 0.99) {
        this.死因 = '身体虚弱死掉了'
        this.die()
      }
    } else if (Math.random() > 0.9) {
      this.死因 = "老死"
      this.die()
    }

  }

  getPregnant(mother: Character, father: Character) {
    const fetus = new Character("胚胎", mother, father) // 胎儿
    this.fetus = fetus
  }

  /**
    女性才有该功能事件。
    前提条件: 妊娠中
  */
  分娩() {
    const father = this.spouse
    const mother = this
    const child: Character = new Character(this.World,'init_neonate',null,this.area)
    child.出生(mother,father)
    child.搬家(this.家)
    this.pregnentMonth = -1

    //绑定血缘母子、父子关系
    mother.children.push(child)
    if (father) {
      child.surname = father.surname
      father.children.push(child)
    } else {
      child.surname = mother.surname
    }
    
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

  获得长相(mother?: Character, father?: Character): Appearance {
    const appearance: Appearance = {
      前发: 0,
      后发: 0,
      脸型: 0,
      眉毛: 0,
      眼睛: 0,
      耳朵: 0,
      嘴: 0,
      脖子: 0,
      肤色: 0,
      发色: 0,
    }
  
    //长相
    for (const key in availableAppearance) {
      let 可获得基因 = []
      if (father && mother) {
        可获得基因 = [father.body.appearance[key], mother.body.appearance[key]]
      } else {
        可获得基因 = availableAppearance[key]
      }
      appearance[key] = _.sample(可获得基因)
    }
  
    if (this.sex == '男') {
      appearance.前发 = _.sample([...availableAppearance.前发, ...男性专属外观.前发])
      appearance.后发 = _.sample([...availableAppearance.后发, ...男性专属外观.后发])
    } else {
      appearance.前发 = _.sample([...availableAppearance.前发, ...女性专属外观.前发])
      appearance.后发 = _.sample([...availableAppearance.后发, ...女性专属外观.后发])
    }
    appearance.发色 += 55
    appearance.肤色 += 55
  
    return appearance
  }

  die() {
    this.living = false  
  }
}


const availableAppearance = {
  前发: [1,2,3,4,5,6,7,10,11],
  后发: [1,2,6,7,8,9,12],
  脸型: [2,3,4,5],
  眉毛: [1,2,3,4,5,6,7],
  眼睛: [2,3,5,6,7,8],
  耳朵: [2,3],
  嘴: [1,2,3,4,5,6],
  脖子: [1,2,3],
  肤色: ['#feeecd','#fff2e2','#c3816b','#fffdcd','#fff2e9'],
  发色: ['#000000','#111111','#222222','#333333','#444444','#555555','#666666','#777777','#888888','#999999','#353434','#4c4848','#390101','#604901','#886800','#655423']
}

const 男性专属外观 = {
  前发: [8],
  后发: [4],
  脸型: [],
  眉毛: [],
  眼睛: [],
  耳朵: [],
  嘴: [],
  脖子: []
}
const 女性专属外观 = {
  前发: [9],
  后发: [3,5,10,11],
  脸型: [],
  眉毛: [],
  眼睛: [],
  耳朵: [],
  嘴: [],
  脖子: []
}
