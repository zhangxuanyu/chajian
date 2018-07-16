var http = require('http');
var querystring = require('querystring')
var fs = require('fs');
var source = require('./input1.json');
var fsPromises = require('fs').promises;
var sa = {status:200,date:[1,2,3,4,4,5,6],ddf:10}
var bb = JSON.stringify(sa)
var sab = {status:200,date:[{name:'zs',age:18}],ddf:10}
var bbb = JSON.stringify(sab)
var url = require("url");


function test(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'http://127.0.0.1:8888/'});
  	response.end(bbb);
}

function post(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'http://127.0.0.1:8888/'});
  			var alldata = '';
	        request.on('data', function (chunk) {
	            alldata += chunk;
	        });
	        request.on('end',function(){
	        	var dataString = alldata.toString();
             	//将接收到的字符串转换位为json对象
             	var dataObj = querystring.parse(dataString);
	        	source.date.push(dataObj);
				// 序列化
				var destString = JSON.stringify(source);
				// 写入文件
				fs.writeFile('./input1.json', destString,(err) => {
				  if (err) throw err;
				  console.log('文件已保存！');
				  fs.readFile('input1.json', (err, data) => {
					  if (err) throw err;
					  console.log(data);
					  response.end(data)
					});
				});

	        })
}

function start(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'http://127.0.0.1:8888/'});
	 response.end(bb);
}

exports.start = start;
exports.test = test;
exports.post = post;