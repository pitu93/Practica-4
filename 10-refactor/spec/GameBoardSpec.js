/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/
describe("Clase GameBoard", function(){

    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

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

    it("add", function(){
	
	var tablero=new GameBoard();
	spyOn(tablero, "add").andCallThrough();
	var objeto={};

	expect(tablero.objects.length).toEqual(0);
	tablero.add(objeto);

	expect(tablero.add).toHaveBeenCalled();
	expect(tablero.objects.length).toEqual(1);

    });

    it("remove", function(){

	var tablero=new GameBoard();
	spyOn(tablero, "remove").andCallThrough();
	var objeto={};
	
	tablero.add(objeto);
	expect(tablero.objects.length).toEqual(1);

	tablero.resetRemoved();
	tablero.remove(objeto);
	tablero.finalizeRemoved();

	expect(tablero.remove).toHaveBeenCalled();
	expect(tablero.objects.length).toEqual(0);
    });

    it("iterate", function(){
		
	var tablero=new GameBoard();
	spyOn(tablero, "iterate").andCallThrough();
	
	var objeto ={foo : function(){tablero.add(this)}};
	tablero.add(objeto);
	
	
	tablero.iterate("foo");

	expect(tablero.iterate).toHaveBeenCalled();
	expect(tablero.objects.length).toEqual(2);

    });

    it("detect", function(){
		
	var tablero=new GameBoard();
	spyOn(tablero, "detect").andCallThrough();

	var objeto={};
	tablero.add(objeto);
	
	function verdad(object){return true};
	tablero.detect(verdad);


	expect(tablero.detect(verdad)).toBe(objeto);

    });

    it("draw", function(){
		
	var tablero=new GameBoard();
	spyOn(tablero, "draw").andCallThrough();
	var objeto={};
	tablero.draw(objeto);

	expect(tablero.draw).toHaveBeenCalledWith({});

    });

    it("overlap", function(){
		
	var tablero=new GameBoard();
	spyOn(tablero, "overlap").andCallThrough();
	var o1={x:0,w:3,y:1,h:3};
	var o2={x:2,w:4,y:1,h:4};

	expect(tablero.overlap(o1,o2)).toBeTruthy();

    });

    it("collide", function(){
		
	var tablero=new GameBoard();
	spyOn(tablero, "collide").andCallThrough();
	var o1={x:0,w:3,y:1,h:3};
	var o2={x:2,w:4,y:1,h:4};

	tablero.add(o1);

	expect(tablero.collide(o2)).toBe(o1);

    });
});

