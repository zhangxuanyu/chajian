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
	
	//统计标记数量？？？
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
bt_Plug_Annotation.setAnnotation("a2", 26.99, -8.67, 48.5, -8, -16, "<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "嘿" + "</span></div>", true);
//删除标注：
//bt_Plug_Annotation.removeAnnotation("a1");
bt_Plug_Annotation.removeAnnotation("a2");