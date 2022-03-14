import EventsList from '../../DLC/relationshipBuff.json'
const marriageAge = 14   

function RelationshipInterface(id,level,buff) {
  this.id = id
  this.level = level
  this.buff = new Set()
  this.buff.add(buff)
}


export function intercourse(Manager,A) {
  //外向性高的社交频率更高
  if( A.BIG_FIVE_Openness > Math.random()*10 ) {
    return 
  }
  //认识新朋友（不排除偶遇熟人的可能）
  const B = _.sample(Manager.GameWorld.society.characters)

  //辨认是否是熟人（以及是否是自己，理解为独处）
  const result = A.relationships.find( item => {
    return item.id == B.cId
  })
  if( result ) { // 如果是熟人
    Manager.addMemory(A,B,"偶遇熟人")
    result.level ++ 
  }
  else if( A.cId == B.cId ) { //如果是自己
    // temporarily do nothing
  }
  else {   //如果不是熟人
    A.relationships.push(new RelationshipInterface(B.cId,5,"朋友"))
    Manager.addMemory(A,B,"一见如故")
    
    B.relationships.push(new RelationshipInterface(A.cId,5,"朋友"))
    Manager.addMemory(B,A,"一见如故")
  }

  //每月概率性与人关系产生变动, 并概率遗忘关系为 0 的人, 并对现存关系排序
  for( const index in A.relationships ) {
    const relationship = A.relationships[index]
    // 关系为 0 的可能被遗忘
    if( relationship.level == 0 && Math.random() > 0.5 ) {
      A.relationships.splice(index,1)
      break;
    } 
    // 
    if( Math.random() > 0.5 ) { //关系变动
      relationship.level += Math.random()>0.5 ? 1 : -1
    }
    // 为了避免关系刚发生变动就被遗忘的情况，所以 遗忘 在 变动 之前
  }
  if( A.relationships.length>0 && Math.random() > 0.5 ) {
    const forgetRelationship = _.sample(A.relationships)
    forgetRelationship.level --
  }
  A.relationships.sort((a,b)=>{
    return b.level-a.level
  })

  //婚姻需求
  if (A.body.month > 12*marriageAge && !A.marriaged && A.buff.indexOf("不自信") < 0) {
    //寻找目标：好感等级高的异性，effect:对好感度的要求随年龄变大而降低
    const effect = (A.body.month - 12*marriageAge)/4
    for (const re of A.relationships) {
      if (re.level > 10-effect) {
        const B = Manager.getCharacterById(re.id)
        if(B.body.sex != A.body.sex) {       //异性则求婚
          Manager.addMemory(A,B,'求婚')
          const event = {
            AType: "求婚",
            BType: "被求婚",
            A: A.cId,
            B: B.cId,
            status: 'pending',
            startTime: JSON.stringify(Manager.GameWorld.calendar)
          }
          A.events.push(event)
          B.events.push(event)
          break; 
        }
      }
    }
  }

  //概率性消除 buff
  for (const i in A.buff) {
    if (Math.random()>0.8) {
      A.buff.splice(i,1)
    }
  }
}

export function dailyIntercourse(Manager,A) {
  //外向性高的社交频率更高
  if( A.BIG_FIVE_Openness > Math.random()*10 ) {
    return 
  }
  const B = _.sample(Manager.GameWorld.society.characters)
  let re = A.relationships.find( item => {
    return item.id == B.cId
  })
  if (!re) {
    re = new RelationshipInterface(B.cId,0,"陌生人")
    A.relationships.push(re)
  }

  const allowEvents = EventsList.filter( e=>{
    const arr1 = re.buff, arr2 = e.前置要求?e.前置要求.split("，"):[]
    //查找 arr1 与 arr2 是否有交集
    const result = arr2.filter( e=>arr1.has(e))
    return result.length
  })
  const e = _.sample(allowEvents)
  if (e) {
    let succeed = true, range
    const checkValueKeys = '对方颜值,本人外向度,关系级别,本人年龄,随机度'.split(',')
    const values = [B.charm,A.BIG_FIVE_Openness,re.level,A.body.month/12,Math.random()]

    for (const index in checkValueKeys) {
      if (e[checkValueKeys[index]]) {
        range = e[checkValueKeys[index]].split(',')
        if (values[index]<range[0] || values[index]>range[1])
          succeed = false
      }
    }
  
    if (succeed) {
      if (e.A获得效果)
        re.buff.add(e.A获得效果)
      const lostBuff = e.A失去效果 ? e.A失去效果.split(',') : []
      lostBuff.forEach( e=>re.buff.delete(e))
    }  
  }
  //关系buff 为空的必然被遗忘
  for (const index in A.relationships) {
    if (A.relationships[index].buff.size == 0) {
      A.relationships.splice(index,1)
      break;
    } 
  }
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
      A.buff.push("不自信")
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
  }
  else if( Math.random() > 0.8 ) {  //want to be pregnent
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