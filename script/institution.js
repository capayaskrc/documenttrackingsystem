setInterval(displayData, 10000);

function displayData() {
    $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/fetchSchools",
        function (data, status) {
            var json = JSON.parse(data);
            var row = "";
            for (var i = 0; i < json.data.length; i++) {

                row = row +
                    "<tr id='" + json.data[i].id + "'>" + "<td><span class='custom-checkbox'><input type='checkbox' id='selectAll'><label for='selectAll'></label></span></td>" +
                    "<td>" + json.data[i].school_name + "</td><td>" +
                    "<td><a href='#editDocumentModal' class='edit' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>" +
                    "</a><a href='#deleteDocumentModal' class='delete' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a></td>" +
                    "</tr>";

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
            // var tag = $("#tag").get(0).value;
            $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/addSchool",
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
            $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/searchUser",
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
                        "<td>" + json.data[0].school_name + "</td><td>" +
                        "<td><a href='#editDocumentModal' class='edit' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>" +
                        "</a><a href='#deleteDocumentModal' class='delete' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a></td>" +
                        "</tr>";
                });
        });
    })
})