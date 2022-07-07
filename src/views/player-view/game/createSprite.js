import * as PIXI from 'pixi.js'

export function createPerson(x,y) {
  const frontTextures = convertStringToTextures('朝下1,朝下2,朝下3')
  const backTextures = convertStringToTextures('朝上1,朝上2,朝上3')
  const leftTextures = convertStringToTextures('朝左1,朝左2,朝左3')
  const rightTextures = convertStringToTextures('朝右1,朝右2,朝右3')
  const aniSprite = new PIXI.AnimatedSprite(frontTextures)
  aniSprite.x = x
  aniSprite.y = y
  aniSprite.anchor.set(0.5)
  aniSprite.animationSpeed = 0.1
  setTimeout(()=>aniSprite.play(),3000)
  aniSprite.move = (vx,vy)=>{
    if (Math.abs(vy) > Math.abs(vx) && vy > 0 && aniSprite.textures!=frontTextures) { 
      aniSprite.textures = frontTextures
    } else if (Math.abs(vy) > Math.abs(vx) && vy < 0 && aniSprite.textures!=backTextures){
      aniSprite.textures = backTextures
    } else if (Math.abs(vy) < Math.abs(vx) && vx < 0 && aniSprite.textures!=leftTextures){
      aniSprite.textures = leftTextures
    } else if (Math.abs(vy) < Math.abs(vx) && vx > 0 && aniSprite.textures!=rightTextures){
      aniSprite.textures = rightTextures
    } else if (vx !=0 && vy != 0) {
      aniSprite.play()
      aniSprite.x += vx
      aniSprite.y += vy
      aniSprite.zIndex = aniSprite.y
      aniSprite.animationSpeed = (Math.abs(vy)+Math.abs(vx))/30
    } else {
      aniSprite.gotoAndStop(0)
    }
  }

  const weapon = createBow()
  aniSprite.addChild(weapon)

  aniSprite.attackMode = false
  aniSprite.setAttackMode = ()=>{
    weapon.alpha = 1
  }
  aniSprite.setWalkMode = ()=>{
    weapon.alpha = 0
  }

  return aniSprite
}

export function createSword(x,y) {
  const sword = new PIXI.Sprite(PIXI.Texture.from('sword'))
  sword.zIndex = 3000
  sword.x = x
  sword.y = y
  sword.width = 200
  sword.height = 200
  sword.anchor.set(0.5)
  sword.move = (vx,vy)=>{
    sword.x += vx
    sword.y += vy
    sword.rotation = Math.atan2(vy , vx)
    sword.zIndex = 2000
  }
  return sword
}

function createBow() {
  const weapon = new PIXI.Sprite(PIXI.Texture.from('弓'))
  weapon.width = 100
  weapon.height = 100
  weapon.alpha = 0
  weapon.anchor.set(0,0.5)
  const bowstring = new PIXI.Sprite(PIXI.Texture.from('弦'))
  bowstring.width = 10
  // bowstring.height = 30
  bowstring.anchor.set(0.9,0.5)
  weapon.addChild(bowstring)

  let accumulate = 0 //弓箭的蓄力


  let arrow

  weapon.use = (vx,vy)=>{
    if (vx==0 && vy==0) {
      if (accumulate) { //发射
        //moveSpriteToGrandParent(arrow)
        arrow.flying(accumulate)
      }
      accumulate = 0
      if (weapon.width==100) {
        weapon.width = 30
        weapon.height = 30
      }
    }
    else if (accumulate==0 && Math.abs(vx) < 50 && Math.abs(vy) < 50) {
      accumulate = 1
      arrow = createArrow()
      weapon.addChild(arrow)
      if (weapon.width==30) {
        weapon.width = 100
        weapon.height = 100
      }
    }
    else if (accumulate >= 0.1 && accumulate < 10 && (Math.abs(vx) > 30 || Math.abs(vy) > 30)) {
      weapon.rotation = Math.atan2(vy , vx) + Math.PI
      accumulate += 0.5
      arrow.x -= 1
      arrow.vx = vx
      arrow.vy = vy
    } else if (Math.abs(vx) > 0.05 && Math.abs(vy) > 0.05) {
      weapon.rotation = Math.atan2(vy , vx) + Math.PI
    } else {
      accumulate = 0
    }
    bowstring.width = accumulate*10
  }
  return weapon  
}

function createArrow() {
  const arrow = new PIXI.Sprite(PIXI.Texture.from('箭'))
  arrow.anchor.set(0,0.5)
  arrow.width = 140
  arrow.x = -40

  arrow.flying = (accumulate)=>{
    const track = new PIXI.Container()
    track.rotation = arrow.parent.rotation
    track.x = arrow.parent.x + arrow.parent.parent.x
    track.y = arrow.parent.y + arrow.parent.parent.y
    arrow.parent.parent.parent.addChild(track)
    track.addChild(arrow)
    track.zIndex = 2000

    const id = setInterval(()=>{
      arrow.x += accumulate
      accumulate -= 0.1
      if (accumulate<=0) {
        clearInterval(id)
        track.parent.removeChild(track)
      }
    },30)
  }

  return arrow
}


export function createManyHare(mapContainer) {
  let num = Math.floor(20+Math.floor(Math.random()*80))
  while (num > 0) {
    num--
    const hare = createHareAniSprite(Math.random()*1900,Math.random()*1900)
    mapContainer.addChild(hare)
  }
}

export function createManyGrass(mapContainer) {
  let num = Math.floor(Math.random()*100)
  const allGrass = []
  while (num>0) {
    const grass = createGrassAniSprite(Math.random()*1900,Math.random()*1900)
    allGrass.push(grass)
    mapContainer.addChild(grass)
    num--
  }
  const fun1 = ()=> setTimeout(()=>{
    allGrass.forEach(grass=>grass.playAll())
    fun2()
  },Math.random()*10000)
  const fun2 = ()=> setTimeout(()=>{
    allGrass.forEach(grass=>grass.stopAll())
    fun1()
  },Math.random()*10000)

  fun1()
}

export function createMapObject(buildingData) {
  const { name,texture,x,y,sizeX,sizeY } = buildingData
  const sprite = new PIXI.Sprite(PIXI.Texture.from(texture))
  sprite.x = x
  sprite.y = y
  sprite.width = sizeX
  sprite.height = sizeY
  sprite.zIndex = y
  //building.name= name
  sprite.anchor.set(0.5) //图像居中
  // sprite.scale.x = -0.33
  // sprite.anchor.set(0.5,0.5)
      
  //建筑的名字
  let namesprite = new PIXI.Text(name,{fontSize:20}); //虽然不明白为什么字随着建筑的大小变大，但这样的效果好像也不错
  namesprite.zIndex = 4
  namesprite.x = 0
  namesprite.y = -30
  namesprite.anchor.set(0.5) //图像居中
  sprite.addChild(namesprite)
  return sprite
}

export function createManyAniObject(mapContainer,name, max) {

  let num = Math.floor(Math.random()*max)
  const allGrass = []
  while (num>0) {
    const grass = createAniObject(name,Math.random()*1900,Math.random()*1900)
    allGrass.push(grass)
    mapContainer.addChild(grass)
    num--
  }
  const fun1 = ()=> setTimeout(()=>{
    allGrass.forEach(grass=>grass.playAll())
    fun2()
  },Math.random()*10000)
  const fun2 = ()=> setTimeout(()=>{
    allGrass.forEach(grass=>grass.stopAll())
    fun1()
  },Math.random()*10000)

  fun1()
}

function createAniObject (name,x,y) {
  const textures = {
    '当归': ['当归1','当归2'],
    '三七': ['三七1','三七2']
  } 
  if (!textures[name])
  throw new Error(`name shouldn't be ${name} !`);

  
  const aniSprite = new PIXI.AnimatedSprite.fromFrames(textures[name])
  aniSprite.animationSpeed = 0.1
  aniSprite.x = x
  aniSprite.y = y
  aniSprite.zIndex = y
  aniSprite.playAll = ()=>{
    aniSprite.play()
  }
  aniSprite.stopAll = ()=>{
    aniSprite.gotoAndStop(1)
  }
  return aniSprite
}

function createGrassAniSprite(x,y) {
  const sources = 'grass1,grass2'.split(',')
  const aniSprite = new PIXI.AnimatedSprite.fromFrames(sources)
  aniSprite.animationSpeed = 0.1
  aniSprite.zIndex = y
  //color
  const aniSpriteColor = new PIXI.AnimatedSprite.fromFrames('grass-color1,grass-color2'.split(','))
  aniSpriteColor.animationSpeed = 0.1
  aniSpriteColor.x = x, aniSpriteColor.y = y
  aniSpriteColor.addChild(aniSprite)
  aniSpriteColor.playAll = ()=>{
    aniSpriteColor.play()
    aniSprite.play()
  }
  aniSpriteColor.stopAll = ()=>{
    aniSpriteColor.gotoAndStop(1)
    aniSprite.gotoAndStop(1)
  }

  return aniSpriteColor
}

function createHareAniSprite(x,y) {
  const aniSprite = new PIXI.AnimatedSprite.fromFrames('野兔1,野兔2,野兔3'.split(','))
  aniSprite.animationSpeed = 0.1
  aniSprite.zIndex = y
  aniSprite.anchor.set(0.5,0.5) //避免镜像时错误
  aniSprite.run = (direction)=>{
    aniSprite.scale.x = direction=='left'? 1 : -1
    aniSprite.play()
    aniSprite.destinationStep = Math.floor(Math.random()*10)
    aniSprite.moving = setInterval(()=>{
      if (aniSprite.destinationStep>0) {
        aniSprite.x -= direction=='left'?10:-10
        aniSprite.destinationStep -= 1
        if (aniSprite.x < 0 || aniSprite.x > 1950) {
          aniSprite.parent.removeChild(aniSprite);
          clearTimeout(aniSprite.moving)
        }
      }
      else {
        aniSprite.gotoAndStop(0)
        clearTimeout(aniSprite.moving)
        setTimeout(()=>aniSprite.run(Math.random()>0.5?'left':'right'),10000+Math.random()*10000)
      }
    },200)
  }
  
  aniSprite.run(Math.random()>0.5?'left':'right')

  aniSprite.x = x, aniSprite.y = y
  return aniSprite
}


function convertStringToTextures(string) {
  return string.split(',').reduce((e1,e2)=>{
    e1.push(PIXI.Texture.from(e2))
    return e1
  },[])
}


function moveSpriteToGrandParent(sprite) {
  sprite.rotation = sprite.parent.rotation
  sprite.x = sprite.parent.x + sprite.parent.parent.x
  sprite.y = sprite.parent.y + sprite.parent.parent.y
  sprite.parent.parent.parent.addChild(sprite)
}