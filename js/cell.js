define(function() {
	return {
		Cell: function(xR, yR, xA, yA, radius, token){
		    this.xR = xR;
		    this.yR = yR;
		    this.xA = xA;
		    this.yA = yA;
		    this.radius = radius;
		    this.token = token;
		    this.available = function(data){
		        return (this.token == ' ' && (this.yR == 5 || data[this.yR + 1][this.xR].token != ' '));
    		}
		}
	} // END RETURN
});