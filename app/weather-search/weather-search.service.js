'use strict';
angular.module('weatherSearch.services', []).factory('webAPIservice', function($http) {

    var weatherApiKey = '619d37f1614914a7a30eec3f73395617';
    var openWeatherAPI = {};

    openWeatherAPI.getByName = function(cityName) {
        return $http({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName +'&units=metric&APPID='+weatherApiKey
        });
    };
    openWeatherAPI.getByID = function(id) {
        return $http({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?id='+ id +'&units=metric&APPID='+weatherApiKey
        });
    };
    openWeatherAPI.getByCoordinates = function(lat,lon) {
        return $http({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&units=metric&APPID='+weatherApiKey
        });
    };

    openWeatherAPI.getForecastById = function(id) {
        return $http({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast?id='+ id +'&units=metric&APPID='+weatherApiKey

            //https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=619d37f1614914a7a30eec3f73395617
        });
    };

    return openWeatherAPI;

});
