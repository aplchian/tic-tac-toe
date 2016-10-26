const miniMax = require('./minimax.js')
const {flatten, map, times, concat} = require('ramda')






module.exports = function(selection, turn, state, db, newState) {

    //returns board with winning move // beforeboard, position of null which wins, whose turn it is
    function cpuArray(board, position, turn) {
        var outArray = [];
        var fArray = flatten(board)
        var nullCount = 0;
        //loops through flattened array and replaces  winning null with turn
        for (var i = 0; i < fArray.length; i++) {
            if(nullCount === position && position === 0 && fArray[i] === null){
              fArray[i] = turn
              break
            }else if(fArray[i] === null && position === nullCount){
              fArray[i] = turn
              break
            }else if(fArray[i] === null && position !== nullCount){
              nullCount++
            }
        }


        outArray[0] = fArray.slice(0, 3)
        outArray[1] = fArray.slice(3, 6)
        outArray[2] = fArray.slice(6, 9)
        return outArray
    }

    function drawCpuDefend(state,i,db){
        state.board = cpuArray(state.board, i, state.turn)
        // console.log(state.turn,'cpu defend')
        state.turn = state.turn === 'X' ? 'O' : 'X'
        db(state)
    }

    function drawCpuMove(state,i,db,random){
        // console.log(state.turn,'cpu random')
        state.turn = state.turn === 'X' ? 'O' : 'X'
        db(state)
      }

    function drawEndBoard(state,i,db,newState){
      // console.log(state)
      db(state)
      alert(state.turn + " wins!!!!")
      setTimeout(function(){
        db(new newState)
      },2000)
    }

    function winningMove(moves,state,db,newState,turn){
      var isEnd = false
      var returnMove
      for (var i = 0; i < moves.length; i++) {
          if (moves[i].score === 10) {
            // state.board = moves[i].board
            //   drawEndBoard(state,i,db,newState)
            returnMove = i
            isEnd = true
          }
      }
      return [isEnd,returnMove]
    }

    function cpuMove(moves,state,db,newState,turn){
      var isEnd = false
      var returnMove
      for (var i = 0; i < moves.length; i++) {
          if (moves[i].score === 10) {
            // drawCpuDefend(state,i,db,newState)
            returnMove = i
            isEnd = true
          }
      }
      return [isEnd,returnMove]
    }
    console.log(state,'before click')


    //update state of the board with the square that was clicked
    if (selection === 'top-left') {
        state.board[0][0] = turn
    } else if (selection === 'top-mid') {
        state.board[0][1] = turn
    } else if (selection === 'top-right') {
        state.board[0][2] = turn
    } else if (selection === 'mid-left') {
        state.board[1][0] = turn
    } else if (selection === 'mid-mid') {
        state.board[1][1] = turn
    } else if (selection === 'mid-right') {
        state.board[1][2] = turn
    } else if (selection === 'bottom-left') {
        state.board[2][0] = turn
    } else if (selection === 'bottom-mid') {
        state.board[2][1] = turn
    } else if (selection === 'bottom-right') {
        state.board[2][2] = turn
    }
    //draws state with new move

    db(state)
    state.turn = state.cpuTeam.toUpperCase()

    var nullState = state
    // state.turn = state.cpuTeam.toUpperCase()



    //checks endstate .. if true alerts winner, and draws new fresh board .... for user
    if (state.endState()) {
        alert(state.userteam + " wins!")
        db(state)
        setTimeout(function(){
          db(new newState)
        },2000)
    }else if(state.draw()){
      alert('DRAW!')
      db(state)
      setTimeout(function(){
        db(new newState)
      },2000)
    }
    else {
        //changes turn
        state.currentUser = 'cpu'
        // console.log(state)


        var cpuMoves = miniMax(state.board, state.turn,state)
        var userMoves = miniMax(state.board, state.turn,state,'user')

        if (state.turn === state.cpuTeam.toUpperCase()){

          if(winningMove(cpuMoves,state,db,newState,turn)[0]){
            var i = winningMove(cpuMoves,state,db,newState,turn)[1]
            state.board = cpuMoves[i].board
            drawEndBoard(state,i,db,newState)
          }else if(cpuMove(userMoves,nullState,db,newState,turn)[0]){
            var i = cpuMove(userMoves,nullState,db,newState,turn)[1]
            drawCpuDefend(nullState,i,db,newState)
          }else{
            var randomBoard = cpuMoves[Math.floor(Math.random()*cpuMoves.length)];
            state.board = randomBoard.board
            drawCpuMove(state,'',db)
          }

        }

    }

    return state
}
