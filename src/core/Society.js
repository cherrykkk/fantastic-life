import Npc from './system/Npc.js'
import Study from './system/Study.js'

export default Society

function Society(){
  this.yourLife = null
  this.npcs = [] //提前准备的NPC们，尚未与主角相识，为解决异步的问题而存在。考虑到网络延迟，请尽量保持该队列的个数在10以上

  this.stepMonth = ()=>{
    this.checkYourAge()
    this.npcsPreparing()
  }

  this.npcsPreparing = ()=>{
    if( this.npcs.length<10 )
    fetch(`../api/getRandom_npc.php?times=10`)
    .then( res=> res.json())
    .then( data=>{
      for(let e of data){
        let npc = new Npc()
        npc.surname = e.surname
        npc.givenName = e.givenName
        npc.sex = e.sex
        npc.month = Math.floor((Math.random()*70*12))
        this.npcs.push(npc)
      }
    })
  }

  this.checkYourAge = ()=>{
    let age = this.yourLife.body.month / 12
    if( age == 6 ){
      let school = selector( schoolList , "primary school" )
      this.yourLife.study.intoSchool( school )
    }
    else if( age == 12 ){
      let school = selector( schoolList , "junior school" )
      this.yourLife.study.intoSchool( school )
    }
    else if( age == 15 ){
      let school = selector( schoolList , "senior school" )
      this.yourLife.study.intoSchool( school )
    }
  }
  this.init()
}

Society.prototype.init = function(){
  this.npcsPreparing()
}

function selector( arr , key ){
  for( let e of arr ){
    console.log(e)
    if( e.selector == key ){
      return e
    }
  }
  return false
}

let schoolList = [
  {
    selector: "primary school",
    schoolName: "第一小学"
  },{
    selector: "junior school",
    schoolName: "第二中学(初中)"
  },{
    selector: "senior school",
    schoolName: "第三中学(高中)"
  },{
    selector: "senior school",
    schoolName: "衡水中学(高中)"
  },{
    selector: "senior school",
    schoolName: "师大附中(高中)"
  }
]