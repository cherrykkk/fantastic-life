import { daySociety, monthSociety, yearSociety } from './time-run/society.js'
import SocietySetting from '../DLC/generalWorld/societySetting.json'
import { Character } from './world/character/Character.js'

function GameManager () {
  this.GameWorld = null
  this.you = null
  this.namesArr = [],
  this.playing = false
  this.namesArrReady = new Promise((resolve)=>{
    fetch(`../api/getRandom_npc.php?times=999`)
    .then( res=> res.json() )
    .then( data=>{
      for(let e of data){
        let name = {
          surname: e.surname,
          givenName: e.givenName,
          sex: e.sex
        }
        this.namesArr.push(name)
        resolve()
      }
    })
  })
}

GameManager.prototype.loadArchive = function (archive) {
  this.GameWorld = archive
  this.you = this.getCharacterById(this.GameWorld.theMainCharacterId)
  this.play()
}

GameManager.prototype.newGame = function() {
  const config = {
    startNum: 10,
    yearsBeforeBorn: 20,
    nvWaYears: 10,
    toAge: 16
  }
  this.GameWorld = {
    society: {
      yourLife:null,
      namesArr: this.namesArr,
      characters: [], //社会内npc
      npcs: [] //提前准备的N
    },
    natural: null,
    theMainCharacterId: null,
    calendar: {
      year: 0,
      month: 0,
      date: 0
    }
  }
  return new Promise((resolve)=>{
    const GameWorld = this.GameWorld
    this.namesArrReady.then(()=>{
      //生成初始 npc
      for (let i = 0;i<config.startNum;i++) {
        const character = this.createCharacterByNvWa()
        GameWorld.society.characters.push(character)
      }

      for (let i = 0;i<config.yearsBeforeBorn*12*30;i++) {
        this.aDayGoBy()
          //前n年每月多一个人
        if (this.world_month < config.nvWaYears*12 ) {
          const character = this.createCharacterByNvWa()
          GameWorld.society.characters.push(character)
        }
      }
      this.you = GameWorld.society.characters[GameWorld.society.characters.length-1]
      GameWorld.theMainCharacterId = this.you.cId
      //到达指定年龄

      while (this.you.body.month < config.toAge*12) {
        this.aDayGoBy()
      }

      this.play()
      resolve()
    })
  })
}

GameManager.prototype.play = function () {
  this.stop() //避免重复 play
  this.playing = true
  this.clock = setInterval(()=>{
    this.aDayGoBy()
    this.playing = true
  },1000)
}
GameManager.prototype.stop = function () {
  clearInterval(this.clock)
  this.playing = false
}

GameManager.prototype.aDayGoBy = function() {
  const calendar = this.GameWorld.calendar
  calendar.date += 1
  daySociety(this)
  if (calendar.date == 31) {
    calendar.date = 1
    calendar.month += 1
    monthSociety(this)
    if (calendar.month == 13) {
      calendar.month = 1
      calendar.year += 1
      yearSociety(this)
    }
  }
}

GameManager.prototype.giveBirth = function ( mother, father ) {
  const { characters } = this.GameWorld.society
  const child = this.createCharacter()
  characters.push(child)
  //绑定血缘母子、父子关系
  mother.children.push(child.cId)
  child.body.mother = mother.cId
  if ( father ) {
    father.children.push(child.cId)
    child.body.father = father.cId
  }
  //绑定社会关系
  child.relationships.push({
    type: "母亲",
    level: 30,
    id: mother.cId
  },{
    type: "父亲",
    level: 30,
    id: father.cId
  })
  return child
}

GameManager.prototype.getCharacterById = function(cId) {
  const character = this.GameWorld.society.characters.find( item => {
    return item.cId == cId
  })
  return character || `找不到id为${cId}的角色`
}

GameManager.prototype.getName = function (c) {
  let character = null
  if( typeof c == 'number' || typeof c=='string' ) { //类型为id 
    character = this.GameWorld.society.characters.find( item => {
      return item.cId == c
    })
  }
  else {
    character = c
  }
  return character.surname+character.givenName+"("+(character.body.month/12).toFixed(0)+")"
}

GameManager.prototype.makeArchive = function() {
  const archive = {
    time: new Date(),
    gameTime: this.GameWorld.calendar,
    GameWorld: this.GameWorld,
    name: this.you.surname+this.you.givenName,
    age: (this.you.body.month/12).toFixed(0)
  }
  return archive
}

GameManager.prototype.addMemory = function(A,B,eventName) {
  const eventNameList = Object.keys( SocietySetting.events )
  const eventId = eventNameList.indexOf(eventName)
  if( eventId >= 0 ) {
    A.memory.unshift({
      "BId": B.cId,
      "eventId": eventId
    })
  }
  else {
    console.log("不存在事件："+eventName,",A:",A,",B:",B)
  }
}

GameManager.prototype.parseMemory = function(A,memory) {
  const { BId, eventId } = memory
  const B = this.getCharacterById(BId)
  const eventName = Object.keys( SocietySetting.events )[eventId]
  const events = SocietySetting.events
  if( events[eventName] ) {
    let ev = events[eventName]
    ev = ev.replace('[A]',A.surname+A.givenName)
    ev = ev.replace('[B]',B.surname+B.givenName)
    return ev
  }
}


GameManager.prototype.createCharacter = function() {
  const { namesArr } = this.GameWorld.society

  const character = new Character()
  //起名
  const name = namesArr.pop()
  character.surname = name.surname
  character.givenName = name.givenName
  //性别跟着名字走（就离谱）
  character.body.sex = name.sex
  //随机ID
  character.cId = Date.now() + (Math.random()*100).toFixed(0).padStart(2,'0')
  //性格(大五)随机
  const theBigFive = ['Openness','Conscientiousness','Extraversion','Agreeableness','Neuroticism']
  for( const e of theBigFive) {
    character[`BIG_FIVE_${e}`] = Math.round(Math.random()*10)
  }
  return character
}

GameManager.prototype.createCharacterByNvWa = function() { //女娲造人，天生技能
  const { namesArr } = this.GameWorld.society
  const character = new Character()
  //起名
  const name = namesArr.pop()
  character.surname = name.surname
  character.givenName = name.givenName
  //性别跟着名字走（就离谱）
  character.body.sex = name.sex
  //随机ID
  character.cId = Date.now() + (Math.random()*100).toFixed(0).padStart(2,'0')
  //性格(大五)随机
  const theBigFive = ['Openness','Conscientiousness','Extraversion','Agreeableness','Neuroticism']
  for( const e of theBigFive) {
    character[`BIG_FIVE_${e}`] = Math.round(Math.random()*10)
  }

  //天生技能
  Object.keys(character.skills).forEach( e => {
    character.skills[e] = Math.floor(Math.random() * 40)
  })

  return character
}



export { GameManager }