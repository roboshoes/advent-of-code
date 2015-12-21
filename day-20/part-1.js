var input = 29000000;

var houses = [];
var elves = input / 10;
var found = -1;
var max = 0;

for ( var i = 1; i <= elves; i++ ) {
    if ( ! houses[ i ] ) houses[ i ] = 0;

    for ( var j = 1; j <= i; j++ ) {
        if ( i % j === 0 ) {
            houses[ i ] += j * 10;
            max = Math.max( max, houses[ i ] );
        }

        if ( houses[ i ] >= input ) {
            found = i;
            break;
        }
    }

    if ( found > -1 ) break;
}


console.log( found );