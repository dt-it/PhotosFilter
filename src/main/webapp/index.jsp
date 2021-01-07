<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>PHOTO FILTERS</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>
<body>
<script src="https://www.dukelearntoprogram.com/course1/common/js/image/SimpleImage.js"></script>
<h1>PHOTO FILTERS</h1>

<canvas id="can"></canvas>
<p>
    <b>Load image </b><br/>
    <label id="labelinput" for="input">Select Image</label>
    <input type="file" id="input" multiple="false" accept="image/*" onchange="upload()">
</p>

<p>
    <b>Choose filter </b><br/>
    <input id="greyButton" type="button" value="Change into greyscale" onclick="makeGrey()">
    <input id="redButton" type="button" value="Change into red" onclick="makeRed()">
    <input id="rainbowButton" type="button" value="Change into rainbow" onclick="makeRainbow()">
    <input id="blurButton" type="button" value="Change into blurry" onclick="makeBlurry()">
<%--    <input id="windowButton" type="button" value="Change into window" onclick="makeWindow()">--%>
    <br/>
    Add Window frame filter:
    <input type="button" value = "Window filter" onclick = "windowFilter()">
    Desired thickness: <input type="range" oninput="getThickness()" min = "0" max = "100" value = "0" id="rangeinput">
    Desired color : <input type="color" onchange = "getColor()" id="clrinput">
    </div>
    <br/>
    <input id="resetButton" type="button" value="Reset image" onclick="resetImage()">
    <input id="clearButton" type="button" value="Delete image" onclick="deleteImage()">
</p>

</body>
</html>