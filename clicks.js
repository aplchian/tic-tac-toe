var $ = require('jquery')



module.exports = function(){

  $("#x-pick").click(function(){
    state.turn = 'x'
    state.side = 'x'
    console.log('you chose side', state.side, 'its',state.turn,'turn')
  })

  $("#o-pick").click(function(){
    state.turn = 'o'
    state.side = 'o'
    console.log('you chose side', state.side, 'its',state.turn,'turn')
  })

  $('.top-left').click(function(){
    state.board[0][0] = state.turn
    console.log(state.board)
  })
  $('.top-mid').click(function(){
    state.board[0][1] = state.turn
    console.log(state.board)
  })
  $('.top-right').click(function(){
    state.board[0][2] = state.turn
    console.log(state.board)
  })


  $('.mid-left').click(function(){
    state.board[1][0] = state.turn
    console.log(state.board)
  })
  $('.mid-mid').click(function(){
    state.board[1][1] = state.turn
    console.log(state.board)
  })
  $('.mid-right').click(function(){
    state.board[1][2] = state.turn
    console.log(state.board)
  })


  $('.bottom-left').click(function(){
    state.board[2][0] = state.turn
    console.log(state.board)
  })
  $('.bottom-mid').click(function(){
    state.board[2][1] = state.turn
    console.log(state.board)
  })
  $('.bottom-right').click(function(){
    state.board[2][2] = state.turn
    console.log(state.board)
  })



}
