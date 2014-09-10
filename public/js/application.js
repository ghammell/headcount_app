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
    var count = 0;
    var budgeted_salary = $(".salary_input")
    var prevX = -1;
    var counting_object = $("span.salary_calc")

    $( "#test_scroll" ).draggable({
      containment: "parent",
      opacity: 0.5,
      drag: function(e) {
        counting_object.text($("#test_scroll").css("left"));
      }
    });
  });
});
