// pentru debug -> window.allert(text);

// to get current time
function getCurrentTime() {
    var today = new Date();
    var theTime = document.getElementById("theTime");
    theTime.innerText = "The Time is: " + today.toDateString() + " " + today.toLocaleTimeString();
}

setInterval(getCurrentTime, 1000);

// to get current location
function getLocation() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    var theLocation = document.getElementById("theLocation");
    function success(pos) {
        var crd = pos.coords;
    
        var message = ''
        message += 'The Position is:'
        message += `Latitude : ${crd.latitude}`
        message += `Longitude: ${crd.longitude}`
        message += `More or less ${crd.accuracy} meters.`
    
        theLocation.innerText = message;
    }
      
    function error(err) {
        theLocation.innerText = `ERROR(${err.code}): ${err.message}`;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

// to get browser name and version
function getBrowserName(){
    return navigator.appName;
}

function getBrowserVersion(){
    return navigator.appVersion;
}

function getBrowserDetails(){
    document.getElementById("browserDetails").innerHTML = (getBrowserName() + ' ' + getBrowserVersion());
}

// functie onload pentru body
function checkCookies() {
    var text = "";
  
    if (navigator.cookieEnabled == true) {
        text = "Cookies are enabled.";
    } 
    else {
        text = "Cookies are not enabled.";
    }

    document.getElementById("demo").innerHTML = text;
}

function drawCanvas(){ 
    var canvas = document.getElementById("coolCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,150,75);
}

function schimbaContinut(resursa){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("continut").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", resursa + '.html', true);
    xhttp.send();
}