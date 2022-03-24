export function RelationshipInterface(uid,熟悉,纯洁,buff) {
  this.uid = uid
  this.熟悉 = 熟悉
  this.纯洁 = 纯洁
  this.buff = new Set()
  if (buff)
    this.buff.add(buff)
}

export class MemoryInterface {
  constructor(uidA,uidB,idEvent,year,month,date) {
    this.A = uidA
    this.B = uidB
    this.event = idEvent,
    this.year = year
    this.month = month
    this.date = date
  }
}