$(document).ready(function () {
    $("#dtnumber").text(localStorage.getItem("dtnumber"));
    // $("table").delegate("tr", "click", function (event) {
    //     localStorage.setItem("dtnumber", $(this).attr('id'));
    //     alert(localStorage.getItem("dtnumber"))

    // });
})