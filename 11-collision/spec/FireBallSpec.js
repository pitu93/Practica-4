
describe("Clase FireBallSpec", function(){

    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	sprites = {
	    explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
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


    it("FireBall", function(){

	var bola =new BolaFuego(200,0);
	spyOn(bola, "step").andCallThrough();
	
	var dt=1;
	bola.step(dt);

	expect(bola.x).toBe(200-sprites.explosion.w/2 + bola.vx * dt);
	expect(bola.y).toBe(-sprites.explosion.h -1500 * dt);
	expect(bola.vy).toBe(-1500*dt + 150);
	//Como no se cumplen las condiciones no entra a eliminarse

    });

   
});
