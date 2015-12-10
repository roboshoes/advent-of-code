var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

function countOccurance( word, letter ) {
    return ( word.match( new RegExp( letter, "g" ) ) || [] ).length;
}

var amount = input.reduce( function( count, word ) {

    // at least three vowls:

    var vowls = [ "a", "e", "i", "o", "u" ].reduce( function( previous, vowl ) {
        return previous + countOccurance( word, vowl );
    }, 0 );

    if ( vowls < 3 ) return count;

    // at least one letter pair:

    var match = false;

    for ( var i = 1; i < word.length; i++ ) {
        if ( word[ i ] === word[ i - 1 ] ) {
            match = true;
            break;
        }
    }

    if ( ! match ) return count;

    // does not contain those pairs:

    var contains = [ "ab", "cd", "pq", "xy" ].some( function( pair ) {
        return word.indexOf( pair ) > -1;
    } );

    if ( contains ) return count;

    // other wise it checks out:

    return count + 1;

}, 0 );

console.log( amount );
