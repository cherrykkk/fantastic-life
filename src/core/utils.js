function randCheck(level){
  if(Math.random()>level)
    return true
  else return false
}

function getName(sex){
  return fetch(`../api/getRandom_name.php?sex=${sex}`).then( res=> res.json())
}

function getArrayRandom(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}

export {getName}
export {randCheck}
export {getArrayRandom}