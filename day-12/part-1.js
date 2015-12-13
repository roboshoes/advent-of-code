var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" );

var accumulator = 0;

JSON.parse( input, function( key, value ) {

    if ( Number.isInteger( value ) ) {
        accumulator += value;
    }

    return value;

} );

console.log( accumulator );