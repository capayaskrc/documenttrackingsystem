setInterval(displayData, 10000);

function displayData() {
    $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/fetchDoc",
        function (data, status) {
            var json = JSON.parse(data);
            var row = "";
            for (var i = 0; i < json.data.length; i++) {

                row = row +
                    "<tr id='" + json.data[i].dtnumber + "'>" + "<td><span class='custom-checkbox'><input type='checkbox' id='selectAll'><label for='selectAll'></label></span></td>" +
                    "<td>" + json.data[i].dtnumber + "</td><td>" + json.data[i].document_title + "</td>" +
                    "<td>" + json.data[i].doc_type + "</td><td>" + json.data[i].document_origin + "</td>" +
                    "<td>" + json.data[i].date_received + "</td><td>" + json.data[i].tag + "</td>" +
                    "<td><a id='delete' href='#deleteDocumentModal' class='delete' data-toggle='modal'><i id='delete' class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a></td>" +
                    "</a></tr>";

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
        $("#ad").click(function () {
            $("#tn").val((new Date().getTime()).toString(10));
        })
        $("#insert").click(function () {
            var dtnumber = $("#tn").get(0).value;
            var document_title = $("#title").get(0).value;
            var doc_type = $("#doctype").get(0).value;
            var document_origin = $("#docorigin").get(0).value;
            var date_received = $("#datereceived").get(0).value.toString();
            var document_destination = $("#docdestination").get(0).value;
            var tag = $("#tag").get(0).value;
            $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/insertDoc",
                JSON.stringify({
                    dtnumber: dtnumber,
                    document_title: document_title,
                    doc_type: doc_type,
                    document_origin: document_origin,
                    date_received: date_received,
                    document_destination: document_destination,
                    tag: tag

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
            $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/searchDoc",
                JSON.stringify(
                    //payload
                    {
                        dtnumber: query
                    }
                ),
                function (data, status) {
                    //result
                    var json = JSON.parse(data);
                    $("#data").get(0).innerHTML = "<tr id='" + json.data[0].dtnumber + "'>" + "<td><span class='custom-checkbox'><input type='checkbox' id='selectAll'><label for='selectAll'></label></span></td>" +
                        "<td>" + json.data[0].dtnumber + "</td><td>" + json.data[0].document_title + "</td>" +
                        "<td>" + json.data[0].doc_type + "</td><td>" + json.data[0].document_origin + "</td>" +
                        "<td>" + json.data[0].date_received + "</td><td>" + json.data[0].tag + "</td>" +
                        "<td><a id='delete' href='#deleteDocumentModal' class='delete' data-toggle='modal'><i id='delete' class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a></td>" +
                        "</a></tr>";
                });
        });
    })

    //Delete Data
    $(document).ready(function () {
        $("table").delegate("tr", "click", function () {
            var id = $(this).attr('id');
            $("#idToDelete").text(id);
        });
    })
    $("#delete").click(function () {
        var dtnumber = $("#idToDelete").text();
        // alert(dtnumber);
        $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/deleteDoc",
            JSON.stringify({
                dtnumber: dtnumber
            }),
            function (data, status) {
                alert("Data: " + data + "\nStatus: " + status);
            });
        displayData();
    });
})