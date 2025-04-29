#!/bin/bash

ab -n 1000 -c 100 "localhost:3001/stream/10" > ./output/stream10.txt
ab -n 1000 -c 100 "localhost:3001/plain/10" > ./output/plain10.txt

ab -n 1000 -c 100 "localhost:3001/stream/50" > ./output/stream50.txt
ab -n 1000 -c 100 "localhost:3001/plain/50" > ./output/plain50.txt

ab -n 1000 -c 100 "localhost:3001/stream/100" > ./output/stream100.txt
ab -n 1000 -c 100 "localhost:3001/plain/100" > ./output/plain100.txt

ab -n 1000 -c 100 "localhost:3001/stream/500" > ./output/stream500.txt
ab -n 1000 -c 100 "localhost:3001/plain/500" > ./output/plain500.txt


