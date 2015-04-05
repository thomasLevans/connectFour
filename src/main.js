/*
* Tom Evans
*
*/

'use strict';

var dependencies = [
	'd3',
	'generateBoard',
	'generateGameDat'
];

require(dependencies, function(d3, generateBoard, generateGameDat){
	var data = [];
	var tableSet = [];

	d3.select('#btnRestart').on('click', reset);

	generateGameDat.generateGameDat(tableSet, data);
	generateBoard.generateBoard(tableSet, data);

	function reset() {
		console.log("RESET");

		location.reload();
	};
});
