class Game {

	constructor() {
		this.playerWhite = new Player('white', this);
		this.playerBlack = new Player('black', this);

		this.whichPlayerBegins();
	}


	whichPlayerBegins() {
		
		let random = Math.random();
		
		if (random < 0.5) {
			this.playerWhite.canPlay = true;
			$('.whichPlayer').append("Le pion blanc commence");
		} else {
			this.playerBlack.canPlay = true;
			$('.whichPlayer').append("Le pion noir commence");
		}
	}

	switchTurn() {
		this.playerWhite.canPlay = !this.playerWhite.canPlay;
		this.playerBlack.canPlay = !this.playerBlack.canPlay;

		if(this.playerBlack.pdv === 0){
			this.playerBlack.losesPlayer();
		}else if(this.playerWhite.pdv === 0){
			this.playerWhite.losesPlayer();
		}else{
            if(this.playerWhite.canPlay){
                $('.whichPlayer').empty().append("Le pion blanc joue");
            }else{
                $('.whichPlayer').empty().append("Le pion noir joue");
            }
		}


	}

	otherPlayer() {
		return this.playerWhiteCanPlay ? this.playerBlack : this.playerWhite;
	}
}