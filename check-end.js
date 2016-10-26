const { flatten, filter, compose, length } = require('ramda')



module.exports = function(board){

  const draw = function(board){
    const boardLength = compose(
      length,
      filter(item => item === null),
      flatten
    )(board)
    return (boardLength === 0)
  }



  if(board[0][0] != null && board[0][0] === board[0][1] && board[0][1] === board[0][2]){
    return true
  }else if(board[1][0] !== null && board[1][0] === board[1][1] && board[1][1] === board[1][2]){
    return true
  }else if(board[2][0] !== null && board[2][0] === board[2][1] && board[2][1] === board[2][2]){
    return true
  }else if(board[0][0] !== null && board[0][0] === board[1][0] && board[1][0] === board[2][0]){
    return true
  }else if(board[0][1] !== null && board[0][1] === board[1][1] && board[1][1] === board[2][1]){
    return true
  }else if(board[0][2] !== null && board[0][2] === board[1][2] && board[1][2] === board[2][2]){
    return true
  }
  else if(board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
    return true
  }else if(board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
    return true
  }else if(draw(board)){
    return null
  }else{
    return false
  }

}
