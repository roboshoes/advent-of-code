var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var horsies = {};
var time = 2503;

input.forEach( function( line ) {

    var parts = line.split( " " );
    var name = parts[ 0 ];

    horsies[ name ] = {
        speed: parseInt( parts[ 3 ], 10 ),
        speedTime: parseInt( parts[ 6 ], 10 ),
        restTime: parseInt( parts[ 13 ], 10 )
    };

} );

var distance = Object.keys( horsies ).reduce( function( previous, name ) {

    var current = horsies[ name ];

    var timePerChunk = current.speedTime + current.restTime;
    var distancePerChunk = current.speed * current.speedTime;

    var fullChunks = Math.floor( time / timePerChunk );

    var delta = fullChunks * distancePerChunk;

    var leftTime = time % timePerChunk;

    if ( leftTime >= current.speedTime ) delta += distancePerChunk;
    else delta += leftTime * current.speed;

    return Math.max( previous, delta );

}, 0 );

console.log( distance );