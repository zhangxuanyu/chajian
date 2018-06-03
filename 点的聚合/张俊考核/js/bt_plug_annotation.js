var bt_Plug_Annotation = {
	isActive: true,
	annotations: {},
	anno_iter_count: 0,

	Annotation: function (id, shift_x, shift_y) {
		this.id = id;
		this.shift_x = shift_x;
		this.shift_y = shift_y;
		var div = document.createElement("div");

		div.addEventListener("mousemove", function (event) {
			var bbox = div.getBoundingClientRect();
			event.clientX += bbox.left;
			event.clientY += bbox.top;
			bt_canvase_onMouseMove(event);
		}, false);
		div.addEventListener("mousedown", function (event) {
			var bbox = div.getBoundingClientRect();
			event.clientX += bbox.left;
			event.clientY += bbox.top;
			bt_canvase_onMouseDown(event);
		}, false);
		div.addEventListener("mouseup", function (event) {
			var bbox = div.getBoundingClientRect();
			event.clientX += bbox.left;
			event.clientY += bbox.top;
			bt_canvase_onMouseUp(event);
		}, false);

		div.className = "bt_ui_element";
		var textNode = document.createElement('div');
		div.appendChild(textNode);

		document.getElementById("bt_container").appendChild(div);
		this.textNode = textNode;
		this.div = div;
		this.visible = true;
	},

	refreshAnnotationPos: function (anno) {
		var loc = bt_Util.worldToScreen(anno.x, anno.y, anno.z);
		if (loc.z > 0 && loc.z < 1 && !anno.occlusive) {
			anno.div.style.display = "block";
			anno.div.style.left = Math.floor(loc.x + anno.shift_x) + "px";
			anno.div.style.top = Math.floor(loc.y + anno.shift_y) + "px";
		}
		else {
			anno.div.style.display = "none";
		}
	},
	
	refreshAnnotationOcclusion: function(anno) {
		if (anno.occlusable){
			var c_pt = bt_Util.getCameraParam().cameraPt;
			if (0 != bt_Util.lineIntersect(c_pt.x, c_pt.y, c_pt.z, anno.x, anno.y, anno.z).intersected) {
				anno.occlusive = true;
			}
			else {
				anno.occlusive = false;
			}
		}
		else {
			anno.occlusive = false;
		}
	},
	
	refreshOcclusion: function () {
		var iter = 0;
		for (var anno in bt_Plug_Annotation.annotations) {
			if (iter == bt_Plug_Annotation.anno_iter_count) {
				bt_Plug_Annotation.refreshAnnotationOcclusion(bt_Plug_Annotation.annotations[anno]);
			}
		}

		bt_Plug_Annotation.anno_iter_count++;
		if (bt_Plug_Annotation.anno_iter_count >= iter) {
			bt_Plug_Annotation.anno_iter_count = 0;
		}
	},

	setAnnotation: function (id, x, y, z, shift_x, shift_y, inner_text, occlusable) {
		var anno = bt_Plug_Annotation.annotations[id];
		if (!anno) {
			anno = new bt_Plug_Annotation.Annotation(id, shift_x, shift_y);
		}
		anno.x = x;
		anno.y = y;
		anno.z = z;
		anno.textNode.innerHTML = inner_text;
		anno.occlusive = false;
		anno.occlusable = occlusable;
		bt_Plug_Annotation.refreshAnnotationPos(anno);
		bt_Plug_Annotation.annotations[id] = anno;
	},

	removeAnnotation: function (id) {
		var anno = bt_Plug_Annotation.annotations[id];
		if (anno) {
			document.getElementById("bt_container").removeChild(anno.div);
		}
		delete bt_Plug_Annotation.annotations[id];
	},

	on_Render_BeforeRender: function(event_param) {
		for (var anno in bt_Plug_Annotation.annotations) {
			bt_Plug_Annotation.refreshAnnotationPos(bt_Plug_Annotation.annotations[anno]);
		}
	}
}

setInterval("bt_Plug_Annotation.refreshOcclusion()", 20);

bt_PlugManager.plugins.push(bt_Plug_Annotation);
bt_PlugManager.addEventListener("Render\\BeforeRender", bt_Plug_Annotation.on_Render_BeforeRender);

//设置标注：
//bt_Plug_Annotation.setAnnotation(标注的唯一ID, 标注的空间坐标x, 标注的空间坐标y, 标注的空间坐标z, 标注在屏幕坐标中的x偏移（以像素为单位）, 标注在屏幕坐标中的y偏移（以像素为单位）, 标注的innerHtml, 标注是否进行遮挡测试);
bt_Plug_Annotation.setAnnotation("a1", 26.78, -7.67, 49.5, -8, -16, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "水池" + "</span></div>", true);

//bt_Plug_Annotation.setAnnotation("a2", 319, 300, 495, 0, 0, '<div style="width: 200px;height: 200px;background-color:rgba(255,168,100,0.2) ;border-radius: 50%;text-align:center;">'+100+'</div>', true);
//bt_Plug_Annotation.setAnnotation("a3", 0, 0, 49.5, -8, -16, '<div style="width: 200px;height: 200px;background-color:rgba(255,168,100,0.2) ;border-radius: 50%;text-align:center;">'+eyeyey+'</div>', true);
bt_Plug_Annotation.setAnnotation("a4", -328.09, 327.32, 105.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
bt_Plug_Annotation.setAnnotation("a5", 321.12, 308.26, 54.08, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点2" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a6", -346.73, -315.14, 50.71, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点3" + "</span></div>", true);
bt_Plug_Annotation.setAnnotation("a7", 302.83, -334.19, 83.76, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点4" + "</span></div>", true);
bt_Plug_Annotation.setAnnotation("a8", 0, 0, 52, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "原点" + "</span></div>", true);


//试用点
//bt_Plug_Annotation.setAnnotation("a9", -28.09, 27.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a10", -38.09, 32.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a11", -28.09, 127.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a12", -228.09, 127.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a13", -110.09, 117.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a14", -118.09, 137.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a15", -148.09, 167.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a16", 128.09, 127.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a17", 228.09, 227.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a18", 228.09, 37.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a19", 38.09, 227.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a20", 39.09, 127.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a21", 218.09, 257.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a22", 148.09, 167.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a23", -228.09, -137.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a24", -58.09, -257.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a25", -68.09, -57.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a26", -118.09, -97.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a27", -128.09, -117.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a28", -218.09, -97.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a29", -98.09, -127.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a31", -78.09, -157.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a32", -88.09, -207.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a42", -28.09, -27.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a43", -38.09, -32.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a44", -28.09, -127.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a45", -228.09, -127.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a46", -110.09, -117.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a47", -118.09, -137.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a48", -148.09, -167.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//
//
//
//
//bt_Plug_Annotation.setAnnotation("a33", 128.09, -37.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a34", 18.09, -97.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a35", 28.09, -87.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a36", 38.09, -117.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a37", 88.09, -137.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a38", 98.09, -39.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a39", 142.09, -38.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a40", 125.09, -83.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);
//bt_Plug_Annotation.setAnnotation("a41", 77.09, -94.32, 85.98, 0, 0, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>", true);

//删除标注：
//bt_Plug_Annotation.removeAnnotation("a1");
//bt_Plug_Annotation.removeAnnotation("a2");