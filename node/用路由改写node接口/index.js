var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/test"] = requestHandlers.test;
handle["/post"] = requestHandlers.post;

server.start(router.route, handle);