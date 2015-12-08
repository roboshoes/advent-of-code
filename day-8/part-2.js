var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

function encode( string ) {
    string = string
        .replace( /\\/g, "\\\\" )
        .replace( /\"/g, "\\\"" );

    return "\"" + string + "\"";
}

var amount = input.reduce( function( previous, line ) {

    previous += encode( line ).length;
    previous -= line.length;

    return previous;

}, 0 );

console.log( amount );