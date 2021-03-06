
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
  

  //to toggle the button from "off" to "on" and add and remove values 
  //to the hidden intput, so it gets send with the req.body



  if (!(["foodie", "restaurant", "auth"].some(el => window.location.href.includes(el))))
      {
      startMap($(".on").text())
      console.log("RIGHT SIDE")

      $(".toggle-index").on("click", function () {
        $(this).toggleClass("on off");
        if ($(this).hasClass("on")) {
          $(this).siblings().removeClass("on off").addClass("off")
        }
        let filter = $(".on").text()
        startMap(filter)
      })
  }

  //buttons need to be "pushed" if the User is expert in
  //and input needs to have the correct value
  if (window.location.href.indexOf('settings') > -1 ||
      window.location.href.indexOf('create') > -1) {
        console.log("right side")
    $("#expertIn").val();
    let arr = $(".toggle");
    let innerVal = ""
    for (let i = 0; i < arr.length; i++) {
      if ($(arr[i]).hasClass("on")) {
        innerVal += "," + $(arr[i]).text()
      }
    }
    $("#expertIn").val(innerVal)
  }

  $(".toggle").on("click", function () {
    $(this).toggleClass("on off");
    if ($(this).hasClass("on")) {
      const food = $(this).text();
      const before = $("#expertIn").val()
      $("#expertIn").val(before + "," + food)
    }
    else if ($(this).hasClass("off")) {
      const food = $(this).text();
      const before = $("#expertIn").val();
      const after = before.replace(`,${food}`, "");
      $("#expertIn").val(after)
    }
  })


}, false);

