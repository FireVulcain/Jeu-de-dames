class Player {
	constructor(color, game, pdv = 20) {
		this.color 		= color;
		this.canPlay 	= false;
		this.pawns 		= [];
		this.game = game;
		this.pdv = pdv;
	}

	losesPlayer(){
		if(this.color == "white"){
            $('.whichPlayer').empty().append("Le pion blanc à perdu");
		}else{
            $('.whichPlayer').empty().append("Le pion noir à perdu");
		}

	}
}