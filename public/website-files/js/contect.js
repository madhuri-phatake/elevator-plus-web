$("#contact-form").submit(function(e) {
  return false;
});
$(".massge").hide();
$("#loader").hide();
$("#contact-btn").click(function(e) {
  $("#contact-form").validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      },
      subject: {
        required: true
      }
    },
    messages: {
      name: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter full name</span>"
      },

      email: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter email id</span>"
      },
      phone: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter mobile number</span>"
      },
      subject: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter subject</span>"
      }
    },

    submitHandler: function() {
      contactformformSubmition();
      $("#contact-btn").attr("disabled");
    }
  });
});

function contactformformSubmition() {
  let contactobj = {};
  contactobj.firstName = $("#name").val();
  contactobj.lastName = $("#email").val();
  contactobj.email = $("#email").val();
  contactobj.phone = $("#phone").val();
  contactobj.message = $("#message").val();
  contactobj.message = $("subject").val()
  const currentURL = window.location.origin;

  // Get the reCAPTCHA response
  contactobj.recaptchaResponse = grecaptcha.getResponse();
  if (contactobj.recaptchaResponse === "") {
    alert("Please Validate Captcha");
  } else {
    $("#loader").show();
    $.ajax({
      url: `${currentURL}/send-email`,
      contentType: "application/json; charset= utf-8",
      type: "POST",
      data: JSON.stringify(contactobj),
      dataType: "json",
      success: function(data) {
        if ((data.status = true)) {
          $("#contact-form").hide();
          $("#form-title").text(
            `Thank you, ${contactobj.firstName} , for reaching out to us! We appreciate your interest.`
          );
          $(".massge").show();
        }
      },
      // Error handling
      error: function(error) {
        console.log(`Error ${error}`);
        $("#form-title").text(
          `Oops! There was an error processing your request. Please try again later.`
        );
      }
    });
  }
}
