$(document).ready(function() {

  function add_scroll_effect_finish(element) {
    var counting_object = element.parent().parent().find(".salary_calc")
    var container = element.parent()
    var total_width = parseInt(container.css("width").replace("px", "")) - parseInt(element.css("width").replace("px", ""))

    element.draggable({
      containment: "parent",
      opacity: 0.5,
      drag: function(e) {
        var salary_input = $(this).parent().parent().find(".salary_input")
        var scroll_start = $(this).parent().find(".scroll_start")
        var middle = $(this).parent().find(".middle")
        var budgeted_salary = salary_input.val()
        var css_left_px_end = parseInt($(this).css("left").replace("px", ""))
        var css_left_px_start = parseInt(scroll_start.css("left").replace("px", ""))
        var middle_darkness = 255 - Math.round(((css_left_px_end - css_left_px_start) / total_width * 100))

        middle.css("width", (css_left_px_end - css_left_px_start) + "px")
        middle.css("background-color", "rgb(" + middle_darkness + "," + middle_darkness + "," + middle_darkness + ")")
        dollar_value = (css_left_px_end - css_left_px_start) / total_width * budgeted_salary
        counting_object.text("$" + dollar_value.toFixed());
      }
    });
  };

  function add_scroll_effect_start(element) {
    var counting_object = element.parent().parent().find(".salary_calc")
    var container = element.parent()
    var total_width = parseInt(container.css("width").replace("px", "")) - parseInt(element.css("width").replace("px", ""))

    element.draggable({
      containment: "parent",
      opacity: 0.5,
      drag: function(e) {
        var salary_input = $(this).parent().parent().find(".salary_input")
        var scroll_end = $(this).parent().find(".scroll_end")
        var middle = $(this).parent().find(".middle")
        var budgeted_salary = salary_input.val()
        var css_left_px_end = parseInt(scroll_end.css("left").replace("px", ""))
        var css_left_px_start = parseInt($(this).css("left").replace("px", ""))
        var middle_darkness = 255 - Math.round(((css_left_px_end - css_left_px_start) / total_width * 100))

        middle.css("width", (css_left_px_end - css_left_px_start) + "px")
        middle.css("left", (css_left_px_start) + "px")
        middle.css("background-color", "rgb(" + middle_darkness + "," + middle_darkness + "," + middle_darkness + ")")
        dollar_value = (css_left_px_end - css_left_px_start) / total_width * budgeted_salary
        counting_object.text("$" + dollar_value.toFixed());
      }
    });
  };

  $("#add_scroll_bar_button").on("click", function(event){
    event.preventDefault()
    $.ajax({
      url: '/new_bar',
      method: 'get'
    })
    .done( function(data) {
      var section = $(data)
      section.appendTo($(".scroll_container"))
      var scroll_start = $(section.find(".scroll_start"))
      var scroll_end = $(section.find(".scroll_end"))
      add_scroll_effect_start(scroll_start)
      add_scroll_effect_finish(scroll_end)
    })
    .fail( function() {
      console.log("fail")
    })
  })
});
