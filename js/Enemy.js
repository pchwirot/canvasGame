var Enemy = function(){
	this.x=0;
	this.y=0;
	this.width=30;
	this.height=30;
	this.speed = 1;
	this.hp=2;
	this.max_hp=2;
	this.killPower=1;
	this.model=new Image();
	this.offset=10;
	this.enemy_hp_bar = function(hp,x,y,width,max_hp,bar_width){
		ctx.fillStyle="#FF0000";	
		ctx.fillRect(x+width/4,y,width/2 * (hp / max_hp), 1);
	}
	
	this.tx = this.x - Player.player_x;
	this.ty = this.y - Player.player_y;
	
	this.angle = Math.atan2(this.ty,this.tx);

	this.dx = -1*Math.cos(this.angle)*this.speed;
	this.dy = -1*Math.sin(this.angle)*this.speed;
	
	this.targetX = Player.player_x;
	this.targetY = Player.player_y;
	
	this.directionX = this.targetX - this.x;
	this.directionY = this.targetY - this.y;
};

var Enemies = {
	createEnemies:function(){
		var enemy_x = 0;
		for(var i=0; i<Game.max_enemies_count; i++){
			enemiesHolder.push(new Enemy());
			enemiesHolder[i].x += enemy_x + Game.getRandomInt(10,Game.width-enemiesHolder[i].width*enemiesHolder.length);
			enemiesHolder[i].model.src = Materials.enemyModel;
			enemy_x += enemiesHolder[i].offset;
		}
	},
	destroyEnemy:function(){
		for(var i=0; i<enemiesHolder.length; i++){
			if(enemiesHolder[i].hp <= 0){
				Player.player_exp +=10;
				enemiesHolder.splice(i,1);
				enemiesHolder.push(new Enemy());
				enemiesHolder[enemiesHolder.length-1].x = Game.getRandomInt(50,Game.width-50)
				enemiesHolder[enemiesHolder.length-1].model.src = Materials.enemyModel;
			}
		}
	},
	drawEnemies:function(mode){
		for(var i=0; i<enemiesHolder.length; i++){			
			if(mode){
				ctx.fillStyle='#0f0';
				ctx.fillRect(enemiesHolder[i].x,enemiesHolder[i].y,enemiesHolder[i].width,enemiesHolder[i].height);
			}else{
				ctx.drawImage(enemiesHolder[i].model,enemiesHolder[i].x,enemiesHolder[i].y);
			}
			enemiesHolder[i].enemy_hp_bar(
				enemiesHolder[i].hp,
				enemiesHolder[i].x,
				enemiesHolder[i].y,
				enemiesHolder[i].width,
				enemiesHolder[i].max_hp,
				4
				);
		}
		Enemies.moveEnemies();
	},
	moveEnemies:function(){
		
		for(var i=0; i<enemiesHolder.length; i++){
			if(enemiesHolder[i].y < Game.height){
				
				enemiesHolder[i].tx = enemiesHolder[i].x - Player.player_x;
				enemiesHolder[i].ty = enemiesHolder[i].y - Player.player_y;

				enemiesHolder[i].angle = Math.atan2(enemiesHolder[i].ty,enemiesHolder[i].tx);
				
				enemiesHolder[i].dx = -1*Math.cos(enemiesHolder[i].angle)*enemiesHolder[i].speed;
				enemiesHolder[i].dy = -1*Math.sin(enemiesHolder[i].angle)*enemiesHolder[i].speed;
				
				enemiesHolder[i].targetX = Player.player_x;
				enemiesHolder[i].targetY = Player.player_y;
				
				enemiesHolder[i].directionX = enemiesHolder[i].targetX - enemiesHolder[i].x;
				enemiesHolder[i].directionY = enemiesHolder[i].targetY - enemiesHolder[i].y;
				
				enemiesHolder[i].x += enemiesHolder[i].dx;					
				enemiesHolder[i].y += enemiesHolder[i].dy;
				
			}else if(enemiesHolder[i].y > Game.height - 1){
				enemiesHolder[i].y = -45;				
			}
		}
	}  
}
