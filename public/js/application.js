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

  $(function add_scroll_effect() {
    var counting_object = $("span.salary_calc")
    var total_width = parseInt($("#test_bar").css("width").replace("px", "")) - parseInt($("#test_scroll_end").css("width").replace("px", ""))

    $( "#test_scroll_end" ).draggable({
      containment: "parent",
      opacity: 0.5,
      drag: function(e) {
        var budgeted_salary = $(".salary_input").val()
        css_left_px_end = parseInt($("#test_scroll_end").css("left").replace("px", ""))
        css_left_px_start = parseInt($("#test_scroll_start").css("left").replace("px", ""))
        $("#test_middle").css("width", (css_left_px_end - css_left_px_start) + "px")
        dollar_value = (css_left_px_end - css_left_px_start) / total_width * budgeted_salary
        counting_object.text("$" + dollar_value.toFixed());
      }
    });
  });

  $(function add_scroll_effect() {
    var counting_object = $("span.salary_calc")
    var total_width = parseInt($("#test_bar").css("width").replace("px", "")) - parseInt($("#test_scroll_start").css("width").replace("px", ""))

    $( "#test_scroll_start" ).draggable({
      containment: "parent",
      opacity: 0.5,
      drag: function(e) {
        var budgeted_salary = $(".salary_input").val()
        css_left_px_end = parseInt($("#test_scroll_end").css("left").replace("px", ""))
        css_left_px_start = parseInt($("#test_scroll_start").css("left").replace("px", ""))
        $("#test_middle").css("width", (css_left_px_end - css_left_px_start) + "px")
        $("#test_middle").css("left", (css_left_px_start) + "px")
        dollar_value = (css_left_px_end - css_left_px_start) / total_width * budgeted_salary
        counting_object.text("$" + dollar_value.toFixed());
      }
    });
  });




});
