$(document).ready(function() {

  var resource_count = 0

  function add_scroll_effect_finish(element) {
    var counting_object = element.parent().parent().find(".salary_calc")
    var container = element.parent()
    var total_width = parseInt(container.css("width").replace("px", "")) - parseInt(element.css("width").replace("px", ""))

    element.draggable({
      containment: "parent",
      opacity: 0.5,
      drag: function(e) {
        var salary_input = $(this).parent().parent().find(".salary_input").val() || 0
        var bonus_input = $(this).parent().parent().find(".bonus_input").val() || 0
        var quantity = $(this).parent().parent().find(".quantity").val() || 0
        var b_and_t = $(this).parents().find(".b_and_t_input").val() || 0
        console.log(b_and_t)
        var scroll_start = $(this).parent().find(".scroll_start")
        var middle = $(this).parent().find(".middle")
        var css_left_px_end = parseInt($(this).css("left").replace("px", ""))
        var css_left_px_start = parseInt(scroll_start.css("left").replace("px", ""))
        var middle_darkness = 255 - Math.round(((css_left_px_end - css_left_px_start) / total_width * 100))

        middle.css("width", (css_left_px_end - css_left_px_start) + "px")
        middle.css("background-color", "rgb(" + middle_darkness + "," + middle_darkness + "," + middle_darkness + ")")
        dollar_value = (css_left_px_end - css_left_px_start) / total_width * (salary_input * (1+parseFloat(bonus_input)) * quantity * (1+parseFloat(b_and_t)))
        counting_object.text("$" + dollar_value.toFixed());
        increment_total($(".total_calc"))
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
        var salary_input = $(this).parent().parent().find(".salary_input").val() || 0
        var bonus_input = $(this).parent().parent().find(".bonus_input").val() || 0
        var quantity = $(this).parent().parent().find(".quantity").val() || 0
        var b_and_t = $(this).parents().find(".b_and_t_input").val() || 0
        var scroll_end = $(this).parent().find(".scroll_end")
        var middle = $(this).parent().find(".middle")
        var css_left_px_end = parseInt(scroll_end.css("left").replace("px", ""))
        var css_left_px_start = parseInt($(this).css("left").replace("px", ""))
        var middle_darkness = 255 - Math.round(((css_left_px_end - css_left_px_start) / total_width * 100))

        middle.css("width", (css_left_px_end - css_left_px_start) + "px")
        middle.css("left", (css_left_px_start) + "px")
        middle.css("background-color", "rgb(" + middle_darkness + "," + middle_darkness + "," + middle_darkness + ")")
        dollar_value = (css_left_px_end - css_left_px_start) / total_width * (salary_input * (1+parseFloat(bonus_input)) * quantity * (1+parseFloat(b_and_t)))
        counting_object.text("$" + dollar_value.toFixed());
        increment_total($(".total_calc"))
      }
    });
  };

  function increment_total(element) {
    var total = 0
    $(".salary_calc").each(function(index, value) {
      total += parseInt($(value).text().replace("$", ""))
    })
    element.text("Total: $" + total)
  }

  $("#add_scroll_bar_button").on("click", function(event){
    event.preventDefault()
    button = $(this)
    $.ajax({
      url: '/new_bar',
      method: 'get',
      data: {resource_count: resource_count}
    })
    .done( function(data) {
      var section = $(data)
      section.appendTo($(".scroll_container"))
      var scroll_start = $(section.find(".scroll_start"))
      var scroll_end = $(section.find(".scroll_end"))
      add_scroll_effect_start(scroll_start)
      add_scroll_effect_finish(scroll_end)
      resource_count++
      button.parent().find(".total_resources").text("Resources: " + resource_count)
    })
    .fail( function() {
      console.log("fail")
    })
  })

  $("#save_budget_button").on("click", function(event) {
    event.preventDefault()
    var total_budget_info = {}
    total_budget_info["budget_name"] = $("#budget_name").val()
    total_budget_info["b_and_t_rate"] = $(".b_and_t_input").val()

    $(".wage_inputs").each( function(index, value) {
      total_budget_info["resource" + index] = $(value).serialize()
      var css_left_px_end  = $(this).siblings().find(".scroll_end").css("left")
      var css_left_px_start = $(this).siblings().find(".scroll_start").css("left")
      total_budget_info["css_left_end" + index] = css_left_px_end
      total_budget_info["css_left_start" + index] = css_left_px_start
    })

    $.ajax({
      url: '/save_budget',
      method: 'post',
      data: total_budget_info
    })
    .done( function(data) {

    })
    .fail( function() {
      console.log("fail")
    })
  })

  $("#mega_form").on("click", ".delete", function(event){
    $(this).parents(".full_info").remove()
  })
});
