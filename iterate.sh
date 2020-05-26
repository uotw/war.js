#!/bin/bash
onewins=0
twowins=0
handstotal=0
doublewarstotal=0;
inf=0
iterations=1000
for i in $(seq 1 $iterations)
do
	echo "hand $i"
	result=$(node war.js)
	winner=$(echo $result | cut -d',' -f1)
	hands=$(echo $result | cut -d',' -f2)
	doublewars=$(echo $result | cut -d',' -f3)
	if [ "$winner" = "1" ]; then
        	 onewins=$((onewins+1))
	else
		twowins=$((twowins+1))
  fi

  if [ "$doublewars" -gt "0" ]; then
        	 doublewarstotal=$((doublewarstotal+1))
  fi

	if [ "$hands" = "10000" ]; then
		inf=$((inf+1))
	else
		handstotal=$((handstotal+hands))
		#echo $hands
	fi
done

avghands=$((handstotal/(iterations-inf)))
perconewins=$((100*onewins/iterations))
pertwowins=$((100-perconewins))
percdoublewars=$((doublewarstotal*100/iterations))

echo "hand one wins $perconewins%, two wins $pertwowins%, wars: $doublewarstotal/1000, avg hands: $avghands"

