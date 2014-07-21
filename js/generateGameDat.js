define(['cell'], function(cell) {
	var X_DIMENSION = 7;
	var Y_DIMENSION = 6;
	
	return {
		generateGameDat: function (tableSet, data){
		    for(var i = 0; i < 6; i++){
		        var rowDat = [];
		        var h = document.getElementById('gameSVG').clientHeight;
				var w = document.getElementById('gameSVG').clientWidth;
		        var slotArea = (this.scaleBoardX(w) * this.scaleBoardY(h)) / (X_DIMENSION * Y_DIMENSION);
				var slotRadius = (Math.sqrt((slotArea * 0.3) / Math.PI));
		        for(var j = 0; j < 7; j++){
		            tableSet.push(new cell.Cell(j, i, this.getSlotOffSet(j, w, X_DIMENSION), this.getSlotOffSet(i, h, Y_DIMENSION), slotRadius, ' '));
		            rowDat.push(new cell.Cell(j, i, this.getSlotOffSet(j, w, X_DIMENSION), this.getSlotOffSet(i, h, Y_DIMENSION), slotRadius, ' '));
		        }
		        data.push(rowDat);
		    }
		},
		getSlotOffSet: function(slotLocation, dimension, numSlots){
		    var offSet = (this.scaleBoardX(dimension) / numSlots) / 2;
		    return (offSet * 2 * slotLocation) + offSet;
		},
		scaleBoardX: function(w){
		    for(var i = 0; i < w; i++){
		        if((w - i) % X_DIMENSION == 0){
		            return (w - i);
		        }
		    }
		},
		scaleBoardY: function(w){
			for(var i = 0; i < w; i++){
		        if((w - i) % Y_DIMENSION == 0){
		            return (w - i);
		        }
		    }
		}
	} // END RETURN
});