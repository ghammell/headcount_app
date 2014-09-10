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
    var total_width = parseInt($("#test_bar").css("width").replace("px", "")) - parseInt($("#test_scroll").css("width").replace("px", ""))

    $( "#test_scroll" ).draggable({
      containment: "parent",
      opacity: 0.5,
      drag: function(e) {
        var budgeted_salary = $(".salary_input").val()
        css_left_px = parseInt($("#test_scroll").css("left").replace("px", ""))
        dollar_value = css_left_px / total_width * budgeted_salary
        counting_object.text("$" + dollar_value.toFixed());
      }
    });
  });
});
