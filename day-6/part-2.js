var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var grid = [];
var x, y;


for ( x = 0; x < 1000; x++ ) {
    grid.push( [] );

    for ( y = 0; y < 1000; y++ ) {
        grid[ x ].push( 0 );
    }
}

input.forEach( function( command ) {

    var factor = 0;

    if ( command.substr( 0, 8 ) === "turn off" ) factor = -1;
    else if ( command.substr( 0, 7 ) === "turn on" ) factor = 1;
    else factor = 2;

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
            grid[ x ][ y ] = Math.max( 0, grid[ x ][ y ] + factor );
        }
    }

} );

var count = 0;

for ( x = 0; x < 1000; x++ ) {
    for ( y = 0; y < 1000; y++ ) {
        count += grid[ x ][ y ];
    }
}

console.log( count );