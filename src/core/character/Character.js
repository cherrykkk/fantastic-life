/*
角色信息，pc与npc通用
*/
export function Character(){
  Object.assign(this,JSON.parse(JSON.stringify(characterArgs)))
}

const characterArgs = {
  surname: null,
  givenName: null,
  cId: null,
  marriaged: false,
  spouse: null,
  
  body: null,
  relationships: [],
  familyId: null,
  events: [],
  children: [],
  memory: [],

  buff: [],

  skills: {
    herbology: 0,
    medicine: 0,
    flySword: 0
  }, //技能，第一个技能是中草药学

  //大五和能力参数共同影响npc决策
  BIG_FIVE_Openness: 5, //开放性
  BIG_FIVE_Conscientiousness: 5, //尽责性
  BIG_FIVE_Extraversion: 5, //外倾性
  BIG_FIVE_Agreeableness: 5, //宜人性
  BIG_FIVE_Neuroticism: 5 //神经质
}