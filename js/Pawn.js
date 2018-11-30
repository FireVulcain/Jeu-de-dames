class Pawn {
	
	constructor(x, y, $elt, color, platform) {
		this.x 		= x;
		this.y 		= y;
		this.$elt 	= $elt;
		this.color 	= color;
		this.left 	= 0;
		this.top 	= 0;


		this.$elt.mousedown( e => {
			platform.pawnPlayed = this;
		});
	}
}