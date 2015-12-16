var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var ingredients = {};
var keys;
var values;

input.forEach( function( line ) {

    var parts = line.split( ":" );
    var name = parts[ 0 ];
    var conditions = parts[ 1 ];

    var pairs = conditions.split( "," );

    ingredients[ name ] = {};

    pairs.forEach( function( pair ) {
        if ( pair[ 0 ] === " " ) pair = pair.substr( 1 );

        var kv = pair.split( " " );
        var key = kv[ 0 ];
        var value = kv[ 1 ];

        ingredients[ name ][ key ] = parseInt( value, 10 );

    } );

} );


keys = Object.keys( ingredients );
values = Object.keys( ingredients[ keys[ 0 ] ] );

removeItem( values, "calories" );

function removeItem( values, key ) {
    while ( values.indexOf( key ) > -1 ) {
        values.splice( values.indexOf( key ), 1 );
    }

    return values;
}

function increase( array ) {
    var index = array.length - 1;
    var carryOver = 0;

    do {

        carryOver = 0;
        array[ index ]++;

        if ( array[ index ] > 100 ) {
            array[ index ] = 0;
            carryOver = 1;
        }

        index--;

        if ( index < 0 ) break;

    } while ( carryOver > 0 );
}

function digitSum( array ) {
    return array.reduce( function( previous, current ) { return previous + current; }, 0 );
}

function makeArray( length, number ) {
    var array = [];

    for( var i = 0; i < length; i++ ) array.push( number );

    return array;
}

function addToArray( base, array ) {
    for ( var i = 0; i < base.length; i++ ) {
        base[ i ] += array[ i ];
    }
}

function multiplyArray( array ) {
    return array.reduce( function( previous, current ) {
        return previous * Math.max( current, 0 );
    }, 1 );
}

function caloryScore( digets ) {

    var calories = 0;

    for ( var j = 0; j < digets.length; j++ ) {
        var ingredientName = keys[ j ];
        var amount = digets[ j ];

        calories += amount * ingredients[ ingredientName ].calories;
    }

    return calories;
}


var digets = keys.map( function() {
    return 0;
} );

var length = Math.pow( 100, values.length );
var highest = 0;

for ( var i = 0; i < length; i++) {
    increase( digets );

    if ( digitSum( digets ) !== 100 ) continue;
    if ( caloryScore( digets ) !== 500 ) continue;

    var coefficients = makeArray( values.length, 0 );

    for ( var j = 0; j < digets.length; j++ ) {
        var ingredientName = keys[ j ];
        var amount = digets[ j ];

        var mutlipliedValues = values.map( function( valueName ) {
            return ingredients[ ingredientName ][ valueName ] * amount;
        } );

        addToArray( coefficients, mutlipliedValues );
    }

    var score = multiplyArray( coefficients );

    highest = Math.max( score, highest );
}

console.log( highest );

