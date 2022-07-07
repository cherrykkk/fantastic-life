export default class Farmland {
  /* 内部属性 */
  type = 'farmland'
  name
  需要工作量
  已做工作量 = 0
  
  /* 外部属性 */
  owner
  area
  warehouse = []
  使用权 = []

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
  农田: {
    name: '农田',
    type: 'farmland',
  },
  开垦中的农田: {
    name: '开垦中的农田',
    type: 'farmland',
    需要工作量: 100,
    完成后转变为: '农田'
  }
}