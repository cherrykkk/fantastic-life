export default {
  init(that) {
    that.专职
    that.工作媒介
    that.杂活 = [
      ['种田',0],['织布',0],['烹饪',0],['捡柴',0]
    ]
    that.工作点数 = 0
  },
  mixin: {
    谋生() {
      this.工作点数 += 10
      if (this.工作点数 >= 0) {
        this.农民谋生()
        this.工作点数 --
      }
    },

    维护日常工作() {
      if (this.专职 == '农夫') {
        this.农夫的工作()
      } else if (this.专职 == '修士') {
        this.修士的工作()
      } else if (this.专职 == '茶馆掌柜' || this.专职 == '客栈掌柜' || this.专职 == '大夫') {
        this.掌柜的工作()
      } else {
        this[`${this.专职}的工作`] && this[`${this.专职}的工作`]()
      }
    },

    修士的工作() {
      this.灵力 += 2
      this.试图突破境界()
    },

    掌柜的工作() {
      const shops = this.estates.filter(building => building.structure == '商铺')
      shops.forEach(shop => {
        shop.营业中 = true
        this.money += 3
      })
    },

    大夫的工作() {
      const hospital = this.estates.filter(building => {
        return building.name == '医馆'
      })
      if (!hospital) {
        this.建造('医馆')
        return 
      } else if (hospital.客人.length > 0) {
        const 客人 = hospital.客人.pop()
        this.addTemplateMemory('工作-看病',null,{B:客人})
      }
    },

    猎人的工作() {
      const result = Math.random()
      if (result > 0.8) {
        this.addTemplateMemory('打猎-成果-狐狸')
        this.装入仓库('狐狸')
      } else if (result > 0.5) {
        this.addTemplateMemory('打猎-成果-兔子')
        this.装入仓库('兔子')
      } else {
        this.addTemplateMemory('打猎-成果-空手而归')
      }
    },

    织工的工作() {
      const thing = this.拿出物品('棉花',100) 
      if (!thing) {
        this.addTemplateMemory('织布-缺材料')
        return
      }
      this.装入仓库('布')
    },

    农夫的工作() {
      const farmlands = this.estates.filter(building => {
        return building.type == 'farmland'
      })
      farmlands.forEach(farmland => {
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
      })
    },

    农民谋生() {
      const workInFarmland = this.判断田里有工作()
      if (workInFarmland) {
        this.下田一次()
      } else if (this.家.柴火储量 < 10) {
        this.上山砍柴()
      }
    },
    下田一次() {
      const farmland = this.estates.filter(building => building.type == 'farmland' && building.积累工作量)
      if (farmland) {
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
    },
  }
}

export const 主专职信息表 = [
  {
    occupation: '大夫',
    skill: '医术',
    relyOn: '医馆'
  }, {
    occupation: '农夫',
    skill: '耕种',
    relyOn: '农田'
  }, {
    occupation: '茶馆',
    skill: '经商',
    relyOn: '商铺'
  }, {
    occupation: '织工',
    skill: '手工',
    relyOn: '织布机'
  }, {
    occupation: '猎人',
    skill: '狩猎',
    relyOn: '猎弓'
  }
]

const occupationBySkill = [
  {
    occupation: '大夫',
    skill: '医术',
    relyOn: '医馆'
  }, {
    occupation: '农夫',
    skill: '耕种',
    relyOn: '农田'
  }, {
    occupation: '茶馆',
    skill: '经商',
    relyOn: '商铺'
  }, {
    occupation: '织工',
    skill: '手工',
    relyOn: '织布机'
  }
]

const 商铺数据 = [
  {
    类型: '茶馆',
    工作: '茶馆掌柜',
    产品: '休闲点'
  },{
    类型: '医馆',
    工作: '大夫',
    产品: '治疗点'
  },{
    类型: '客栈',
    工作: '客栈掌柜',
    产品: '落脚点'
  }
]

const 民宅 = [
  ['草屋','落脚点'],
  ['木屋','落脚点']
]

const 耕地 = [
  ['田地','农夫工作点'],
  ['盐碱地','农夫工作点']
]

const 工具 = [
  {
    类型: '织布机',
    原料: '棉花',
    产物: '布匹'
  }
]