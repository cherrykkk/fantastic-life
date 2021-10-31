import Study from './system/Study.js'

export default Society

function Society(){
  this.yourLife = null

  this.init = ( yourLife )=>{
    this.yourLife = yourLife
  }

  this.stepMonth = ()=>{
    this.checkYourAge()
  }

  this.checkYourAge = ()=>{
    let age = this.yourLife.body.month / 12
    if( age == 6 ){
      let school = selector( schoolList , "primary school" )
      this.yourLife.study.intoSchool( school )
    }
    else if( age == 12 ){
      let school = selector( schoolList , "junior school" )
      this.yourLife.study.intoSchool( school )
    }
    else if( age == 15 ){
      let school = selector( schoolList , "senior school" )
      this.yourLife.study.intoSchool( school )
    }
  }


}


function selector( arr , key ){
  for( let e of arr ){
    console.log(e)
    if( e.selector == key ){
      return e
    }
  }
  return false
}

let schoolList = [
  {
    selector: "primary school",
    schoolName: "第一小学"
  },{
    selector: "junior school",
    schoolName: "第二中学(初中)"
  },{
    selector: "senior school",
    schoolName: "第三中学(高中)"
  },{
    selector: "senior school",
    schoolName: "衡水中学(高中)"
  },{
    selector: "senior school",
    schoolName: "师大附中(高中)"
  }
]