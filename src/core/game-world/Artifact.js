export default class Artifact {
  /* 内部属性 */
  material = '木制'
  type = 'building'
  structure
  name
  需要工作量
  已做工作量 = 0
  
  /* 外部属性 */
  owner
  area
  warehouse = []
  使用权 = []
  柴火储量 = 0

  /* 商铺属性 */
  classification  //茶馆 医馆
  isOpen
  客人 = []
  积累工作量 = 0

  constructor(prefebName,data) {
    if (data) {
      const prefab = prefabs[prefebName]
      Object.assign(this, prefab)

      for (let key in this) {
        if (data[key])
        this[key] = data[key]
      }
    }
  }

  work(workPoint) {
    this.已做工作量 += workPoint
    if (this.已做工作量 >= this.需要工作量) {
      this.name = this.完成后转变为
    }
  }
}

const prefabs = {
  茅草屋: {
    name: '茅草屋',
    structure: '民宅',
    material: '茅草'
  },
  小木屋: {
    name: '小木屋',
    structure: '民宅',
    material: '木头'
  },
  土坯房: {
    name: '土坯房',
    structure: '民宅',
    material: '土'
  },
  商铺: {
    name: '商铺',
    structure: '商铺',
    material: '土'
  },
  医馆: {
    name: '医馆',
    structure: '商铺',
    material: '土'
  },
  茶馆: {
    name: '茶馆',
    structure: '商铺',
    material: '土'
  },
  蚕卵包: {
    name: '蚕卵包',
    structure: '杂物',
    material: '蚕卵',
    使用获得物品: '蚕卵',
    使用获得数量: 100
  },
  一把桑叶: {
    name: "一把桑叶",
    structure: '杂物',
    material: '桑叶',
    使用获得物品: '桑叶',
    使用获得数量: 100
  }
}