import Creature from "../Creature"

export default {
  init(that) {
  },
  mixin: {
    进食() {
      const food = this.拿出物品('食物')
      if (food) {
        return true
      } else {
        return false
      }
    },

    搬家(newHome) {
      const oldHome = this.家 ? this.家 : null
  
      this.家 = newHome
      newHome.使用权.push(this)
      this.addTemplateMemory('系统-搬家', null, {AREA: this.家.area})
  
      if (oldHome) {
        oldHome.warehouse.forEach(e=>this.装入仓库(e.类型, e.number))
        oldHome.warehouse = []
        oldHome.使用权 = oldHome.使用权.filter(e=>e!=this)
      }
    },
    求亲(B) {
      this.addTemplateMemory('亲事-起-发起方',null,{B})
      this.makeInvation(B,'求亲')
    },
    娶(spouse) {
      this.spouse = spouse
      spouse.spouse = this
      this.家主 = this
      spouse.家主 = this
      spouse.搬家(this.家)

      this.调整需求('想要结婚',-50)
      spouse.调整需求('想要结婚',-50)
    },

    buildRelationship(B,熟悉,纯洁,buff) {
      if (!B) console.log(new Error())
      const re = {
        B,
        熟悉,
        纯洁,
        buff: new Set()
      }
      if (buff)
        re.buff.add(buff)
  
      this.relationships.push(re)
      return re
    },
    makeAppointment(year,month,date,B,content) {
      this.appointments.push({
        year,month,date,
        B,
        content
      })
    },

    goTo(destination) {
      let area = destination
      if (destination == '回家') {
        if (this.工作媒介) {
          area = this.工作媒介.area
        } else {
          area = this.家乡
        }
        if (!area) {
          console.log(this.name + '找不到回家的路', new Error())
        }
      } else if (typeof destination == 'string') {
        console.log(this)
        area = this.World.areas.find(e=>e.name == destination)
        if (!area) {
          console.log("地图上找不到",destination,new Error())
        }
      }
      
      if (area == this.area) {
        return 
      }

      // 角色创建的时候， this.area 为 undefined
      this.area && this.addTemplateMemory('系统-改变地点', null, {D1: this.area.name, D2: area.name})
      this.area = area
    },

    前去采购(type,number) {
      let target
      if (type == '食材') {
        target = _.sample(['小麦','水稻'])
      } else {
        target = type
      }

      const onSale = this.area.市场.find(e=>e.物品 == target)
      const goods = []
      if (onSale) {
        onSale.市场量 -= number
        if (this.money >= onSale.市场价*number) {
        } else {
          number = Math.floor(this.money/onSale.市场价)
        }
        this.money -= onSale.市场价*number
      } else {
        console.log(new Error())
      }
      return [target, number]
    },

    /* 建造这个行为 */
    建造(prefabName) {
      const artifact = this.area.addBuilding(prefabName, this)
    },

    找人滚床单() {
      const B = this.relationships.find(_B=>{
        if (_B.sex != this.sex) {
          return true
        }
      })
    
      if (B) {
        this.makeInvation(B,'滚床单')
      } else {
        // 找不到人滚床单
      }
    },

    sow(farmland,plantName) {
      if (!plantName) {
        plantName = 'auto_plant'
      }
      const plant = new Creature(plantName)
      farmland.warehouse.push(plant)

      this.addTemplateMemory('系统-种植',null,{A:this,D1:plant.name})
    },

    上山砍柴() {
      const num = Math.floor(Math.random()* 30)
      this.家.柴火储量 += num
    },

    给人测灵根(A){ //给 A 测灵根
      A.灵根 = ''
      '金 木 水 火 土'.split(' ').forEach(e=>{
        if(A[e]>5) {
          A.灵根 += e
        }
      })
      A.addTemplateMemory(`仙途-被测灵根`,null,{B:this,D1:A.灵根})
    },
    举办升仙大会() {
      this.addTemplateMemory('仙途-举办升仙大会',null,{SECT:this.sect})
      this.area.addBroadcast('升仙大会',this.sect,this)
      this.setInteractionEvent('参加升仙大会',true)
    },
    结束升仙大会() {
      this.setInteractionEvent('参加升仙大会',false)
    },
    参加升仙大会(B) {
      const SECT = B.sect
      this.addTemplateMemory('仙途-报名',null,{SECT})
    },
    主持升仙大会(B) {
      this.addTemplateMemory('仙途-遇到报名',null,{B})
      
      this.给人测灵根(B)
      
      if (B.灵根.length < 4) {
        this.sect.收入门下(B)
        B.加入宗门(this.sect)
        this.sect.addTemplateMemory('仙途-收弟子',null,{SECT:this,B})
        return true
      } else {
        this.sect.addTemplateMemory('仙途-表示对方没有修仙资质',null,{A:this,B})
        return false
      }
    },

    增加面熟值(B,num) {
      const re = this.relationships.find(_re=>{
        return _re.B == B
      })
      if (re) {
        re.熟悉 += num
      } else {
        this.buildRelationship(B,num,0)
      }
    },

    装入仓库(type, number) {
      number || (number = 1)
      if (!this.家) {
        this.addTemplateMemory('系统-没地方放东西',null,{D1:`【${type}】*${number}`})
      } else {
        const warehouse = this.家.warehouse
        const sameThing = warehouse.find(e=> e.类型==type)
        if (sameThing) 
          sameThing.number += number
        else warehouse.push({
          '类型': type,
          number
        })
        this.addTemplateMemory(`系统-获得物品`,null,{D1:`【${type}】*${number}`})
      }
    },

    拿出物品(type,number=1) {
      if (!this.家) {
        console.log('没有家，你从哪里拿出东西呢？')
        return null
      }
      const 可用物资 = this.家.warehouse
  
      /* 翻找 */
      let item
      if (type == '食物') {
        const foods = '小麦，水稻'
        item = 可用物资.find(e=>foods.indexOf(e.类型)>=0 && e.number > 0 )
      } else {
        item = 可用物资.find(e=>e.类型== type && e.number >= number)
      }

      if (item) {
        const getItem = [item.类型,number]
        item.number -= number
        return getItem
      } else {
        this.addTemplateMemory('系统-欲拿出没能拿出',null,{D1:`【${type}】*${number}`})
        return false
      }

    },

    散步() {
      //散步的过程与某人产生了些许关联
      if (Math.random() > 0.8) {
        const B = _.sample(this.World.characters.filter(character => character.area == this.area))  
        
        if (!B || B == this) {
          return 0
        }
        
        const re = this.relationships.find(_re=>_re.B==B)
        if (re) {
          re.熟悉 += 1
          this.addTemplateMemory('散步-规则模板', '散步-巧遇熟人', {B})
        } else {
          this.addTemplateMemory('散步-规则模板', '散步-相谈甚欢', {B})
          this.buildRelationship(B,1,0)
        }
      } else if (Math.random() > 0.4) {
        const event = _.sample(['看农田风景', '看天上风景', '晚风', '溪水', '星辰'])
        this.addTemplateMemory('散步-规则模板', '散步-'+event)
      } else {
      }
    },
    
    走访亲友(re) {
      if (!re) {
        re = _.sample(this.relationships)
      }
      this.addTemplateMemory('人际-看望',null,{B:re.B})
      re.熟悉 += 1
      re.B.被人拜访(this)
    },
    被人拜访(B) {
      this.增加面熟值(B,1)
      this.addTemplateMemory('人际-被人拜访',null,{B})
    },

    主动搭话(B, args) {
      let rule, topic
      if (args) {
        rule = args[0]
        topic = args[1]  
      } else {
        rule = '人际-闲聊'
        topic = '天气'
      }

      this.addTemplateMemory(rule+'-规则模板-主动', rule+'-'+topic, {B})
      this.增加面熟值(B,1)
    },
    被搭话(B,args) {
      let rule, topic
      if (args) {
        rule = args[0]
        topic = args[1]  
      } else {
        rule = '人际-闲聊'
        topic = '天气'
      }
      if (!topic) topic = '天气'
      this.addTemplateMemory(rule+'-规则模板-被动', rule+'-'+topic, {B})
      this.增加面熟值(B,1)
    }
  }
}