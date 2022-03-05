export { growthTalent }

function growthTalent(body) {
  talents.forEach( tryActivateTalent )

  function tryActivateTalent(talent){
    if( talent.actived ){
      return 
    }
    if( talent.monthRange[0] < body.month && Math.random() < talent.chance ){
      talent.actived = true
      body.addEvent("你学会了"+talent.name)
    }
    else if( talent.monthRange[1] < body.month){
      talent.actived = true
      body.addEvent("你学会了"+talent.name)
    }
  }
}

let talents = [
  {
    name: "走路",
    monthRange: [6,36], //上限，下限
    chance: 0.08  
  },{
    name: "说话",
    monthRange: [3,12],
    chance: 0.2
  }
]
