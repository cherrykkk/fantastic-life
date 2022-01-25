import { monthBody } from "./monthBody"
export function monthCharacter(game,character) {
  //身体成长
  monthBody(character)

  //交际需求
  humanIntercourse(game,character)

  //婚姻需求
  marriage(game,character)

  //生子
  giveBirth(game,character)

  //事件处理
  resolveEvents(game,character)
}

function humanIntercourse(game,character) {
  //熟人联系感情
  for( const relationship of character.relationships ) {
    relationship
  }

  //认识新朋友（不排除偶遇熟人的可能）
  const objectCharacter = _.sample(game.society.characters)
  intercourse(game,character,objectCharacter)
}

function intercourse(game,character,objectCharacter) {
  //辨认是否是熟人（以及是否是自己，理解为独处）
  const result = character.relationships.find( item => {
    return item.cId == objectCharacter.cId
  })
  if( result ) { // 如果是熟人
    //const friend = getCharacterById(game,result.cId)
    result.level ++ 
  }
  else if( character.cId == objectCharacter.cId ) { //如果是自己
    // temporarily do nothing
  }
  else {   //如果不是熟人
    const relationship = {
      cId: objectCharacter.cId,
      level: 1
    }
    character.relationships.push(relationship)
  }

  //每月概率性与人关系产生变动, 并概率遗忘关系为 0 的人
  for( const index in character.relationships ) {
    const relationship = character.relationships[index]
    // 关系为 0 的可能被遗忘
    if( relationship.level == 0 && Math.random() > 0.5 ) {
      character.relationships.splice(index,1)
      break;
    } 
    // 
    if( Math.random() > 0.5 ) { //关系变动
      relationship.level += Math.random()>0.5 ? 1 : -1
    }
    // 为了避免关系刚发生变动就被遗忘的情况，所以 遗忘 在 变动 之前
  }
  if( character.relationships.length>0 && Math.random() > 0.5 ) {
    const forgetRelationship = _.sample(character.relationships)
    forgetRelationship.level --
  }
}

const marriageAge = 14   

function marriage(GameWorld,character) {
  if(character.body.survived_month < 12*marriageAge || character.marriaged)  //不满足结婚年龄或者已婚则跳出
    return
  //寻找目标：好感等级高的异性，effect:对好感度的要求随年龄变大而降低
  const effect = (character.body.survived_month - 12*marriageAge)/4
  for( const relationship of character.relationships) {
    if(relationship.level > 10-effect) {
      const objectCharacter = GameWorld.getCharacterById(relationship.cId)
      if(objectCharacter.body.sex != character.body.sex) {       //异性则求婚
        character.memory.unshift(`${character.surname+character.givenName+(character.body.survived_month/12).toFixed(0)}岁时向${objectCharacter.surname+objectCharacter.givenName}求婚`)
        objectCharacter.events.push({
          type: "marriage",
          cId: character.cId
        })
        break; 
      }
    }
  }
}

function resolveEvents(GameWorld,character) {
  for(const index in character.events) {
    const event = character.events[index]
    character.events.splice(index,1)
    //求婚事件
    if(event.type == 'marriage') {
      const objectCharacter = GameWorld.getCharacterById(event.cId)
      character.memory.unshift(`${GameWorld.getName(character)}被${GameWorld.getName(event.cId)}求婚`)
      if(character.body.survived_month < 12*marriageAge || character.marriaged)
        return //不满足结婚年龄或者已婚则跳出
      //检定好感度，成功则结婚，不成功则加好感
      const relationship = character.relationships.find(item=>item.cId==event.cId)
      if(relationship && relationship.level > 5 && !objectCharacter.marriaged ) {
        getMarried(GameWorld,character,objectCharacter)
        break;
      }
      else if( !relationship) { //被求婚者不认识求婚者
        character.relationships.push({
          cId: event.cId,
          level: 1
        })
      }
      else {
        relationship.level ++ 
      }
    }
    //未知事件
    else {
      console.log("未知事件类型：",event)
    }
  }
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
  else if( Math.random() > 0.7 ) {  //want to be pregnent
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
