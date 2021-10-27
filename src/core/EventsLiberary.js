
function EventsLiberary(){
  this.liberary = []
  this.classification = {}
  this.addEvent = (message,type,month) => {
    let event = new Event(message,type,month)
    this.liberary.push(event)
    if(!this.classification[type]){
      this.classification[type] = []
    }
    this.classification[type].push(event)
  }
  this.init = ()=>{
    this.liberary = []
    this.classification = {}
  }
}

function Event(message,type,month){
  this.message = message
  this.type = type
  this.occurMonth = month
}

let eventsLiberary = new EventsLiberary()
export default eventsLiberary
