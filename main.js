//https://teachablemachine.withgoogle.com/models/hxHFoVU9S/

Webcam.set({
    width: 350,
    height: 300,
    image_format: "jpeg",
    jpeg_quality: 90
})
Webcam.attach("#camera");

function snapshot() {
    Webcam.snap(function (Image_src) {
        document.getElementById("result").innerHTML = "<img id='pic1' src='" + Image_src + "'>";
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hxHFoVU9S/model.json", modelLoaded);
function modelLoaded() {
    console.log("MODEL LOADED SUCESSFULLY");

}
var synth = window.speechSynthesis;
var shutter = new Audio();
shutter.src = "capture sound.mp3";
function check() {
    img1 = document.getElementById("pic1");
    classifier.classify(img1, gotResults);
}
function speak() {
    speak_data = "First prediction is " + hand_signal1 + " and second prediction is " + hand_signal2;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        hand_signal1 = results[0].label;
        hand_signal2 = results[1].label;
        document.getElementById("hand_sign1").innerHTML = hand_signal1;
        document.getElementById("hand_sign2").innerHTML = hand_signal2;
        if (hand_signal1 == "thumbs up") {
            signal = "&#128077;";
        } else if (hand_signal1 == "thumbs down") {
            signal = "&#128078;";
        } else if (hand_signal1 == "peace sign") {
            signal = "&#9996;";
        } else if (hand_signal2 == "fist") {
            signal = "&#9994;";
        }
        document.getElementById("emoji1").innerHTML = signal;
        if (hand_signal2 == "thumbs up") {
            signal = "&#128077;";
        } else if (hand_signal2 == "thumbs down") {
            signal = "&#128078;";
        } else if (hand_signal2 == "peace sign") {
            signal = "&#9996;";
        } else if (hand_signal2 == "fist") {
            signal = "&#9994;";
        }
        document.getElementById("emoji2").innerHTML = signal;
        speak();
    }
}