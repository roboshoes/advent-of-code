var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var molecule = input.pop();

input.pop();

var convertions = {};

input.forEach( function( line ) {
    var parts = line.split( " => " );

    var to = parts.pop();
    var from = parts.pop();

    if ( ! convertions[ from ] ) convertions[ from ] = [];

    convertions[ from ].push( to );
} );

var elements = molecule.match( /([A-Z][a-z]?)/g );
var possible = new Set();

function clone( array ) {
    var newArray = [];

    for ( var i = 0; i < array.length; i++ ) {
        newArray.push( array[ i ] );
    }

    return newArray;
}

for ( var i = 0; i < elements.length; i++ ) {
    var current = elements[ i ];

    if ( convertions[ current ] ) {

        for ( var j = 0; j < convertions[ current ].length; j++ ) {
            var combo = clone( elements );
            combo.splice( i, 1, convertions[ current ][ j ] );

            possible.add( combo.join( "" ) );
        }

    }
}

console.log( possible.size );
