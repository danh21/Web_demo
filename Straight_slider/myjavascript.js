

//SliderNgang
var sliderNgang = document.getElementById("sliderNgangId");
var bulb01 = document.getElementById("bulb01");
sliderNgang.oninput = function(){
  document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
  bulb01.style.opacity = sliderNgang.value/10;
};
