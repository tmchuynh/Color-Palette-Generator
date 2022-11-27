colors = document.querySelectorAll(".palette .col");
colorsName = document.querySelectorAll(".colorName .col");
mode = document.querySelectorAll(".stv-radio-button");
input = document.querySelector(".form-control");
const inputValue = "";
var letterNumber = /^[0-9a-zA-Z]+$/;
alert = document.querySelector(".alert");

$(document).ready(function () {
    mode.forEach(element => {
        element.addEventListener("click", function () {
            console.log(element.nextSibling.nextElementSibling.innerHTML);
        })
    });

    $.get("https://x-colors.herokuapp.com/api/random", function (data) {
        console.log(data.hex);
        hex = data.hex.substring(1);
        console.log(hex);
        $.get("https://www.thecolorapi.com/scheme?hex=" + hex, function (results) {
            pallette = [];
            for (var i = 0; i < results.colors.length; i++) {
                console.log(results.colors[i].hex.value)
                pallette.push(results.colors[i].hex.value);
                colors[i].style.backgroundColor = results.colors[i].hex.value;
                colorsName[i].innerHTML = results.colors[i].hex.value;
            }
        })
    })

    input.oninput = function () {
        if (this.value.match(letterNumber)) {
            if (this.value.length < 6) {
                console.log(this.value);
            }
        } else {
            alert.style.display = "block";
            input.value = "";
            setTimeout(function() {
                alert.style.display = "none";
            }, 2500);
        }

    }
})