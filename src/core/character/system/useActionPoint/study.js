export { tryStudy }

function tryStudy( life ) {
  const { study } = life
  if( Math.random() > 0.5 ){
    if( study.knowledge < 100 ){
      study.knowledge++
    }
  }
  study.addEvent("努力学习")
}