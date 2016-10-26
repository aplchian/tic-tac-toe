const h = require('hyperscript')
const forEach = require('ramda').forEach
const flatten = require('ramda').flatten
const $ = require('jquery')
const checkEnd = require('./check-end.js')
const clickSquare = require('./click-square.js')
const miniMax = require('./minimax.js')

const State = function() {
    this.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    this.turn = ''
    this.active = false
    this.endState = function() {
        if(checkEnd(this.board)){
          return true
        }else{
          return false
        }
    }
    this.draw = function(){
      if(checkEnd(this.board) === null){
        return true
      }
    }
    this.userteam = ''
    this.cpuTeam = ''
    this.currentUser =  ''
}

const drawBoard = function(state) {

    const flatBoard = flatten(state.board)
    const classArray = ['.top-left', '.top-mid', '.top-right', '.mid-left', '.mid-mid', '.mid-right', '.bottom-left', '.bottom-mid', '.bottom-right']
    const turnArray = ['#o-pick', '#x-pick']

    const draw = function(el) {
        document.body.appendChild(el)
    }

    const classBinder = function(item) {
        $(item).click(function() {
            state = clickSquare(item.slice(1), state.turn, state, drawBoard, State)
            $(item).unbind()
        })
    }

    const pickBinder = function(item) {
        $(item).click(function() {
            state.turn = item[1].toUpperCase()
            state.active = true
            state.userteam = item[1]
            state.cpuTeam = item[1] === 'x' ? 'o' : 'x'
            state.currentUser = 'user'
            drawBoard(state)
        })
    }



    const html = [
            h('div.pick-container', [
                h('h1.header-txt', state.active ? 'It\'s Your Turn!' : 'Pick Your Side'),
                h('h2', state.active ? '' : [
                    h('span#x-pick', 'X'),
                    h('span#o-pick', 'O')
                ])
            ]),
            h('div.tac-container', [
                h('div.top-left.square.left.top', [
                    h('h1#top-left', flatBoard[0])
                ]),
                h('div.top-mid.square.top', [
                    h('h1#top-mid', flatBoard[1])
                ]),
                h('div.top-right.square.top', [
                    h('h1#top-right', flatBoard[2])
                ]),
                h('div.mid-left.square.left', [
                    h('h1#mid-left', flatBoard[3])
                ]),
                h('div.mid-mid.square', [
                    h('h1#mid-mid', flatBoard[4])
                ]),
                h('div.mid-right.square', [
                    h('h1#mid-right', flatBoard[5])
                ]),
                h('div.bottom-left.square.left', [
                    h('h1#bottom-left', flatBoard[6])
                ]),
                h('div.bottom-mid.square', [
                    h('h1#bottom-mid', flatBoard[7])
                ]),
                h('div.bottom-right.square', [
                    h('h1#bottom-right', flatBoard[8])
                ]),
            ])
        ]
    //resets board
    $('body').empty()
    //draws board
    forEach(draw, html)
        //click binders
    forEach(classBinder, classArray)
    forEach(pickBinder, turnArray)
}

//initialize board
var state = new State()
//draw initial board
drawBoard(state)
