import Family from './Family'
import Life from './Life'
import Body from './system/body/Body.js'
import Study from './system/Study'
import Society from './Society.js'
import Intercourse from './system/intercourse/Intercourse'
import eventsLiberary from '@/core/EventsLiberary.js'
export default initYourLife
/*
算一个自动创建人生的脚本？
*/
function initYourLife(initScore){
  let initBodyConfig = {
    consititutionScore: initScore.body,
    apperanceScore: initScore.apperance,
    intelligenceScore: initScore.intelligence,
    age: 0
  }

  let theSociety = new Society()
  let yourFamily = new Family( initScore.family )
  let yourLife = new Life()
  let yourBody = new Body(initBodyConfig)
  let yourIntercourse = new Intercourse()
  let yourStudy =  new Study()
  yourLife.society = theSociety
  yourLife.family = yourFamily
  yourLife.body = yourBody
  yourLife.intercourse = yourIntercourse
  yourLife.study = yourStudy

  yourFamily.yourLife = yourLife
  yourIntercourse.yourLife = yourLife
  theSociety.yourLife = yourLife

  eventsLiberary.init()
  console.log(eventsLiberary)
  return {
    yourLife,
    eventsLiberary
  }
}