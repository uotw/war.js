#!/bin/bash
onewins=0
twowins=0
handstotal=0
doublewarstotal=0;
inf=0
index=1
iterations=100
parallelcheck=$(command -v parallel)

if [ ! -z "$parallelcheck" ]
then
	rm -f commands.txt
	for i in $( seq 1 $iterations); do echo "node war" >> commands.txt; done
	parallel --bar --jobs 8 < commands.txt >  results.txt
else
	echo "GNU parallel missing, running single threaded"
	rm -f results.txt
	for i in $(seq 1 $iterations)
	do
        	echo -en "\rhand $i/$iterations"
        	node war.js >> results.txt
	done
	echo ""
fi
node parse.js

