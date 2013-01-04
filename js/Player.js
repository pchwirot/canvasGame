var Player = {
    player_x:Game.width / 2 - 25,
    player_y:Game.height - 75,
	player_start_x:Game.width / 2 - 25,
	player_start_y:Game.height - 75,
	angleInRadians:90 * Math.PI / 180,
	player_angle:0,
    player_width:41,
    player_height:49,
    player_speed:0,
	player_hp:10,
	player_exp:0,
	player_level:1,
	player_model:new Image(),
	player_dmg:1,
	player_acceleration:0,
    moveKeys:{
        rightKey:false,
        leftKey:false,
        upKey:false,
        downKey:false
    },
	moveKeysBind:{
		right:68,//d
        left:65,//a
        up:87,//w
        down:83,//s
		fire:32//space
	},
    keyDown:function (e) {
        if (e.keyCode == Player.moveKeysBind.right) {
            Player.moveKeys.rightKey = true;
        }
        else if (e.keyCode == Player.moveKeysBind.left) {
            Player.moveKeys.leftKey = true;
        }
        if (e.keyCode == Player.moveKeysBind.up) {
            Player.moveKeys.upKey = true;
        }
        else if (e.keyCode == Player.moveKeysBind.down) {
            Player.moveKeys.downKey = true;//s
        }
		if(e.keyCode == Player.moveKeysBind.fire && Bullets.bulletsHolder.length <= Bullets.bulletsTotal){
			Bullets.shoot()
		}
    },
    keyUp:function (e) {
        if (e.keyCode == Player.moveKeysBind.right) {
            Player.moveKeys.rightKey = false;
        }
        else if (e.keyCode == Player.moveKeysBind.left) {
            Player.moveKeys.leftKey = false;
        }
        if (e.keyCode == Player.moveKeysBind.up) {
            Player.moveKeys.upKey = false;
        }
        else if (e.keyCode == Player.moveKeysBind.down) {
            Player.moveKeys.downKey = false;
        }
    },
    movement:function () {
		
		//Player.player_speed += Player.player_acceleration; 
		Player.player_x += Player.player_speed * Math.cos(Player.player_angle);
		Player.player_y += Player.player_speed * Math.sin(Player.player_angle);
		
        if (Player.moveKeys.rightKey) {
            Player.player_speed = 5;
			Player.player_angle = 0;
        }
         if (Player.moveKeys.leftKey) {
            Player.player_speed = -5;
			Player.player_angle = 0;
        }
        if (Player.moveKeys.upKey) {
            Player.player_speed = -5;
			Player.player_angle = 1.5707963267948966;//90 stopni w radianach
        }
         if (Player.moveKeys.downKey) {
            Player.player_speed = 5;
			Player.player_angle = 1.5707963267948966;
        }
		else{
            Player.player_speed *= 0.9;
        }

		if(Player.player_x <= Player.player_width/2){
			Player.player_x = Player.player_width/2;
		}
		if((Player.player_x + Player.player_width/2) >= Game.width){
			Player.player_x = Game.width - Player.player_width/2;
		}
		if(Player.player_y <= Player.player_height/2){
			Player.player_y = Player.player_height/2;
		}
		if((Player.player_y + Player.player_height/2) >= Game.height){
			Player.player_y = Game.height - Player.player_height/2;
		}
    },
	mouseClick:function(e){
		if(Bullets.bulletsHolder.length <= Bullets.bulletsTotal && Game.mouseShoot){
			Bullets.shoot();
		}
	},
	drawPlayer:function (mode) {
		Player.player_model.src = Materials.playerModel;
		ctx.save();
		var dockX = 0-Player.player_width/2;
		var dockY = 0-Player.player_height/2;
		ctx.setTransform(1,0,0,1,0,0);
		ctx.translate(Player.player_x, Player.player_y);
		ctx.rotate(angle-Player.angleInRadians);
		if(mode){
			ctx.fillStyle='#f00';
			ctx.fillRect(dockX,dockY,Player.player_width,Player.player_height);
		}else{
			ctx.drawImage(Player.player_model,dockX, dockY,Player.player_width,Player.player_height);
		}	
		ctx.restore();
        document.addEventListener('keydown', Player.keyDown, false);
        document.addEventListener('keyup', Player.keyUp, false);
		document.addEventListener('click', Player.mouseClick, false);
		
        Player.movement();
    },
};
