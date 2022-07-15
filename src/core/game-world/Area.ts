import { Artifact } from "./artifact/Artifact"
import { Character } from "./Character"
import { Farmland } from "./artifact/Farmland"
// 每个地区独立管理，多个独立的地区组成一个世界
export class Area {
  name = '无名之地'
  broadcastBoard = []
  estates = []
  farmlands: Array<Farmland> = []

  市场 = 初始市场

  constructor(name: string) {
    this.name = name
  }

  tickerDay() {

    // //初始化
    // this.estates.forEach(e=>{
    //   //if is Shop
    //   if (e.isOpen == true) {
    //     e.isOpen = false
    //   }
    //   //if is Farmland
    //   if (e.type == 'farmland' && e.warehouse[0]) {
    //     e.warehouse[0].grow()
    //   }
    // })
  }

  tickerYear() {
    this.市场.forEach(item => {
      item.市场量 += 100
    })
  }

  // addBroadcast(活动名称,举办方,主持人,开始时间,结束时间) {
  //   this.broadcastBoard.push({
  //     活动名称,
  //     举办方,
  //     主持人,
  //     开始时间,
  //     结束时间
  //   })
  // }
  
  // buyFromMarket(character,thingName,number) {
  //   const onSale = this.市场.find(e=>e.物品 == thingName)
  //   if (onSale) {
  //     onSale.市场量 -= number
  //     character.money -= onSale.市场价*number
  //     character.装入仓库(thingName,number)
  //   } else {
  //     console.log(new Error())
  //   }
  // }

  // sellToMarket(character,thingName,number) {
  //   const onSale = this.市场.find(e=>e.物品 == thingName)
  //   if (onSale) {
  //     onSale.市场量 += number
  //     character.money -= onSale.市场价*number*0.6
  //     character.拿出物品(thingName,number)
  //   } else {
  //     console.log(new Error())
  //   }
  // }

  // 只能在这个接口里注册新建筑
  addBuilding(prefabName, owner) {
    const artifact = new Artifact(prefabName)
    artifact.owner = owner
    artifact.area = this
    this.estates.push(artifact)
    owner.estates.push(artifact)
    return artifact
  }

  addFarmland(owner: Character) {
    const farmland = new Farmland('开垦中的农田')
    farmland.owner = owner
    farmland.area = this

    this.farmlands.push(farmland)
    owner.estates.push(farmland)
    return farmland
  }
}

const 初始市场 = [
  {
    物品: '棉花',
    市场价: 50,
    市场量: 5000
  },{
    物品: '苎麻',
    市场价: 5,
    市场量: 50000
  },{
    物品: '小麦',
    市场价: 2,
    市场量: 50000
  },{
    物品: '水稻',
    市场价: 2,
    市场量: 50000
  },{
    物品: '猪肉',
    市场价: 20,
    市场量: 500
  },{
    物品: '麻布',
    市场价: 5,
    市场量: 1000
  },{
    物品: '棉布',
    市场价: 500,
    市场量: 100
  }, {
    物品: '蚕卵包',
    市场价: 10,
    市场量: 100
  }
]