/**
 * Created by damon on 2016-04-27.
 */

var app = angular.module("HealthApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            //views: {
            //    '': {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl'
            //    }
            //}
        });
    $urlRouterProvider.otherwise('/');
});

app.run(function ($rootScope, $location, Session){
   $rootScope.isLoggedIn = function () {
       if (Session.accessToken == null || Session.accessToken === 0) {
           $location.path("/");
           return false;
       } else {
           return true;
       }
   }
});

app.controller("LoginCtrl", function ($scope) {
    $scope.clientid = "227KY6";

    $scope.authenticate = function () {
        var url = "https://www.fitbit.com/oauth2/authorize?client_id=227KY6&response_type=token&scope=activity%20profile&expires_in=2592000";
        // debugging purposes
        console.log(url);

        window.location.assign(url);
    }
});

app.controller("DashboardCtrl", function ($rootscope, $scope, $http, $location, $filter, Session) {
    $scope.base_date = "";
    $scope.end_date = "";

    if ($rootScope.isLoggedIn()) {

        console.log($rootScope.isLoggedIn())

        // switch statement to display which month
        function monthswitch (month_value) {
            switch (month_value) {
                case "01":
                    return "January";
                    break;
                case "02":
                    return "February";
                    break;
                case "03":
                    return "March";
                    break;
                case "04":
                    return "April";
                    break;
                case "05":
                    return "May";
                    break;
                case "06":
                    return "June";
                    break;
                case "07":
                    return "July";
                    break;
                case "08":
                    return "August";
                    break;
                case "09":
                    return "September";
                    break;
                case "10":
                    return "October";
                    break;
                case "11":
                    return "November";
                    break;
                case "12":
                    return "December";
                    break;
                default:
                    return false
            }
        }

        $scope.infosubmit = function () {
            $scope.basearray = $scope.base_date.split("-");
            if (!monthswitch($scope.basearray[1])) {
                window.alert("Month does not exist. Enter the date again.");
                return
            } else {
                $scope.basedate_format = monthswitch($scope.basearray[1]) + " " + $scope.basearray[2] + ", " + $scope.basearray[0];
            }

            $scope.endarray = $scope.end_date.split("-");
            if (!monthswitch($scope.endarray[1])) {
                window.alert("Month does not exist. Enter the date again.");
                return
            } else {
                $scope.enddate_format = monthswitch($scope.endarray[1]) + " " + $scope.endarray[2] + ", " + $scope.endarray[0];
            }

            $http ({
                method: "GET",
                url: "https://api.fitbit.com/1/user/" + Session.userid + "/activities/heart/date/" + + $scope.base_date + "/" + $scope.end_date + ".json",
                headers: {
                    Authorization: "Bearer" + Session.accessToken
                }
            }).then(function(response) {
                console.log(data)
                $scope.date = response.data.activities-heart.dateTime;
                $scope.data = response.data.activities-heart.value.heartRateZones;
            });
        }
    }


});

app.factory("Session", function () {
    var access_token;
    var expires_in;
    var account_user_id;

    if(JSON.parse(window.localStorage.getItem("fitbit"))) {
        access_token = JSON.parse(window.localStorage.getItem("fitbit")).oauth.access_token;
        expires_in = JSON.parse(window.localStorage.getItem("fitbit")).oauth.expires_in;
        account_user_id = JSON.parse(window.localStorage.getItem("fitbit")).oauth.account_user_id;
    }

    console.log(access_token)
    
    return {
        accessToken:access_token,
        expiresIn: expires_in,
        userid: account_user_id
    }
});