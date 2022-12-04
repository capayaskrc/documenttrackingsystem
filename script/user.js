setInterval(displayData, 10000);

function displayData() {
    $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/fetchUsers",
        function (data, status) {
            var json = JSON.parse(data);
            var row = "";
            for (var i = 0; i < json.data.length; i++) {

                row = row +
                    "<tr id='" + json.data[i].userid + "'>" + "<td><span class='custom-checkbox'><input type='checkbox' id='selectAll'><label for='selectAll'></label></span></td>" +
                    "<td>" + json.data[i].username + "</td><td>" + json.data[i].name + "</td>" +
                    "<td>" + json.data[i].role + "</td><td>" + json.data[i].position + "</td>" +
                    "<td>" + json.data[i].status + "</td>" +
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
        $("#addU").click(function () {
            var id = (new Date().getTime()).toString(10)
            var username = $("#username").get(0).value;
            var name = $("#name").get(0).value;
            var role = $("#pillSelect").get(0).value;
            var position = $("#position").get(0).value;
            var status = $("#status").get(0).value.toString();
            var email = $("#email").get(0).value;
            // var tag = $("#tag").get(0).value;
            $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/addUser",
                JSON.stringify({
                    id: id,
                    username: username,
                    name: name,
                    email: email,
                    pp: "profile_pic",
                    role: role,
                    position: position,
                    status: status,
                    password: "1234567890"
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
                        userid: query
                    }
                ),
                function (data, status) {
                    //result
                    var json = JSON.parse(data);
                    $("#data").get(0).innerHTML = "<tr id='" + json.data[0].userid + "'>" + "<td><span class='custom-checkbox'><input type='checkbox' id='selectAll'><label for='selectAll'></label></span></td>" +
                        "<td>" + json.data[0].username + "</td><td>" + json.data[0].name + "</td>" +
                        "<td>" + json.data[0].role + "</td><td>" + json.data[0].position + "</td>" +
                        "<td>" + json.data[0].status + "</td>" +
                        "<td><a href='#editDocumentModal' class='edit' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>" +
                        "</a><a href='#deleteDocumentModal' class='delete' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a></td>" +
                        "</tr>";
                });
        });
    })
})