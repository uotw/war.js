# war.js
node simulation of classic card game war

## purpose
This node application was written to easily and quickly simulate many hands of the children's card game war. With the simulation you can collect winning statistics for randomly dealt hands, hands where all aces end up in one otherwise random hand, and hands who have all face cards (including aces). Additionally, you can collect statistics on average plays to complete a hand given the above dealings. 

The code assumes each war puts three additional cards face down (variable `warcards` in `war.js`, then turns up a fouth to challenge. One point that is not clear in customary war rules is how a game ends if a player doesn't have enough cards to complete a war. In this circumstance, this simulation turns up the player's last card no matter how many have been put face down. The challenger matches the number of at risk cards for this potential final war.

One last note - when cards are returned to the hand of the winner, this code shuffles them. It's not clear that this must be done in the typical war rules, but it ends up happening anyway depending on how they are picked up. Shuffling the cards essentially ensures that there will never been an infinite game [citation](https://arxiv.org/abs/1007.1371), which is theoretically possible if the cards are taken in a specific order [citation](https://mathoverflow.net/questions/11503/does-war-have-infinite-expected-length).

## install
* `git clone https://github.com/uotw/war.js.git`
* `cd war.js`
* `npm i`
* install [GNU parallel](https://www.gnu.org/software/parallel/) to add multithreading. it's available using `apt-get install parallel` on linux, or `brew install parallel` on Mac OS.

## run the simulation
* run the simulation with the `simulate.sh` script
* change the `iterations` script variable in `simulate.sh` to change the number of games to simulate
* in `war.js`, `deal()` will deal randomly. comment this line and uncomment `dealaces()`, `dealacesone()`, or `dealfacecards()` to give 4 aces, 3 aces, or all face cards to player one - randomizing the other cards.


## speed
speed scales by the number of iterations requested; 10,000 iterations run with multithreading active:
* 231 seconds Intel(R) Core(TM) i7-7920HQ CPU @ 3.10GHz (4 cores)
* 55 seconds Intel(R) Xeon(R) CPU E5-2680 v4 @ 2.40GHz (14 cores)

## statistics

* 97%	chance of winning if you have all face cards
* 80%	chance of winning if you have 4 aces
* 64%	chance of winning if you have 3 aces
* 54%	games have at least 1 double war
* 4%	games have at least 1 triple war
* 0.03%	games will end without even a single war
* 250	average plays to win
* 189	median plays to win

![histogram of plays to win war](https://www.sonoclipshare.com/playstowin.svg)
