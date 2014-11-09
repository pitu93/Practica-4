describe("Clase SpriteSpec", function(){

    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');
        var sprites = {
   	    missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }
	};

	var enemies = {
    		basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 4, E: 100 }
	};

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

	oldGame = Game;
	Game = {width: 320, height: 480};

    });

    afterEach(function(){
	Game = oldGame;
    }); 

    it("PlayerShip", function(){
	
	spyOn(SpriteSheet, "draw");

	var miNave = new PlayerShip();

	miNave.draw();

	expect(SpriteSheet.draw).toHaveBeenCalled();
 	expect(SpriteSheet.draw.calls[0].args[1]).toEqual("ship");
 	expect(SpriteSheet.draw.calls[0].args[2]).toEqual(miNave.x);
 	expect(SpriteSheet.draw.calls[0].args[3]).toEqual(miNave.y);
 	expect(SpriteSheet.draw.calls[0].args[4]).toEqual(0);
    });

    it("PlayerMissile", function(){
	
	var misil=new PlayerMissile(1,2);
	spyOn(misil, "draw").andCallThrough();

	expect(misil.y).toBe(2-misil.h);
	expect(misil.x).toBe(1-misil.w/2);
    });

    it("Enemy", function(){
	
	var enemigo =new Enemy(enemies.basic);
	spyOn(enemigo, "step").andCallThrough();
	
	var dt=1;
	enemigo.board = new GameBoard();
	enemigo.step(dt);
	

	expect(enemigo.vx).toBe(100 * Math.sin(4*dt));
	expect(enemigo.vy).toBe(100);
	expect(enemigo.x).toBe(100 + enemigo.vx*dt);
	expect(enemigo.y).toBe(-50 + enemigo.vy*dt);
    });
});
