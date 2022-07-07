/** 生理状态 */

export default {
  init(that) {
    that.appearance = {}
    that.charm = Math.round(Math.random()*10) //魅力值
    that.获得长相()
    that.sex = Math.random() > 0.5 ? '男' : '女'
    that.脂肪储量 = 15 // 10+ 是标准身材，20+是胖子，10- 是超级瘦弱
  },
  mixin: {
    获得长相(mother,father) {
      //长相
      for (const key in availableAppearance) {
        let 可获得基因 = []
        if (father && mother) {
          可获得基因 = [father.appearance[key],mother.appearance[key]]
        } else {
          可获得基因 = availableAppearance[key]
        }
        this.appearance[key] = _.sample(可获得基因)
      }
  
      if (this.sex == '男') {
        this.appearance.前发 = _.sample([...availableAppearance.前发, ...男性专属外观.前发])
        this.appearance.后发 = _.sample([...availableAppearance.后发, ...男性专属外观.后发])
      } else {
        this.appearance.前发 = _.sample([...availableAppearance.前发, ...女性专属外观.前发])
        this.appearance.后发 = _.sample([...availableAppearance.后发, ...女性专属外观.后发])
      }
      this.appearance.发色 += 55
      this.appearance.肤色 += 55
    },

    die() {
      this.living = false
      this.World.characters = this.World.characters.filter(e => e.living)
    }
  }
}

const availableAppearance = {
  前发: [1,2,3,4,5,6,7,10,11],
  后发: [1,2,6,7,8,9,12],
  脸型: [2,3,4,5],
  眉毛: [1,2,3,4,5,6,7],
  眼睛: [2,3,5,6,7,8],
  耳朵: [2,3],
  嘴: [1,2,3,4,5,6],
  脖子: [1,2,3],
  肤色: ['#feeecd','#fff2e2','#c3816b','#fffdcd','#fff2e9'],
  发色: ['#000000','#111111','#222222','#333333','#444444','#555555','#666666','#777777','#888888','#999999','#353434','#4c4848','#390101','#604901','#886800','#655423']
}

const 男性专属外观 = {
  前发: [8],
  后发: [4],
  脸型: [],
  眉毛: [],
  眼睛: [],
  耳朵: [],
  嘴: [],
  脖子: []
}
const 女性专属外观 = {
  前发: [9],
  后发: [3,5,10,11],
  脸型: [],
  眉毛: [],
  眼睛: [],
  耳朵: [],
  嘴: [],
  脖子: []
}
