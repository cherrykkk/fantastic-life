export default class Creature {
  domain //界：植物界，动物界
  type
  genus //属：小麦属
  species //种：普通小麦
  maturity = 0

  constructor(prefabName,data) {
    if (!prefabName) return //新建 or 加载存档

    let prefab;
    if (prefabName == 'auto_plant') {
      prefab = _.sample(creature_prefabs.filter(e => e.domain == 'plant'))
      Object.assign(this, prefab)
    } else {
      prefab = creature_prefabs.find(e => e.name == prefabName)
    }
    if (prefab) {
      Object.assign(this, prefab)
    } else {
      console.log(new Error())
    }

    data && Object.keys(this).forEach(e=>{
      if (data[e])
        this[e] = data[e]
    })
  }

  grow() {
    this.maturity += 1
    if (this.maturity == 20) {
      this.status = '幼苗'
    } else if (this.maturity == this.生长天数) {
      this.status = '成熟'
    } else if (this.maturity == this.生长天数*2) {
      this.wither()
    }
  }

  harvest() {
    
  }

  wither() {
    this.status = '枯草'
    this.type = '枯草'
  }
}

export const creature_prefabs = [
  {
    name: '普通小麦',
    domain: 'plant',
    genus: '小麦属',
    species: '普通小麦',
    status: '种子',
    产出: '小麦',
    产量: 500,
    播种月份: '9,10',
    生长天数: 240
  }, {
    name: '草棉',
    domain: 'plant',
    genus: '棉属',
    species: '草棉',
    status: '种子',
    产出: '棉花',
    产量: 100,
    播种月份: '3,4,5',
    生长天数: 130,
  }, {
    name: '水稻',
    domain: 'plant',
    genus: '稻属',
    species: '稻',
    status: '种子',
    产出: '水稻',
    产量: 500,
    播种月份: '5,6',
    生长天数: 120,
  }
]