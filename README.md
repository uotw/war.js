# war.js
node simulation of classic card game war

## dependencies
* install node dependencies using `npm i`
* for speed, install [GNU parallel](https://www.gnu.org/software/parallel/) to add multithreading

## run the simulation
* if you have installed parallel (recommended), you can run the simulation with the `simulate.sh` script
* otherwise, run ./iterate.sh

## statistics

* 97%	chance of winning if you have all face cards
* 80%	chance of winning if you have 4 aces
* 64%	chance of winning if you have 3 aces
* 54%	games have at least 1 double war
* 4%	games have at least 1 triple war
* 0.02%	games will end without even a single war
* 250	average plays to win
* 189	50% plays to win (median)

![histogram of plays to win war](https://www.sonoclipshare.com/playstowin.svg)
