// pentru collapse/expand la sectiuni
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible
var expandCollapseToggle = true;
function expandAll(){
    var expandables = document.getElementsByClassName("collapsible");
    var expand_collapse = document.getElementById("expand_collapse");
    expandCollapseToggle = !expandCollapseToggle;

    if(expandCollapseToggle){
        for (let index = 0; index < expandables.length; index++) {
            expandables[index].classList.toggle("active");
            var content = expandables[index].nextElementSibling;
            content.style.display = "none";
            expand_collapse.innerHTML = "&#9654; Expand Sections";
        }
    }
    else{
        for (let index = 0; index < expandables.length; index++) {
            expandables[index].classList.toggle("active");
            var content = expandables[index].nextElementSibling;
            content.style.display = "block";
            expand_collapse.innerHTML = "&#x25BC; Collapse Sections";
        }
    }
    
}
function expandSection(index){
    var expandables = document.getElementsByClassName("collapsible");

    expandables[index].classList.toggle("active");
    var content = expandables[index].nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } 
    else {
        content.style.display = "block";
    }
}

// Sectiunea 1 vvv ======================================================
// pentru debug -> window.allert(text);

// odata cu accesarea paginii Invat, se vor face si functiile
function onLoadInvat(){
    checkCookies();
    // time se face automat la o secunda
    getUrlAddress();
    getLocation();
    getBrowserDetails();
}

// to get current time
setInterval(getCurrentTime, 1000); // e pentru a actualiza ceasul
function getCurrentTime() {
    var today = new Date();
    var theTime = document.getElementById("theTime");
    theTime.innerHTML = `The Time is: ${today.toDateString()} ${today.toLocaleTimeString()}`;
}

// actual url@
function getUrlAddress(){
    var url = document.getElementById("urlAddress");
    url.innerHTML = `Url Address is: ${window.location.href}`;
}

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
        message += `The Position is: <br>`
        message += `Latitude : ${crd.latitude} <br>`
        message += `Longitude: ${crd.longitude} <br>`
        message += `More or less ${crd.accuracy} meters`
    
        theLocation.innerHTML = message;
    }
      
    function error(err) {
        theLocation.innerHTML = `ERROR(${err.code}): ${err.message}`;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

// to get browser name and version
function getBrowserDetails(){
    document.getElementById("browserDetails").innerHTML =
    `User Agent is: ${navigator.userAgent} <br>`;
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

    document.getElementById("cookiesStatus").innerHTML = text;
}

// Sectiunea 2 vvv ======================================================

function drawCanvas(){ 
    var canvas = document.getElementById("coolCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,150,75);
}

function schimbaContinut(resursa, jsFisier = "", jsFunctie = ""){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("continut").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", resursa + '.html', true);
    xhttp.send();

    if (jsFisier!="") {
        var elementScript = document.createElement('script');
        elementScript.onload = function () {
            if (jsFunctie) {
                window[jsFunctie](); // apelam functia dinamic
            }
        };
        elementScript.src = "js/" + jsFisier;
        document.head.appendChild(elementScript);
    } 
    else {
        if (jsFunctie!="") {
            window[jsFunctie]();
        }
    }
}