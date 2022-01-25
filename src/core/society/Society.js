

export function Society(){
  this.yourLife = null
  this.namesArr = []
  this.characters = [] //社会内npc
  this.npcs = [] //提前准备的NPC们，尚未与主角相识，为解决异步的问题而存在。考虑到网络延迟，请尽量保持该队列的个数在10以上
}
