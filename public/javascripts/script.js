
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
  

  //to toggle the button from "off" to "on" and add and remove values 
  //to the hidden intput, so it gets send with the req.body


  //buttons need to be "pushed" if the User is expert in
  //and input needs to have the correct value
  if (window.location.href.indexOf('settings') > -1) {
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

