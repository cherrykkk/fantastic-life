
function Names(){
  this.namesArr = []

  this.fetchName = async (sex)=>{
    let result = {
      surname: "暂无数据",
      givenName: "暂无数据",
      sex: "暂无数据"
    }
    for(const name of this.namesArr) {
      if( !sex ) {
        result = name
        this.namesArr.pop()
        break;
      }
      else if( name.sex==sex ) {
        result = name
        this.namesArr.pop()
        break;
      }
    }
    this.namesPreparing()
    return result
  }

  this.namesPreparing = ()=>{
    if( this.namesArr.length<60 )
    fetch(`../api/getRandom_npc.php?times=100`)
    .then( res=> res.json())
    .then( data=>{
      for(let e of data){
        let name = {
          surname: e.surname,
          givenName: e.givenName,
          sex: e.sex
        }
        this.namesArr.push(name)
      }
    })
  }
}

const names = new Names()
names.namesPreparing()

export default names