const map = require('ramda').map
const filter = require('ramda').filter
const compose = require('ramda').compose
const forEach = require('ramda').forEach
const h = require('hyperscript')



$.getJSON('https://api.spotify.com/v1/artists/5INjqkS1o8h1imAzPqGZBb',function(data){
  console.log(data)

  const appendEl = function(item){
    document.body.appendChild(item)
  }

  const noPop = function(genre){
    return genre.indexOf('pop') === -1

  }

  const li = function(item){
    return h('li',item)
  }

  const getGenre = compose(
    map(li),
    filter(noPop)
  )

  const body = [
    h('h1',data.name),
    h('ul',getGenre(data.genres))
  ]

  forEach(appendEl,body)










} )
