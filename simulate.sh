#!/bin/bash
onewins=0
twowins=0
handstotal=0
doublewarstotal=0;
inf=0
index=1
iterations=1000
rm commands.txt
for i in $( seq 1 $iterations); do echo "node war" >> commands.txt; done
#parallel --bar -P -2 < commands.txt >  results.txt
parallel --bar --jobs 8 < commands.txt >  results.txt
node parse.js

