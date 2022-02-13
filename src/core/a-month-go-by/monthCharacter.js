import { Character } from "../character/Character"
import { createBody } from "../world/createObject"
import { monthBody } from "./monthBody"
const marriageAge = 14   
export function monthCharacter(game,character) {
  //身体成长
  monthBody(character)

  //照护自己
  careBody(game,character)

  //交际需求
  intercourse(game,character)

  //生子
  giveBirth(game,character)

  //事件处理
  resolveEvents(game,character)
  
}

function intercourse(GameWorld,A) {
  //外向性高的社交频率更高
  if( A.BIG_FIVE_Openness > Math.random()*10 ) {
    return 
  }
  //认识新朋友（不排除偶遇熟人的可能）
  const B = _.sample(GameWorld.society.characters)

  //辨认是否是熟人（以及是否是自己，理解为独处）
  const result = A.relationships.find( item => {
    return item.cId == B.cId
  })
  if( result ) { // 如果是熟人
    GameWorld.addMemory(A,B,"偶遇熟人")
    result.level ++ 
  }
  else if( A.cId == B.cId ) { //如果是自己
    // temporarily do nothing
  }
  else {   //如果不是熟人
    A.relationships.push({
      cId: B.cId,
      level: 5
    })
    GameWorld.addMemory(A,B,"一见如故")
    
    B.relationships.push({
      cId: A.cId,
      level: 5
    })
    GameWorld.addMemory(B,A,"一见如故")
  }

  //每月概率性与人关系产生变动, 并概率遗忘关系为 0 的人
  for( const index in A.relationships ) {
    const relationship = A.relationships[index]
    // 关系为 0 的可能被遗忘
    if( relationship.level == 0 && Math.random() > 0.5 ) {
      A.relationships.splice(index,1)
      break;
    } 
    // 
    if( Math.random() > 0.5 ) { //关系变动
      relationship.level += Math.random()>0.5 ? 1 : -1
    }
    // 为了避免关系刚发生变动就被遗忘的情况，所以 遗忘 在 变动 之前
  }
  if( A.relationships.length>0 && Math.random() > 0.5 ) {
    const forgetRelationship = _.sample(A.relationships)
    forgetRelationship.level --
  }

  //婚姻需求
  if( A.body.month > 12*marriageAge && !A.marriaged && A.buff.indexOf("不自信") < 0 ){
    //寻找目标：好感等级高的异性，effect:对好感度的要求随年龄变大而降低
    const effect = (A.body.month - 12*marriageAge)/4
    for (const relationship of A.relationships) {
      if (relationship.level > 10-effect) {
        const B = GameWorld.getCharacterById(relationship.cId)
        if(B.body.sex != A.body.sex) {       //异性则求婚
          GameWorld.addMemory(A,B,'求婚')
          const event = {
            AType: "求婚",
            BType: "被求婚",
            A: A.cId,
            B: B.cId,
            status: 'pending',
            startTime: GameWorld.world_month
          }
          A.events.push(event)
          B.events.push(event)
          break; 
        }
      }
    }
  }

  //概率性消除 buff
  for (const i in A.buff) {
    if (Math.random()>0.8) {
      A.buff.splice(i,1)
    }
  }
}

function careBody(GameWorld, character) {

}

function resolveEvents(GameWorld, A) {
  for( const event of A.events ) {
    if( event.status == 'pending' && A.cId == event.B ) {
      const B = GameWorld.getCharacterById(event.A)
      GameWorld.addMemory(A,B,event.BType)
      const result = acceptMarriage(A,B)
      event.status = result.status
      if( result.status == "fulfilled" ) {
        GameWorld.addMemory(A,B,"接受求婚")
        getMarried(GameWorld,A,B)
      }
      else {
        GameWorld.addMemory(A,B,"拒绝求婚")
      }
    }
    else if ( event.status == 'resolve' && A.cId == event.A ) {
      
    }
    else if ( event.status == 'reject' && A.cId == event.A ) {
      const B = GameWorld.getCharacterById(event.B)
      const re = A.relationships.find( e => e.cId == B.cId )
      re.level -= 5
      GameWorld.addMemory(A,B,"求婚被拒")
      A.buff.push("不自信")
    }
  }
  // 去除已解决事件
  A.events = A.events.filter( e => {
    return e.status == 'pending'
  })
}

function acceptMarriage(A,B) { //A 被求婚者，B 求婚者
  const result = {
    status: 'pending',
    reason: null
  }
  //检定好感度，成功则结婚，不成功则加好感
  const relationship = A.relationships.find(item=>item.cId==B.cId)
  if(A.body.month < 12*marriageAge || A.marriaged) {
    result.status = 'reject' //不满足结婚年龄或者已婚则跳出 
    result.reason = "未到婚龄"
  }
  else if(relationship && relationship.level > 5 && !B.marriaged ) {
    result.status = 'fulfilled'
    result.reason = "两情相悦"
  }
  else { //被求婚者不认识求婚者
    result.status = 'reject'
    result.reason = "不喜欢"
  }
  return result
}

function giveBirth(GameWorld,character) {
  if(character.body.sex != '女' || !character.marriaged )  //不满足怀孕条件
    return 
  else if ( character.body.pregnent && character.body.pregnent_month < 10 ) { //妊娠中
    character.body.pregnent_month ++
  }
  else if ( character.body.pregnent && character.body.pregnent_month >= 10 ) {  //give birth
    //give birth
    const father = GameWorld.getCharacterById(character.spouse)
    const child = GameWorld.giveBirth(character)
    character.body.pregnent = false
    character.body.pregnent_month = 0
    //孩子随父姓
    child.surname = father.surname
  }
  else if( Math.random() > 0.8 ) {  //want to be pregnent
    character.body.pregnent = true
  }
  else { //没怀上
    //temporary do nothing 
  }
}

function getMarried(GameWorld,characterA,characterB) {
  characterA.marriaged = true
  characterB.marriaged = true
  characterA.spouse = characterB.cId
  characterB.spouse = characterA.cId
  characterA.memory.unshift(`${GameWorld.getName(characterA)}接受了${GameWorld.getName(characterB)}的求婚`)
  characterB.memory.unshift(`${GameWorld.getName(characterB)}向${GameWorld.getName(characterA)}求婚被接受了`)
}
