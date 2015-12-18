var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var grid = [];

for ( var x = 0; x < 100; x++ ) {
    grid[ x ] = [];

    for ( var y = 0; y < 100; y++ ) {
        grid[ x ][ y ] = input[ y ][ x ] === "#" ? 1 : 0;
    }
}

function getNeighbors( x, y ) {
    var count = 0;

    for ( var u = -1; u < 2; u++ ) {
        for ( var w = -1; w < 2; w++ ) {

            if ( u === 0 && w === 0 ) continue;

            var currentX = x + u;
            var currentY = y + w;

            if ( currentX < 0 || currentY < 0 || currentX > 99 || currentY > 99 ) continue;

            if ( grid[ currentX ][ currentY ] ) count++;
        }
    }

    return count;
}

function processSlot( x, y ) {
    var value = grid[ x ][ y ];
    var neighbors = getNeighbors( x, y );

    if ( value ) {
        return ( neighbors === 2 || neighbors === 3 ) ? 1 : 0;
    }

    return neighbors === 3 ? 1 : 0;
}

var currentlyOn = 0;

for ( var i = 0; i < 100; i++ ) {
    var newGrid = [];
    var currentlyOn = 0;

    for ( x = 0; x < 100; x++ ) {
        newGrid[ x ] = [];

        for ( y = 0; y < 100; y++ ) {
            newGrid[ x ][ y ] = processSlot( x, y );
            currentlyOn += newGrid[ x ][ y ];
        }
    }

    grid = newGrid;
}

console.log( currentlyOn );