colors = document.querySelectorAll(".palette .col");
colorsName = document.querySelectorAll(".colorName .col");
mode = document.querySelectorAll(".stv-radio-button");
input = document.querySelector(".form-control");
const inputValue = "";
var letterNumber = /^[0-9a-zA-Z]+$/;
alert = document.querySelector(".alert");
var option = "monochrome";



const copyContent = async () => {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}


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

function addColorDetails() {
    var color;
    for (var i = 0; i <colorsName.length; i++) {
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
    mode.forEach(element => {
        element.addEventListener("click", function () {
            // console.log(element.nextSibling.nextElementSibling.innerHTML);
            option = element.nextSibling.nextElementSibling.innerHTML;
            getColors(getHex());


        })
    });


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