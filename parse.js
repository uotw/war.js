Papa=require('papaparse');
var fs = require('fs')
  , filename = 'results.txt';
fs.readFile(filename, 'utf8', function(err, file) {
  if (err) throw err;
	Papa.parse(file, {
        	complete: function(results) {
                	//console.log("Finished:", results.data);
			results.data.forEach(processData);// => console.log(element));

        	}
	});
});
var     onewins=0,
        twowins=0,                
	warstotal=0,
	doublewarstotal=0,
	triplewarstotal=0,
        inf=0,
	hands = [];

function processData(item,index) {
		
	if(item.length>2){
		//console.log(item);
		var winner = item[0];
		console.log(item[1]);
		hands.push(item[1]);
		var wars = item[2];
		var doublewars = item[3];
		var triplewars = item[4];
		
		if(winner==1){
			onewins++;
		} else {
			twowins++;
		}
		if(wars>0){
			warstotal++;
		}
		if(doublewars>0){
			doublewarstotal++;
		}
		if(triplewars>0){
			triplewarstotal++;
		}
		if(item[1]==10000){
			inf++
		}
		
	} else {
		report(index);
	}
	
}

function median(values){

	values.sort(function(a,b) {
 		return a - b;
	});
	let lowMiddle = Math.floor( (values.length - 1) / 2);
	let highMiddle = Math.ceil( (values.length - 1) / 2);
	let median = ( values[lowMiddle] + values[highMiddle]) / 2;
	return median;

}

function avg(values){
	var sum = 0;
	for( var i = 0; i < values.length; i++ ){
    		sum += parseInt( values[i], 10 ); //don't forget to add the base
	}
	var avg = sum/values.length;
	return avg;
}

function report(total){
	var perconewins = (100*onewins/(onewins+twowins)).toFixed(1);
	var perctwowins = (100-perconewins).toFixed(1);
	console.log("hand one wins "+perconewins+"%, two wins " + perctwowins+ "%");
	console.log("wars "+warstotal+"/"+total + ", double wars "+doublewarstotal+"/"+ total+ ", "+"triple wars "+triplewarstotal+"/"+total);
	console.log("median plays: "+median(hands)+", average plays: "+avg(hands));
}
