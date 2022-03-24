import EVENT from '../world/Events.js'
import { RelationshipInterface } from '../Interface'

export function dailyIntercourse(Manager,A) {
  // A.relationships.forEach(re=>{
  //   const B = Manager.getCharacterById(re.uid)
  //   EVENT.解决被动(Manager,A,B,re)
  // })

  //今日交际对象
  if (A.BIG_FIVE_Openness < Math.random()*10) {
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
    B = Manager.getCharacterById(re.uid)
  }
  else {   //与生人交际
    B = _.sample(Manager.GameWorld.society.characters)
    if (B.uid == A.uid) return //跳过今日交际
    const notAcquaintance = A.relationships.every(_re=>{
      if (_re.uid != B.uid)
        return true
      else {
        re = _re
        return false
      }
    })
    if (notAcquaintance) {
      re = new RelationshipInterface(B.uid,0,0)
      A.relationships.push(re)
    }
  }
  EVENT.触发当日随机(Manager,A,B,re)

  //熟悉值为 0 的概率遗忘
  A.relationships = A.relationships.filter(re=>{
    if (re.熟悉 == 0 && Math.random()>0.5) return Math.random()>0.5
    else return true
  })
  A.relationships.sort((a,b)=>{
    return b.level-a.level
  })
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
      new RelationshipInterface(mother.uid,30,100,'母亲'), //家人的纯洁度极高
      new RelationshipInterface(father.uid,30,100,'父亲')
    )
    //与其他人的两两关系
    mother.relationships.push(new RelationshipInterface(child.uid,50,100,'子女'))
    father.relationships.push(new RelationshipInterface(child.uid,50,100,'子女'))
    for (const uid of mother.children) {
      if (uid == child.uid) return

      const character = Manager.getCharacterById(uid)
      if (character.body.sex == '男') {
        child.relationships.push(new RelationshipInterface(uid,10,100,'哥哥'))
      } else {
        child.relationships.push(new RelationshipInterface(uid,10,100,'姐姐'))
      }
      
      if (child.body.sex == '男') {
        character.relationships.push(new RelationshipInterface(child.uid,10,100,'弟弟'))
      } else {
        character.relationships.push(new RelationshipInterface(child.uid,10,100,'妹妹'))
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

export function upDateActive (Manager, A) {
  if (A.body.month < 14*12) {
    A.actions.push('玩耍')
  }

}