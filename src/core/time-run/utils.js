import EventsList from '../../DLC/relationshipBuff.json'
const marriageAge = 14   

function RelationshipInterface(id,level,buff) {
  this.id = id
  this.level = level
  this.buff = new Set()
  if (buff)
    this.buff.add(buff)
}

function MemoryInterface(idA,idB,idEvent) {
  this.A = idA
  this.B = idB
  this.event = idEvent
}

export function dailyIntercourse(Manager,A) {
  //解决昨日遗留事件
  A.relationships.forEach(re=>{
    re.buff.forEach(buff=>{
      if (buff[0] == "被") {
        const B = Manager.getCharacterById(re.id)
        ResolveBuff(A,B,re,buff)
      }
    })
  })

  //今日交际对象
  if (A.BIG_FIVE_Openness > Math.random()*10) {
    return 
  }
  let B, re
  if (A.buff.has['心有所属'] && Math.random()>0.9) { //优先找喜欢的人
    re = A.relationships.find( re=> {
      if (re.buff.has('暗恋中') || re.buff.has('追求中') ||re.buff.has('恋人')) {
        return re
      }
    })
  }
  if (A.relationships.length>0 && Math.random() > 0.9) {   //与熟人交际
    re = _.sample(A.relationships)
    B = Manager.getCharacterById(re.id)
  }
  else {   //与生人交际
    B = _.sample(Manager.GameWorld.society.characters)
    if (B.cId == A.cId) return //跳过今日交际
    const notAcquaintance = A.relationships.every(_re=>{
      if (_re.id != B.cId)
        return true
      else {
        re = _re
        return false
      }
    })
    if (notAcquaintance) {
      re = new RelationshipInterface(B.cId,0,"陌生人")
      A.relationships.push(re)
    }
  }

  const own = re.buff
  const allowEvents = EventsList.filter( e=>{
    if (!e.前置关系buff) return false
    const require = e.前置关系buff.split("，")
    const shouldnot = e.相斥全局buff
    //查找 arr1 与 arr2 是否有交集，且不冲突
    const result = require.filter(e=> (own.has(e) && !A.buff.has(shouldnot)))
    return result.length
  })
  allowEvents.forEach( e=>{
    let succeed = true, range
    const checkValueKeys = '对方颜值,外倾性,关系级别,本人年龄,对方年龄,随机度'.split(',')
    const values = [B.charm,A.BIG_FIVE_Extraversion,re.level,A.body.month/12,B.body.month/12,Math.random()]

    for (const index in checkValueKeys) {
      if (e[checkValueKeys[index]]) {
        range = e[checkValueKeys[index]].split(',')
        if (values[index]<range[0] || values[index]>range[1])
          succeed = false
      }
    }
    if (succeed) {
      if (e.关系变动)   re.level += Number(e.关系变动)
      if (e.A获得buff)  re.buff.add(e.A获得buff)
      if (e.A失去buff)  e.A失去buff.split('，').forEach(buff=>re.buff.delete(buff))
      if (e.A获得全局buff) A.buff.add(e.A获得全局buff)
      if (e.A失去全局buff) e.A失去全局buff.split('，').forEach(buff=>A.buff.delete(buff))
      if (e.B获得buff) {
        const reB = B.relationships.find(re=>re.id==A.cId)
        if (reB)  reB.buff.add(e.B获得buff)
        else B.relationships.push(new RelationshipInterface(A.cId,0,B.获得buff))
      }
      //存入记忆
      A.memory.push(new MemoryInterface(A.cId,B.cId,e.id))
    }  
  })

  //关系buff 为空的必然被遗忘，陌生人标签的概率遗忘
  A.relationships = A.relationships.filter(re=>{
    if (re.buff.size == 0)  return false
    else if (re.buff.has('陌生人') && Math.random()>0.5) return Math.random()>0.5
    else return true
  })
  A.relationships.sort((a,b)=>{
    return b.level-a.level
  })
}

export function resolveEvents(Manager, A) {
  for( const event of A.events ) {
    if( event.status == 'pending' && A.cId == event.B ) {
      const B = Manager.getCharacterById(event.A)
      Manager.addMemory(A,B,event.BType)
      const result = acceptMarriage(A,B)
      event.status = result.status
      if( result.status == "fulfilled" ) {
        Manager.addMemory(A,B,"接受求婚")
        getMarried(Manager,A,B)
      }
      else {
        Manager.addMemory(A,B,"拒绝求婚")
      }
    }
    else if ( event.status == 'resolve' && A.cId == event.A ) {
      
    }
    else if ( event.status == 'reject' && A.cId == event.A ) {
      const B = Manager.getCharacterById(event.B)
      const re = A.relationships.find( e => e.id == B.cId )
      if( re ) {
        re.level -= 5
      }
      Manager.addMemory(A,B,"求婚被拒")
      A.buff.add("不自信")
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
  const relationship = A.relationships.find(item=>item.id==B.cId)
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

export function giveBirth(Manager,character) {
  //此时无法怀孕的情况
  if (
    character.body.sex != '女' || !character.marriaged  //不满足怀孕条件
    || character.body.pregnent && character.body.pregnent_month < 10 //妊娠中
  ) {
    return
  }
  else if (character.body.pregnent && character.body.pregnent_month >= 10) {  //give birth
    //give birth
    const father = Manager.getCharacterById(character.spouse)
    const mother = character
    const child = Manager.giveBirth(mother,father)
    character.body.pregnent = false
    character.body.pregnent_month = 0
    character.body.pregnent_fetus = null
    //孩子随父姓
    child.surname = father.surname
    //绑定社会关系
    child.relationships.push(
      new RelationshipInterface(mother.cId,30,'母亲'),
      new RelationshipInterface(father.cId,30,'父亲')
    )
    //与其他人的两两关系
    mother.relationships.push(new RelationshipInterface(child.cId,50,'子女'))
    father.relationships.push(new RelationshipInterface(child.cId,50,'子女'))
    for (const cId of mother.children) {
      if (cId == child.cId) return

      const character = Manager.getCharacterById(cId)
      if (character.body.sex == '男') {
        child.relationships.push(new RelationshipInterface(cId,10,'哥哥'))
      } else {
        child.relationships.push(new RelationshipInterface(cId,10,'姐姐'))
      }
      
      if (child.body.sex == '男') {
        character.relationships.push(new RelationshipInterface(child.cId,10,'弟弟'))
      } else {
        character.relationships.push(new RelationshipInterface(child.cId,10,'妹妹'))
      }
    }

    //每生一个，生育欲望降低 2 
    character.fertility_desire *= 0.5
  }
  else if( Math.random() < character.fertility_desire/100) {  //want to be pregnent
    character.body.pregnent = true
    character.body.pregnent_fetus = {
      father: character.spouse
    }
  }
  else { //没怀上
    //temporary do nothing 
  }
}

function getMarried(Manager,characterA,characterB) {
  characterA.marriaged = true
  characterB.marriaged = true
  characterA.spouse = characterB.cId
  characterB.spouse = characterA.cId
  characterA.memory.unshift(`${Manager.getName(characterA)}接受了${Manager.getName(characterB)}的求婚`)
  characterB.memory.unshift(`${Manager.getName(characterB)}向${Manager.getName(characterA)}求婚被接受了`)
}

function ResolveBuff(A, B, re, buff) {
  const allowResults = EventsList.filter( e=>{
    if (e.前置关系buff && e.前置关系buff.indexOf(buff)!=-1) 
      return true
  })
  allowResults.forEach(e=>{
    let succeed = true, range = null
    const checkValueKeys = '对方颜值,外倾性,宜人性,关系级别,本人年龄,对方年龄,随机度'.split(',')
    const values = [B.charm,A.BIG_FIVE_Extraversion,A.BIG_FIVE_Agreeableness,re.level,A.body.month/12,B.body.month/12,Math.random()]

    for (const index in checkValueKeys) {
      if (e[checkValueKeys[index]]) {
        range = e[checkValueKeys[index]].split(',')
        if (values[index]<range[0] || values[index]>range[1])
          succeed = false
      }
    }
    if (succeed) {
      if (e.关系变动)   re.level += Number(e.关系变动)
      if (e.A获得buff)  re.buff.add(e.A获得buff)
      if (e.A失去buff)  e.A失去buff.split(',').forEach(buff=>re.buff.delete(buff))
      if (e.A获得全局buff) A.buff.add(e.A获得全局buff)
      if (e.A失去全局buff) e.A失去全局buff.split(',').forEach(buff=>A.buff.delete(buff))
      if (e.B获得buff) {
        const reB = B.relationships.find(re=>re.id==A.cId)
        if (reB)  reB.buff.add(e.B获得buff)
        else B.relationships.push(new RelationshipInterface(A.cId,0,B.获得buff))
      }
      //存入记忆
      A.memory.push(new MemoryInterface(A.cId,B.cId,e.id))
    }  
  })
}