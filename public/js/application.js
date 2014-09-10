$(document).ready(function() {

  $("#add_scroll_bar_button").on("click", function(event){
    event.preventDefault()
    $.ajax({
      url: '/new_bar',
      method: 'get'
    })
    .done( function(data) {
      $(".scroll_container").append(data)
      $(".scroll").each( function(index, value) {
        $(value).draggable({
          containment: $(value).parent()
        })
      })
    })
    .fail( function() {
      console.log("fail")
    })
  })

  // NEW STRATEGY: MAKE ONE BUTTON FOR REFRESH, WHICH UPDATES THE VALUES FOR ALL INPUTS IN THE FORM
  // GIVE EACH NEW SECTION A UNIQUE ID, THIS WAY WHEN YOU RESET THE VALUES
  // YOU KNOW WHICH IDS TO SET WHICH VALUES TO

  $(".scroll_container").on("click", ".refresh", function(event){
    event.preventDefault()
    form_data = $(this).parent().serialize()
    $.ajax({
      url: '/refresh',
      method: 'get',
      data: form_data
    })
    .done( function(data) {
      console.log(typeof data)
      console.log(data["salary_input"])
      $(this).siblings(".salary_input").attr("value", data["salary_input"])
    })
    .fail( function() {
      console.log("fail")
    })
  })




  $(function add_scroll_effect() {
    var budgeted_salary = $(".salary_input").attr("value")
    var counting_object = $("span.salary_calc")

    $( "#test_scroll" ).draggable({
      containment: "parent",
      opacity: 0.5,
      drag: function(e) {
        css_left_px = parseInt($("#test_scroll").css("left").replace("px", ""))
        total_width = parseInt($("#test_bar").css("width").replace("px", "")) - parseInt($("#test_scroll").css("width").replace("px", ""))
        dollar_value = css_left_px / total_width * budgeted_salary
        counting_object.text("$" + dollar_value.toFixed());
      }
    });
  });
});
