import { Artifact } from "../Artifact"

export class Farmland extends Artifact{
  /* 内部属性 */
  type = 'farmland'
  name: string = ''
  需要工作量 = 0
  已做工作量 = 0

  // constructor(prefebName: string) {
  //   super()
  //   // if (data) {
  //   //   const prefab = prefabs[prefebName]
  //   //   Object.assign(this, prefab)

  //   //   for (let key in this) {
  //   //     if (data[key])
  //   //     this[key] = data[key]
  //   //   }
  //   // }
  // }

  work(workPoint: number) {
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