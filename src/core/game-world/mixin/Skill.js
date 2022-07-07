import Artifact from "../Artifact.js"
import Creature from "../Creature.js"

export default {
  init(that) {
    that.skillsLevel = {
      医术: 0,
      耕种: 0,
      经商: 0,
      狩猎: 0,
      运动: 0,
      手工: 0
    }
    //天赋
    Object.keys(that.skillsLevel).forEach(skill => that.skillsLevel[skill] = Math.floor(Math.random() * 40))
    that.skillsLevel
  },
  mixin: {
    build(prefabName) {
      const { area } = this
      const artifact = new Artifact(prefabName,{
        area,
        owner: this
      })
      return artifact
    },
    harvest(farmland) {
      const plant = farmland.warehouse.pop()
      if (plant.status == '成熟') {
        this.装入仓库(plant.产出,plant.产量) 
        this.addTemplateMemory('系统-丰收',null,{D1:`${plant.产出}*${plant.产量}`})
      } else {
        this.addTemplateMemory('系统-割除',null,{D1:plant.name})
      }
    },

    纺纱() {

    },

    织布(material,itemName) {
      
    },

    烹饪(material,foodName) {
      return foodName
    }
  }
}