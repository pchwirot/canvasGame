var CanvasClick = {
	createClickMap:function(canvas,ctx,x,y,w,h,f){
		var m = function(x,y,w,h,mx,my){
			var xEnd;
			var yEnd;
			
			if(mx > x && mx < xEnd){
				if(my >y && my < yEnd){
					return true;	
				}
			}
			return false;	
		}
		$(canvas).click(function(v){
			console.log('canvasClick')
			var mX = v.pageX - this.offetLeft;
			var mY = v.pageY - this.offsetTop;
			if(m(x,y,w,h,mx,my)){
				f();
			}
		});
	},
	drawRectangle:function(canvas,ctx,x,y,w,h,f){
		ctx.fillRect(0,0,10,10);
		
	}
}
