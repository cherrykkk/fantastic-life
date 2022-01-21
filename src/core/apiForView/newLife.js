import { newFamily } from '../system/family/newFamily'
import Life from '../Life'
import Body from '../system/body/Body.js'
import Study from '../system/Study'
import Society from '../Society.js'
import eventsLiberary from '@/core/EventsLiberary.js'

export function newLife(initScore){
  let initBodyConfig = {
    consititutionScore: initScore.body,
    apperanceScore: initScore.apperance,
    intelligenceScore: initScore.intelligence,
    age: 0
  }

  let theSociety = new Society()
  let yourFamily = newFamily()
  let yourLife = new Life()
  let yourBody = new Body(initBodyConfig)
  let yourStudy =  new Study()
  yourLife.society = theSociety
  yourLife.family = yourFamily
  yourLife.body = yourBody
  yourLife.study = yourStudy

  yourFamily.yourLife = yourLife
  theSociety.yourLife = yourLife

  eventsLiberary.init()
  yourLife.eventsLiberary = eventsLiberary

  yourLife.lifeCycle.born(yourLife)


  return yourLife
}