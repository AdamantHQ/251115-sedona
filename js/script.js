
//***Index page***

var popup = document.querySelector(".popup");
var toggleButton = document.querySelector(".button-toggle");
var counterButtons = document.querySelectorAll(".counter-block button");



//Pop-up hiding by default
if (popup) {
  popup.classList.add("popup-hidden");


  //Toggle button functionality
  toggleButton.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.toggle("popup-hidden");
  });


//PLUS and MINUS counter buttons.
  [].forEach.call(counterButtons, function(button) {
    var counter = button.parentNode.querySelector("input");
    button.addEventListener("click", function(event) {
      event.preventDefault();
      if (counter.value < 99 && button.className === "increase") counter.value++;
      if (counter.value > 0 && button.className === "decrease") counter.value--;
    })
  });


  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 27 && !popup.classList.contains("popup-hidden")) {
      popup.classList.add("popup-hidden");
    }
  });
}


//***Hotels page***


//Slider functionality
var sliderButtons = document.querySelectorAll(".slider-button");

if (sliderButtons) {
  [].forEach.call(sliderButtons, function(button) {
    button.addEventListener("mousedown", function(event) {
      event.preventDefault();

      var rangeBar = document.querySelector(".range-bar");
      var rangeBarWidth = rangeBar.getBoundingClientRect().width;
      var rangeBarLeft = rangeBar.getBoundingClientRect().left + window.pageXOffset ;
      var rangeBarRight = rangeBar.getBoundingClientRect().right + window.pageXOffset ;
      var innerBar = document.querySelector(".inner-bar");
      var priceFrom = document.querySelector("#price-from");
      var priceTo = document.querySelector("#price-to");
      var buttonWidth = parseInt(getComputedStyle(button).width) || 20;//for IE
      var innerBarLeft = rangeBarWidth - parseInt(getComputedStyle(innerBar).left);
      var innerBarRight = rangeBarWidth - parseInt(getComputedStyle(innerBar).right);
      var priceFactor = priceTo.value / innerBarRight;

      function moveAt(event) {
        var left = event.pageX - rangeBarLeft - buttonWidth / 2;
        var right = rangeBarRight - event.pageX - buttonWidth / 2;

        if (button.classList.contains("slider-min")) {
          console.log(buttonWidth);
          if (left < 0) {
            innerBar.style.left = "0px";
          } else if (left >= innerBarRight - buttonWidth * 2) {

            innerBar.style.left = innerBarRight - buttonWidth * 2 + "px";
          } else {
            innerBar.style.left = left + "px";
          }
          priceFrom.value = Math.round(parseInt(innerBar.style.left) * priceFactor);

        } else {
          if (right < 0) {
            innerBar.style.right = "0px";
          } else if (right > innerBarLeft - buttonWidth * 2) {
            innerBar.style.right = innerBarLeft - buttonWidth * 2 + "px";
          } else {
            innerBar.style.right = right + "px";
          }
          priceTo.value = Math.round((rangeBarWidth - parseInt(innerBar.style.right)) * priceFactor);
        }
      }

      document.onmousemove = function(event) {
        moveAt(event);
      };
    });

    document.addEventListener("mouseup", function() {
      document.onmousemove = null;
      document.onmouseup = null;
      button.onmousedown = null;
    });




  });
}
