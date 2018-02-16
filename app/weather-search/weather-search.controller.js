angular.module('weatherSearch.controllers', []).controller('mcWeatherTestController',
    ['$scope', 'webAPIservice', function($scope, webAPIservice){

        $scope.testIsDone = false; // set this to true when you're done
        $scope.alertInfo='';
        $scope.date = new Date();
        $scope.hasError = 'noerror';
        $scope.isLoaded = 'loading';

        $scope.weatherList = []; //forecast list

        $scope.weatherDate={
            dt:null,
            id:2147714,
            location:{
                city:"Sydney",
                country:"",
                coords:{
                    lat:null,
                    lon:null
                }
            },
            weather:{
                main: "",
                description: "",
                humidity:null,
                pressure:null,
                temp:null,
                temp_max:null,
                temp_min:null,
                wind:{
                    deg:null,
                    speed:null
                },
                sunrise:null,
                sunset:null,
                icon: "",
                id: null
            }
        };



    var autocomplete; //autocomplete object
    var componentForm = {
        locality: 'long_name'
    };

    //function to init autoComplete from google
    $scope.initAutocomplete=function() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['(cities)']}); //only get cities type response

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
    };
    $scope.initAutocomplete();




    //set location by precise parameters
    // $scope.geolocate = function() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             var geolocation = {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude
    //             };
    //             var circle = new google.maps.Circle({
    //                 center: geolocation,
    //                 radius: position.coords.accuracy
    //             });
    //             autocomplete.setBounds(circle.getBounds());
    //         });
    //     }
    // };
        //init weather app content
        $scope.initial = function(){
            //use coordinates to get weather data
            navigator.geolocation.getCurrentPosition(function(location){
                getByCoords( location.coords.latitude, location.coords.longitude );
            });

            // $scope.getWeather($scope.weatherDate.location.city);
            //get forecast by id, more precise
            getForecastById($scope.weatherDate.id);



        };

        $scope.initial();




    $scope.getWeather = function(cityName){
        $scope.hasError = 'noerror';
        $scope.testIsDone = false;
        $scope.isLoaded = 'loading';
        // $scope.isDisplay= 'hide';
        if(cityName != ''){
            getByName(cityName);

        } else {
            $scope.initial();
        }
    };

    //aoto fill city input
    function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();
        // console.log(place);
        if(place.address_components!=null){
            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place.address_components[i][componentForm[addressType]];

                    $scope.weatherDate.location.city = val;
                    // console.log("google"+val);
                    $scope.getWeather($scope.weatherDate.location.city);

                }
            }
        }

    }

    //get weather content by city name
    function getByName(cityName){
        webAPIservice.getByName(cityName).then(function(response) {
            //First function handles success
            $scope.weather = response.data;
            fillWeatherDate($scope.weather);
            getForecastById($scope.weather.id);
            $scope.testIsDone = true;
            $scope.isLoaded = 'loaded';

        }, function(response) {

            //Second function handles error
            $scope.hasError = 'haserror';
            $scope.isLoaded = 'loaded';
            // alert("Sorry there has been an error connecting to the API");
            $scope.alertInfo='Sorry there has been an error connecting to the API!\n Please enter a valid city name.';
        });


    }

    //get weather by coordinates
    function getByCoords ( lat, long ) {

        webAPIservice.getByCoordinates( lat, long).then(function(response) {
            //First function handles success
            $scope.weather = response.data;
            fillWeatherDate($scope.weather);
            $scope.testIsDone = true;
            $scope.isLoaded = 'loaded';
            // console.log($scope.weatherDate.id);
        }, function(response) {

            //Second function handles error

            $scope.hasError = 'haserror';
            $scope.isLoaded = 'loaded';
            // console.log($scope.isLoaded);
            // alert("Sorry there has been an error connecting to the API");
            $scope.alertInfo='Sorry there has been an error connecting to the API!\n Please enter a valid city name.';
        });

        //
        // getForecast( lat, long, null, $rootScope.unitMetrics );
        //
        // getDays( lat, long, null, $rootScope.unitMetrics );

    }

    //fill weather list data
    function fillWeatherList(list){
        for(var i=0;i<5;i++){
            $scope.weatherList[i]={
                temp: list[i*8].main.temp,
                dt:new Date(parseInt(list[i*8].dt) * 1000)
                // list[i*8].dt*1000
            };
            $scope.weatherList[i].icon=getIconClass(list[i*8].weather[0].main.toLowerCase(), list[i*8].weather[0].id);
        }

    }
    //get icon class name according to weather description
    function getIconClass(weather, iconId ){

        // console.log(weatherMain);
        if(weather.includes("sunny") ||weather.includes("clear") ){
            return 'owf owf-'+ iconId +' icon-color-sunny';
        }else if(weather.includes("rain")){
            return 'owf owf-'+ iconId +' icon-color-rainy';
        }else if(weather.includes("clouds") || weather.includes("fog")){
            return 'owf owf-'+ iconId +' icon-color-cloudy';
        }else{
            return 'owf owf-'+ iconId ;
        }
    }

    //fill weather data
    function fillWeatherDate(data){
        $scope.weatherDate.dt = data.dt;
        $scope.weatherDate.id = data.id;
        $scope.weatherDate.location= {
            city:data.name,
            country:data.sys.country,
            coords:{
                lat:data.coord.lat,
                lon:data.coord.lat
            }
        };

        $scope.weatherDate.weather= {
            main: data.weather[0].main,
            description: data.weather[0].description,
            humidity:data.main.humidity,
            pressure:data.main.pressure,
            temp:data.main.temp,
            temp_max:data.main.temp_max,
            temp_min:data.main.temp_min,
            wind:{
                deg:data.wind.deg,
                speed:data.wind.speed
            },
            sunrise:data.sys.sunrise,
            sunset:data.sys.sunset,
            // icon: 'owf owf-'+data.weather[0].id,
            id: data.weather[0].id
        };

        $scope.weatherDate.weather.icon = getIconClass($scope.weatherDate.weather.main.toLowerCase(), $scope.weatherDate.weather.id);


    }

    //get weather by city id
    function getForecastById (id) {

        webAPIservice.getForecastById(id).then(function(response) {
            //First function handles success
            $scope.weatherL = response.data.list;
            fillWeatherList($scope.weatherL);
            $scope.testIsDone = true;
            $scope.isLoaded = 'loaded';
            // console.log($scope.weatherL);
        }, function(response) {

            //Second function handles error

            $scope.hasError = 'haserror';
            $scope.isLoaded = 'loaded';
            // console.log($scope.isLoaded);
            // alert("Sorry there has been an error connecting to the API");
            $scope.alertInfo='Sorry there has been an error connecting to the API!\n Please enter a valid city name.';
        });


    }


}]);

