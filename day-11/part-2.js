var input = "hepxcrrq";

var aCharCode = "a".charCodeAt( 0 );
var zCharCode = "z".charCodeAt( 0 );

var iCharChode = "i".charCodeAt( 0 );
var oCharCode = "o".charCodeAt( 0 );
var jCharCode = "l".charCodeAt( 0 );

var forbidden = [ iCharChode, oCharCode, jCharCode ];

function increase( phrase ) {

    var array = phrase
        .split( "" )
        .map( function( character ) {
            return character.charCodeAt( 0 );
        } );

    var carryOver = 0;
    var index = array.length - 1;

    do {

        array[ index ]++;

        if ( forbidden.indexOf( array[ index ] ) > -1 ) {
            array[ index ]++;
        }

        if ( array[ index ] > zCharCode ) {
            array[ index ] = aCharCode;

            carryOver = 1;
            index = index - 1;

            if ( index < 0 ) index = array.length - 1;

        } else {

            carryOver = 0;

        }

    } while ( carryOver > 0 );

    return array
        .map( function( number) {
            return String.fromCharCode( number );
        } )
        .join( "" );
}

function isValid( phrase ) {

    // the password from the result of part-1
    if ( phrase === "hepxxyzz" ) return false;

    var pairs = [];
    var i;

    for ( i = 0; i < phrase.length - 1; i++ ) {
        if ( phrase[ i ] === phrase[ i + 1 ] ) {

            if ( pairs.indexOf( phrase[ i ] ) < 0 ) {
                pairs.push( phrase[ i ] );
            }

            i++;
        }
    }

    if ( pairs.length < 2 ) return false;

    var previousValue = phrase.charCodeAt( 0 );
    var streakLength = 1;

    for ( i = 1; i < phrase.length; i++ ) {
        var charCode = phrase.charCodeAt( i );

        if ( charCode === previousValue + 1 ) {
            streakLength++;
        } else {
            streakLength = 1;
        }

        if ( streakLength >= 3 ) {
            break;
        }

        previousValue = charCode;
    }

    return streakLength >= 3;
}


do {

    input = increase( input );

} while ( ! isValid( input ) );

console.log( input );