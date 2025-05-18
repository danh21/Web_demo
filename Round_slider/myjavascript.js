
//DOCUMENTS: https://roundsliderui.com/document.html

//Slider Tron 01-----------------------------------
function initial_sliderTron_01(data){
  $("#sliderTronId_01").roundSlider({
    sliderType: "min-range",
    width: 22,
    radius: 100,
    readOnly: false,
    value: data,
    circleShape: "full",
    lineCap: "round",
    editableTooltip: false,
    max: 100, 
    svgMode: true,
    rangeColor: "red",
    change: function (args) {
      var obj = $("#sliderTronId_01").data("roundSlider");
      $('#sliderTronId_02').roundSlider('setValue', obj.getValue());
    }
  });
};

initial_sliderTron_01(50); //Start first time


//Change: function - METHOD 2------------
// var sliderTron_01 = document.getElementById("sliderTronId_01");
// sliderTron_01.addEventListener("mousemove", function(){
//   var obj = $("#sliderTronId_01").data("roundSlider");
//   $('#sliderTronId_02').roundSlider('setValue', obj.getValue());
// });

//Slider Tron 02-----------------------------------
function initial_sliderTron_02(data){
  $("#sliderTronId_02").roundSlider({
    sliderType: "min-range",
    width: 22,
    radius: 100,
    readOnly: true,
    value: data,
    circleShape: "half-top",
    lineCap: "round",
    editableTooltip: false,
    max: 100,
    svgMode: true,
    rangeColor: "#2cc4d3"
  });
};

initial_sliderTron_02(50); //Start first time