var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var stops = [];
var connections = {};

function setConnection( from, to, distance ) {
    if ( ! connections[ from ] ) connections[ from ] = {};
    if ( connections[ from ][ to ] && connections[ from ][ to ] < distance ) return;

    connections[ from ][ to ] = distance;
}

input.forEach( function( line ) {

    var points = line.split( " to " );
    var parts = points[ 1 ].split( " = " );

    points[ 1 ] = parts[ 0 ];

    points.forEach( function( point ) {
        if ( stops.indexOf( point ) < 0 ) stops.push( point );
        if ( ! connections[ point ] ) connections[ point ] = {};
    } );

    var distance = parseInt( parts[ 1 ], 10 );

    setConnection( points[ 0 ], points[ 1 ], distance );
    setConnection( points[ 1 ], points[ 0 ], distance );
} );

function copyArray( array ) {
    var copy = [];

    for ( var i = 0; i < array.length; i++ ) copy.push( array[ i ] );

    return copy;
}

function goTo( name, placesVisited ) {

    placesVisited.push( name );

    if ( placesVisited.length === stops.length ) return 0;

    var subDistances = [];
    var connectionsFromHere = Object.keys( connections[ name ] );

    connectionsFromHere.forEach( function( next ) {

        if ( placesVisited.indexOf( next ) > -1 ) return;

        var copy = copyArray( placesVisited );
        var subTree = connections[ name ][ next ] + goTo( next, copy );

        subDistances.push( subTree );
    } );

    if ( subDistances.length === 0 && placesVisited.length < stops.length ) return Infinity;

    return Math.min.apply( Math, subDistances );
}

var shortest = stops.reduce( function( previous, start ) {

    return Math.min( goTo( start, [] ), previous );

}, Infinity );

console.log( shortest );