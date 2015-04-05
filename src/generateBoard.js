define(['d3', 'generateGameDat', 'gameRules'], function(d3, generateGameDat, gameRules){
	return{
		generateBoard: function(tableSet, data){
			var w = d3.select('.board')[0][0].clientWidth;
			var h = Number(w * 0.4).toFixed();
			var svg;svg = d3.select('.board')
				.append('svg')
				.attr('width', w)
				.attr('height', h);

			var gameBoard = svg.append('rect')
		        .attr('width', generateGameDat.scaleBoardX(w))
		        .attr('height', generateGameDat.scaleBoardY(h))
		        .attr('id', 'gameBoard')
						.attr('class', 'on')
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
		}
	} // END RETURN
});
