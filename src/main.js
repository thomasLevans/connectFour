

require(['generateBoard', 'generateGameDat'], function(generateBoard, generateGameDat){
	var data = [];
	var tableSet = [];
	generateGameDat.generateGameDat(tableSet, data);
	generateBoard.generateBoard(tableSet, data);
});
