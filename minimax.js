const R = require('ramda')
const compose = R.compose
const filter = R.filter
const map = R.map
const forEach = R.forEach
const flatten = R.flatten
const addIndex = R.addIndex
const add = R.add
const length = R.length
const times = R.times
const checkEnd = require('./check-end')
const forEachIndex = addIndex(forEach)
const filterIndex = addIndex(filter)
const mapIndex = addIndex(map)



module.exports = function(initBoard,player,state,user){
  if(user === 'user'){
    player = state.userteam.toUpperCase()
    state.currentUser === 'user'
  }
  //
  // console.log(state.userteam)
  // console.log(state.currentUser)


  const newBoard = []
  var board = flatten(initBoard)
  var flatBoard = board


    //counts number of open spaces in board
  const getOpenSpaces = function(board){
    let getNull = function(item){
      return item === null
    }
    let count = compose(
      length,
      filter(getNull)
    )
    return count(board)
  }

  const pushBoard = function(){
    return {board: flatten(board), score: 0}
  }
    //populates array of value of spaces
  const getNullIndex = function(item,i){
    if(flatBoard[i] === null){
      return i
    }
  }
    //filters out spaces that are taken
  const filterNotNum = function(item){
    return (item !== undefined)
  }

  //map through arr of board objs -- if end states set score to 10
  const updateScore = function(item){
    if(checkEnd(item.board) && state.currentUser === 'user'){
      item.score = -10
    }else if(checkEnd(item.board) && state.currentUser === 'cpu'){
      item.score = 10
    }
    return item
  }

  //recieves arr of board objs -- returns arr of board objs with board nested
  const nestBoards = function(item,i){
    let obj = item
    let arr1 = obj.board.slice(0,3)
    let arr2 = obj.board.slice(3,6)
    let arr3 = obj.board.slice(6,9)
    obj.board = [arr1,arr2,arr3]
    return obj
  }

  //returns new array of boards that have
  // possible moves in each open space
  const setPlayer = function(item,i){
    let arr = boards
    arr[i].board[arrNull[i]] = player
    return arr[i]
  }





//////////get numbers of open spaces .. creates template obj co
  //set count to number of open spaces
  const count = getOpenSpaces(board)
  // set boards array elements to board obj with score set to 0
  //and flattened board..
  const boards = times(pushBoard,count)
  //
  // console.log(boards)







  // returns array of positions open spaces
  const getNullArr = compose(
    filterIndex(filterNotNum),
    mapIndex(getNullIndex)
  )
  // sets to arr of positions of open spaces
  const arrNull = getNullArr(board)

  // set to new array of boards with possible moves
  const updatedBoards = mapIndex(setPlayer,arrNull)

  // sets to arr of board objs with nested board
  const nestedUpdatedBoards = mapIndex(nestBoards,updatedBoards)
  // map through arr of board objs -- if end states set score to 10
  const finalBoard = map(updateScore,nestedUpdatedBoards)





  // const getCount = compose(
  //   times(pushBoard),
  //   getOpenSpaces()
  // )
  // const boards = getCount(board)


  // const getFinalBoard = compose(
  //   map(updateScore),
  //   mapIndex(nestBoards),
  //   mapIndex(setPlayer),
  //   filterIndex(filterNotNum),
  //   mapIndex(getNullIndex)
  // )
  //
  // const finalBoard = getFinalBoard(board)
  //
  // console.log(getFinalBoard)

  return finalBoard

}
