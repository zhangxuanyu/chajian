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

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname,request, response);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;


// http.createServer(function (request, response) {

//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     // response.header('Access-Control-Allow-Origin','http://127.0.0.1:8888/')
//     response.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'http://127.0.0.1:8888/'});
//     var url_info = require('url').parse(request.url, true);

//     if(url_info.pathname === '/'){
    	

// 	    // 发送响应数据 "Hello World"
// 	    // response.end('Hello World\n',sa);
// 	    response.end(bb);
//     }
//     if(url_info.pathname === '/test'){
//     	response.end(bbb);
//     }

//     if (url_info.pathname === '/post' && request.method.toLowerCase() === 'post') {
//     	 	var alldata = '';
// 	        request.on('data', function (chunk) {
// 	            alldata += chunk;
// 	        });
// 	        request.on('end',function(){
// 	        	var dataString = alldata.toString();
//              	//将接收到的字符串转换位为json对象
//              	var dataObj = querystring.parse(dataString);
// 	        	source.date.push(dataObj);
// 				// 序列化
// 				var destString = JSON.stringify(source);
// 				// 写入文件
// 				fs.writeFile('./input1.json', destString,(err) => {
// 				  if (err) throw err;
// 				  console.log('文件已保存！');
// 				  fs.readFile('input1.json', (err, data) => {
// 					  if (err) throw err;
// 					  console.log(data);
// 					  response.end(data)
// 					});
// 				});

// 	        })
//     }
    
// }).listen(8888);


// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');