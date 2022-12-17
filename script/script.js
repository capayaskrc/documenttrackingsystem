setInterval(displayData, 10000);

function displayData() {
    $.post("https://dts4d.fusiontechph.com/api/public/fetchDoc",
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

function getSchool() {
    $.post("https://dts4d.fusiontechph.com/api/public/fetchSchools",
        function (data, status) {
            var json = JSON.parse(data);
            var row = "<option disabled selected>Select School</option>";
            for (var i = 0; i < json.data.length; i++) {

                row = row + '<option value="' + json.data[i].school_name + '">' + json.data[i].school_name + '</option>';

            }
            $("#destination").get(0).innerHTML = row;
        });
}

//fetch data from database using API
$(document).ready(function () {
    $(window).on("load", function () {
        displayData();
    });

    getSchool();

    // Save data to the database using api
    $(document).ready(function () {
        $("#ad").click(function () {
            $("#tn").val((new Date().getTime()).toString(10));
            $("#docorigin").val($.session.get("school"));
        })
        $("#insert").click(function () {
            var dtnumber = $("#tn").get(0).value;
            var document_title = $("#title").get(0).value;
            var document_origin = $("#docorigin").get(0).value;
            var date_sent = new Date();
            var document_destination = $("#destination").get(0).value;
            var tag = $("#tag").get(0).value;

            var fd = new FormData();
            var files = $('#attachment')[0].files;
            if (files.length > 0) {
                fd.append('file', files[0]);
                $.ajax({
                    url: 'https://dts4d.fusiontechph.com/api/public/fileAttachment.php',
                    type: 'post',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        // alert(response);
                        var doc_type = response.substring(response.lastIndexOf('.') + 1, response.length) || response;
                        // alert(doc_type);
                        if (response != 0) {
                            // alert(response);
                            $.post("https://dts4d.fusiontechph.com/api/public/insertDoc",
                                JSON.stringify({
                                    dtnumber: dtnumber,
                                    document_title: document_title,
                                    doc_type: doc_type,
                                    document_origin: document_origin,
                                    date_sent: date_sent,
                                    document_destination: document_destination,
                                    tag: tag,
                                    attachment: response,
                                    receive: "false"
                                }),
                                function (data, status) {
                                    alert("Data: " + data + "\nStatus: " + status);
                                });
                        } else {
                            alert('file not uploaded');
                        }
                    },
                });
            } else {
                alert("Please select a file.");
            }
            // displayData();
        });
    });


    //Search data

    $(document).ready(function () {
        $("#search").click(function () {
            var query = $("#search-in").get(0).value;
            //endpoint
            $.post("https://dts4d.fusiontechph.com/api/public/searchDoc",
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
            $.post("https://dts4d.fusiontechph.com/api/public/searchDoc",
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
            $.post("https://dts4d.fusiontechph.com/api/public/updateDoc",
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
        $.post("https://dts4d.fusiontechph.com/api/public/deleteDoc",
            JSON.stringify({
                dtnumber: dtnumber
            }),
            function (data, status) {
                alert("Data: " + data + "\nStatus: " + status);
            });
        displayData();
    });
})