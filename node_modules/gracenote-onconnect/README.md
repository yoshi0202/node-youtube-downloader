# Gracenote OnConnect API

This library is a simple promise-based wrapper for the Gracenote (formerly TMS) OnConnect API.

## Alert

> These APIs are not yet stable. I expect them to change until this alert is removed. Apologies in advance.

## References

- TMS Developer site, http://developer.tmsapi.com
- TMS OnConnect API site, http://developer.tmsapi.com/docs/data_v1_1/

## Usage
This library is build on top of Bluebird and uses promises heavily.

### Single Call Example

```javascript
const Gracenote = require ("gracenote-onconnect")
var api = new Gracenote(api_key);

api.programs.search ("Black").then(function(response){
    
    // pretty-print the response JSON
    console.log (JSON.stringify (response, null, 2));
});
```

### Chaining Calls

```javascript

api.lineups.search ("Blue")
    .then(doSometing)
    .then(doSometingElse)
    .then(finallyDoSometing);

```

## Implemented APIs

- Programs
    - `api.programs`
        - `.search(query, params)`
- Lineups
    - `api.lineups`
        - `.find`
        - `.details`
        - `.channels`
        - `.grid`
- Shows
    - `api.shows`
        - `.newTonight`
        - `.details`
        - `.airings`
- Series
    - `api.series`
        - `.details`
        - `.airings`
- Stations
    - `api.stations`
        - `.details`
        - `.airings`
- Movies
    - `api.movies`
        - `.showings`

## TODO:

- Public Plan Methods
- Programs
- Series (episodes)
- Movies On TV
- Movies In Theatres
- Movies Trailers
- Sports
- Celebrities
- Video and Social APIs
