import { monthBody } from "./monthBody"
export function monthCharacter(game,character) {
  //身体成长
  monthBody(character)

  //交际需求
  humanIntercourse(game,character)

  //婚姻需求
  marriage(game,character)

  //事件处理
  eventResolve(game,character)
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
    return item.characterId == objectCharacter.characterId
  })
  if( result ) { // 如果是熟人
    //const friend = getCharacterById(game,result.characterId)
    result.level ++ 
  }
  else if( character.characterId == objectCharacter.characterId ) { //如果是自己
    // temporarily do nothing
  }
  else {   //如果不是熟人
    const relationship = {
      characterId: objectCharacter.characterId,
      level: 1
    }
    character.relationships.push(relationship)
  }

  //每月概率性与某一个人疏远
  if( character.relationships.length>0 && Math.random() > 0.5 ) {
    const forgetRelationship = _.sample(character.relationships)
    forgetRelationship.level --
  }
}

function marriage(game,character) {
  const marriageAge = 18   
  if(character.body.survived_month < 12*marriageAge || character.marriaged)  //不满足结婚年龄或者已婚则跳出
    return
  //寻找目标：好感等级高的异性，effect:对好感度的要求随年龄变大而降低
  const effect = (character.body.survived_month - 12*marriageAge)/4
  for( const relationship of character.relationships) {
    if(relationship.level > 10-effect) {
      const objectCharacter = getCharacterById(game,relationship.characterId)
      //异性则求婚
      if(objectCharacter.body.sex != character.body.sex) {
        objectCharacter.events.push({
          type: "marriage",
          objectId: character.characterId
        })
      }
    }
  }
}

function eventResolve(game,character) {
  for(const event of character.events) {
    if(event.type == 'marriage') {
      if(character.body.survived_month < 12*marriageAge || character.marriaged)
        return //不满足结婚年龄或者已婚则跳出
      //检定好感度，成功则结婚，不成功则加好感
      const relationship = character.relationships.find(item=>item.characterId==event.objectId)
      if(relationship && relationship.level > 5 ) {
        //getMarried
      }
      else {
        relationship.level ++ 
      }
    }
    else {
      console.log("未知事件类型：",event)
    }
  }
}

export function getCharacterById(game,characterId) {
  const character = game.society.characters.find( item => {
    return item.characterId == characterId
  })
  return character || `找不到id为${characterId}的角色`
}
