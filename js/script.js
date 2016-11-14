

//***Index page***


var popup = document.querySelector(".popup");

if (popup) {

  var toggleButton = document.querySelector(".button-toggle");
  var form = popup.querySelector(".hotel-form");
  var counterButtons = popup.querySelectorAll(".counter-block button");
  var checkIn = popup.querySelector("#check-in");
  var checkOut = popup.querySelector("#check-out");
  var adultsCounter = popup.querySelector("#adults-counter");
  var childrenCounter = popup.querySelector("#children-counter");

  //Storage values
  var checkInStorage = localStorage.getItem("checkIn");
  var checkOutStorage = localStorage.getItem("checkOut");
  var adultsCounterStorage = localStorage.getItem("adultsCounter");
  var childrenCounterStorage = localStorage.getItem("childrenCounter");


  //Hides pop-up by default
  popup.classList.remove("popup-visible");
  popup.classList.add("popup-invisible");


  //Toggle button functionality
  toggleButton.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.toggle("popup-visible");
    popup.classList.toggle("popup-invisible");
  });


  //Sets storage values
  if (checkInStorage) checkIn.value = checkInStorage;
  if (checkOutStorage) checkOut.value = checkOutStorage;
  if (adultsCounterStorage) adultsCounter.value = adultsCounterStorage;
  if (childrenCounterStorage) childrenCounter.value = childrenCounterStorage;


  //Escape button closes the popup
  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27 && !popup.classList.contains("popup-hidden")) {
      popup.classList.remove("popup-visible");
    }
  });


  //Plus and minus counter buttons.
  [].forEach.call(counterButtons, function(button) {
    var counter = button.parentNode.querySelector("input");
    button.addEventListener("click", function(event) {
      event.preventDefault();
      if (counter.value < 99 && button.className === "increase") counter.value++;
      if (counter.value > 0 && button.className === "decrease") counter.value--;
    })
  });


  //Required fields check
  form.addEventListener("submit", function(event) {
    if (!checkIn.value || !checkOut.value) {
      event.preventDefault();
      alert("Пожалуйста, введите даты заезда и отъезда!");
    } else if (adultsCounter.value === "0") {
      event.preventDefault();
      alert("Пожалуйста, введите количество взрослых гостей!");
    } else {
      localStorage.setItem("checkIn", checkIn.value);
      localStorage.setItem("checkOut", checkOut.value);
      localStorage.setItem("adultsCounter", adultsCounter.value);
      localStorage.setItem("childrenCounter", childrenCounter.value);
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
