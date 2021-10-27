import eventsLiberary from "../EventsLiberary.js"
import { getName } from '../utils.js'

function Intercourse(){
  this.relationships = []

  this.meetNew = ()=>{
    getName().then( data =>{
      let name = data.surname+data.givenName
      let relationship = new Relationship(name,"朋友")
      this.relationships.push(relationship)
      this.addEvent(`认识了新朋友，叫做${name}`)
    })
  }
  this.familyInit = (family)=>{
    if(family.state.mother){
      this.addEvent("记住了母亲")
      let relationship = new Relationship("母亲","直系",5)
      this.relationships.push(relationship)
    }
    else 
      this.addEvent("你自小失去了母亲")
    if(family.state.father){
      this.addEvent("记住了父亲")
      let relationship = new Relationship("父亲","直系",5)
      this.relationships.push(relationship)
    }
    else       
      this.addEvent("你自小失去了父亲")
  }
  this.addEvent = (message)=>{
    eventsLiberary.addEvent(message,"intercourse")
  }
}

function Relationship(_target,_type,_level = 1){
  this.target = _target
  this.type = _type
  this.level = _level
}

let relationshipType = [
  "直系","旁系","同学","同事","朋友","恋人","夫妻"
]

export default Intercourse