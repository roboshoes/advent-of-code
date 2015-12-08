var fs = require( "fs" );
var input = fs.readFileSync( __dirname + "/input.txt", "utf-8" );

var lines = input.split( "\n" );


function evaluate( string ) {

    // All of this could be boiled down to one RegExp because
    // we are not looking for the actual string, just the length,
    // so every escaped character could be replaced with one
    // placholder instead.

    return string
        .substr( 1, string.length - 2 )
        .replace( /\\\\/g, "\\" )
        .replace( /\\\"/g, "\"" )
        .replace( /\\x([a-f0-9]{2})/g, function( match, number ) {
            var ascii = parseInt( number, 16 );
            return String.fromCharCode( ascii );
        } );
}

var amount = lines.reduce( function( previous, line ) {

    previous += line.length;
    previous -= evaluate( line ).length;

    return previous;

}, 0 );

console.log( amount );