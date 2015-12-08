var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var cache = {};
var instructions = {};

input.forEach( function( instruction ) {

    var parts = instruction.split( " -> " );
    var destination = parts[ 1 ];
    var source = parts[ 0 ];

    instructions[ destination ] = source.split( " " );
} );

// Overriding the input of `b` with the result from the
// previous run.

cache.b = 16076;

function resolve( name ) {
    if ( ( /^[0-9]+$/ ).test( name ) ) return parseInt( name, 10 );

    if ( cache[ name ] ) return cache[ name ];

    var formula = instructions[ name ];
    var result;
    var inputOne, inputTwo;
    var operator;

    if ( formula.length === 3 ) {

        inputOne = resolve( formula[ 0 ] );
        inputTwo = resolve( formula[ 2 ] );

        operator = formula[ 1 ];

        switch( operator ) {
            case "AND":
                result = inputOne & inputTwo;
                break;
            case "OR":
                result = inputOne | inputTwo;
                break;
            case "RSHIFT":
                result = inputOne >> inputTwo;
                break;
            case "LSHIFT":
                result = inputOne << inputTwo;
                break;
        }

    } else if ( formula.length === 2 ) {

        inputOne = resolve( formula[ 1 ] );
        operator = formula[ 0 ];

        switch( operator ) {
            case "NOT":
                result = ~ inputOne;
                break;
            }

    } else if ( formula.length === 1 ) {

        inputOne = formula[ 0 ];

        if ( ( /^[0-9]+$/ ).test( inputOne ) ) {
            result = parseInt( inputOne, 10 );
        } else {
            result = resolve( inputOne );
        }

    }

    cache[ name ] = result;

    return result;
}

console.log( resolve( "a" ) );
