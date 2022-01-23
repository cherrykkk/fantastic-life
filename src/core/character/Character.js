/*
角色信息，pc与npc通用
*/
export function Character(){
  this.surname = null
  this.givenName = null
  this.characterId = null
  this.marriaged = false

  this.body =  null
  this.relationships = []
  this.familyId = null
  this.events = []
}
