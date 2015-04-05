define(['d3', 'generateGameDat', 'gameRules'], function(d3, generateGameDat, gameRules){
	return{
		generateBoard: function(tableSet, data){
			console.log('function: generateBoard');
			var h = document.getElementById('gameSVG').clientHeight;
			var w = document.getElementById('gameSVG').clientWidth;
			var svg = d3.select('svg.fillScreen');

			var gameBoard = svg.append('rect')
		        .attr('width', generateGameDat.scaleBoardX(w))
		        .attr('height', generateGameDat.scaleBoardY(h))
		        .attr('id', 'gameBoard')
		        .style('fill', 'teal')
		        .style('position', 'absolute');
	    	var slots = svg.selectAll('circle')
		        .data(tableSet)
		        .enter()
		        .append('circle')
		        .attr('cx',function(d){
		            return d.xA;
		        })
		        .attr('cy',function(d){
		            return d.yA;
		        })
		        .attr('r', function(d){
		            return d.radius;
		        })
		        .on('click', function(d){
		            if(gameRules.makeMove(d, data)){
		                gameRules.computerTurn(data);
		            }
		        })
		        .style('fill', 'white')
		        .attr('id', function(d){
		            return 'slot' + d.xR + '-' + d.yR;
		        });
			d3.select('div.btnRestart')
		 		.append('btn')
		 		.attr('class', 'btn btn-primary')
		 		.attr('text', 'Restart');
		}
	} // END RETURN
});
