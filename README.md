# war.js
node simulation of classic card game war

## install
* `git clone https://github.com/uotw/war.js.git`
* `cd war.js`
* `npm i`
* install [GNU parallel](https://www.gnu.org/software/parallel/) to add multithreading. it's available using `apt-get install parallel` on linux, or `brew install parallel` on Mac OS.

## run the simulation
* run the simulation with the `simulate.sh` script
* change the `iterations` script variable in `simulate.sh` to change the number of games to simulate
* in `war.js`, `deal()` will deal randomly. comment this line and uncomment `dealaces()`, `dealacesone()`, or `dealfacecards()` to give 4 aces, 3 aces, or all face cards to player one - randomizing the other cards.


## statistics

* 97%	chance of winning if you have all face cards
* 80%	chance of winning if you have 4 aces
* 64%	chance of winning if you have 3 aces
* 54%	games have at least 1 double war
* 4%	games have at least 1 triple war
* 0.02%	games will end without even a single war
* 250	average plays to win
* 189	median plays to win

![histogram of plays to win war](https://www.sonoclipshare.com/playstowin.svg)
