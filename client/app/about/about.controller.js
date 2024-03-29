/**
 * Created by danatsirulnik on 03/03/2018.
 */
'use strict';

angular.module('classify').controller('AboutController', function ($scope) {

    var canvas = document.getElementById('myCanvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
        ctx.stroke();
    }

    $.get("http://api.openweathermap.org/data/2.5/weather?q=Yavne&APPID=bac62776249c256d09b4217d47512dd2", function (data) {
        $scope.news = (data.main.temp - 273.15).toPrecision(3) + " °C outside";
    });

});