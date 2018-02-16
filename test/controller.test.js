describe('mcweatherTestController function', function() {

    describe('mcweatherTestController', function() {
        var $scope;

        beforeEach(module('weatherSearch.controllers'));

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('mcWeatherTestController', {$scope: $scope});
        }));

        it('should create "testIsDone"  with false', function() {
            expect($scope.testIsDone).toBe(false);
        });

        it('should set the default value of weather id', function() {
            expect($scope.weatherDate.id).toBe(2147714);
        });
    });
});