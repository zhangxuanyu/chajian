//node爬虫
var http = require('https')
var cheer = require('cheerio')
var url = 'https://www.imooc.com/qadetail/258370'

function filte(html){
	var $ = cheerio.load(html)
	var chapters = $('.learnchapter')
	// [{
	// 	chapterTitle:'',
	// 	videos:[
	// 		title:'',
	// 		id:''
	// 	]
	// }]
	// 
	// 
	 
}

http.get(url,function(res){
	var html = ''
	res.on('data',function(data){
		html += data
	})
	res.on('end',function(){
		// filte(html)
		console.log(html)
	})
}).on('error',function(){
	console.log(111111111)
})