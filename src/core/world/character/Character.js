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
  
  body: {
    month: 0,
    sex: null,
    
    healthy: 100,
    consititution: 0,
    intelligence: 0,
    appearance: { //顺序牵涉图层上下关系，不可乱动
      "back-hair": 0,
      "neck": 0,
      face: 0,
      eyebrow: 0,
      eye: 0,
      ear: 0,
      mouth: 0,
      "front-hair": 0,
    },

    walkAble: false,
  
    pregnent: false,
    pregnent_month: 0,
    pregnent_fetus: null,
    mother: null, //生物学母亲
    father: null //生物学父亲
  },
  relationships: [],
  events: [],
  children: [],
  memory: [],

  estate: [], //房产

  adult_living: null,

  buff: [],

  skills: {
    herbology: 0,
    medicine: 0,
    flySword: 0,
    management: 0,
    farm: 0
  }, //技能，第一个技能是中草药学

  //大五和能力参数共同影响npc决策
  BIG_FIVE_Openness: 5, //开放性
  BIG_FIVE_Conscientiousness: 5, //尽责性
  BIG_FIVE_Extraversion: 5, //外倾性
  BIG_FIVE_Agreeableness: 5, //宜人性
  BIG_FIVE_Neuroticism: 5 //神经质
}