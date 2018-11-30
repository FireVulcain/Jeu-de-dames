class Player {
	constructor(color, game, pdv = 20) {
		this.color 		= color;
		this.canPlay 	= false;
		this.pawns 		= [];
		this.game = game;
		this.pdv = pdv;
	}

	losesPlayer(){
		$('.whichPlayer').empty().append(this.color + " à perdu");
	}
}