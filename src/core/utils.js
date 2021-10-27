function randCheck(level){
  if(Math.random()>level)
    return true
  else return false
}

function getName(sex){
  return fetch(`../api/getRandom_name.php?sex=${sex}`).then( res=> res.json())
}

export {getName}
export {randCheck}
