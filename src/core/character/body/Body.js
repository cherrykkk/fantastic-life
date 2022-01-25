
export function Body() {
  Object.assign(this,bodyArgs)
  //Object.assign(this,JSON.parse(JSON.stringify(bodyArgs)))
}

const bodyArgs = {
  survived_month: 0,
  sex: null,
  healthy: 100,
  consititution: 0,
  intelligence: 0,
  appearance: 0,
  walkAble: false,
  pregnent: false,
  pregnent_month: 0,
  motheer: null,
  father: null
}