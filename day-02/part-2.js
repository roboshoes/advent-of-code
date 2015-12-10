var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var totalRibbon = input.reduce( function( previous, current ) {

    var values = current.split( "x" ).sort( function( a, b ) {
        return a - b;
    } );

    var around = 2 * values[ 0 ] + 2 * values[ 1 ];

    var bow = values[ 0 ] * values[ 1 ] * values[ 2 ];

    return previous + around + bow;

}, 0 );

console.log( totalRibbon );