import Npc from './Npc.js'
import names from '../../apiServer/Names.js'
export { newCharacter } 

function newCharacter(character) {
  const characterList = {
    "host": newHost,
    "hostess": newHostess,
    "child": newChild
  }
  return characterList[character]()
}

function newHost() {
  let npc = new Npc()
  npc.sex = "男"
  npc.month = 18*12 + Math.floor(Math.random()*12*20)
  npc.income = 2000 + Math.floor(Math.random()*20000)
  console.log(names)
  const name = names.fetchName("男")
  npc.surname = name.surname
  npc.givenName = name.givenName
  return npc
}

function newHostess() {
  let npc = new Npc()
  npc.sex = "女"
  npc.month = 20*12 + Math.floor( Math.random()*240)
  npc.income = 2000 + Math.floor(Math.random()*20000)
  fetch(`../api/getRandom_name.php?sex=女`)
  .then( res=> res.json())
  .then( data=>{
    npc.surname = data.surname
    npc.givenName = data.givenName
  })
  return npc
}

function newChild() {
  let npc = new Npc()
  npc.sex = Math.random()>0.5?"女":"男"
  npc.month = 0
  fetch(`../api/getRandom_name.php?sex=${npc.sex}`)
  .then( res=> res.json())
  .then( data=>{
    npc.givenName = data.givenName
  })
  return npc
}