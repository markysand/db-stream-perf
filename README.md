# Perf test mongo cursor/stream queries vs plain queries

"Plain" loads the entire data response into memory before returning it to the client.
"Stream" streams the response directly from db to http response, potentially using less memory.

## Set up and start

    npm i
    npm run populate
    npm run server

## Call endpoints

    curl localhost:3001/plain/2

    curl localhost:3001/stream/2

## Performance test

### Run both endpoints and write to files

    ./run.sh

### Manual run

    ab -n 1000 -c 100 "localhost:3001/plain/2000"

    ab -n 1000 -c 100 "localhost:3001/stream/2000"

### Profiling

Instead use

    npm run server:prof
