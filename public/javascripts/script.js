document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');


  $(".toggle").on("click", function() {
    $("#hidden")
    $(this).toggleClass("on off");
    if ($(this).hasClass("on")) {
    const food = $(this).text();
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

