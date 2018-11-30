class Square {
    
	constructor(x, y, $elt, droppable, platform, game) {
     
		this.x 			= x;
		this.y 			= y;
		this.$elt 		= $elt;
		this.droppable 	= droppable;
		this.pawn		= 'none';
	
		this.$elt.droppable({
  			
  			drop: ( event, ui ) => {
    			
    			if (!this.droppable ||
                    this.pawn !== 'none' ||
                    this.x === platform.pawnPlayed.x ||
                    // interdiction de reculer ou de jouer quand ça n'est pas notre tour
                    (platform.pawnPlayed.color === 'white' && (this.y < platform.pawnPlayed.y || !game.playerWhite.canPlay) ) ||
    				(platform.pawnPlayed.color === 'black' && (this.y > platform.pawnPlayed.y || !game.playerBlack.canPlay) ) ||

                    //interdiction de se déplacer de plus de 2 cases
                    this.x > platform.pawnPlayed.x + 2 || this.x < platform.pawnPlayed.x - 2 ||
    				this.y > platform.pawnPlayed.y + 2 || this.y < platform.pawnPlayed.y - 2 ||

                    //interdiction de sauter par dessus ses propres pions ou au-dessus de rien du tout
                    (platform.pawnPlayed.color === 'white' && this.x === platform.pawnPlayed.x + 2  && platform.rows[this.y-1][this.x-1].pawn.color != 'black') ||
    				(platform.pawnPlayed.color === 'white' && this.x === platform.pawnPlayed.x - 2  && platform.rows[this.y-1][this.x+1].pawn.color != 'black') ||
    				(platform.pawnPlayed.color === 'black' && this.x === platform.pawnPlayed.x + 2  && platform.rows[this.y+1][this.x-1].pawn.color != 'white') ||
    				(platform.pawnPlayed.color === 'black' && this.x === platform.pawnPlayed.x - 2  && platform.rows[this.y+1][this.x+1].pawn.color != 'white') )
    			{

    				platform.pawnPlayed.$elt.css('top',  platform.pawnPlayed.top);
					platform.pawnPlayed.$elt.css('left', platform.pawnPlayed.left);
					$('.errorMessage').empty().append('Mauvais mouvement').slideDown();

    			} else {
    			    $('.errorMessage').slideUp();
    				if (platform.pawnPlayed.color === 'white') {

    					if (this.x === platform.pawnPlayed.x + 2 && platform.rows[this.y-1][this.x-1].pawn.color === 'black') {
    					
    						platform.rows[this.y-1][this.x-1].pawn.$elt.remove();
    						platform.rows[this.y-1][this.x-1].pawn = 'none';
    						game.playerBlack.pdv--;
    					} else if (this.x === platform.pawnPlayed.x - 2 && platform.rows[this.y-1][this.x+1].pawn.color === 'black') {
    						
    						platform.rows[this.y-1][this.x+1].pawn.$elt.remove();
    						platform.rows[this.y-1][this.x+1].pawn = 'none';
    						game.playerBlack.pdv--;
    					}

    				} else if (platform.pawnPlayed.color === 'black') {

    					if (this.x === platform.pawnPlayed.x + 2 && platform.rows[this.y+1][this.x-1].pawn.color === 'white') {
    						platform.rows[this.y+1][this.x-1].pawn.$elt.remove();
    						platform.rows[this.y+1][this.x-1].pawn = 'none';
    						game.playerWhite.pdv--;
    					} else if (this.x === platform.pawnPlayed.x - 2 && platform.rows[this.y+1][this.x+1].pawn.color === 'white') {
    						platform.rows[this.y+1][this.x+1].pawn.$elt.remove();
    						platform.rows[this.y+1][this.x+1].pawn = 'none';
    						game.playerWhite.pdv--;
    					}
    				}

    				this.pawn					= platform.pawnPlayed;

    				platform.rows[platform.pawnPlayed.y][platform.pawnPlayed.x].pawn = 'none';
	    			
	    			platform.pawnPlayed.x 		= this.x;
	    			platform.pawnPlayed.y 		= this.y;
	    			platform.pawnPlayed.left 	= platform.pawnPlayed.$elt.css('left');
	    			platform.pawnPlayed.top  	= platform.pawnPlayed.$elt.css('top');

	    			game.switchTurn();
    			}			
  			}
		});
		
	}
}