/*
角色信息，pc与npc通用
*/
export function Character(){
  Object.assign(this,JSON.parse(JSON.stringify(characterArgs)))
}

const characterArgs = {
  surname: null,
  givenName: null,
  characterId: null,
  marriaged: false,
  spouse: null,
  
  body: null,
  relationships: [],
  familyId: null,
  events: [],
  childrenId: []
}