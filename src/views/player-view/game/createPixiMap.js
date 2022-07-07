import * as PIXI from 'pixi.js'
import { createManyHare, createManyGrass, createMapObject, createPerson, createSword, createManyAniObject} from './createSprite'
import { MoveControl } from './MoveControl.js' 
const mapSourceData = {
  buildings: [
    // {
    //   name: "monster",
    //   texture: "monster",
    //   x: 100,
    //   y: 100,
    //   sizeX: 100,
    //   sizeY: 100,
    // },{
    //   name: "monster",
    //   texture: "monster",
    //   x: 350,
    //   y: 160,
    //   sizeX: 100,
    //   sizeY: 100,
    // }
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

  const mapContainer = new PIXI.Container()
  mapContainer.sortableChildren = true
  // mapContainer.width = 2000
  // mapContainer.height = 2000 

  mapContainer.zIndex = 12
  app.stage.addChild(mapContainer)

  loader.load(()=>{
    const tiling = new PIXI.TilingSprite.from('郊外',2000,2000) //height 和width 无法设置大小，其子元素的边界才能决定Container的边界
    tiling.tileScale.x = 2
    tiling.tileScale.y = 2
    console.log(tiling.texture.baseTexture)
    mapContainer.addChild(tiling)

    //handler.focus  = createSword(app.screen.width/2,app.screen.height/2)
    handler.focus = createPerson(app.screen.width/2,app.screen.height/2)
    mapContainer.addChild(handler.focus)
    initBuilding(mapSourceData,mapContainer)

    const butterfly = createButterfly()
    mapContainer.addChild(butterfly)

    createManyGrass(mapContainer)
    createManyHare(mapContainer)
    createManyAniObject(mapContainer,'当归',20)
    createManyAniObject(mapContainer,'三七',20)

    handler.moveControl = new MoveControl(handler.focus,mapContainer,app,'person')
  })

  handler.mapContainer = mapContainer
  handler.app = app
  handler.loader = loader
  handler.focus = focus
  handler.moveControl
  return handler
}

function initBuilding(mapData,mapContainer) {
  const { buildings } = mapData
  for( const buildingData of buildings ) {
    const building = createMapObject(buildingData)
    mapContainer.addChild(building)
  }
}
export function createLoader() {
  const loader = new PIXI.Loader()
  loader.add([
    {
      name: 'sword',
      url: "sword3.png"
    },{
      name: 'butterfly',
      url: 'butterfly.json'
    },{
      name: "grass",
      url: 'map/map1.json'
    },{
      name: "郊外",
      url: 'map/郊外4.png'
    },{
      name: "野兔1",
      url: 'map/野兔1.png'
    },{
      name: "野兔2",
      url: 'map/野兔2.png'
    },{
      name: "野兔3",
      url: 'map/野兔3.png'
    },{
      name: "人",
      url: "map/map2.json"
    },{
      name: "朝左1",
      url: "map/朝左1.png"
    },{
      name: "朝左2",
      url: "map/朝左2.png"
    },{
      name: "朝左3",
      url: "map/朝左3.png"
    },{
      name: "朝右1",
      url: "map/朝右1.png"
    },{
      name: "朝右2",
      url: "map/朝右2.png"
    },{
      name: "朝右3",
      url: "map/朝右3.png"
    },{
      name: "朝下1",
      url: "map/朝下1.png"
    },{
      name: "朝下2",
      url: "map/朝下2.png"
    },{
      name: "朝下3",
      url: "map/朝下3.png"
    },{
      name: "朝上1",
      url: "map/朝上1.png"
    },{
      name: "朝上2",
      url: "map/朝上2.png"
    },{
      name: "朝上3",
      url: "map/朝上3.png"
    },{
      name: "当归1",
      url: "map/当归1.png",
    },{
      name: "当归2",
      url: "map/当归2.png",
    },{
      name: "三七1",
      url: "map/三七1.png",
    },{
      name: "三七2",
      url: "map/三七2.png",
    },{
      name: "弓",
      url: "map/弓.png"
    },{
      name: "弦",
      url: "map/弦.png"
    },{
      name: "箭",
      url: "map/箭3.png"
    }
  ])
  // loader.add('sword','/sword.png')
  loader.onError.add(( err,loader) => {
    console.log("载入图片或json失败了,错误原因：",err,"当前loader：",loader)
  });
  return loader
}
