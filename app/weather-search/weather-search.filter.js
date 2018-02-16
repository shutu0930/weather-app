'use strict';
angular.module('weatherSearch.filter', []).
filter('tempRound', function(){
    return function(temp){
        return Math.floor(temp);
    };
}).
filter('getWeekday', function(){
    return function(dayNum){
        switch(dayNum){
            case 1:
                return 'Monday';
                break;
            case 2:
                return'Tuesday';
                break;
            case 3:
                return'Wednesday';
                break;
            case 4:
                return'Thursday';
                break;
            case 5:
                return 'Friday';
                break;
            case 6:
                return  'Saturday';
                break;
            case 0:
                return 'Sunday';
                break;
            default:return 'error! Failed to read Date';

        }

    };
}).
filter('windDirection', function(){
    return function(num){
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    };
});