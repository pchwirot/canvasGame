var Bullet = function(_model,_x,_y,_speed){
	this.angle = angle;
	this.x = _x;
	this.y = _y;
	this.speed = _speed;
	this.tx = Player.player_x - Game.x_mouse;
	this.ty = Player.player_y - Game.y_mouse;
	this.angle = Math.atan2(this.ty,this.tx);

	this.dx = -1*Math.cos(this.angle)*this.speed;
	this.dy = -1*Math.sin(this.angle)*this.speed;
	
	this.targetX = Game.x_mouse;
	this.targetY = Game.y_mouse;
	
	this.directionX = this.targetX - Player.player_x;
	this.directionY = this.targetY - Player.player_y;
	
	this.model = _model = new Image();

	this.counter=0;
	this.ttl=1;
	this.bulletLoop = function(el,index){
		el.counter++;
		if(el.counter == Game.fps){
			el.ttl -=1;
			if(el.ttl == 0){
				Bullets.bulletsHolder.splice(index,1);
			}
		}

	}
}

var Bullets = {
	bulletsTotal:20,
	bulletsHolder:[],
	
	drawBullet:function(){
		ctx.save();
		for(var i=0; i< Bullets.bulletsHolder.length; i++){
			Bullets.bulletsHolder[i].model.src = Materials.bulletModel;
			
			ctx.setTransform(1,0,0,1,0,0);
			var rotation = 90;
			var angleInRadians = rotation * Math.PI / 180;
			ctx.translate(Bullets.bulletsHolder[i].x, Bullets.bulletsHolder[i].y);
			ctx.rotate(Bullets.bulletsHolder[i].angle-angleInRadians);
			ctx.drawImage(Bullets.bulletsHolder[i].model,0,0);
			
		}
		Bullets.moveBullet();
		ctx.restore();
	},
	moveBullet:function(){
		for(var i=0; i<Bullets.bulletsHolder.length; i++){
			Bullets.bulletsHolder[i].x += Bullets.bulletsHolder[i].dx;
			Bullets.bulletsHolder[i].y += Bullets.bulletsHolder[i].dy;
			Bullets.bulletsHolder[i].bulletLoop(Bullets.bulletsHolder[i],i);
			
			
		}
	},
	shoot:function(){
		Bullets.bulletsHolder.push(new Bullet(Materials,Player.player_x, Player.player_y, 15));
	}
}
