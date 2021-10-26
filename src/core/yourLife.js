import Life from './Life'

let yourLife = new Life()

let sex = Math.random()<0.5 ? "男":"女"
let name = ["gin","tama"]

yourLife.setName(name[0],name[1]) 
yourLife.setSex(sex)

let bodyScore = (Math.random()*9)+1
let familyScore = (Math.random()*10)
yourLife.body.init(bodyScore,5)
yourLife.family.init(familyScore)
yourLife.init()

export default yourLife