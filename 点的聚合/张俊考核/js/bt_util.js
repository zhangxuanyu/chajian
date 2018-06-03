var bt_Util = {
	//执行脚本
	executeScript: function (scp) {
		var log = BT_LogCreate();
		BT_BodyExecuteScript(g_Body, scp, log);
		var log_count = BT_LogGetCount(log);
		var result = new Array();
		for (var i = 0; i < log_count; i++) {
			result[i] = Module.Pointer_stringify(BT_LogGetLog(i, log));
		}
        BT_LogRelease(log);
		return result;
	},
	
	//计算空间坐标中的点在屏幕坐标系中的位置。返回的x、y为像素坐标，返回的z大于1或小于0时表明点位于远近平面之外，不可见
    worldToScreen: function (x, y, z) {
        var scp = "Render\\Camera\\WorldToScreen " + x + " " + y + " " + z + ";";
		var r = this.executeScript(scp);
		if (r.length > 0) {
            var s = r[0].split(' ');
            if (s.length > 2) {
                return {
                    x: parseInt(s[0]),
                    y: parseInt(s[1]),
                    z: parseFloat(s[2])
                }
            }
		}
    },

	//尝试获取屏幕坐标系中的点在世界坐标系中的位置。若该点击中了场景中的物体，返回的hit为1，否则为0
	screenToWorld: function (x, y) {
        var scp = "Render\\CameraControl\\QueryPointPosInWindow " + parseInt(x) + " " + parseInt(y) + ";";
		var r = this.executeScript(scp);
		if (r.length > 0) {
            var s = r[0].split(' ');
            if (s.length > 3) {
                return {
					hit: parseInt(s[0]),
                    x: parseFloat(s[1]),
                    y: parseFloat(s[2]),
                    z: parseFloat(s[3])
                }
            }
		}
	},

	//获取当前的相机参数
    getCameraParam: function () {
        var scp = "Render\\Camera\\GetParam;";
		var r = this.executeScript(scp);
		if (r.length > 0) {
            var s = r[0].split(' ');
            if (s.length > 8) {
                return {
                    cameraPt:{
                        x: parseFloat(s[0]),
                        y: parseFloat(s[1]),
                        z: parseFloat(s[2])
                    },
                    lookatPt: {
                        x: parseFloat(s[3]),
                        y: parseFloat(s[4]),
                        z: parseFloat(s[5])
                    },
                    upVec: {
                        x: parseFloat(s[6]),
                        y: parseFloat(s[7]),
                        z: parseFloat(s[8])
                    }
                }
            }
		}
    },

    //线段与场景相交检测，输入参数为线段起点x、y、z、线段终点x、y、z；返回对象中，若intersected为0则未相交，为1则x、y、z为交点坐标
    lineIntersect: function (sx, sy, sz, ex, ey, ez) {
        var scp = "Render\\CameraControl\\LineIntersect " + sx + " " + sy + " " + sz + " " + ex + " " + ey + " " + ez + ";";
		var r = this.executeScript(scp);
		if (r.length > 0) {
            var s = r[0].split(' ');
            if (s.length > 3) {
                return {
                    intersected: parseInt(s[0]),
                    x: parseFloat(s[1]),
                    y: parseFloat(s[2]),
                    z: parseFloat(s[3])
                }
            }
		}
    }
}
