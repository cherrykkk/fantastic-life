import Character from "../game-world/Character"
import Area from '../game-world/Area'
import Sect from '../game-world/Sect'
import World from "../game-world/World"
import Artifact from "../game-world/Artifact"
import Creature from "../game-world/Creature"

const classList = {
  Character,
  Area,
  Sect,
  World,
  Artifact,
  Creature
}

export function saveWorld() {
  const items = []

  let uid = 0
  const getUID = (item)=>{
    if (!item.uid) {
      item.uid = 'uid_'+uid 
      uid ++
      items.push(item)

      Object.keys(classList).forEach(key=>{
        if (item.constructor == classList[key]) {
          item.classType = key
        }
      })

      const keys = Object.keys(item)
      keys.forEach(key=>{
        item[key] = iterate(item[key])
      })
    }
    return item.uid
  }

  function iterate(item) {
    let data
    if (!item) {
      data = item
    } else if (item.constructor == Array) { //typeof 一个array = 'object'
      data = item.reduce((e1,e2)=>{
        e1.push(iterate(e2))
        return e1
      },[])
    } else if (typeof item == 'object' && item!=null) {//typeof null == 'object 是个历史遗留问题
      data = getUID(item)
    } else if (typeof item == 'function') {
      //do nothing
    } else { //基本数据类型（值类型）
      return item
    }
    return data
  }

  const managerCopy = _.cloneDeep(this)
  const worldCopy = managerCopy.World
  //记忆太大了，暂时不想处理，就先删除吧。但之后还是要找机会恢复，不然记忆编码储存的优势不就起到作用。
  worldCopy.characters.forEach(character => character.memories = [])

  iterate(worldCopy)

  const you = managerCopy.you.uid
  items.forEach(e=>delete e.uid)

  return {
    time: new Date(),
    name: this.you.name,
    items: JSON.stringify(items),
    you
  }
  // return {
  //   time: new Date(),
  //   gameTime: this.World.calendar,
  //   World: worldArchive,
  //   name: this.you.name,
  //   age: (this.you.month/12).toFixed(0)
  // }
}


export function loadWorld(itemsData,yourUID) {
  const items = JSON.parse(itemsData)

  items.forEach((item,index)=>{
    if (item.classType) {
      const _item = new classList[item.classType]()
      Object.assign(_item,item)
      items[index] = _item
    }
  })

  console.log(items)
  items.forEach(item=>{
    const keys = Object.keys(item)
    keys.forEach(key=>{
      if (item[key] && item[key].constructor == Array) {
        const arr = item[key]
        arr.forEach((e,i)=>{
          if (!e.split) console.log(arr)
          const uid = e.split('uid_')[1]
          if (uid >= 0) {
            arr[i] = items[uid]
          }
        })
      } else if (item[key] && item[key].constructor == String) {
        const uid = item[key].split('uid_')[1]
        if (uid >= 0) {
          item[key] = items[uid]
        }
      }
    })
  })

  this.World = items[0]
  yourUID = yourUID.split('uid_')[1]
  this.you = items[yourUID]

}