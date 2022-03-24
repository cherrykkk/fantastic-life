import * as XLSX from 'xlsx'
import { RelationshipInterface } from '../Interface'

class Event {
  availableList = null
  spiritualState = null
  loaded = null

  constructor() {
    this.loaded = fetch('幻想生活.xlsx')
    .then(result=>result.arrayBuffer())
    .then(res=>{
      const workbook = XLSX.read(new Uint8Array(res), {
        type: 'array'
      });
      this.availableList = XLSX.utils.sheet_to_json(workbook.Sheets['可触发事件'])
      //this.spiritualState = XLSX.utils.sheet_to_json(workbook.Sheets['状态境界'])
    })
  }


  解决被动(Manager,A,B,re) {
    re.buff.forEach(buff=>{
      this.availableList.find(e=>{
        if (e.触发前置 != buff) return false
        if (this.check(A,B,re,e)) {
        
          re.buff.delete(buff)
          if (e.熟悉变动)   re.熟悉 += Number(e.熟悉变动)
          if (e.纯洁变动)   re.纯洁 += Number(e.纯洁变动)
          if (e.获得buff != '程序处理')  re.buff.add(e.获得buff)
          else {
            //目前只有恋人，所以直接恋人的处理流程
            A.networking.lover = B.uid
            A.relationships.forEach(re=>{
              if (re.uid != B.uid)
                re.纯洁 = 0
            })
          }
          if (e.B获得buff) {
            const reB = B.relationships.find(re=>re.uid==A.uid)
            if (reB)  reB.buff.add(e.B获得buff)
            else B.relationships.push(new RelationshipInterface(A.uid,0,0,B.获得buff))
          }
  
          constraint(re)
          //存入记忆
          Manager.addMemory(A,B,e)
  
          return true
        }
      })
      if (re.buff.has(buff) && Math.random()>0.9) //如果一个都没匹配到，需要有一个消除的途径
      re.buff.delete(buff)
    })
  }

  触发当日随机(Manager,A,B,re) {
    this.availableList.forEach(e=>{
      if (Math.random() > e.概率) return
      if (e.触发前置) return
      if (!e.描述) return

      if (this.check(A,B,re,e)) {
        if (e.熟悉变动)   re.熟悉 += Number(e.熟悉变动)
        if (e.纯洁变动)   re.纯洁 += Number(e.纯洁变动)
        if (e.获得buff)  re.buff.add(e.获得buff)
        if (e.失去buff)  e.失去buff.split('，').forEach(buff=>re.buff.delete(buff))
        if (e.B获得buff) {
          const reB = B.relationships.find(re=>re.uid==A.uid)
          if (reB)  reB.buff.add(e.B获得buff)
          else B.relationships.push(new RelationshipInterface(A.uid,0,0,B.获得buff))
        }
        constraint(re)
        //存入记忆
        Manager.addMemory(A,B,e)
      }  
    })
  }

  check(A,B,re,e) {
    let succeed = true, range

    //验证范围
    const checkTypeOne = {
      需要熟悉: re.熟悉,
      需要纯洁: re.纯洁,
      外倾性: A.BIG_FIVE_Extraversion,
      宜人性: A.BIG_FIVE_Agreeableness,
      神经质: A.BIG_FIVE_Neuroticism,
      年龄: A.body.month/12,
      B颜值: B.charm,
      B年龄: B.body.month/12,
    }
    
    for (const key in checkTypeOne) {
      const value = checkTypeOne[key]
      if (e[key]) {
        range = e[key].split('~')
        if (value < range[0] || value > range[1])
          succeed = false
      }
    }

    //性别
    if (e.性别 && e.性别 != A.body.sex) succeed = false
    if (e.B性别=='异性' && A.body.sex == B.body.sex) succeed = false
    else if (e.B性别 && e.B性别 != B.body.sex) succeed = false
    
    return succeed
  }

  checkSpiritualState(human) {
    const e = this.spiritualState.find(e=>{
      if (human.spiritualPower >= e.灵力 && human.spiritualState == e.当前境界) {
        return true
      }
    })
    return e
  }
}

function constraint(re) {
  if (re.熟悉 > 100) re.熟悉 = 100
  if (re.纯洁 < -100) re.纯洁 = -100
  if (re.熟悉 == 0) re.熟悉 = 1
}


export default new Event()