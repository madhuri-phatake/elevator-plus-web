var currentURL = window.location.href;

var slicedString = currentURL.split("/").pop();
console.log(slicedString);
switch (slicedString) {
  case "features":
    $(".features").addClass("active-link");
    break;
  case "aboutus":
    $(".aboutus").addClass("active-link");
    break;
  case "blogs":
    $(".blog").addClass("active-link");
    break;
  case "contactus":
    $(".contactus").addClass("active-link");
    break;
  default:
    $(".home").addClass("active-link");
    break;
}

  var newViewportWidth = $(window).width();
  if (newViewportWidth < 650) {
   $(".moblie-active").removeClass("active")
   $('.social-media').removeClass('justify-content-end')
  } 
