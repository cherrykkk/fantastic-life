import { 主专职信息表 } from './Work.js'

/** AI行为控制器 */

export default {
  init(that) {
    /* 性格(大五)初始化 */
    const theBigFive = ['Openness','Conscientiousness','Extraversion','Agreeableness','Neuroticism']
    for (const e of theBigFive) {
      that[`BIG_FIVE_${e}`] = Math.round(Math.random()*10)
    }

    that.动机 = []

    that.需求 = []
    const 需求种类 = ['追求仙缘','孤独','想要结婚','滚床单','提升自我','休闲娱乐','需要住房','谋生']
    需求种类.forEach(e=>that.需求.push({
      action: e,
      level: 0
    }))

    that.taskList = []

    that.落脚点 = null

    // 建筑归属权以 area 里储存的建筑的 owner 为准，这里 estates 的意义是该角色的认知，相当于缓存
    that.estates = []
  },
  mixin: {
    释放需求() {
      this.需求 = this.需求.sort(function(a,b){
        return b.level - a.level;
      })
      const need = this.需求[0]
      if (need.level > 0) {
        const satisfaction = this[need.action]() || 1
        need.level -= satisfaction
        if (need.level < 0) 
          need.level = 0
      }
    },
    产生需求() {

      if (!this.sect && this.month>12*14) {
        this.调整需求('谋生',3)
      }
    
      if (!this.spouse && !this.sect && this.month>12*5 && this.month<12*30 && Math.random()>0.95) {
        this.addTemplateMemory("仙途-萌生求仙之意",null,{A:this})
        this.调整需求('追求仙缘',6)
      }
  
      if (this.month > 12) {
        this.调整需求('孤独',this.BIG_FIVE_Openness)
      }
    
      if (!this.spouse && this.专职!='修士') {
        if (this.month > 12*15 && Math.random()>0.9) {
          this.调整需求('想要结婚',1)
        }
        if (this.month > 12*16 && Math.random()>0.9) {
          this.调整需求('想要结婚',1)
        }
        if (this.month > 12*20 && Math.random()>0.4) {
          this.调整需求('想要结婚',1)
        }
      } else if (this.专职!='修士') {
        this.调整需求('滚床单', 2)
      }

      if (!this.家) {
        this.调整需求('需要住房',10)
      }

      this.调整需求('休闲娱乐', 5)
    },
    调整需求(needName,num) {
      const need = this.需求.find(e=>e.action==needName)
      need.level += num
      if (need.level > 50) {
        need.level = 50
      } else if ( need.level < 0) {
        need.level = 0
      }
    },

    孤独() {
      if (this.relationships.length>0 && Math.random() > 0.9) {
        const re = _.sample(this.relationships)
        this.走访亲友(re)
      } else {
        const B = _.sample(this.World.characters.filter(character => character.area == this.area))  
        
        if (!B || B == this) {
          return 0
        } else {
          this.找话题搭话(B)
        }
      }
      return 1
    },

    找话题搭话(B) {
      if (this.relationships.find(re => re.B == B)){
        const rule = '人际-闲聊'
        const topic = _.sample(['求仙','天气','吃饭','合欢宗'])
        this.interactWith(B,'主动搭话',[rule,topic])
      } else {
        const rule = '人际-初见-搭话'
        const topic = _.sample(['气宇轩昂','来处'])
        this.interactWith(B,'主动搭话',[rule,topic])
      }
    },

    被求亲(invation) {
      const B = invation.A
      this.addTemplateMemory('亲事-起-被求亲',null,{B})
      let replay = 'no'
      let memoryKey, memoryData = {B}
      if (this.spouse) {
        memoryKey = '亲事-承-拒绝-已成家'
      } else {
        const re = this.relationships.find(re=>re.B == B)
        if (re && re.熟悉 > 20) {
          memoryKey = '亲事-承-应允'
          replay = 'ok'
        } else {
          memoryKey = '亲事-承-拒绝-婉拒-好人卡'
        }
      }
      this.回应邀约(invation,replay,memoryKey,memoryData)
    },

    需要住房() {
      /* 如果自己名下有房，直接入住 */
      const 住宅 = this.estates.find(e => e.structure == '民宅')
      if (住宅) {
        this.搬家(住宅)
        this.调整需求('需要住房', -50)
        return 
      }

      /* 如果当地有空屋，直接入住 */
      const 空屋 = this.area.estates.find(e => !e.owner)
      if (空屋) {
        this.estates.push(空屋)
        空屋.owner = this
        this.搬家(空屋)
        this.调整需求('需要住房', -50)
      } else {
        this.建造('茅草屋')
      }
    },

    给自己确定一个专职(occupation) {
      if (occupation) {
        this.专职 = occupation
      } else if (this.sect) {
        this.专职 = '修士'
      } else {
        // AI 选择专职策略
       
        const chosen = 主专职信息表.reduce((e1,e2)=>{
          if (this.skillsLevel[e2.skill] > this.skillsLevel[e1.skill])
            return e2
          else return e1
        })
        this.专职 = chosen.occupation
      }
    },

    想吃饭() {
      const eaten = this.进食()
      if (!eaten) {
        if (this.家) {
          const goods = this.前去采购('食材', 100)
          if (goods[1])
            this.装入仓库(goods[0],goods[1])
        }
        else {
          const restaurant = this.area.estates.find(estate => estate.name == '餐馆')
          if (restaurant) {
            restaurant.haveDinner()
          } else {
            
          }
        }
      }
      this.今日已进食 = eaten
    },

    想要结婚() {
      const getLevel = (re) => {
        if(!re || re.B.spouse || re.B.sex == this.sex) return -1
        return re.熟悉-re.纯洁
      }
      const re = this.relationships.reduce((re1,re2)=>{
        if (getLevel(re1) < getLevel(re2)) {
          return re2
        } else {
          return re1
        }
      },null) //this.relationships 可能为空，所以需要初始值
      if (getLevel(re) > 20) {
        this.求亲(re.B)
      }
      return 1
    },

    追求仙缘() {
      //到某地去寻找有没有升仙大会
      const area = _.sample(this.World.areas)
      this.goTo(area) 
  
      const event = this.area.broadcastBoard.find(e=>e.活动名称 == '升仙大会')
      if (event) this.interactWith(event.主持人, '参加升仙大会')
       else {
        this.addTemplateMemory('仙途-失败-没找到仙缘', null, {A: this, AREA: this.area})
        this.goTo('回家')
      }
      return 1
    },

    休闲娱乐() {
      this.散步()
      return 1
    },

    判断田里有工作() {
      const farmlands = this.estates.filter(artifact => artifact.type == 'farmland')
      if (farmlands.length == 0) { //根本没有田。这个农民是不是当的有点问题。 
        this.area.addFarmland(this)
        return
      }
      
      farmlands.forEach(farmland => {
        if (farmland.name == '开垦中的农田') {
          farmland.work(1)
        } else {
          const plant = farmland.warehouse[0]
          if (plant && plant.maturity != '成熟') {
            this.addTemplateMemory('工作-田间劳作',null)
          } else if (plant && plant.status == '成熟') {
            this.harvest(farmland)
          } else if (plant && plant.status == '枯草') {
            this.harvest(farmland)
          } else if (!plant) {
            this.sow(farmland)
          } else {
            console.log(new Error())
          }
        }
      })
    },
    求偶(Manager,character) {
  
    },

    生理需求() {
      //衣食住行
    },
    
    安全需求() {
  
    },
    
    感情需求() {
  
    },
  
    尊重需求() {
  
    },
  
    自我实现需求() {
      
    },
      
    学习() {
      
    }
  }
}