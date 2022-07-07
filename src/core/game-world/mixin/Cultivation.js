
export default class Cultivation {
  金 
  木
  水 
  火
  土
  灵根
  sect
  灵力 = 0
  境界 = '凡人'

  constructor() {
    //灵根
    '金 木 水 火 土'.split(' ').forEach(e=>{
      this[e] = Math.floor(Math.random()*10)
    })
  }

  加入宗门(sect) {
    this.sect = sect
    this.专职 = '修士'
    this.调整需求('追求仙缘',-50)
    this.addTemplateMemory('仙途-通过检测加入门派',null,{A:this, SECT:sect})
  }
  
  试图突破境界() {
    const 瓶颈 = {
      凡人: 100,
      练气一阶: 200,
      练气二阶: 300,
      练气三阶: 400,
      练气四阶: 500,
      练气五阶: 600,
      练气六阶: 700,
      练气七阶: 800,
      练气八阶: 900,
      练气九阶: 1000,
      筑基初期: 3000,
      筑基中期: 6000,
      筑基后期: 10000,
      结丹前期: 30000,
      结丹中期: 60000,
      结丹后期: 100000,
    }

    if ( this.灵力 > 瓶颈[this.境界] ) {
      const i = Object.keys(瓶颈).indexOf(this.境界)
      this.境界 = Object.keys(瓶颈)[i+1]

      this.addTemplateMemory('仙途-突破境界',{A:this,D1:this.境界})
    }
  }
  
  完成宗门任务() {
  
  }
  
  获得宗门资源() {
  
  }
  
  拜师() {
  
  }
  
  参加外门大比() {
  
  }
  
  升级为内门弟子() {
  
  }
  
  被尊为宗门长老() {
  
  }
  
  收徒() {
  
  }
  
  猎杀妖兽() {
  
  }
}