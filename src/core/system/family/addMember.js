
export function addMember(family,newMemberCharacter,newMemberObject) {
  const memberList = {
    "child": addChild
  }
  memberList[newMemberCharacter](family,newMemberObject)
}

function addChild(family,child) {
  family.familyMembers.children.push(child)
  child.surname = family.familyMembers.host.surname
  /**父母与其产生联系  */
}