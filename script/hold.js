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
                        "<td><a href='#editDocumentModal' class='edit' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>" +
                        "</a><a href='#deleteDocumentModal' class='delete' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a></td>" +
                        "</tr>";
                });
        });
    })


    // Update Data
    $(document).ready(function () {
        $("table").delegate("tr", "click", function () {
            var id = $(this).attr('id');
            $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/searchDoc",
                JSON.stringify(
                    //payload
                    {
                        dtnumber: id
                    }
                ),
                function (data, status) {
                    //result
                    var json = JSON.parse(data);
                    $("#e-tn").val(json.data[0].dtnumber);
                    $("#e-title").val(json.data[0].document_title);
                    $("#e-doctype").val(json.data[0].doc_type);
                    $("#e-origin").val(json.data[0].document_origin);
                    $("#e-datereceived").val(new Date(json.data[0].date_received));
                    $("#e-destination").val(json.data[0].document_destination);
                    $("#e-tag").val(json.data[0].tag);
                });
        });
        $("#update").click(function () {
            //unique tracking number   
            var dtnumber = $("#e-tn").get(0).value;
            var document_title = $("#e-title").get(0).value;
            var doc_type = $("#e-doctype").get(0).value;
            var document_origin = $("#e-origin").get(0).value;
            var date_received = $("#e-datereceived").get(0).value.toString();
            var document_destination = $("#e-destination").get(0).value;
            var tag = $("#e-tag").get(0).value;
            $.post("http://localhost/dts_api/dtsapi/DocTS/api/public/updateDoc",
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
    })

    //Delete Data
    $(document).ready(function () {
        $("table").delegate("tr", "click", function () {
            var id = $(this).attr('id');
            $("#idToDelete").text(id);
        });
    })
    $("#delete").click(function (id) {
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