import { monthBody } from "./monthBody"
export function monthCharacter(game,character) {
  //身体成长
  monthBody(character)

  //交际需求
  humanIntercourse(game,character)

  //婚姻需求

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
    const friend = getCharacterById(game,result.characterId)
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
}

function getCharacterById(game,characterId) {
  return game.society.characters.find( item => {
    return item.characterId == characterId
  })
}
