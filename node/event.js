var events = require('events')
var eventEmitter = new events.EventEmitter()
eventEmitter.on('begin',fun)
function fun(){
	console.log('结果出来了')
}
setTimeout(function(){
	eventEmitter.emit('begin',fun)
},1000)

var events = require('events')
var et = evnets.EventEmitter()
et.on('')