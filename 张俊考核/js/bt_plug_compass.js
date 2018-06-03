var bt_Plug_Compass = {
	isActive: true,
	img: 1,
	canvas: 1,

	on_Render_FinalBlend: function(event_param) {
		var canvas = bt_Plug_Compass.canvas;
		canvas.width = bt_Plug_Compass.img.width;
		canvas.height = bt_Plug_Compass.img.height;
		var ctx = canvas.getContext("2d");

		var cam_param = bt_Util.getCameraParam();
		var dx = cam_param.lookatPt.x - cam_param.cameraPt.x;
		var dy = cam_param.lookatPt.y - cam_param.cameraPt.y;
		var dz = cam_param.lookatPt.z - cam_param.cameraPt.z;
		if (dx == 0 && dy == 0) {
			dx = cam_param.upVec.x;
			dy = cam_param.upVec.y;
			if (dz > 0) {
				dy = -dy;
				dx = -dx;
		   }
		}
		var rot = -Math.PI / 2 + Math.atan2(dy, dx);

		canvas.style.left = (document.getElementById("canvasgl").width - bt_Plug_Compass.img.width) + "px";
		canvas.style.top = 0 + "px";
		ctx.save();
		ctx.translate(bt_Plug_Compass.img.width / 2, bt_Plug_Compass.img.height / 2);
		ctx.rotate(rot);
		ctx.drawImage(bt_Plug_Compass.img, -bt_Plug_Compass.img.width / 2, -bt_Plug_Compass.img.height / 2);
		ctx.restore();
	}
}

bt_Plug_Compass.canvas = document.createElement('canvas');
bt_Plug_Compass.canvas.style.position = "absolute";
bt_Plug_Compass.canvas.style.zIndex = 100;
document.getElementById("bt_container").appendChild(bt_Plug_Compass.canvas);

bt_Plug_Compass.img = new Image();
bt_Plug_Compass.img.src = "image/compass.png";

bt_PlugManager.plugins.push(bt_Plug_Compass);
bt_PlugManager.addEventListener("Render\\FinalBlend", bt_Plug_Compass.on_Render_FinalBlend);