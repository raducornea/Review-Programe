// pentru debug -> window.allert(text);

// to get current time
function getCurrentTime() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return "The Time is: " + date + ' ' + time;
}

// to get current location
function getLocation() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
      
    function success(pos) {
        var crd = pos.coords;
    
        var message = ''
        message += 'The Position is:'
        message += `Latitude : ${crd.latitude}`
        message += `Longitude: ${crd.longitude}`
        message += `More or less ${crd.accuracy} meters.`
    
        document.getElementById("theLocation").innerHTML = message;
    }
      
    function error(err) {
        document.getElementById("theLocation").innerHTML = `ERROR(${err.code}): ${err.message}`;
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