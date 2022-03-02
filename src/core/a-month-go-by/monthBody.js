export function monthBody(character) {
  const { body } = character
  body.month ++

  giveBirth(body)

}


function giveBirth (body) {
  if ( body.pregnent && body.pregnent_month < 10 ) { //妊娠中
    body.pregnent_month ++
  }
}