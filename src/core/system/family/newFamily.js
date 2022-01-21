import { Family } from "./Family.js";
import { newCharacter } from "../npc/newCharacter.js";
import { addMember } from "./addMember.js";

export function newFamily() {
  let family = new Family()

  family.familyMembers.host = newCharacter("host")
  family.familyMembers.hostess = newCharacter("hostess")

  //你出生前过了 n 年
  let n = Math.floor(Math.random()*14)
  while(n>0) {
    if(Math.random()>0.2) {
      addMember(family,"child",newCharacter("child"))
    }
    for(const child of family.familyMembers.children) {
      child.month += 12
    }
    n--;
  }

  return family
}