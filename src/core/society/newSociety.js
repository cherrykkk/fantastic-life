import { Society } from './Society.js'
import { newCharacter } from '../character/newCharacter.js'

export function newSociety(){ 
  const society = new Society()
  return new Promise((resolve,reject)=>{
    fetching(society)
    .then(()=>{
      local(society)
      resolve(society)
    })
  })
}

function fetching( society ) {
  return new Promise((resolve,reject)=>{
    //生成游戏中待用姓名库
    const { namesArr } = society
    fetch(`../api/getRandom_npc.php?times=999`)
    .then( res=> res.json() )
    .then( data=>{
      for(let e of data){
        let name = {
          surname: e.surname,
          givenName: e.givenName,
          sex: e.sex
        }
        namesArr.push(name)
      }
      resolve()
    })
  })
}

function local( society ) {
}