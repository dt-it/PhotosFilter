var image = null;
var greyImage;
var redImage;
var rainbowImage;
var blurImage;
var windowImage;
var canvas;
var framecolor;
var framethickness;
var context;

function upload() {
    var fileInput = document.getElementById("input");
    var fileName = fileInput.value;
    alert("You choose " + fileName);

    image = new SimpleImage(fileInput);
    greyImage = new SimpleImage(fileInput);
    redImage = new SimpleImage(fileInput);
    rainbowImage = new SimpleImage(fileInput);
    blurImage = new SimpleImage(fileInput);
    windowImage = new SimpleImage(fileInput);

    canvas = document.getElementById("can");

    image.drawTo(canvas);
}

function deleteImage() {
    doClear(canvas);
}

function doClear(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function resetImage() {
    image.drawTo(canvas);
}

function checkIfLoadedCorrectly() {
    if (image == null || !image.complete()) {
        alert("Image not loaded");
    }
}

function makeGrey() {
    checkIfLoadedCorrectly();
    for (var pixel of greyImage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }

    greyImage.drawTo(canvas);
}

function makeRed() {
    checkIfLoadedCorrectly();
    for (var pixel of redImage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
            pixel.setRed(avg * 2);
            pixel.setGreen(0);
            pixel.setBlue(0);
        } else {
            pixel.setRed(255);
            pixel.setGreen(avg * 2 - 255);
            pixel.setBlue(avg * 2 - 255);
        }
    }
    redImage.drawTo(canvas);
}


function makeRainbow() {
    checkIfLoadedCorrectly();
    for (var pixel of rainbowImage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (pixel.getY() <= rainbowImage.getHeight() / 7) {
            pixel.setGreen(0);
            pixel.setBlue(0);
        } else if (pixel.getY() > rainbowImage.getHeight() / 7 && pixel.getY() <= 2 * rainbowImage.getHeight() / 7) {
            var red = pixel.getRed();
            pixel.setGreen(red * 0.5);
            pixel.setBlue(0);
        } else if (pixel.getY() > 2 * rainbowImage.getHeight() / 7 && pixel.getY() <= 3 * rainbowImage.getHeight() / 7) {
            var red = pixel.getRed();
            pixel.setGreen(red);
            pixel.setBlue(0);
        } else if (pixel.getY() > 3 * rainbowImage.getHeight() / 7 && pixel.getY() <= 4 * rainbowImage.getHeight() / 7) {
            pixel.setBlue(0);
            pixel.setRed(0);
        } else if (pixel.getY() > 4 * rainbowImage.getHeight() / 7 && pixel.getY() <= 5 * rainbowImage.getHeight() / 7) {
            pixel.setGreen(0);
            pixel.setRed(0);
        } else if (pixel.getY() > 5 * rainbowImage.getHeight() / 7 && pixel.getY() <= 6 * rainbowImage.getHeight() / 7) {
            var blue = pixel.getBlue();
            pixel.setRed(blue * 0.5);
            pixel.setGreen(0)
        } else if (pixel.getY() > 6 * rainbowImage.getHeight() / 7 && pixel.getY() <= rainbowImage.getHeight()) {
            var red = pixel.getRed();
            pixel.setBlue(red);
            pixel.setGreen(0)
        }
    }
    rainbowImage.drawTo(canvas);
}

function blurfilter() {
    for (var pixel of blurImage.values()) {
        var random = Math.random();
        if (random > 0.5) {
            var x = pixel.getX() + 10;
            if (x >= 0 && x <= blurImage.getWidth() - 1) {
                blurImage.setPixel(x, pixel.getY(), pixel);
            }
        }
    }
}

function makeBlurry() {
    blurfilter();
    blurImage.drawTo(canvas);
}

function windowFilter() {
    context = canvas.getContext("2d");
    context.fillStyle = String(framecolor);
    context.fillRect(0, 0, framethickness, canvas.height);
    context.fillRect(0, 0, canvas.width, framethickness);
    context.fillRect(canvas.width - framethickness, 0, framethickness, canvas.height);
    context.fillRect(0, canvas.height - framethickness, canvas.width, framethickness);
    context.fillRect(canvas.width / 2 - framethickness, 0, framethickness, canvas.height);
    context.fillRect(0, canvas.height / 2 - framethickness, canvas.width, framethickness);
}

function getColor() {
    var clrinput = document.getElementById("clrinput");
    framecolor = clrinput.value;
}

function getThickness() {
    var thicknessinput = document.getElementById("rangeinput");
    framethickness = thicknessinput.value;
}

function makeWindow() {
    checkIfLoadedCorrectly();
// && pixel.getY() > (windowImage.getHeight() / 2 + 100)
    for (var pixel of windowImage.values()) {
        if (pixel.getX() > 50 && pixel.getX() < (windowImage.getWidth() - 50) &&
            pixel.getY() > 50 && pixel.getY() < (windowImage.getHeight() - 50) &&
            pixel.getY() < (windowImage.getHeight() / 2 - 100)
        ) {
            var x = pixel.getX();
            var y = pixel.getY();

            windowImage.setPixel(pixel.getX(), pixel.getY(), pixel);
        } else {
            pixel.setRed(0);
            pixel.setGreen(0);
            pixel.setBlue(0);
        }
    }
    windowImage.drawTo(canvas);
}

