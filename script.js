let isHexToRgb = true;

// trigger conversion when convert button or enter is clicked
document.getElementById("convert-color").addEventListener("click", conversion);
document.getElementById("hex-color").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        conversion();
    }
});

// performs the conversion
// can go hex to rgb or rgb to hex
function conversion() {
    let hexColor, rgbColor, borderColor
    let isValid = false

    if (isHexToRgb) {
        hexColor = document.getElementById("hex-color").value;
        isValid = isValidHex(hexColor);
        // checks validity of hex color
        if (!isValid) {
            alert("Invalid Hex Color");
            return;
        }
        rgbColor = colorConversion(hexColor, isHexToRgb);
        document.getElementById("rgb-color").value = rgbColor;
        document.body.style.backgroundColor = rgbColor;
    } else {
        rgbColor = document.getElementById("hex-color").value;
        isValid = isValidRgb(rgbColor);
        // checks validity of rgb color and bounds
        if (!isValid) {
            alert("Invalid RGB Color");
            return; 
        }
        if (isNotInBounds(rgbColor)) {
            alert("Not in Bounds");
            return; 
        }
        hexColor = colorConversion(rgbColor, isHexToRgb);
        document.getElementById("rgb-color").value = hexColor;
        document.body.style.backgroundColor = rgbColor;
    }

    
    function lighterShade(color, amount) {
        return color.map(component => Math.min(component + amount, 255));
    }

    // changes h1 and h2 text color accordingly to background
    if (isValid) {
        if (hexToBrightness(hexColor)) {
            document.getElementsByTagName("h1")[0].style.color = "white";
            document.getElementsByTagName("h2")[0].style.color = "white";
        } else {
            document.getElementsByTagName("h1")[0].style.color = "black";
            document.getElementsByTagName("h2")[0].style.color = "black";
        }
    } else {
        return;
    }
        
}

// input checks hex color
function isValidHex(hex) {
    hex = hex.replace('#', '');
    return /^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{3}$/.test(hex);
}

// input checks rgb color
function isValidRgb(rgb) {
    return /^rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(rgb);
}
function isNotInBounds(rgb) {
    const rgbArray = rgb.match(/\d+/g);

    if (rgbArray && rgbArray.length === 3) {
        const r = parseInt(rgbArray[0], 10);
        const g = parseInt(rgbArray[1], 10);
        const b = parseInt(rgbArray[2], 10);
        return (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255)    
    }
}

// converts the color function
function colorConversion(color, isHexToRgb = true) {
    if (isHexToRgb) {
        color = color.replace('#', '');

        if (color.length === 3) {
            color = color.split('').map((char) => char + char).join('');
        }

        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);

        return `rgb(${r}, ${g}, ${b})`;
    } else {
        const rgbArray = color.match(/\d+/g);

        if (rgbArray && rgbArray.length === 3) {
            const r = parseInt(rgbArray[0], 10);
            const g = parseInt(rgbArray[1], 10);
            const b = parseInt(rgbArray[2], 10);

            const hexR = componentToHex(r);
            const hexG = componentToHex(g);
            const hexB = componentToHex(b);

            return `#${hexR}${hexG}${hexB}`;
        }
    }
}

// checks if background is light or dark
function hexToBrightness(color) {
    color = color.replace('#', '');

    if (color.length === 3) {
        color = color.split('').map((char) => char + char).join('');
    }

    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const brightness = (r + g + b) / 3;

    return brightness < 128;
}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

// flips hex to rgb <-> rgb to hex
function flipInputs() {
    isHexToRgb = !isHexToRgb;

    temptop = document.getElementById("hex-color").value;
    tempbottom = document.getElementById("rgb-color").value;

    if (isHexToRgb) {
        document.getElementById("hex-color").placeholder = "hex";
        document.getElementById("rgb-color").placeholder = "rgb";
        document.getElementById("hex-color").value = tempbottom;
        document.getElementById("rgb-color").value = temptop;
        document.getElementsByTagName("h2")[0].innerText = "HEX to RGB";
    } else {
        document.getElementById("hex-color").placeholder = "rgb";
        document.getElementById("rgb-color").placeholder = "hex";
        document.getElementById("hex-color").value = tempbottom;
        document.getElementById("rgb-color").value = temptop;
        document.getElementsByTagName("h2")[0].innerText = "RGB to HEX";
        
    }
}

function clearInputs() {
    document.getElementById("hex-color").value = "";
    document.getElementById("rgb-color").value = "";
    document.body.style.backgroundColor = "white";
    document.getElementsByTagName("h1")[0].style.color = "black";
    document.getElementsByTagName("h2")[0].style.color = "black";
}