var handone = [],
    handtwo = [],
    cards = [],
    warcards = 3,
    hands = 0,
    doublewars = 0,
    triplewars = 0,
    wardepth = 1,
    wars = 0;

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function deal() {
    for (i = 1; i < 5; i++) {
        for (j = 1; j < 14; j++) {
            cards.push(j);
        }
    }
    shuffle(cards);
    for (i = 0; i < cards.length; i++) {
        if (i % 2 === 0) {
            handone.push(cards[i]);
        } else {
            handtwo.push(cards[i]);
        }
    }
}

function dealaces() {
    for (i = 1; i < 5; i++) {
        for (j = 1; j < 13; j++) {
            cards.push(j);
        }
    }

    shuffle(cards);

    for (i = 0; i < cards.length; i++) {
        if (i % 2 === 0) {
            handone.push(cards[i]);
        } else {
            handtwo.push(cards[i]);
        }
    }

    var extracards = handone.splice(handone.length - 3, 2);
    handtwo = handtwo.concat(extracards);
    var aces = [13, 13, 13, 13];
    handone = handone.concat(aces);
    shuffle(handone);
    shuffle(handtwo);
    //console.log(handone.length,handtwo.length);

}

function dealacesone() {
    for (i = 1; i < 5; i++) {
        for (j = 1; j < 13; j++) {
            cards.push(j);
        }
    }

    shuffle(cards);

    for (i = 0; i < cards.length; i++) {
        if (i % 2 === 0) {
            handone.push(cards[i]);
        } else {
            handtwo.push(cards[i]);
        }
    }

    var extracards = handone.splice(handone.length - 1, 1);
    handtwo = handtwo.concat(extracards);
    handtwo.push(13);
    var aces = [13, 13, 13];
    handone = handone.concat(aces);
    //console.log(handone,handtwo);
    shuffle(handone);
    shuffle(handtwo);
    //console.log(handone.length,handtwo.length);

}

function dealfacecards() {
    for (i = 1; i < 5; i++) {
        for (j = 1; j < 10; j++) {
            cards.push(j);
        }
    }

    shuffle(cards);

    for (i = 0; i < 26; i++) {
        handtwo.push(cards[i]);
    }

    for (i = 26; i < cards.length; i++) {
        handone.push(cards[i]);
    }

    for (i = 1; i < 5; i++) {
        for (j = 10; j < 14; j++) {
            handone.push(j);
        }
    }

    //console.log(handone.length,handtwo.length);

    shuffle(handone);
    shuffle(handtwo);
    //console.log(handone.length,handtwo.length);

}

function moveCards(loser, winner, numtomove) {
    wardepth = 1;
    var moveloser = loser.splice(0, numtomove);
    var movewinner = winner.splice(0, numtomove);
    var move = moveloser.concat(movewinner);
    //move = shuffle(move);
    winner = winner.concat(shuffle(move));
    return winner;
}

function increment(arr, index, delta) {
    if (typeof arr[index + delta] != 'undefined') {
        var newindex = index + delta;
    } else if (typeof arr[delta - (arr.length - index)] != 'undefined') {
        var newindex = delta - (arr.length - index);
    } else {
        var newindex = arr.length - 1;
    }
    return newindex;

}

function getValue(arr, index) {
    if (typeof arr[index] != 'undefined') {
        return arr[index];
    } else {
        //return arr[arr.length-1]; //LAST CARD
        return -1
    }
}
var warcardsinplay = 0;

function war() {
    wars++;
    warcardsinplay = warcardsinplay + warcards + 1;
    //check to see if somone is almost out
    if (getValue(handone, warcardsinplay) == -1) {
        //limit war to # of cards in handone
        warcardsinplay = handone.length;
    } else if (getValue(handtwo, warcardsinplay) == -1) {
        //limit war to # of cards in handtwo
        warcardsinplay = handtwo.length;
    }
    if (getValue(handone, warcardsinplay) > getValue(handtwo, warcardsinplay)) {
        handone = moveCards(handtwo, handone, warcardsinplay);
        warcardsinplay = 0;
    } else if (getValue(handone, warcardsinplay) < getValue(handtwo, warcardsinplay)) {
        handtwo = moveCards(handone, handtwo, warcardsinplay);
        warcardsinplay = 0;
    } else {
        wardepth++;
        if (wardepth == 2) {
            doublewars++;
        } else if (wardepth == 3) {
            triplewars++;
        }
        war();
    }
}

function play() {
    while (handone.length > 0 && handtwo.length > 0 && hands < 10000) {
        //console.log(handone.length,handtwo.length);
        hands++;
        var total = handone.length + handtwo.length;
        //console.log(hands,handone.length, handtwo.length);

        if (getValue(handone, 0) > getValue(handtwo, 0)) {
            handone = moveCards(handtwo, handone, 1);
        } else if (getValue(handone, 0) < getValue(handtwo, 0)) {
            handtwo = moveCards(handone, handtwo, 1);
        } else {
            war();
        }
        //var total = handone.length + handtwo.length;
        //console.log("h1:" + handone.length, "h2:" + handtwo.length, "hands:" + hands);

    }
}


function report() {
    	if (handone.length == 0) {
		var winner = 1;
	} else {
		var winner = 2;
	}
        console.log(winner+"," + hands + "," + wars + "," + doublewars + "," + triplewars);
}

deal();
//dealaces();
//dealacesone();
//dealfacecards();
play();
report();

//console.log(endtext, hands, "[" + handone.length + "]", "[" + handtwo.length + "]", handone.length + handtwo.length);
