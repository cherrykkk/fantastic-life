import * as PIXI from 'pixi.js'

export function createPerson(x,y) {
  const frontTextures = convertStringToTextures('正面1,正面2,正面3')
  const leftTextures = convertStringToTextures('左面1,左面2,左面3')
  const rightTextures = convertStringToTextures('右面1,右面2,右面3')
  const aniSprite = new PIXI.AnimatedSprite(frontTextures)
  aniSprite.x = x
  aniSprite.y = y
  aniSprite.anchor.set(0.5)
  aniSprite.animationSpeed = 0.1
  console.log(aniSprite)
  setTimeout(()=>aniSprite.play(),3000)
  aniSprite.move = (vx,vy)=>{
    if (Math.abs(vy) > Math.abs(vx) && aniSprite.textures!=frontTextures) { 
      aniSprite.textures = frontTextures
    } else if (Math.abs(vy) < Math.abs(vx) && vx < 0 && aniSprite.textures!=leftTextures){
      aniSprite.textures = leftTextures
    }else if (Math.abs(vy) < Math.abs(vx) && vx > 0 && aniSprite.textures!=rightTextures){
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