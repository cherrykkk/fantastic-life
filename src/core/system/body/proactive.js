export {tryExercise}

function tryExercise(body) {
  if( Math.random()>0.96 ){
    if(body.consititution<10){
      body.addEvent("体质提高了！") 
      body.consititution++
    }
    else  
      body.addEvent("本月大力锻炼，你感觉很累")
  }
  else{
    body.addEvent("本月大力锻炼，你感觉很累")
  }
}
