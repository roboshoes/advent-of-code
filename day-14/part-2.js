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
        restTime: parseInt( parts[ 13 ], 10 ),
        score: 0,
        distance: 0,
    };

    horsies[ name ].timeChunk = horsies[ name ].speedTime + horsies[ name ].restTime;

} );

var current;
var name;
var max = -1;
var phase;

for ( var i = 1; i <= time; i++ ) {

    max = -1;

    for ( name in horsies ) {

        current = horsies[ name ];
        phase = i % current.timeChunk;

        if ( phase <= current.speedTime && phase !== 0 ) current.distance += current.speed;

        max = Math.max( max, current.distance );
    }


    for ( name in horsies ) {

        current = horsies[ name ];

        if ( current.distance >= max ) {
            current.score++;
        }

    }

}


var points = Object.keys( horsies ).reduce( function( previous, name ) {

    return Math.max( previous, horsies[ name ].score );

}, 0 );

console.log( points );