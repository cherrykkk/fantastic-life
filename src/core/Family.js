import eventsLiberary from "./EventsLiberary.js"
//import Npc from "./system/intercourse/Npc.js"
import Npc from "./system/npc/Npc.js"
import {randCheck,getName} from './utils.js'
export default Family

function Family( score ){
  this.surname = null
  this.families = []
  this.children = []
  this.yourLife = null
  this.property = {
    car:[],
    house:[]
  }
  this.state = {
    mother: true,
    father: true,
    parentsRelathionship: 10,
    monthIncome: 10000,
    monthExpense: 5000,
    wealthy: 0,
    harmony: 0
  }
  this.stepMonth = ()=>{
    this.state.wealthy += this.state.monthIncome - this.state.monthExpense
    this.checkDemands()
    this.state.wealthy = this.state.wealthy
  }
  this.reference = ( yourLife )=>{
    this.yourLife = yourLife
  }
  this.init( score )
}

Family.prototype.checkDemands = function(){
  needForCar(this)
  needForHouse(this)

  function needForCar(context){
    let wealthy = context.state.wealthy
    let options = cars
    let target = options[Math.floor(Math.random()*options.length)]
    let cost = target[1]
    let name = target[0]
    let done = false
    if(context.property.car.length>0)
      return
    let behaviorTree = [
      {
        limit: cost*2,
        check: 0.5,
        success: "你家购置了一台车",
        failure: "你家本计划添置一台车，斟酌许久后还是决定再看看",
      },{
        limit: cost*1,
        check: 0.5,
        success: "你家咬牙买了一台车，花掉了家里所有的流动资金",
        failure: "你家本欲添置一台车，但考虑到家里不能缺少流动资金，还是放弃了",
      }
    ]
    for( let e of behaviorTree){
      if( wealthy > e.limit ){
        if( randCheck(e.check) ){
          context.addEvent(e.success)
          done = true
        }
        else
          context.addEvent(e.failure)
        break
      }
    }
    if( done ){
      context.state.wealthy -= cost
      context.property.car.push(name)
    }
  }
  function needForHouse(context){
    let wealthy = context.state.wealthy
    let options = houses
    let target = options[Math.floor(Math.random()*options.length)]
    let name = target[0]
    let cost = target[1]
    let done = false
    let behaviorTree = [
      {
        limit: cost*2,
        check: 0.2,
        success: "你家投资性买了套房",
        failure: "你家想用手头的钱投资一套房，然而看来看去都不太满意",
      },{
        limit: cost*1,
        check: 0.4,
        success: "你家在仔细斟酌后，选购了一套比较满意的房子",
        failure: "你家对买房这事非常谨慎，故而决定再多看看",
      }
    ]
    for( let e of behaviorTree){
      if( wealthy > e.limit ){
        if( randCheck(e.check) ){
          context.addEvent(e.success)
          done = true
        }
        else
          context.addEvent(e.failure)
        break
      }
    }
    if( done ){
      context.state.wealthy -= cost
      context.property.house.push(name)
    }
  }
}

let cars = [
  ["宝马车",200000],
  ["奔驰车",150000],
  ["比亚迪电动汽车",120000],
  ["二手车",30000]
]
let houses = [
  ["市中心80平商品房",2000000],
  ["地铁站80平商品房",1500000],
  ["周边地区100平商品房",1500000],
  ["学区50平商品房",1400000],
  ["郊区三层别墅",1200000],
  ["周边50平商品房",1100000],
  ["周边60平二手商品房",1000000]
]

Family.prototype.init = function(score){
  initRandom(this,this.state)
  familyDescription(this)

  function initRandom(context,state){
    state.wealthy = Math.floor(score*10000)
    state.mother = randCheck(1-0.1*score) ? true : false
    state.father = randCheck(1-0.1*score) ? true : false
    state.monthIncome = Math.floor(score*1000)
    state.monthExpense = Math.floor(score*900*Math.random()*1.2)
    state.parentsRelathionship = score
    state.harmony = score
    getName().then( data =>{
      context.surname = data.surname
      initParents(context)
      initSiblings(context)
    })
  }
  
  function initParents(context){
    if(context.state.father){
      let father = new Npc()
      father.initAsParent("男",context.surname)
      father.character = "父亲"
      context.families.push(father)
    }
    if(context.state.mother){
      let mother = new Npc()
      mother.initAsParent("女")
      mother.character = "母亲"
      context.families.push(mother)
    }
  }

  function initSiblings(context){
    let max = 3
    while( max>0 ){
      if( randCheck(0.8) ){
        let sibling = new Npc()
        sibling.initAsOlderSibling( 0 , context.surname )
        sibling.character = sibling.sex=="男"? "哥哥": "姐姐"
        context.families.push(sibling)
      }
      max--;
    }
  }

  function familyDescription(content){
    if( !(content.state.mother||content.state.father) ){
      content.addEvent("你自幼父母双亡")
      content.state.monthExpense = 0
    }
  }
}

Family.prototype.addEvent = function(message){
  eventsLiberary.addEvent(message,"family")
}