var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var numbers = input.map( function( value ) { return parseInt( value, 10 ); } );
var eggnog = 150;

var digits = numbers.map( function() {
    return 0;
} );

function increase( array ) {

    var carryOver = 0;
    var index = array.length - 1;

    do {

        carryOver = 0;

        array[ index ] += 1;

        if ( array[ index ] > 1 ) {
            array[ index ] = 0;
            carryOver = 1;
        }

        index--;

    } while( carryOver > 0 && index > -1 );

}

function isValidCombo( digits ) {
    var amount = digits.reduce( function( previous, current, index ) {
        if ( current === 1 ) {
            return previous + numbers[ index ];
        }

        return previous;
    }, 0 );

    return amount === eggnog;
}

var length = Math.pow( 2, 20 ) - 1;
var combos = 0;

for ( var i = 0; i < length; i++ ) {

    increase( digits );

    if ( isValidCombo( digits ) ) combos++;

}

console.log( combos );
