export { tryIntercourse }

function tryIntercourse(life) {
  const { intercourse } = life
  if( Math.random()>0.95 )
    intercourse.meetNew()
}