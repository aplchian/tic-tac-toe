const R = require('ramda')
const compose = R.compose
const filter = R.filter
const map = R.map
const forEach = R.forEach
const flatten = R.flatten
const addIndex = R.addIndex
const add = R.add
const curry = R.curry
const checkEnd = require('./check-end')
const forEachIndex = addIndex(forEach)



//
//
//
//
//
//
//
// const length = R.length
//
// const array = [1,2,3,4,5]
//
// const outsideFunc = function(item){
//   return (item === 2)
// }
//
// const addOne = function(outside,item){
//   if(outside(item)){
//     return item + 1
//   }
//   return item
// }
//
// const finalArray = map(addOne(outsideFunc),array)
//
//
//










/////////////////////////////////////////


const array = [1,2,3,4,5]

const outsideFunc = function(item){
  return (item === 2)
}

// const addOne = function(,item){
//   if(outsideFunc(item)){
//     return item + 1
//   }
//   return item
// }

// const addOne = function(fn){
//   return function(item){
//     if(fn(item)){
//       return item + 1
//     }
//   }
// }



const addOne = function(fn,item){
  if(fn(item)){
    return item + 1
  }
  return item
}

const curryAddOne = curry(addOne)

const finalArray = map(curryAddOne(outsideFunc),array)


console.log(finalArray)
