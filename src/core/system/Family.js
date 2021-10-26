import eventsLiberary from "../EventsLiberary.js"

function Family(){
  this.siblings = []
  this.children = []
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
  this.init = score =>{
    this.state.wealthy = Math.floor(score*10000)
    this.state.mother = randCheck(1-0.1*score) ? true : false
    this.state.father = randCheck(1-0.1*score) ? true : false
    this.state.monthIncome = Math.floor(score*1000)
    this.state.monthExpense = Math.floor(score*900*Math.random()*1.2)
    this.state.parentsRelathionship = score
    this.state.harmony = score

    if( !(this.state.mother||this.state.father)){
      this.addEvent("你自幼父母双亡")
      this.state.monthExpense = 0
    }
  }
  this.stepMonth = ()=>{
    this.state.wealthy += this.state.monthIncome - this.state.monthExpense
    this.needCheck()
    this.state.wealthy = this.state.wealthy
  }
  this.addEvent = (message)=>{
    eventsLiberary.addEvent(message,"family")
  }
  this.needCheck = ()=>{
    this.needForCar()
    this.needForHouse()
  }
  this.familySupport = function(body){
    let unsolved = []
    for(let need of body.inNeed){
      if(this.state.wealthy > need.cost){
        let cost = Math.floor(need.cost)
        this.state.wealthy -= cost
        need.success.call(body)
        this.addEvent("家庭花费了"+cost+"为你调养")
      }
      else{
        need.failure.call(body)
        unsolved.push(need)
      }
    }
    body.inNeed = unsolved
  }
}

Family.prototype.needForCar = function(){
  let wealthy = this.state.wealthy
  let options = cars
  let target = options[Math.floor(Math.random()*options.length)]
  let cost = target[1]
  let name = target[0]
  let done = false
  if(this.property.car.length>0)
    return
  let behaviorTree = [
    {
      limit: cost*5,
      check: 0.5,
      success: "你的父母为家庭购置了一台车",
      failure: "你的父母本想为家里添置一台车，斟酌许久后还是决定再看看",
    },{
      limit: cost*3,
      check: 0.5,
      success: "你的父母觉得家里还是应该有一辆车，于是你在不久后就坐上了自家的车",
      failure: "你的父母本想为家里添置一台车，斟酌许久后还是决定再看",
    },{
      limit: cost*1,
      check: 0.5,
      success: "你的父母咬牙买了一台车，花掉了家里所有的流动资金",
      failure: "你的父母本想为家里添置一台车，但考虑到家里不能缺少流动资金，还是放弃了",
    }
  ]
  for( let e of behaviorTree){
    if( wealthy > e.limit ){
      if( randCheck(e.check) ){
        this.addEvent(e.success)
        done = true
      }
      else
        this.addEvent(e.failure)
      break
    }
  }
  if( done ){
    this.state.wealthy -= cost
    this.property.car.push(name)
  }
}
Family.prototype.needForHouse = function(){
  let wealthy = this.state.wealthy
  let options = houses
  let target = options[Math.floor(Math.random()*options.length)]
  console.log(target)
  let name = target[0]
  let cost = target[1]
  let done = false
  let behaviorTree = [
    {
      limit: cost*2,
      check: 0.2,
      success: "你的父母投资性买了套房",
      failure: "你的父母本想用手头的钱投资一套房，然而看来看去都不太满意",
    },{
      limit: cost*1,
      check: 0.4,
      success: "你的父母兴致勃勃地看了许久的房，最终选购了一套比较满意的",
      failure: "你的父母对于买房这事非常谨慎，决定再多看看",
    }
  ]
  for( let e of behaviorTree){
    if( wealthy > e.limit ){
      if( randCheck(e.check) ){
        this.addEvent(e.success)
        done = true
      }
      else
        this.addEvent(e.failure)
      break
    }
  }
  if( done ){
    this.state.wealthy -= cost
    this.property.house.push(name)
  }
}

function randCheck(level){
  if(Math.random()>level)
    return true
  else return false
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


export default Family