// /**
//  * 
//  * @param {Object} obj 
//  * @param {String} str 
//  */
// function fun(obj, str) {
//   let tmp = str.split('.')
//   console.log(tmp,obj[tmp[0]])
//   return tmp.reduce((acc,cur)=> acc && acc[cur],obj)
// }
// let x = { 
//   a: { 
//     b: { 
//       c: 1
//     } 
//   } 
// }
// let y = 'a.b.c'



// console.log(`fun(x,y):`, fun(x, y)) // 1

function add(){
  console.log(add.args,...arguments)
  add.args = add.args || [...arguments]
  if(add.args.length>= 3){
    return add.args.reduce((a,b) => a+b)
  }else{
    add.args.push(...arguments)
    return add
  }
}

console.log(add(1,2)(4))