var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var amount = input.reduce( function( count, word ) {

    var i = 0;
    var match = false;

    // at least one not overlapping pair

    for ( i = 1; i < word.length; i++ ) {
        var pair = word.substr( i - 1, 2 );

        var index = word.indexOf( pair );
        var lastIndex = word.lastIndexOf( pair );

        if ( lastIndex - index > 1 ) {
            match = true;
            break;
        }
    }

    if ( ! match ) return count;

    // at least one letter repeats with a letter inbetween

    match = false;

    for ( i = 2; i < word.length; i++ ) {
        if ( word[ i ] === word[ i - 2 ] ) {
            match = true;
            break;
        }
    }

    if ( ! match ) return count;

    // otherwise:

    return count + 1;

}, 0 );

console.log( amount );