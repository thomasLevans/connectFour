requirejs.config({
	paths: {
		'd3': 'd3.min'
	},
	shim: {
		'd3': {exports:'d3'},
		'generateGameDat': ['d3'],
		'gameRules': ['generateGameDat'],
		'generateBoard': ['gameRules']
	}
})

require(['generateBoard', 'generateGameDat'], function(generateBoard, generateGameDat){
	var data = [];
	var tableSet = [];
	generateGameDat.generateGameDat(tableSet, data);
	generateBoard.generateBoard(tableSet, data);
});