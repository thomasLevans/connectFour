define(['cell'], function(cell){
	var resultSet;
	var nextDisc = 'R';
	var d3 = require('d3');

	return{
		computerTurn: function(data){
			var possibleCells = [];
		    for (var i = 0; i < data.length; i++) {
		        for (var j = 0; j < data[i].length; j++) {
		            if (data[i][j].available(data)) {
		                possibleCells.push(data[i][j]);
		            }
		        }
		    }
		    var theMove = Math.round(Math.random() * (possibleCells.length - 1));
		    //alert(possibleCells[theMove].yR + " " + possibleCells[theMove].xR);
		    this.makeMove(data[possibleCells[theMove].yR][possibleCells[theMove].xR], data);
		},
		makeMove: function(aSlot, data){
		    if(resultSet != null){
		        return false;
		    }
		    if(aSlot.available(data)){

		        data[aSlot.yR][aSlot.xR].token = nextDisc;
		        resultSet = (this.parseCellTable(data));
		        this.animateMove(aSlot);
		        //alert("circle#slot" + aSlot.xR + "-" + aSlot.yR);
		        //d3.selectAll('circle#slot' + aSlot.xR + '-' + aSlot.yR).on('click', null);
		        nextDisc = (nextDisc == 'R') ? 'Y' : 'R';

		        if(resultSet != null){
		            this.weGotAWinner(resultSet[0][0], resultSet[0][1], data);
		            return false;
		        }
		        return true;
		    }
		    else{
		        return false;
		    }
		},
		animateMove: function(newMove){
			var color = (nextDisc == 'R') ? 'red' : 'yellow';
		    var x = 1;
		    for(var i = 0 ; i < (newMove.yR + 1) ; i++){
		        d3.selectAll('circle#slot' + newMove.xR + '-' + i)
		            .transition()
		            .delay(100 * x)
		            .style('fill', color);
		        if(i + 1 != newMove.yR + 1){
		            d3.selectAll('circle#slot' + newMove.xR + '-' + i)
		            .transition()
		            .delay(200 * x)
		            .style('fill', 'white');
		        }
		        x++;
		    }
		    d3.select('svg')
		    	.append('circle')
		    	.attr('cx', newMove.xA)
		        .attr('cy', newMove.yA)
		        .attr('r',  newMove.radius)
		        .transition()
		        .delay(100 * ++x)
		        .style('fill', color);
		},
		weGotAWinner: function(x, y, data){
			var d3 = require('d3');
			var h = document.getElementById('gameSVG').clientHeight;
			var w = document.getElementById('gameSVG').clientWidth;
		    var color = (data[x][y].token == 'R') ? 'Red':'Yellow';
		    var winningString = 'Game Over ' + color + ' Wins';
		    d3.select('rect#gameBoard')
		    	.transition()
		    	.style('fill', 'black');
		    d3.select('svg.fillScreen')
		    	.append('rect')
	            .attr('width', w/2)
	            .attr('height', h/3)
	            .attr('x', w/4)
	            .attr('y', h/3)
	            .attr('class', 'gameOverBox');
		    d3.select('svg.fillScreen')
		    	.append('text')
	            .text(winningString)
	            .attr('class', 'gameOverBoxText')
	            .attr('x', w/2)
	            .attr('y', h/2)
	            .style('fill', color);
		    d3.select('rect.gameOverBox')
		    	.transition()
		    	.delay(1000)
		    	.style('opacity', 0.33);
		},
		parseCellTable: function(cells){

		    var values = [];

		    for (var i = 0; i < cells.length; i++)
		    {
		        var subV = [];
		        for (var j = 0; j < cells[i].length; j++)
		        {
		            subV.push(cells[i][j].token);
		        }
		        values.push(subV);
		    }
		    return this.isConsecutiveFour(values);

		},
		isConsecutiveFour: function(values){

		    var numberOfRows = values.length;

		    var numberOfColumns = values[0].length;

		    // Check rows

		    for (var i = 0; i < numberOfRows; i++) {

		        if (this.hasPatternOfFour(values[i]) != null) {

		            var result = [];

		            result.push([i, 0]); result.push([i, 0]); result.push([i, 0]); result.push([i, 0]);

		            var k = this.hasPatternOfFour(values[i]);

		            result[0][1] = k; result[1][1] = k + 1;
		            result[2][1] = k + 2; result[3][1] = k + 3;

		            return result;
		        }
		    }



		    // Check columns

		    for (var j = 0; j < numberOfColumns; j++) {

		        var column = [];

		        // Get a column into an array

		        for (var i = 0; i < numberOfRows; i++) {
		            column.push(values[i][j]);
		        }


		        if (this.hasPatternOfFour(column) != null) {

		            var result = [];

		            var k = this.hasPatternOfFour(column);

		            result.push([j, k]); result.push([j, k + 1]); result.push([j, k + 2]); result.push([j, k + 3]);

		            return result;

		        }

		    }



		    // Check major diagonal (lower part)

		    for (var i = 0; i < numberOfRows - 3; i++) {

		        var numberOfElementsInDiagonal = Math.min(numberOfRows - i, numberOfColumns);

		        var diagonal = [];

		        for (var k = 0; k < numberOfElementsInDiagonal; k++)

		            diagonal.push(values[k + i][k]);



		        if (this.hasPatternOfFour(diagonal) != null) {

		            var result = [];

		            var k = this.hasPatternOfFour(diagonal);

		            result.push([k+i, k]);
		            result.push([k+1+i, k+1]);
		            result.push([k+2+i, k+2]);
		            result.push([k+3+i, k+3]);

		            return result;

		        }

		    }



		    // Check major diagonal (upper part)

		    for (var j = 1; j < numberOfColumns - 3; j++) {

		        var numberOfElementsInDiagonal = Math.min(numberOfColumns - j, numberOfRows);

		        var diagonal = [];

		        for (var k = 0; k < numberOfElementsInDiagonal; k++)

		            diagonal.push(values[k][k + j]);



		        if (this.hasPatternOfFour(diagonal) != null) {

		            var result = [];

		            var k = this.hasPatternOfFour(diagonal);

		            result.push([k, k+j]);
		            result.push([k+1, k+1+j]);
		            result.push([k+2, k+2+j]);
		            result.push([k+3, k+3+j]);
		            return result;

		        }

		    }



		    // Check sub-diagonal (left part)

		    for (var j = 3; j < numberOfColumns; j++) {

		        var numberOfElementsInDiagonal = Math.min(j + 1, numberOfRows);

		        var diagonal = [];

		        for (var k = 0; k < numberOfElementsInDiagonal; k++)

		            diagonal.push(values[k][j - k]);

		        if (this.hasPatternOfFour(diagonal) != null) {

		            var result = [];

		            var k = this.hasPatternOfFour(diagonal);

		            result.push([k, j-k]);
		            result.push([k+1, j-k-1]);
		            result.push([k+2, j-k-2]);
		            result.push([k+3, j-k-3]);
		            return result;

		        }

		    }



		    // Check sub-diagonal (right part)

		    for (var i = 1; i < numberOfRows - 3; i++) {

		        var numberOfElementsInDiagonal = Math.min(numberOfRows - i, numberOfColumns);

		        var diagonal = [];



		        for (var k = 0; k < numberOfElementsInDiagonal; k++)

		            diagonal.push(values[k + i][numberOfColumns - k - 1]);



		        if (this.hasPatternOfFour(diagonal) != null) {

		            var result = [];

		            var k = this.hasPatternOfFour(diagonal);

		            result.push([k+i, numberOfColumns - k - i]);
		            result.push([k + i + 1, numberOfColumns - (k + 1) - 1]);
		            result.push([k + i + 2, numberOfColumns - (k + 2) - 1]);
		            result.push([k + i + 3, numberOfColumns - (k + 3) - 1]);
		            return result;

		        }

		    }



		    return null;

		},
		hasPatternOfFour: function(values){
		    for (var i = 0; i < values.length - 3; i++) {
		        var isEqual = true;
		        for (var j = i; j < i + 3; j++) {
		            if (values[j] == ' ' || values[j] != values[j + 1]) {
		                isEqual = false;
		                break;
		            }
		        }
		        if (isEqual) return i;
		    }
		    return null;
		}
	} // END RETURN
});