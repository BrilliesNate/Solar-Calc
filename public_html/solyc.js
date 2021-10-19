/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
    Created on : 13 Aug 2021, 08:35:55
    Author     : Nathan Brill
*/

// let output = document.getElementById('panelElevation');
// console.log(output)
// console.log(setPanelAzimuth($('#panelAzimuth').val()))

let lat = document.getElementById("lat");
let long = document.getElementById('long')

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat.innerHTML = position.coords.latitude;
    long.innerHTML = position.coords.longitude;
}

// let offset1 = new Date().getTimezoneOffset();
// console.log(offset1);

function getDateTime() {
    let d = new Date();

    document.getElementById("hour").value.innerHTML = d.getHours();
    document.getElementById("minutes").innerHTML = d.getMinutes();
    document.getElementById("seconds").innerHTML = d.getSeconds();
}

// let g = getElementById('svg4')
// g.display = 'none'

// let installSize = document.getElementById('installationSize').value;
// console.log(installSize);
// installSize.value.innerHTML = newValue1;

let elem1 = document.getElementById('sunC');

let rangeValue1 = function () {
    let newValue1 = elem1.value;
    installSize = newValue1;
    // console.log(installSize);
    let target = document.querySelector('.value1');
    target.innerHTML = + newValue1 + '°';
    // console.log(newValue1);
    // let target2 = document.querySelector('.panelElevation');
    // target2 =  newValue1 ;
    // console.log(panelAzimuth.value);
    // console.log(newValue1)
    // let circle1 = document.getElementById("svg6");
    // console.log(newValue1)
    let roof0D = document.getElementById('svg0')
    let roof10D = document.getElementById('svg10')
    let roof15D = document.getElementById('svg15');
    let roof20D = document.getElementById('svg20');
    let roof25D = document.getElementById('svg25');
    
    

   

    if (newValue1 === "0") {
        roof0D.style.display = 'block'
        roof10D.style.display = 'none'
    }
    if (newValue1 === "10") {
        roof0D.style.display = 'none'
        roof10D.style.display = 'block'
        roof15D.style.display = 'none'
    }
    if (newValue1 === "20") {
        roof10D.style.display = 'none'
        roof15D.style.display = 'block'
        roof20D.style.display = 'none'
        console.log("this is 15")
    }
    if (newValue1 === "30") {
        roof15D.style.display = 'none'
        roof20D.style.display = 'block'
        roof25D.style.display = 'none'
    }
    if (newValue1 === "40") {
        roof20D.style.display = 'none'
        roof25D.style.display = 'block'
    }
    // circle1.style.transform = 'rotate(' + newValue1 + 'deg)';
}
elem1.addEventListener("input", rangeValue1);

let elem = document.querySelector('input[type="range"]');

let rangeValue = function () {
    let newValue = elem.value;
    let target = document.querySelector('.value');
    target.innerHTML = + newValue + '°';
    let circle = document.getElementById("compas");
    var compas;
    circle.style.transform = 'rotate(' + newValue + 'deg)';
// console.log(newValue);
    if ((newValue >= 0 && newValue <= 11) || (newValue >= 349 && newValue <= 360)) {
        compas = "N";
        target.innerHTML = compas + newValue + '°';

    }
    if ((newValue > 11 && newValue <= 33)) {
        compas = "NNE";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 33 && newValue <= 56)) {
        compas = "NE";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 56 && newValue <= 79)) {
        compas = "ENE";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 79 && newValue <= 101)) {
        compas = "E";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 101 && newValue <= 124)) {
        compas = "ESE";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 101 && newValue <= 124)) {
        compas = "ESE";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 124 && newValue <= 146)) {
        compas = "SE";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 146 && newValue <= 169)) {
        compas = "SSE";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 169 && newValue <= 191)) {
        compas = "S";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 191 && newValue <= 214)) {
        compas = "SSW";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 214 && newValue <= 236)) {
        compas = "SW";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 236 && newValue <= 259)) {
        compas = "WSW";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 259 && newValue <= 281)) {
        compas = "W";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 281 && newValue <= 303)) {
        compas = "WNW";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 303 && newValue <= 326)) {
        compas = "NW";
        target.innerHTML = compas + newValue + '°';
    }
    if ((newValue > 326 && newValue < 349)) {
        compas = "NNW";
        target.innerHTML = compas + newValue + '°';
    }

}

// Make a weather API request

// mouse over function.
function over() {
    this.timeout = setTimeout(function () {
        $(".more-ot-alert").fadeIn("fast");
        // IE8 animation polyfill
        if ($("html").hasClass("lt-ie9")) {
            var speed = 300;
            var times = 3;
            var loop = setInterval(anim, 300);
            function anim() {
                times--;
                if (times === 0) { clearInterval(loop); }
                $(".more-ot-alert").animate({ left: 450 }, speed).animate({ left: 440 }, speed);
                //.stop( true, true ).fadeIn();
            };
            anim();
        };
    }, 1000)
}

function left() {

    if (this.timeout) {
        clearTimeout(this.timeout)
        closeAlert()
    }

}

// let btn = document.getElementById('btn')
// btn.addEventListener('mouseenter',over)
// btn.addEventListener('mouseleave',left)


elem.addEventListener("input", rangeValue);

function closeAlert() {
    setTimeout(function () {
        $(".more-ot-alert").fadeOut("fast");
    }, 1000);
}
// function openAlert() {



//     setTimeout(function openAlert() {

//     } );


// }
$(".close-ot-alert").on("click", function () {
    closeAlert()
});

$(".open-ot-alert").on("click", function () {
    openAlert();
});

$(document).keydown(function (e) {
    if (e.keyCode == 27) { closeAlert(); }
    if (e.keyCode == 67) { openAlert(); } // C is for click?
});

let btn = document.getElementById('btn');

function ripple(e) {

    // Setup
    let posX = this.offsetLeft;
    let posY = this.offsetTop;
    let buttonWidth = this.offsetWidth;
    let buttonHeight = this.offsetHeight;

    // Add the element
    let ripple = document.createElement('span');

    this.appendChild(ripple);


    // Make it round!
    if (buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth;
    } else {
        buttonWidth = buttonHeight;
    }

    // Get the center of the element
    var x = e.pageX - posX - buttonWidth / 2;
    var y = e.pageY - posY - buttonHeight / 2;


    ripple.style.width = `${buttonWidth}px`;
    ripple.style.height = `${buttonHeight}px`;
    ripple.style.top = `${y}px`;
    ripple.style.left = `${x}px`;

    ripple.classList.add('rippleAnimation');

    setTimeout(() => {
        this.removeChild(ripple);
    }, 1000);

}

btn.addEventListener('click', ripple);

// function getUtcOffset() {
//     let d = new Date();
//     let newOffset = new Date().getTimezoneOffset();
//    let offsetTarget = document.getElementById('UTC'); 
//     console.log(n);
//     offsetTarget.value.innerHTML = n;
// }

