// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtXmMHilbX13-EAzWE1xkZB_wIm7MRNXA",
    authDomain: "tt-iot-utex.firebaseapp.com",
    databaseURL: "https://tt-iot-utex-default-rtdb.firebaseio.com",
    projectId: "tt-iot-utex",
    storageBucket: "tt-iot-utex.appspot.com",
    messagingSenderId: "698741286775",
    appId: "1:698741286775:web:32abf6a60f10b193816372"
};
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.database();



function onLed(room) {
    database.ref("/Home1/" + room).update({
        "Led" : "ON"
    });
}

function offLed(room) {
    database.ref("/Home1/" + room).update({
        "Led" : "OFF"
    });
}

function updateLed(room, bulb) {
    database.ref("/Home1/" + room + "/Led").on("value", function(snapshot) {
        if (snapshot.exists()) {
            var state = snapshot.val();
            if (state == "ON")
                bulb.src = "../resource/light_bulb.png";
            else 
                bulb.src = "../resource/light_bulb_off.png";
        }
        else
            console.log("No data available!");
    });
}

function updateTemp(room, temp) {
    database.ref("/Home1/" + room + "/Temp").on("value", function(snapshot) {
        if (snapshot.exists()) {
            var tempValue = snapshot.val();
            temp.innerHTML = tempValue;
        }
        else
            console.log("No data available!");
    });
}



// Room 1
var temp1 = document.getElementById("temp1")
var bulb1 = document.getElementById("light_bulb1")
var btnOn1 = document.getElementById("btnOn1");
var btnOff1 = document.getElementById("btnOff1");

btnOn1.onclick = function() {
    onLed("Room1");
}

btnOff1.onclick = function() {
    offLed("Room1");
}

updateLed("Room1", bulb1);

updateTemp("Room1", temp1);



// Room 2
var temp2 = document.getElementById("temp2")
var bulb2 = document.getElementById("light_bulb2")
var btnOn2 = document.getElementById("btnOn2");
var btnOff2 = document.getElementById("btnOff2");

btnOn2.onclick = function() {
    onLed("Room2");
}

btnOff2.onclick = function() {
    offLed("Room2");
}

updateLed("Room2", bulb2);

updateTemp("Room2", temp2);