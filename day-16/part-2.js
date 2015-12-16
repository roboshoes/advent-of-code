var fs = require( "fs" );

var input = fs.readFileSync( __dirname + "/input.txt", "utf-8" ).split( "\n" );
var mfcsam = fs.readFileSync( __dirname + "/mfcsam.txt", "utf-8" ).split( "\n" );

var clues = {};

mfcsam.forEach( function( line ) {
    var parts = line.split( ":" );

    clues[ parts[ 0 ] ] = parseInt( parts[ 1 ].trim(), 10 );
} );


function compareValue( key, cluesValue, auntValue ) {
    if ( key === "cats" || key === "trees" ) {
        return auntValue > cluesValue;
    } else if ( key === "pomeranians" || key === "goldfish" ) {
        return auntValue < cluesValue;
    } else {
        return cluesValue === auntValue;
    }
}

input.forEach( function( line ) {
    var name = line.substr( 0, line.indexOf( ":" ) );
    var number = name.split( " " ).pop();
    var facts = line.substr( name.length + 2 ).split( "," );

    var match = facts.reduce( function( previous, fact ) {

        var parts = fact.trim().split( ":" );

        var key = parts[ 0 ];
        var value = parseInt( parts[ 1 ].trim(), 0 );

        return previous && compareValue( key, clues[ key ], value );

    }, true );

    if ( match ) console.log( number );
} );
