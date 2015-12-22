var store = require( "./store.json" );

var boss = {
    hitPoints: 103,
    damage: 9,
    armor: 2
};

var me = {
    hitPoints: 100,
    armor: 0,
    damage: 0
};

function executeAttack( from, against ) {
    against.hitPoints -= Math.max( from.damage - against.armor, 1 );

    if ( against.hitPoints <= 0 ) return true;
    else return false;
}

function fight() {
    while ( ! ( executeAttack( me, boss ) || executeAttack( boss, me ) ) );
}

function isValidCombo() {
    if ( variations[ 2 ] === variations [ 3 ] && variations[ 2 ] !== -1 ) return false;

    return true;
}

var variations = [ 0, -1, -1, -1 ];
var max = [ store.weapons.length - 1, store.armor.length - 1, store.rings.length - 1, store.rings.length - 1 ];
var min = [ 0, -1, -1, -1 ];

function step() {

    var carryOver = 0;
    var index = variations.length - 1;

    do {

        carryOver = 0;

        variations[ index ]++;

        if ( variations[ index ] > max[ index ] ) {
            variations[ index ] = min[ index ];
            carryOver = 1;
        }

        index--;

        if ( index < 0 ) break;

    } while ( carryOver > 0 );
}

function isSame( a, b ) {
    for ( var i = 0; i < a.length; i++ ) {
        if ( a[ i ] !== b[ i ] ) return false;
    }

    return true;
}

var highestCost = 0;

function round() {

    var cost = 0;

    cost += store.weapons[ variations[ 0 ] ].cost;
    me.damage += store.weapons[ variations[ 0 ] ].damage;

    if ( variations[ 1 ] > -1 ) {
        cost += store.armor[ variations[ 1 ] ].cost;
        me.armor += store.armor[ variations[ 1 ] ].armor;
    }

    if ( variations[ 2 ] > -1 ) {
        cost += store.rings[ variations[ 2 ] ].cost;
        me.armor += store.rings[ variations[ 2 ] ].armor;
        me.damage += store.rings[ variations[ 2 ] ].damage;
    }

    if ( variations[ 3 ] > -1 ) {
        cost += store.rings[ variations[ 3 ] ].cost;
        me.armor += store.rings[ variations[ 3 ] ].armor;
        me.damage += store.rings[ variations[ 3 ] ].damage;
    }

    fight();

    if ( me.hitPoints <= 0 ) {
        highestCost = Math.max( highestCost, cost );
    }

    step();

    if ( isSame( variations, max ) ) {

        console.log( highestCost );

    } else {

        me.hitPoints = 100;
        me.armor = 0;
        me.damage = 0;

        boss.hitPoints = 103;
        boss.damage = 9;
        boss.armor = 2;

        while ( ! isValidCombo() ) step();

        process.nextTick( round );
    }

}

process.nextTick( round );

