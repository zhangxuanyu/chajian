var http = require('http');
var sa = {status:200,date:[1,2,3,4,4,5,6],ddf:10}
var bb = JSON.stringify(sa)
var sab = {status:200,date:{name:'zs',age:18},ddf:10}
var bbb = JSON.stringify(sab)

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    // response.header('Access-Control-Allow-Origin','http://127.0.0.1:8888/')
    response.writeHead(200, {'Content-Type': 'text/plain'});
    var url_info = require('url').parse(request.url, true);
    if(url_info.pathname === '/'){
    	

	    // 发送响应数据 "Hello World"
	    // response.end('Hello World\n',sa);
	    response.end(bb);
    }else if(url_info.pathname === '/test'){
    	response.end(bbb);
    }
    
}).listen(8888);


// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');