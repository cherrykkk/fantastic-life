import { daySociety, monthSociety, yearSociety } from './time-run/society.js'
import SocietySetting from '../DLC/generalWorld/societySetting.json'
import EventList from '../DLC/relationshipBuff.json'
import { Character } from './world/character/Character.js'
import { _ } from 'core-js'

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
  //把关系里的 buff 改为 Set 格式
  this.GameWorld.society.characters.forEach( c=>{
    c.buff = new Set(c.buff)
    c.relationships.forEach(re=>{
      re.buff = new Set(re.buff)
    })
  })

  this.you = this.getCharacterById(this.GameWorld.theMainCharacterId)
  this.play()
}

GameManager.prototype.newGame = function(config) {
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
    },
    config: {
      startNum: config.世界创建之初的NPC个数,
      yearsBeforeBorn: config.出生前世界运行年份,
      nvWaYears: config.女娲造人持续年份,
      toAge: config.出生后直接跳到年龄,
      "游戏速度": 3,
      "记忆展示顺序": "逆序"
    }
  }
  const { startNum, yearsBeforeBorn, nvWaYears, toAge } = this.GameWorld.config
  return new Promise((resolve)=>{
    const GameWorld = this.GameWorld
    this.namesArrReady.then(()=>{
      //生成初始 npc
      for (let i = 0;i<startNum;i++) {
        const character = this.createCharacterByNvWa()
        GameWorld.society.characters.push(character)
      }

      for (let i = 0;i<=(yearsBeforeBorn+toAge)*12*30;i++) {
        setTimeout(()=>{ //设为宏任务，避免阻塞UI渲染
          this.aDayGoBy()

          //此时出生的就是主角你
          if (!this.you && this.GameWorld.calendar.year == yearsBeforeBorn) {
            this.you = GameWorld.society.characters[GameWorld.society.characters.length-1]
            GameWorld.theMainCharacterId = this.you.cId  
            console.log(this.you)
          }

          if (this.you && this.you.body.month >= toAge*12 -1) {
            this.play()
            resolve()
          }
        },0)
      }
    })
  })
}

GameManager.prototype.play = function () {
  this.stop() //避免重复 play
  this.playing = true
  const speed = 1000/this.GameWorld.config.游戏速度
  this.clock = setInterval(()=>{
    this.aDayGoBy()
    this.playing = true
  },speed)
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

  //把关系里的 buff 格式由 set 改为 array 格式，因为 set 不能被  json.stringify 转化
  this.GameWorld.society.characters.forEach( c=>{
    c.buff = Array.from(c.buff)
    c.relationships.forEach(re=>{
      re.buff = Array.from(re.buff)
    })
  })

  const worldArchive = JSON.parse(JSON.stringify(this.GameWorld))

  //转回来, 程序还要继续用 set 格式的
  this.GameWorld.society.characters.forEach( c=>{
    c.buff = new Set(c.buff)
    c.relationships.forEach(re=>{
      re.buff = new Set(re.buff)
    })
  })

  return {
    time: new Date(),
    gameTime: this.GameWorld.calendar,
    GameWorld: worldArchive,
    name: this.you.surname+this.you.givenName,
    age: (this.you.body.month/12).toFixed(0)
  }
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
  const B = this.getCharacterById(memory.B)

  const event = EventList.find( e=>{
    return e.id == memory.event
  })
  let string = event ? event.描述 : null
  if (string) {
    string = string.replace('A',A.surname+A.givenName)
    string = string.replace('B',B.surname+B.givenName)
    return string
  }
}

const availableAppearance = {
  "back-hair": [1,2,3,4,5,6],
  face: [1,2,3,4,5],
  eyebrow: [1,2,3,4,5,6,7],
  eye: [1,2,3,4,5,6,7,8],
  ear: [1,2],
  mouth: [1,2,3,4,5,6],
  "front-hair": [1,2,3,4,5,6,7,8,9],
  neck: [1,2,3],
  "skin-color": ['#feeecd','#fff2e2','#c3816b','#fffdcd','#fff2e9'],
  "hair-color": ['#000000','#111111','#222222','#333333','#444444','#555555','#666666','#777777','#888888','#999999','#353434','#4c4848','#390101','#604901','#886800','#655423']
}


function createCharacter(name) {
  const character = new Character()
  //起名
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
  //长相
  for (const key in availableAppearance) {
    character.body.appearance[key] = _.sample(availableAppearance[key])
  }
  //魅力
  character.charm = Math.round(Math.random()*10)
  return character
}

GameManager.prototype.createCharacter = function() {
  const name = this.GameWorld.society.namesArr.pop()
  const character = createCharacter(name)
  return character
}

GameManager.prototype.createCharacterByNvWa = function() { //女娲造人，天生技能
  const name = this.GameWorld.society.namesArr.pop()
  const character = createCharacter(name)

  //天生技能
  Object.keys(character.skills).forEach( e => {
    character.skills[e] = Math.floor(Math.random() * 40)
  })
  //分房子
  const house = {
    id: Date.now() + (Math.random()*100).toFixed(0).padStart(2,'0'),
    type: 'house',
    size: 30 + (Math.random()*100).toFixed(0),
    quality: 20 + (Math.random()*80).toFixed(0)
  }
  character.estate.push(house)

  return character
}

const Events =[
  {
    name: "一见钟情",
    before: ["陌生人"],
    after: "追求者",
    "对方颜值": [7,10],
    "本人外向": [5,10],
    "随机度": [0.7,1],
  },
  {
    name: "一见钟情",
    before: ["陌生人"],
    after: "暗恋者",
    "对方颜值": [7,10],
    "本人外向": [0,5],
    "随机度": [0.7,1],
  },
  {
    name: "日久生情",
    before: "朋友，青梅竹马，同学，邻居".split("，"),
    after: "追求者",
    "对方颜值": [7,10],
    "本人外向": [5,10],
    "随机度": [0.7,1],
  },
  {
    name: "一见钟情",
    before: ["暗恋者"],
    after: "追求者",
    "对方颜值": [7,10],
    "本人外向": [0,5],
    "随机度": [0.7,1],
  }, 
  {
    name: "日久生情",
    before: "朋友，青梅竹马，同学，邻居".split("，"),
    after: "追求者",
    "对方颜值": [7,10],
    "本人外向": [5,10],
    "随机度": [0.7,1],
  },
  {
    name: "一见钟情",
    before: "朋友，青梅竹马，同学，邻居".split("，"),
    after: "暗恋者",
    "对方颜值": [7,10],
    "本人外向": [0,5],
    "随机度": [0.7,1],
  },
]

GameManager.prototype.judgeEvent = function () {

}



export { GameManager }