var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var grid = [];
var x, y;

for ( x = 0; x < 1000; x++ ) {
    grid.push( [] );

    for ( y = 0; y < 1000; y++ ) {
        grid[ x ].push( false );
    }
}

input.forEach( function( command ) {

    var setTo = -1;

    if ( command.substr( 0, 8 ) === "turn off" ) setTo = 0;
    else if ( command.substr( 0, 7 ) === "turn on" ) setTo = 1;
    else setTo = 2;

    var corners = ( /([0-9]+,[0-9]+) through ([0-9]+,[0-9]+)/g ).exec( command );

    var pairA = corners[ 1 ].split( "," ).map( function( x ) { return parseInt( x, 10 ); } );
    var pairB = corners[ 2 ].split( "," ).map( function( x ) { return parseInt( x, 10 ); } );

    // making sure the corners are normalized
    // (I think this is not necessary)

    var upperLeft = {
        x: Math.min( pairA[ 0 ], pairB[ 0 ] ),
        y: Math.min( pairA[ 1 ], pairB[ 1 ] )
    };

    var lowerRight = {
        x: Math.max( pairA[ 0 ], pairB[ 0 ] ),
        y: Math.max( pairA[ 1 ], pairB[ 1 ] )
    };

    for ( x = upperLeft.x; x <= lowerRight.x; x++ ) {
        for ( y = upperLeft.y; y <= lowerRight.y; y++ ) {

            if ( setTo === 2 ) grid[ x ][ y ] = ! grid[ x ][ y ];
            else grid[ x ][ y ] = !! setTo;

        }
    }

} );

var count = 0;

for ( x = 0; x < 1000; x++ ) {
    for ( y = 0; y < 1000; y++ ) {
        if ( grid[ x ][ y ] === true ) count++;
    }
}

console.log( count );