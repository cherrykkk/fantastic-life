import { getName } from '@/core/utils.js'
export default Npc

function Npc(){
  this.surname = null
  this.givenName = null
  this.sex = null
  this.month = null

  this.name = () => this.surname+this.givenName

  this.initTotalyRandom = ()=>{    
    this.sex = Math.random()<0.5 ? "男":"女"
    this.month = Math.floor(Math.random()*60)
    this.getName()
  }

  this.initAsFriend = ( yourMonth,yourSex )=>{
    let oppositeSex = yourSex=="男"? "女" : "男"
    this.sex = Math.random()<0.3 ? oppositeSex : yourSex
    this.month = yourMonth - Math.floor(Math.random()*100) + Math.floor(Math.random()*100)
    if( this.month < 10 )
      this.month = 10
    this.getName()
  }

  this.initAsOlderSibling = ( yourMonth,familySurname )=>{
    this.sex = Math.random()<0.5 ? "男" : "女"
    this.month = yourMonth + 12 + Math.floor(Math.random()*100)
    this.getName( familySurname )
  }
  
  this.initAsParent = ( sex,familySurname )=>{
    this.sex = sex
    this.month = 20*12 + Math.floor( Math.random()*240)
    if(sex=="男")
      this.getName( familySurname )
    else 
      this.getName()
  }

  this.getName =  ( surname )=>{
    fetch(`../api/getRandom_name.php?sex=${this.sex}`)
    .then( res=> res.json() )
    .then( data =>{
      this.surname = surname || data.surname
      this.givenName = data.givenName
    })
  }
}