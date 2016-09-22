var request = require('request');
var app = require('express')();
var bodyParser = require('body-parser')

app.use(bodyParser.json());


app.get('/characters', function (req, ress) {
	var x =[];
	var getData = function(){
	request({
	        method :'GET', 
	        url : 'http://swapi.co/api/people'
			},
	    	function(err,res,body){
	    	console.log(err, res.statusCode)
		        if(res.statusCode >= 200 && res.statusCode < 400) {
	                body = JSON.parse(body);
	            	x = x.concat(body.results)

	       		if (req.query.sort == 'height' || req.query.sort == 'mass'){
	            		x = x.sort(function(a, b) {
						    return parseFloat(a[req.query.sort]) - parseFloat(b[req.query.sort]);
						});
	            	}

	            return ress.send(x);
	        }
	    })
	    
	}
	getData()

});

app.get('/character/:name', function (req, ress) {
	var x =[],temp=[],n = 1,isItemFound  = false;
	var name = req.params.name;

	var getData = function(n){
	isItemFound  = false;

	request({
	        method :'GET', 
	       // headers: {'User-Agent': 'test-user'},
	        url : 'http://swapi.co/api/people?page='+n,
			},
	    	function(err,res,body){
	    	console.log(err, res.statusCode)
	    	//if (err) { res.send(err); return; }
		        if(res.statusCode >= 200 && res.statusCode < 400) {
	                body = JSON.parse(body);
	            	x = x.concat(body.results);
	            			//console.log(x)
	            	for(var j=0;j<x.length;j++){
	            		if((x[j].name).indexOf(name)  !== -1 ){
	            			console.log(x[j].name)
	            			temp = x[j];
	            			isItemFound = true;
	            return ress.send(JSON.stringify(temp))

	            		}
	            	}
	if(!isItemFound){
	            		
		console.log('item not found & [page]= '+n);
	            			n = n+1;
	            			//isItemFound = false;
							
	            	process.nextTick(function() { getData(n);})
	            			
	            		}

	            	
	       		//console.log(x)
	            //return ress.send(JSON.stringify(temp))
	        }
	    })

}
if(n==1){
getData(1)
}
	
});

app.get('/planetresidents', function (req, ress) {
	var x =[]; var temp =[], n= 1;
	var getData = function(n){
	request({
	        method :'GET', 
	        url : 'http://swapi.co/api/people/'+n+'/',
			},
	    	function(err,res,body){
	    	//console.log(err, res.statusCode)
		        if(res.statusCode >= 200 && res.statusCode < 400) {
	                body = JSON.parse(body);
	            	x = x.concat(body.homeworld)
	            	//var y = x.split("/");
	       		console.log(n)
	       		n = n+1;

	            return x;
	        }
	    })
	    
	}

	// for(var i=1; i<=86; i++){
	// 	temp[i] = getData(i);
	// }
if(n != 87){
temp = getData(n)
}

});


var server = app.listen(3000, function () {
  var host = server.address().address;
  host = (host === '::' ? 'localhost' : host);
  var port = server.address().port;
 
  console.log('listening at http://%s:%s', host, port);
});

