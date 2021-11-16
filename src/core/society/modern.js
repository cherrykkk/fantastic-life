
export {schoolList}
export {npcDeathReason}
export {DiseaseLiberary}


let events = [
  "你出生了",
  "你学会了走路"
]

let description = [
  "心闷气短，非常难受",
  "你感觉有些不舒服，不过很快就恢复了。",
  "你感觉有些不舒服，难受了很久才感觉好了一些",
  "你感觉有些不舒服，不过很快就忘了这回事"
]

let DiseaseLiberary_old = {
  disease: ["哮喘","心脏病","鼻炎","感冒","发烧","冠心病","心绞痛","心肌梗塞","中暑","急性肠道疾病"],
  unHealthy: ["近视","过敏"],
  appearanceFlaw: ["唇裂"],
  congenital: [
    {
      probability: 0.0029,
      name: "先天性心脏病",
      curable: true,
      cost: 5*10000
    },{
      probability: 0.0015,
      name: "21三体综合征",
      curable: false
    },{
      probability: 0.001,
      name: "唇裂",
      curable: false,
      cost: 4*10000
    }
  ],
  acquirable: [
    {
      regularExpression: "老年病",
      probability: 0.001,
      name: "肝衰竭",
    },{      
      probability: 0.001,
      name: "肾衰竭",
    },{
      probability: 0.001,
      name: "肿瘤",
    },{
      probability: 0.001,
      name: "高血压",
    },{
      probability: 0.001,
      name: "冠心病",
    },{
      probability: 0.001,
      name: "慢性支气管炎",
    },{
      probability: 0.001,
      name: "肺炎",
    },{
      probability: 0.001,
      name: "胆囊病",
    },{
      probability: 0.001,
      name: "股骨骨折",
    },{
      probability: 0.001,
      name: "糖尿病",
    },{
      probability: 0.001,
      name: "脑出血",
    },{
      probability: 0.001,
      name: "肺癌",
    },{
      probability: 0.001,
      name: "胃癌",
    },{
      probability: 0.001,
      name: "急性心肌梗塞",
    }
  ]
}

/*疾病系统：
  出现症状：忽略/搜集资料/去医院
  医院诊断：无结果/错误结果/正确结果
  治疗方式: 自然自愈/调养自愈/服药/手术
  后续发展：体质恢复/体质下降
*/
//前列腺肥大
let DiseaseLiberary = [
  {
    name: "流感",
    symptom: "鼻塞，发烧",
    etiologe: "病毒",
    regularExpression: "普适",
    healingMethods: "自愈 ",
    probability: 0.0029,
    curable: true,
    cost: 0
  },{
    name: "先天性心脏病",
    symptom: "呼吸困难",
    regularExpression: "先天",
    healingMethods: "手术",
    probability: 0.0029,
    selfHealing: false,
    cost: 5*10000
  },{
    name: "21-三体综合征",
    symptom: "面容异状",
    regularExpression: "先天",
    healingMethods: "",
    probability: 0.0015,
  },{
    name: "唇裂",
    symptom: "兔唇",
    regularExpression: "先天",
    healingMethods: "手术",
    probability: 0.001,
    cost: 4*10000
  },{
    name: "肝衰竭",
    symptom: "虚弱、乏力、体重下降",
    regularExpression: "老年病",
    probability: 0.001,
  },{
    name: "高血压",
    symptom: "头晕，脑出血",
    regularExpression: "老年病 普适",
    probability: 0.001,
  },{
    name: "冠心病",
    symptom: "胸痛、胸闷，咽部紧缩感",
    regularExpression: "老年病 普适",
    probability: 0.001,
  },{
    name: "胆囊炎",
    symptom: "持续性右上腹钝痛",
    regularExpression: "老年病 普适",
    probability: 0.001,
  },{
    regularExpression: "老年病 普适",
    probability: 0.001,
    name: "糖尿病",
    symptom: "体重减轻"
  },{
    regularExpression: "老年病 普适",
    probability: 0.001,
    name: "肺癌",
    symptom: "咳嗽，咯血，胸痛"
  }
]

let npcDeathReason = [
  "死于车祸","死于疾病","死于终老","死于命案"
]

let schoolList = [
  {
    selectror: "kindergarten",
    schoolName: "公立幼儿园"
  },{
    selectror: "kindergarten",
    schoolName: "私立幼儿园"
  },{
    selector: "primary school",
    schoolName: "第一小学"
  },{
    selector: "junior school",
    schoolName: "第二中学(初中)"
  },{
    selector: "senior school",
    schoolName: "第三中学(高中)"
  },{
    selector: "senior school",
    schoolName: "衡水中学(高中)"
  },{
    selector: "senior school",
    schoolName: "师大附中(高中)"
  },{
    selector: "hight school",
    schoolName: "本科大学"
  },{
    selector: "hight school",
    schoolName: "专科大学"
  }
]