
function lifeCycleBorn( life ) {
  const { body,family,state } = life
  body.born()
  life.intercourse =  newIntercourse(family)
  addMember(family,"child",life)
  getName( body.sex ).then( data =>{
    life.surname = family.familyMembers.host.surname
    life.givenName = data.givenName
    console.log(life)
  })
  state.born = true
  state.living = true
}

function lifeCycleGrow(life) {
  const { body,family,intercourse,study,society } = life
  body.stepMonth()
  study.stepMonth()
  society.stepMonth()
  life.doAction()

  //行动力，取决于体质
  life.actionPoint = Math.floor((body.state.consititution-2)/5)+1

  study.test(body.intelligence)

  if( randCheck(0.90) && randCheck((10-body.appearance)/10))
    intercourse.meetNew()

  return body.healthy > 0
}
