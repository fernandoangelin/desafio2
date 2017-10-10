const request = require("request");

for(let i = 0; i < 1000; i++) {
	
	request.get('http://localhost:3000', function(err, response, body) {
		if(err) {
			console.log(err);
		} else {
			console.log(body);	
		}	
	});

}
