var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var characters = {};
var highest = - Infinity;

function addCharacter( active, value, passive ) {
    if ( ! characters[ active ] ) {
        characters[ active ] = {};
    }

    characters[ active ][ passive ] = value;
}

input.forEach( function( line ) {

    var parts = line.split( " " );

    var active = parts[ 0 ];
    var factor = parts[ 2 ] === "gain" ? 1 : -1;
    var value = parseInt( parts[ 3 ], 10 ) * factor;
    var passive = parts.pop();

    passive = passive.substr( 0, passive.length - 1 );

    addCharacter( active, value, passive );

} );

characters.me = {};

function getRelationship( active, passive ) {
    if ( active === "me" || passive === "me" ) return 0;

    return characters[ active ][ passive ];
}

function sum( order ) {
    return order.reduce( function( previous, current, index ) {
        var right = order[ ( index + 1 ) % order.length ];
        var left = order[ index === 0 ? order.length - 1 : index - 1 ];

        return previous + getRelationship( current, left ) + getRelationship( current, right );
    }, 0 );
}

function withoutIndex( array, index ) {
    var copy = [];

    for ( var i = 0; i < array.length; i++ ) {
        if ( i !== index ) copy.push( array[ i ] );
    }

    return copy;
}

function permutation( defined, variable ) {

    if ( variable.length === 0 ) {

        highest = Math.max( sum( defined ), highest );

    } else {

        for ( var i = 0; i < variable.length; i++ ) {
            permutation( defined.concat( variable[ i ] ), withoutIndex( variable, i ) );
        }

    }
}

permutation( [], Object.keys( characters ) );

console.log( highest );
