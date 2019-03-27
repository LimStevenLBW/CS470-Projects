"use strict";

/*
    Steven Lim
    Lab Assignment 7 Date Object Practice
*/

var month, day, year;
var hour, min, sec;
var currentDate;
const JULYFOURTH = new Date("July 4, 2019").getTime();

//Self Invoking Function
(function main(){ 
    clockStart();
    countdownStart();
})();

//Starts a 1 second interval timer for the header clock
function clockStart() {
    let prefix;
    let shortDate, shortTime;

    currentDate = new Date();
    month = currentDate.getMonth() + 1;
    day = currentDate.getDate();
    year = currentDate.getFullYear();
    hour = currentDate.getHours();
    prefix = hour < 12 ? " AM" : " PM";
    hour = formatTime(hour);
    hour = formatTwoDigits(hour);
    min = currentDate.getMinutes();
    min = formatTwoDigits(min);
    sec = currentDate.getSeconds();
    sec = formatTwoDigits(sec);

    shortDate = (month + "/" + day + "/" + year);
    shortTime = (hour + ":" + min + ":" + sec + prefix)

    document.getElementById("currentTime").getElementsByTagName('span')[0].innerHTML = shortDate;
    document.getElementById("currentTime").getElementsByTagName('span')[1].innerHTML = shortTime;

    setTimeout(clockStart, 1000);
}

//Start a 1 second interval timer for the countdown clock
function countdownStart(){
    let presentTime = currentDate.getTime();
    let timeDifference = JULYFOURTH - presentTime;

    //Calculates the difference in time between July 4th and Today, update the result onscreen
    document.getElementById("dLeft").innerHTML = Math.floor(timeDifference/(1000*60*60*24));
    document.getElementById("hLeft").innerHTML = Math.floor((timeDifference % (1000*60*60*24)/(1000*60*24)));
    document.getElementById("mLeft").innerHTML = Math.floor((timeDifference % (1000*60*60) / (1000*60)));
    document.getElementById("sLeft").innerHTML = Math.floor((timeDifference % (1000*60) / 1000));

    setTimeout(countdownStart, 1000);
}

//Ensure a 12-hour format for hours
function formatTime(time){
    time = ((time + 11) % 12 + 1);
    return time;
}

//If a date variable is less than two digits, prefix a zero
function formatTwoDigits(time){
    if(time < 10){
        time = "0" + time;
    }
    return time;
}