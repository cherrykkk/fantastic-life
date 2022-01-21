
export function save( world ) {
  const saveFile = JSON.stringify(world)
  console.log( saveFile )
  return saveFile
}