var debugMode = false;

var canvas,	ctx, statsCanvas, ctx2, angle;	
var enemiesHolder = [];
var Materials = {
	playerModel:'img/player.png',
	enemyModel:'img/enemy1.png',
	bulletModel:'img/bullet1.png',
	background1:'img/background_map.png'
};

var Button = function(canvas,ctx,x,y,w,h){
	this.canvas;
	this.ctx;
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;	
	ctx2.fillRect(x,y,w,h);
}

var Game = {
	mouseShoot:true,
    fps:60,
    width:800,
    height:400,
    max_enemies_count:10,
	gameStarted:false,
	x_mouse:0,
	y_mouse:0,
	background_image:new Image(),
    clearCanvas:function () {
        ctx.clearRect(0, 0, Game.width, Game.height);
        //ctx2.clearRect(0, 0, Game.width, 100);
		Game.drawBackground();
    },
    init:function () {
        canvas = document.createElement('canvas');
		canvas.setAttribute('width',Game.width);
		canvas.setAttribute('height',Game.height);
		canvas.setAttribute('id','stage');
		canvas.setAttribute('class','gamePos');
		
		document.body.appendChild(canvas);
		
			
		statsCanvas = document.createElement('canvas');
		statsCanvas.setAttribute('width',Game.width);
		statsCanvas.setAttribute('height',Game.height);
		statsCanvas.setAttribute('id','stats');
		
		$('#playerStats').append(statsCanvas);
		
		Game.background_image.src = Materials.background1;
		ctx = canvas.getContext('2d');
		//ctx2 = statsCanvas.getContext('2d');
        Enemies.createEnemies();
        Game.gameLoop();
		StatsInfo.showStatsButton()
		$(document).mousemove(Game.mousePos);
		StatsInfo.statsButtonsHandlers();
		$('#playerStats').append(statsCanvas);
		
    },
	drawBackground:function(){
		ctx.drawImage(Game.background_image,0,0);
	},
    hitTest:function(){
		var remove = false;
		for(var i=0; i<Bullets.bulletsHolder.length; i++){
			for(var j=0; j<enemiesHolder.length; j++){
				if(
				Bullets.bulletsHolder[i].y >= (enemiesHolder[j].y) &&
				Bullets.bulletsHolder[i].y <= (enemiesHolder[j].y + enemiesHolder[j].height) && 
				Bullets.bulletsHolder[i].x >= enemiesHolder[j].x && 
				Bullets.bulletsHolder[i].x <= (enemiesHolder[j].x + enemiesHolder[j].width)
				){
					enemiesHolder[j].hp -= Player.player_dmg;
					remove = true;
					if(enemiesHolder[j].hp <= 0){ 
						remove = true;
					}
				}
			}
			if(remove == true){
				Bullets.bulletsHolder.splice(i,1);
				remove = false;	
			}
		}
	},
	playerCollision:function() {
		var player_xw = Player.player_x + Player.player_w;
		var player_yh = Player.player_y + Player.player_h;
		for (var i = 0; i < enemiesHolder.length; i++) {
			if(
				Player.player_x + Player.player_width/2 >= enemiesHolder[i].x && 
				Player.player_x <= enemiesHolder[i].x + enemiesHolder[i].width+enemiesHolder[i].width/2 && 
				Player.player_y + Player.player_height/2 >= enemiesHolder[i].y &&
				Player.player_y <= enemiesHolder[i].y + enemiesHolder[i].height+enemiesHolder[i].height/2
				){
					Game.checkLives(enemiesHolder[i].killPower);
					enemiesHolder[i].hp=0;
			}
			
		}
	},
	checkLives:function(enemyKillPower){
		Player.player_hp -= enemyKillPower;
	},
    gameLoop:function () {
        var loop;
		if(Game.gameStarted){
			Game.clearCanvas();
			Player.drawPlayer(debugMode);
			Enemies.drawEnemies(debugMode);
			Bullets.drawBullet();
			Game.playerCollision();
			Game.hitTest();
			//StatsInfo.score();
			Enemies.destroyEnemy();
			Game.testPoint();
			Game.angle();
		}
        loop = setTimeout(Game.gameLoop, 1000 / Game.fps);
    },
    start:function () {
		Game.gameStarted = true;
        Game.init();
    },
	getRandomInt:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	},
	mousePos:function(e){
		Game.x_mouse = 
			e.pageX-parseInt($('#stage').css('margin-left').replace("px",""))+
			parseInt($('#stage').css('margin-right').replace("px",""));
		Game.y_mouse = e
			.pageY-parseInt($('#stage').css('margin-top').replace("px",""))+
			parseInt($('#stage').css('margin-bottom').replace("px",""));
	},
	testPoint:function(){
		ctx.fillStyle = '#ffff00';
		ctx.fillRect(Game.x_mouse,Game.y_mouse,5,5);

	},
	angle:function(){
		var tx = Player.player_x - Game.x_mouse;
		var ty = Player.player_y - Game.y_mouse;
		angle = Math.atan2(ty,tx);
	}
};

var StatsInfo = {
	showStatsButton:function(){
		/*
		var statsButton = document.createElement('div');
		statsButton.setAttribute('width','100');
		statsButton.setAttribute('height','40');
		statsButton.setAttribute('id','statsButton');
		$('#stage').after(statsButton);
		*/
		$('<div id="statsContainer" class="gamePos"></div>').insertAfter('#stage');
		$('#statsContainer').append('<div id="startPause_btn" class="statsButton pauseBtnClass"></div>');
		$('#statsContainer').append('<div id="playerStats_btn" class="statsButton"></div>');
		$('body').append('<div id="playerStats"></div>')
		
	},
	statsButtonsHandlers:function(){
		$('#startPause_btn').click(function(){
			if(Game.gameStarted == true){
				Game.gameStarted = false;
				$('#startPause_btn').removeClass('pauseBtnClass');
				$('#startPause_btn').addClass('startBtnClass');
				$('#playerStats').css('display','none');
				
			}else{
				Game.gameStarted = true;	
				$('#startPause_btn').addClass('pauseBtnClass');
				$('#startPause_btn').removeClass('startBtnClass');	
				$('#playerStats').css('display','none');		
			}
		});
		$('#playerStats_btn').click(function(){
			Game.gameStarted = false;
			$('#startPause_btn').removeClass('pauseBtnClass');
			$('#startPause_btn').addClass('startBtnClass');
			$('#playerStats').css('display','block');
			$('#playerStats').css('top','0px');$('#stage').css('margin-left')
			$('#playerStats').css('left',$('#stage').css('margin-left'));
			$('#playerStats').css('width',Game.width+'px');
			$('#playerStats').css('height',Game.height+'px');
		});
		$('#playerStats').click(function(){
			this.css('display','none');
			Game.gameStarted = true;	
			$('#startPause_btn').addClass('pauseBtnClass');
			$('#startPause_btn').removeClass('startBtnClass');		
		});

	},
	continueButton:function(e){
		console.log('click');
	},
	updateInfo:function(){
		
	},
	score:function(){
		ctx.font = 'bold 12px Arial';
		ctx.fillStyle = '#fff';
		ctx.fillText('Player exp: ', 10, 35);
		ctx.fillText(Player.player_exp, 130, 35);
		
		ctx.fillText('Player hp: ', 10, 50);
		ctx.fillText(Player.player_hp, 130, 50);
		
		ctx.fillText('Angle: ', 10, 80);
		ctx.fillText(Math.floor(angle*180/Math.PI), 130, 80);
		
	}
}

