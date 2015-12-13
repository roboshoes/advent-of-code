var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" );

var json = JSON.parse( input );
var accumulator = 0;

function parse( collection ) {

    if ( typeof collection === "object" ) {

        var value;
        var key;

        // Making sure none of the values are "red",
        // unless it's an Array, then it's totally cool.
        if ( ! Array.isArray( collection ) ) {
            for ( key in collection ) {
                if ( collection[ key ] === "red" ) return;
            }
        }

        for ( key in collection ) {

            value = collection[ key ];

            if ( Number.isInteger( value ) ) accumulator += value;

            else if ( typeof value === "object" ) parse( value );
        }
    }
}

parse( json );

console.log( accumulator );
