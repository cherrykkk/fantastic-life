import * as PIXI from 'pixi.js'

const mapSourceData = {
  buildings: [
    {
      name: "monster",
      texture: "monster",
      x: 1090,
      y: 30,
      sizeX: 100,
      sizeY: 100,
    },{
      name: "monster",
      texture: "monster",
      x: 250,
      y: 300,
      sizeX: 100,
      sizeY: 100,
    },{
      name: "monster",
      texture: "monster",
      x: 350,
      y: 160,
      sizeX: 100,
      sizeY: 100,
    },{
      name: "monster",
      texture: "monster",
      x: 850,
      y: 500,
      sizeX: 100,
      sizeY: 100,
    },{
      name: "butterfly",
      texture: "butterfly15",
      x: 200,
      y: 200,
      sizeX: 100,
      sizeY: 100,
    }
  ]
}

const butterflyAniTexture = [
  "butterfly1","butterfly2","butterfly3","butterfly4","butterfly5","butterfly6","butterfly7","butterfly8",
  "butterfly9","butterfly10","butterfly11","butterfly12","butterfly13","butterfly14","butterfly15","butterfly16",
  "butterfly17","butterfly18","butterfly19","butterfly20"
]

function createButterfly() {
  const arr = butterflyAniTexture.map( e=>PIXI.Texture.from(e))
  const butterfly = new PIXI.AnimatedSprite(arr)
  butterfly.play()
  butterfly.animationSpeed = 0.1
  return butterfly
}

export function createMap() {

  const handler = {}
  const loader = createLoader() 				// PIXI 预加载
  const focus = null
  
  window.onresize = function() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  }		
  
  const width = window.innerWidth, height = window.innerHeight
  //创建PIXI应用
	const app = new PIXI.Application({
    width: width, // default: 800 宽度
    height: height, // default: 600 高度
    //antialias: true, // default: false 反锯齿  为了让字体和图形边缘更加平滑
    transparent: true, // default: false 透明度  画布是否透明
    resolution: 1, // default: 1 分辨率
    //backgroundAlpha: 0 // 设置背景颜色透明度   0是透明
  });
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  app.renderer.autoResize = true;
  app.stage.sortableChildren = true
  app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height); //Container 本身不可点击，需要设置 hitArea
  app.stage.buttonMode = true;//鼠标变手型
  app.stage.interactive = true;//响应交互

  const mapContainer = new PIXI.Container()
  mapContainer.sortableChildren = true
  mapContainer.width = 2000
  mapContainer.height = 2000
  mapContainer.zIndex = 12
  app.stage.addChild(mapContainer)

  loader.load(()=>{
    const sword = new PIXI.Sprite(PIXI.Texture.from('sword'))
    sword.zIndex = 10
    sword.x = app.screen.width/2
    sword.y = app.screen.height/2
    sword.width = 200
    sword.height = 200
    sword.anchor.set(0.5)
    handler.focus = sword
    mapContainer.addChild(sword)
    initBuilding(mapSourceData,mapContainer)

    const butterfly = createButterfly()
    mapContainer.addChild(butterfly)

  })

  handler.mapContainer = mapContainer
  handler.app = app
  handler.loader = loader
  handler.focus = focus
  return handler
}

function initBuilding(mapData,mapContainer) {
  const { buildings } = mapData
  for( const buildingData of buildings ) {
    const building = createMapObject(buildingData)
    mapContainer.addChild(building)
  }
}

export function createMapObject(buildingData) {
  const { name,texture,x,y,sizeX,sizeY } = buildingData
  const sprite = new PIXI.Sprite(PIXI.Texture.from(texture))
  sprite.x = x
  sprite.y = y
  sprite.width = sizeX
  sprite.height = sizeY
  sprite.zIndex = 1
  //building.name= name
  sprite.anchor.set(0.5) //图像居中
      
  //建筑的名字
  let namesprite = new PIXI.Text(name,{fontSize:20}); //虽然不明白为什么字随着建筑的大小变大，但这样的效果好像也不错
  namesprite.zIndex = 4
  namesprite.x = 0
  namesprite.y = -30
  namesprite.anchor.set(0.5) //图像居中
  sprite.addChild(namesprite)
  return sprite
}
export function createLoader() {
  const loader = new PIXI.Loader()
  loader.add([
    {
      name: 'sword',
      url: "sword3.png"
    },{
      name: "monster",
      url: "monster.png"
    },{
      name: 'butterfly',
      url: 'butterfly.json'
    }
  ])
  // loader.add('sword','/sword.png')
  loader.onError.add(( err,loader) => {
    console.log("载入图片或json失败了,错误原因：",err,"当前loader：",loader)
  });
  return loader
}
