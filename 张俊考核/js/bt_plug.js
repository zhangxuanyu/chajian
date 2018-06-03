function getPointOnCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x: x - bbox.left * (canvas.width / bbox.width),
		y: y - bbox.top * (canvas.height / bbox.height)
	};
}

var bt_DefaultGUIAction = {
	panBegan: function (x, y) {
		var script = "Render\\CameraControl\\PanBegan " + x + "\t" + y + ";";
		BT_BodyExecuteScript(g_Body, script, 0);
	},
	pan: function (x, y) {
		var script = "Render\\CameraControl\\Pan " + x + "\t" + y + ";";
		BT_BodyExecuteScript(g_Body, script, 0);
	},
	pinchBegan: function () {
		BT_BodyExecuteScript(g_Body, "Render\\CameraControl\\PinchBegan;");
	},
	pinch: function (scale) {
		var script = "Render\\CameraControl\\Pinch " + scale + ";";
		BT_BodyExecuteScript(g_Body, script, 0);
	},
	rotateBegan: function (x, y) {
		var script = "Render\\CameraControl\\RotateBegan " + x + " " + y + ";";
		BT_BodyExecuteScript(g_Body, script, 0);
	},
	rotate: function (x, y) {
		var script = "Render\\CameraControl\\Rotate " + x + "\t" + y + ";";
		BT_BodyExecuteScript(g_Body, script, 0);
	},
	transformTo: function (x, y) {
		var script = "Render\\CameraControl\\TransformTo " + x + "\t" + y + ";";

		var bt_log = BT_LogCreate();
		BT_BodyExecuteScript(g_Body, script, bt_log);

		var log_count = BT_LogGetCount(bt_log);
		if (log_count > 0) {
			var log_str = Module.Pointer_stringify(BT_LogGetLog(0, bt_log));
			console.log(log_str);
		}
		BT_LogClearAll(bt_log);
		BT_LogRelease(bt_log);
	},

	km: {

		onMouseButtonDown: function (button_id, x, y) {
			var script = "GUIEvent.KM.OnMouseButtonDown " + button_id + " " + x + " " + y + ";";
			BT_BodyExecuteScript(g_Body, script, 0);
		},

		onMouseButtonUp: function (button_id, x, y) {
			var script = "GUIEvent.KM.OnMouseButtonUp " + button_id + " " + x + " " + y + ";";
			BT_BodyExecuteScript(g_Body, script, 0);
		},

		onMouseMove: function (x, y) {
			var script = "GUIEvent.KM.OnMouseMove " + x + " " + y + ";";
			BT_BodyExecuteScript(g_Body, script, 0);
		},

		onMouseClick: function (button_id, x, y) {
			var script = "GUIEvent.KM.OnMouseClick " + button_id + " " + x + " " + y + ";";
			BT_BodyExecuteScript(g_Body, script, 0);
		},

		onMouseDbClick: function (button_id, x, y) {
			var script = "GUIEvent.KM.OnMouseDbClick " + button_id + " " + x + " " + y + ";";
			BT_BodyExecuteScript(g_Body, script, 0);
		},

		onMouseWheel: function (delta, x, y) {
			if (delta > 0) {
				var script = "GUIEvent.KM.OnMouseWheel 1.06 + " + x + " " + y + ";";
				BT_BodyExecuteScript(g_Body, script, 0);
			}
			else {
				var script = "GUIEvent.KM.OnMouseWheel 0.9434 + " + x + " " + y + ";";
				BT_BodyExecuteScript(g_Body, script, 0);
			}
		},
		
		onKeyDown: function(key) {
			var script = "GUIEvent.KM.OnKeyDown " + key + ";";
			BT_BodyExecuteScript(g_Body, script, 0);
		},
		
		onKeyUp: function(key){
			var script = "GUIEvent.KM.OnKeyUp " + key + ";";
			BT_BodyExecuteScript(g_Body, script, 0);
		}
	}, //KM

	tp: {

	}  //TP
}


var bt_PlugManager = {
	plugins: [],

	km: {

		onMouseButtonDown: function (button_id, x, y) {
			for (var i in bt_PlugManager.plugins) {
				if (bt_PlugManager.plugins[i].isActive) {
					if (!bt_PlugManager.plugins[i].km) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseButtonDown) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseButtonDown(button_id, x, y)) return;
				}
			}
			bt_DefaultGUIAction.km.onMouseButtonDown(button_id, x, y);
		},

		onMouseButtonUp: function (button_id, x, y) {
			for (var i in bt_PlugManager.plugins) {
				if (bt_PlugManager.plugins[i].isActive) {
					if (!bt_PlugManager.plugins[i].km) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseButtonUp) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseButtonUp(button_id, x, y)) return;
				}
			}
			bt_DefaultGUIAction.km.onMouseButtonUp(button_id, x, y);
		},

		onMouseMove: function (x, y) {
			for (var i in bt_PlugManager.plugins) {
				if (bt_PlugManager.plugins[i].isActive) {
					if (!bt_PlugManager.plugins[i].km) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseMove) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseMove(x, y)) return;
				}
			}
			bt_DefaultGUIAction.km.onMouseMove(x, y);
		},

		onMouseClick: function (button_id, x, y) {
			for (var i in bt_PlugManager.plugins) {
				if (bt_PlugManager.plugins[i].isActive) {
					if (!bt_PlugManager.plugins[i].km) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseClick) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseClick(button_id, x, y)) return;
				}
			}
			bt_DefaultGUIAction.km.onMouseClick(button_id, x, y);
		},

		onMouseDbClick: function (button_id, x, y) {
			for (var i in bt_PlugManager.plugins) {
				if (bt_PlugManager.plugins[i].isActive) {
					if (!bt_PlugManager.plugins[i].km) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseDbClick) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseDbClick(button_id, x, y)) return;
				}
			}
			bt_DefaultGUIAction.km.onMouseDbClick(button_id, x, y);
		},

		onMouseWheel: function (delta, x, y) {
			for (var i in bt_PlugManager.plugins) {
				if (bt_PlugManager.plugins[i].isActive) {
					if (!bt_PlugManager.plugins[i].km) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseWheel) continue;
					if (!bt_PlugManager.plugins[i].km.onMouseWheel(delta, x, y)) return;
				}
			}
			bt_DefaultGUIAction.km.onMouseWheel(delta, x, y);
		},
		
		onKeyDown: function(key) {
			for (var i in bt_PlugManager.plugins) {
				if (bt_PlugManager.plugins[i].isActive) {
					if (!bt_PlugManager.plugins[i].km) continue;
					if (!bt_PlugManager.plugins[i].km.onKeyDown) continue;
					if (!bt_PlugManager.plugins[i].km.onKeyDown(key)) return;
				}
			}
			bt_DefaultGUIAction.km.onKeyDown(key);			
		},
		
		onKeyUp: function(key) {
			for (var i in bt_PlugManager.plugins) {
				if (bt_PlugManager.plugins[i].isActive) {
					if (!bt_PlugManager.plugins[i].km) continue;
					if (!bt_PlugManager.plugins[i].km.onKeyUp) continue;
					if (!bt_PlugManager.plugins[i].km.onKeyUp(key)) return;
				}
			}
			bt_DefaultGUIAction.km.onKeyUp(key);			
		}
	}, //KM

	tp: {

	},  //TP
	
	events: {},
	addEventListener: function (e, f) {
		if (!bt_PlugManager.events[e]) {
			bt_PlugManager.events[e] = {};
		}
		var event = bt_PlugManager.events[e];
		if (!event[f]) {
			event[f] = f;
		}
	},	
	removeEventListener: function (e, f) {
		if (!bt_PlugManager.events[e]) return;
		var event = bt_PlugManager.events[e];
		if (!event[f]) return;
		delete event[f];
	},
	on_BTEvent: function (e) {
		var event_param = [];
		for (var i = 1; i < e.length; i++) {
			event_param[i - 1] = e[i];
		}
		var event = bt_PlugManager.events[e[0]];
		if (!event) return;
		for (var ef in event) {
			event[ef](event_param);
		}
	}
}


var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			Chrome: u.indexOf('Chrome') > -1,
			MSIE: u.indexOf('Trident') > -1 || u.indexOf('MSIE') > -1,
			OPR: u.indexOf('Presto') > -1 || u.indexOf('OPR') > -1,
			webKit: u.indexOf('AppleWebKit') > -1 || u.indexOf('Safari') > -1,
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
			mobile: !!u.match(/AppleWebKit.*Mobile.*/),
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
			iPad: u.indexOf('iPad') > -1,
			webApp: u.indexOf('Safari') == -1,
			Firefox: u.indexOf('Firefox') > -1
		};
	}()
}


function getDistance(x1, y1, x2, y2) {
	return Math.sqrt((Math.abs(x1 - x2)) * (Math.abs(x1 - x2)) + (Math.abs(y1 - y2)) * (Math.abs(y1 - y2)));
}
if (browser.versions.mobile || browser.versions.android || browser.versions.iPhone || browser.versions.iPad) {
	touch.config = {
		tap: false,
		doubleTap: false,
		hold: false,
		holdTime: 650,
		swipe: false,
		swipTime: 300,
		swipMinDistance: 18,
		swipFactor: 0.1,
		drag: true,
		pinch: true
	};

	var action = "";

	touch.on('#canvasgl', 'touchstart', function (ev) {
		ev.preventDefault();
	});
	touch.on('#canvasgl', 'dragstart', function (ev) {
		if (ev.originEvent.changedTouches.length == 1) {
			var loc = getPointOnCanvas(ev.target, ev.originEvent.changedTouches[0].clientX, ev.originEvent.changedTouches[0].clientY);
			bt_DefaultGUIAction.km.onMouseButtonDown(0, parseInt(loc.x), parseInt(loc.y));
			action = "drag";
		}
		ev.preventDefault();
	});
	touch.on('#canvasgl', 'drag', function (ev) {
		if (ev.originEvent.changedTouches.length == 1) {
			var loc = getPointOnCanvas(ev.target, ev.originEvent.changedTouches[0].clientX, ev.originEvent.changedTouches[0].clientY);
			bt_DefaultGUIAction.km.onMouseMove(parseInt(loc.x), parseInt(loc.y));
			action = "drag";
		}
		ev.preventDefault();
	});
	touch.on('#canvasgl', 'dragend', function (ev) {
		var loc = getPointOnCanvas(ev.target, ev.originEvent.changedTouches[0].clientX, ev.originEvent.changedTouches[0].clientY);
		bt_DefaultGUIAction.km.onMouseButtonUp(0, parseInt(loc.x), parseInt(loc.y));
		action = "";
	});

	//touch.on("#canvasgl", "doubletap", function (ev) {
	//	var loc = getPointOnCanvas(ev.target, ev.originEvent.changedTouches[0].clientX, ev.originEvent.changedTouches[0].clientY);
	//	bt_DefaultGUIAction.transformTo(parseInt(loc.x), parseInt(loc.y));
	//});
	
	var last_touch_end = 0;
	touch.on('#canvasgl', 'touchend', function (ev) {
		if (action == "") {
			var t = new Date();
			var et = t.getTime();
			if (et - last_touch_end < 300){
				var loc = getPointOnCanvas(ev.target, ev.originEvent.changedTouches[0].clientX, ev.originEvent.changedTouches[0].clientY);
				bt_DefaultGUIAction.transformTo(parseInt(loc.x), parseInt(loc.y));
			}
			last_touch_end = et;
		}
	});
	
	var ps_x1, ps_y1, ps_x2, ps_y2;
	touch.on('#canvasgl', 'pinch', function (ev) {
		var x1 = ev.originEvent.changedTouches[0].clientX;
		var y1 = ev.originEvent.changedTouches[0].clientY;
		var x2 = ev.originEvent.changedTouches[1].clientX;
		var y2 = ev.originEvent.changedTouches[1].clientY;

		if (action == "") {
			action = "start";
			ps_x1 = x1; ps_y1 = y1; ps_x2 = x2; ps_y2 = y2;
		}
		else if (action == "start") {
			var diststart = getDistance(ps_x1, ps_y1, ps_x2, ps_y2);
			var distnow = getDistance(x1, y1, x2, y2);

			if (Math.abs(distnow - diststart) >= 10) {
				action = "pinch";
				ps_x1 = x1; ps_y1 = y1; ps_x2 = x2; ps_y2 = y2;
				bt_DefaultGUIAction.pinchBegan();
			}
			else if (Math.abs((ps_x1 + ps_x2) / 2 - (x1 + x2) / 2) >= 10) {
				action = "rotatex";
				ps_x1 = x1; ps_y1 = y1; ps_x2 = x2; ps_y2 = y2;
				bt_DefaultGUIAction.rotateBegan(parseInt((x1 + x2) / 2), parseInt((y1 + y2) / 2));
			}
			else if (Math.abs((ps_y1 + ps_y2) / 2 - (y1 + y2) / 2) >= 10) {
				action = "rotatey";
				ps_x1 = x1; ps_y1 = y1; ps_x2 = x2; ps_y2 = y2;
				bt_DefaultGUIAction.rotateBegan(parseInt((x1 + x2) / 2), parseInt((y1 + y2) / 2));
			}
		}
		else if (action == "pinch") {
			var diststart = getDistance(ps_x1, ps_y1, ps_x2, ps_y2);
			var distnow = getDistance(x1, y1, x2, y2);
			var scale = distnow / diststart;
			bt_DefaultGUIAction.pinch(scale);
		}
		else if (action == "rotatex") {
			bt_DefaultGUIAction.rotate(parseInt((x1 + x2) / 2), parseInt((ps_y1 + ps_y2) / 2));
		}
		else if (action == "rotatey") {
			bt_DefaultGUIAction.rotate(parseInt((ps_x1 + ps_x2) / 2), parseInt((y1 + y2) / 2));
		}
	});
	touch.on('#canvasgl', 'pinchend', function (ev) {
		action = "";
		ev.preventDefault();
	});
}
else {
	var timer = null;
	var click_times = 0;
	var down_x = -1;
	var down_y = -1;
	var down_key = -1;

	function bt_canvase_onMouseMove(event) {
		var loc = getPointOnCanvas(bt_canvasgl, event.clientX, event.clientY);
		if (loc.x != down_x || loc.y != down_y) {
			bt_PlugManager.km.onMouseMove(loc.x, loc.y);
			event.preventDefault();
			event.stopImmediatePropagation();

			if (click_times == 1) {
				bt_PlugManager.km.onMouseClick(down_key, down_x, down_y);
			}
			else if (click_times == 2) {
				bt_PlugManager.km.onMouseDbClick(down_key, down_x, down_y);
			}

			down_key = -1;
			click_times = 0;
			clearTimeout(timer);
		}
	}

	function bt_canvase_onMouseDown(event) {
		var loc = getPointOnCanvas(bt_canvasgl, event.clientX, event.clientY);

		bt_PlugManager.km.onMouseButtonDown(event.button, loc.x, loc.y);
		event.preventDefault();
		event.stopImmediatePropagation();

		clearTimeout(timer);
		down_x = loc.x;
		down_y = loc.y;
		down_key = event.button;
	}

	function bt_canvase_onMouseUp(event) {
		var loc = getPointOnCanvas(bt_canvasgl, event.clientX, event.clientY);
		bt_PlugManager.km.onMouseButtonUp(event.button, loc.x, loc.y);
		event.preventDefault();
		event.stopImmediatePropagation();

		clearTimeout(timer);
		if (down_x == loc.x && down_y == loc.y && event.button == down_key) {
			click_times++;

			timer = setTimeout(function () {
				if (click_times == 1) {
					bt_PlugManager.km.onMouseClick(down_key, down_x, down_y);
				}
				else if (click_times > 1) {
					bt_PlugManager.km.onMouseDbClick(down_key, down_x, down_y);
				}

				click_times = 0;
				down_key = -1;
			}, 300);
		}
		else {
			down_key = -1;
			click_times = 0;
		}
	}

	function bt_canvase_onMouseWheel(event) {
		delta = event.wheelDelta ? (event.wheelDelta / 120) : (-event.detail / 3);
		var loc = getPointOnCanvas(event.target, event.clientX, event.clientY);
		bt_PlugManager.km.onMouseWheel(delta, loc.x, loc.y);
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
	function bt_canvase_onKeyDown(event) {
		bt_PlugManager.km.onKeyDown(event.key);
	}
	
	function bt_canvase_onKeyUp(event) {
		bt_PlugManager.km.onKeyUp(event.key);
	}

	bt_canvasgl.addEventListener("mousemove", bt_canvase_onMouseMove, true);
	bt_canvasgl.addEventListener("mousedown", bt_canvase_onMouseDown, true);
	bt_canvasgl.addEventListener("mouseup", bt_canvase_onMouseUp, true);
	bt_canvasgl.oncontextmenu = function (e) {
		e.preventDefault();
		e.stopImmediatePropagation();
	}
	if (browser.versions.Firefox)
		bt_canvasgl.addEventListener("DOMMouseScroll", bt_canvase_onMouseWheel, true);
	else
		bt_canvasgl.addEventListener("mousewheel", bt_canvase_onMouseWheel, true);
	
	bt_canvasgl.addEventListener("keydown", bt_canvase_onKeyDown, true);
	bt_canvasgl.addEventListener("keyup", bt_canvase_onKeyUp, true);
	bt_canvasgl.focus();
}


var JS_BT_FireEvent = function (event) {
	bt_PlugManager.on_BTEvent(event);
	if (event[0] == "Render\\OnFinalBlend")
	{
		//渲染结束事件：
	}
	else if (event[0] == "Plugin\\ModelInstanceQuery\\OnInstanceSelected")
	{
		//实例被选中事件
	}
	else if (event[0] == "Plugin\\ModelInstanceQuery\\OnInstanceUnselected")
	{
		//实例被取消选中事件
	}
	return;
}
