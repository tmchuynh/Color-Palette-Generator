colors = document.querySelectorAll(".palette .col");
colorsName = document.querySelectorAll(".colorName .col");
mode = document.querySelectorAll(".stv-radio-button");
input = document.querySelector(".searchColor");
colorText = document.querySelectorAll(".copied-color");
const inputValue = "";
var letterNumber = /^[0-9a-zA-Z]+$/;
alert = document.querySelector(".alert");
var option = "monochrome";


function getHex() {
    var hex;
    $.get("https://x-colors.herokuapp.com/api/random", function (data) {
        // console.log(data.hex);
        hex = data.hex.substring(1);
        console.log(hex);
    });
    return hex;
}

function getColors(hex) {
    $.get("https://www.thecolorapi.com/scheme?hex=" + hex + "&mode=" + option, function (results) {
        pallette = [];
        for (var i = 0; i < results.colors.length; i++) {
            // console.log(results.colors[i].hex.value);
            pallette.push(results.colors[i].hex.value);
            colors[i].style.backgroundColor = results.colors[i].hex.value;
            colorsName[i].innerHTML = results.colors[i].hex.value;
        }
        addColorDetails();
    });
}

/*
 * Changes the color of the background
 * 
 * @param {any} e 
* */
function changeColors(e) {
    var color;
    console.log(colorText);
    container = e.parentNode.parentNode;
    e.oninput = function() {
        console.log(this.value);
    }
    e.addEventListener("keydown", function(e) {
        if (e.which == 13 && this.value.length == 6) {
            console.log("Enter");
            color = this.value;
            console.log(color);
            container.style.backgroundColor = "#" +color;
            replaceColor(this, color);
        }
    })
}

/*
 * Updates the hex color below the container and above (next to the copy icon)
 * 
 * @param {any} value 
 * @param {any} color 
* */
function replaceColor(value, color) {
    classes = value.parentNode.parentNode.classList.value.split(" ");
    number = classes[1].split("color");
    value.parentNode.parentNode.firstChild.nextElementSibling.firstChild.parentNode.innerHTML = "<i onclick=\"copyText(this)\" class=\"bi bi-clipboard\"></i>" + " #" + color;
    colorsName[number[1] -1 ].innerHTML = "#" + color;
}

/*
 * Copy hex color functionality
 * 
 * @param {any} e 
* */
function copyText(e) {
    console.log(e);
    e.classList.remove("bi-clipboard");
    e.classList.add("bi-clipboard-check-fill")
    console.log(e.nextElementSibling)
    try {
        navigator.clipboard.writeText(e.nextElementSibling.firstChild.innerHTML);
        console.log("content copied");
    }catch (err) {
        console.error("failed to copy: ", err);
    }
    

    setInterval(function () {
        e.classList.remove("bi-clipboard-check-fill");
        e.classList.add("bi-clipboard");

    }, 3000)
}

/*
 *  Adds the hex color to the bottom of the container 
 *  for easy visibility
 */
function addColorDetails() {
    var color;
    for (var i = 0; i < colorsName.length; i++) {
        console.log(colorsName[i].innerHTML)
        color = colorsName[i].innerHTML;
        console.log(colors[i].firstChild.nextSibling)
        container = colors[i].firstChild.nextSibling;
        div = document.createElement("div");
        div.classList.add("copied-color");
        container.appendChild(div);
        p = document.createElement("p");
        p.innerHTML = color;
        div.appendChild(p);
    }
}

$(document).ready(function () {
    getColors();
    /*
     * Gets the color by mode selected 
     */
    mode.forEach(element => {
        element.addEventListener("click", function () {
            // console.log(element.nextSibling.nextElementSibling.innerHTML);
            option = element.nextSibling.nextElementSibling.innerHTML;
            getColors(getHex());


        })
    });

    /*
     *  Search color bar under modes
     */
    input.addEventListener("keydown", function (e) {
        if (e.which == 13 && input.value.length == 6) {
            // console.log("Enter");
            hex = input.value;
            getColors(hex);
        }
    })


    input.oninput = function (e) {
        console.log(e);
        if (this.value.match(letterNumber)) {
            if (this.value.length < 6) {
                // console.log(this.value);
                hex = this.value;
                // console.log(hex);
            }
        } else {
            alert.style.display = "block";
            input.value = "";
            setTimeout(function () {
                alert.style.display = "none";
            }, 2500);
        }
    }
})