var fs = require( "fs" );
var input = fs.readFileSync( __dirname + "/input.txt", "utf-8" );

var lines = input.split( "\n" );

function encode( string ) {
    string = string
        .replace( /\\/g, "\\\\" )
        .replace( /\"/g, "\\\"" );

    return "\"" + string + "\"";
}

var amount = lines.reduce( function( previous, line ) {

    previous += encode( line ).length;
    previous -= line.length;

    return previous;

}, 0 );

console.log( amount );