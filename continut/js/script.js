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
    initializeCanvas();
}

// to get current time
var isOnInvatPage = false;
setInterval(getCurrentTime, 1000); // e pentru a actualiza ceasul
function getCurrentTime() {
    // ia cu Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')
    // de la SPA
    if(isOnInvatPage){ 
        var today = new Date();
        var theTime = document.getElementById("theTime");
        theTime.innerHTML = `The Time is: ${today.toDateString()} ${today.toLocaleTimeString()}`;
    }
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
// https://dev.opera.com/articles/html5-canvas-painting/
// https://www.demo2s.com/javascript/javascript-canvas-draw-rectangles-with-mouse.html
var x1, x2, y1, y2;
var firstClick = false;
function drawRectangle(event){
    var canvas = document.getElementById("coolCanvas");
    var context = canvas.getContext("2d");

    if(!firstClick){
        x1 = event.offsetX;
        y1 = event.offsetY;
        firstClick = true;
        return;
    }

    x2 = event.offsetX;
    y2 = event.offsetY;
    
    context.beginPath();
    context.lineWidth = document.getElementById("line_width").value;

    context.fillStyle = document.getElementById("fill_color").value;
    context.fillRect(x1, y1, x2-x1, y2-y1);

    context.strokeStyle = document.getElementById("stroke_color").value;
    context.rect(x1, y1, x2-x1, y2-y1);
    context.stroke();

    firstClick = false;
}
function drawCircle(event){
    var canvas = document.getElementById("coolCanvas");
    var context = canvas.getContext("2d");

    if(!firstClick){
        x1 = event.offsetX;
        y1 = event.offsetY;
        firstClick = true;
        return;
    }

    x2 = event.offsetX;
    y2 = event.offsetY;
    
    context.beginPath();
    let avgX = (x2+x1)/2;
    let avgY = (y2+y1)/2;
    // nu intreba de mate... aparent in js deseneaza un rectangle intr-o elipsa fara /2 de jos
    // daca pui /2 il face sa deseneze elipsa in rectangle... yea maths cool funny 
    context.ellipse(avgX, avgY, Math.abs(x2-x1)/2, Math.abs(y2-y1)/2, 0, 0, 2*Math.PI);
    context.lineWidth = document.getElementById("line_width").value;

    context.fillStyle = document.getElementById("fill_color").value;
    context.fill();

    context.strokeStyle = document.getElementById("stroke_color").value;
    context.stroke();

    firstClick = false;
}
function drawLine(event){
    var canvas = document.getElementById("coolCanvas");
    var context = canvas.getContext("2d");

    if(!firstClick){
        x1 = event.offsetX;
        y1 = event.offsetY;
        firstClick = true;
        return;
    }

    x2 = event.offsetX;
    y2 = event.offsetY;
    
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = document.getElementById("line_width").value;

    context.fillStyle = document.getElementById("fill_color").value;
    context.fill();

    context.strokeStyle = document.getElementById("stroke_color").value;
    context.stroke();

    firstClick = false;
}
function drawCanvas(event){ 
    var tool = document.getElementById("draw_tool").value;
    // drawtool.options.selectedIndex -> da index-ul;

    if(tool === "rectangle")
        drawRectangle(event);
    else if (tool === "ellipse")
        drawCircle(event);
    else if (tool === "line")
        drawLine(event);
}
function cancelDraw(){
    firstClick = false;
}
function initializeCanvas(){
    var canvas = document.getElementById("coolCanvas");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.lineWidth = document.getElementById("line_width").value;

    context.fillStyle = document.getElementById("fill_color").value;
    context.fillRect(0, 0, canvas.width, canvas.height);
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

    // ca sa nu mai dea exceptii
    isOnInvatPage = false;
    if (jsFisier === "invat.html")
        isOnInvatPage = true;

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