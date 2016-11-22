// JavaScript source code

$(document).ready(moveCar1);



function moveCar1()
{
    var car1 = $("#car1");
    var car2 = $("#car2");
    car1.animate({ left: '0%' }, 1000);
    
    car2.animate({ left: '80%' }, 1000);
    console.log(car2.css("right"));
}

