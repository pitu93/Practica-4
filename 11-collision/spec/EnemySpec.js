
describe("Clase EnemySpec", function(){

    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	sprites = {
	    ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
	    missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
	    enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
	    enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
	    enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
	    enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 }
	};

	var enemies = {
    
    basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }

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
	//Como no se cumplen las condiciones no entra a eliminarse

    });

   
});

