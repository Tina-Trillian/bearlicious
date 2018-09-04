document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');


  //to toggle the button from "off" to "on" and add and remove values 
  //to the hidden intput, so it gets send with the req.body

  //might have a problem later as the input value is saved in the cookies
  //buttons need to be "pushe"d" if the User is expert in
  //and input needs to have the correct values on load


  $(".toggle").on("click", function() {
    $(this).toggleClass("on off");
    if ($(this).hasClass("on")) {
    const food = $(this).text().tolowerCase();
    const before = $("#expertIn").val()
    $("#expertIn").val(before + "," + food)
    }
    else if ($(this).hasClass("off")) {
      const food = $(this).text();
      const before = $("#expertIn").val() 
      const after = before.replace(`,${food}`, "");
      console.log(after)
      $("#expertIn").val(after)
    }
  })




}, false);

