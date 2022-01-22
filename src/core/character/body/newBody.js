import { Body } from './Body.js'
import bodyRandom from '@/DLC/generalWorld/bodyRandom.json'
export function newBody() {
  const body = new Body() 
  loadRandomSetting( bodyRandom, body )
  return body
}

function loadRandomSetting( randomSetting, tagetObject ) {
  for( const property in randomSetting) {
    if( !randomSetting[property].random_type ) {
      tagetObject[property] = randomSetting[property]
    }
    else if ( randomSetting[property].random_type == "integer" ) {
      const min = randomSetting[property].range[0] 
      const max = randomSetting[property].range[1] 
      tagetObject[property] = Math.floor( min + Math.random()*(max-min) )
    }
  }
}