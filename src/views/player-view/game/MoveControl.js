
export function MoveControl(focus, mapContainer, app, model) {
  let vx = 0
  let vy = 0
  let powerX
  let powerY
  let pointerdown = false
  this.model = model

  app.stage.buttonMode = true;//鼠标变手型
  app.stage.interactive = true;//响应交互

  app.ticker.maxFPS = 60

  app.stage.on("pointermove",(e)=>{
    //方向与速度控制, 两种 model 的控制方法不太一样
    if (pointerdown && this.model=='flySword') {
      const { x, y } = e.data.global
      vx = (x - app.screen.width/2)/20
      vy = (y - app.screen.height/2)/20
    } else if (pointerdown && this.model=='person'){
      //获得实际距离而不是屏幕位置
      const { x:x1, y:y1 } = mapContainer
      const { x:x2, y:y2 } = e.data.global
      const { x:x3, y:y3 } = focus
      const x = -x1 + x2 - x3, y = -y1 + y2 - y3
      vx = x/20
      vy = y/20
    } else if (this.model=='bow') {
      const { x:x1, y:y1 } = mapContainer
      const { x:x2, y:y2 } = e.data.global
      const { x:x3, y:y3 } = focus
      powerX = -x1 + x2 - x3
      powerY = -y1 + y2 - y3
    }
  })
  app.stage.on("pointerdown",()=>{
    pointerdown = true
  })
  app.stage.on("pointerup",(e)=>{
    pointerdown = false
  })
  app.stage.on("pointerout",(e)=>{
    pointerdown = false
  })

  app.ticker.add(()=>{
    if (this.model=='bow' && pointerdown==true) {
      const weapon = focus.children[0]
      weapon.use(powerX,powerY)
    } else if (this.model=='bow' && pointerdown==false) {
      const weapon = focus.children[0]
      weapon.use(0,0)
    }
    //person 或 sword
    focus.move(vx,vy)
    if (vx != 0 || vy != 0) {
      mapContainer.x -= vx
      mapContainer.y -= vy
    }
    // 在松开后，速度不是立刻为 0 而是逐渐衰减
    if (!pointerdown) {
      const a = 0.95
      if (vx+vy < 0.05) {
        vx = 0
        vy = 0
      }
      else {
        vx = vx*a
        vy = vy*a
      }
    }

    //智能视角控制
    if (focus.x < app.screen.width/2 || focus.x > mapContainer.width - app.screen.width/2)
      mapContainer.x += vx
    if (focus.y < app.screen.height/2 || focus.y > mapContainer.height - app.screen.height/2)
      mapContainer.y += vy
    if (focus.x < 0 || focus.x > mapContainer.width)
      focus.x -= vx
    if(focus.y < 0 || focus.y > mapContainer.height)
      focus.y -= vy
  })
}
