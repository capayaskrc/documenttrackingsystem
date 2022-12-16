setInterval(displayData, 10000);

function displayData() {
    $.post("https://dts4d.fusiontechph.com/api/public/fetchSchools",
        function (data, status) {
            var json = JSON.parse(data);
            var row = "";
            for (var i = 0; i < json.data.length; i++) {

                row = row +
                    "<tr id='" + json.data[i].id + "'>" + "<td><span class='custom-checkbox'><input type='checkbox' id='selectAll'><label for='selectAll'></label></span></td>" +
                    "<td>" + json.data[i].school_name + "</td><td>" +
                    '<td> <a id="edit" href="#editSchoolModal" class="edit" data-toggle="modal">' +
                    '<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>' +
                    '</a><a id="delete" href="#deleteSchoolModal" class="delete" data-toggle="modal">' +
                    '<i id="delete" class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>' +
                    '</a></td>';

            }
            $("#data").get(0).innerHTML = row;
        });
}
//fetch data from database using API
$(document).ready(function () {
    $(window).on("load", function () {
        displayData();
    });

    // Save data to the database using api
    $(document).ready(function () {
        $("#add-school").click(function () {
            var school_name = $("#school-name").get(0).value;
            alert(school_name)
            // var tag = $("#tag").get(0).value;
            $.post("https://dts4d.fusiontechph.com/api/public/addSchool",
                JSON.stringify({
                    school_name: school_name,
                }),
                function (data, status) {
                    alert("Data: " + data + "\nStatus: " + status);
                });
            displayData();
        });
    });


    //Search data

    $(document).ready(function () {
        $("#search").click(function () {
            var query = $("#search-in").get(0).value;
            //endpoint
            $.post("https://dts4d.fusiontechph.com/api/public/searchSchool",
                JSON.stringify(
                    //payload
                    {
                        id: query
                    }
                ),
                function (data, status) {
                    //result
                    var json = JSON.parse(data);
                    $("#data").get(0).innerHTML = "<tr id='" + json.data[0].id + "'>" + "<td><span class='custom-checkbox'><input type='checkbox' id='selectAll'><label for='selectAll'></label></span></td>" +
                        "<td>" + json.data[0].school_name + "</td>" +
                        '<td> <a id="edit" href="#editSchoolModal" class="edit" data-toggle="modal">' +
                        '<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>' +
                        '</a><a id="delete" href="#deleteSchoolModal" class="delete" data-toggle="modal">' +
                        '<i id="delete" class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>' +
                        '</a></td>';
                });
        });
    })

    $("table").delegate("tr", "click", function (event) {
        var id = $(this).attr('id');
        // alert(id)
        if (event.target.id === 'delete') {
            // $("#idToDelete").text(id);
            $("#delete-school").click(function () {
                $.post("https://dts4d.fusiontechph.com/api/public/deleteSchool",
                    JSON.stringify({
                        id: id
                    }),
                    function (data, status) {
                        if (status === "success") {
                            alert("Successfully deleted!")
                        } else {
                            alert("Delete Failed")
                        }
                    });
            })
            displayData();
        } else {
            $("#edit-school").click(function () {
                alert(id)
                var school_name = $("#schoolName").get(0).value;
                alert(school_name)
                $.post("https://dts4d.fusiontechph.com/api/public/updateSchool",
                    JSON.stringify(
                        //payload
                        {
                            id: id,
                            school_name: school_name
                        }
                    ),
                    function (data, status) {
                        alert("Data: " + data + "\nStatus: " + status);
                    });
            })
            displayData();
        }
    });
})