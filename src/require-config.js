requirejs.config({
  baseUrl:'src',
	paths: {
    'jquery': '../lib/jquery.min',
    'underscore': '../lib/underscore-min',
		'd3': '../lib/d3.min'
	},
  deps: [
    'main'
  ]
});
