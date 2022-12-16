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
                    "<td><a id='print' href='#printDocumentUserModal' class='print' data-toggle='modal'><i id='print' class='material-icons' data-toggle='tooltip' title='Print'>&#xe555;</i>" +
                    "</a><a id='history' href='#historyDocumentUserModal' class='history' data-toggle='modal'><i id='history' class='material-icons' data-toggle='tooltip' title='History'>&#xebe7;</i></a></td>" +
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
            // var doc_type = $("#doctype").get(0).value;
            var document_origin = $("#docorigin").get(0).value;
            // var date_received = $("#datereceived").get(0).value.toString();
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
                        if (response != 0) {
                            var doc_type = response.substring(response.lastIndexOf('.') + 1, response.length) || response;
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
                        "<td><a id='print' href='#printDocumentUserModal' class='print' data-toggle='modal'><i id='print' class='material-icons' data-toggle='tooltip' title='Print'>&#xe555;</i>" +
                        "</a><a id='history' href='#historyDocumentUserModal' class='history' data-toggle='modal'><i id='history' class='material-icons' data-toggle='tooltip' title='History'>&#xebe7;</i></a></td>" +
                        "</tr>";
                });
        });
    })

    // Print view OR History view
    $("table").delegate("tr", "click", function (event) {
        var id = $(this).attr('id');
        if (event.target.id === 'print') {
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
                    // $("#p-tn").text(json.data[0].dtnumber);
                    $("#p-title").text(json.data[0].document_title);
                    $("#p-type").text(json.data[0].doc_type);
                    $("#p-origin").text(json.data[0].document_origin);
                    $("#p-dr").text(new Date(json.data[0].date_received));
                    $("#p-destination").text(json.data[0].document_destination);
                    $("#p-tag").text(json.data[0].tag);
                });
        } else {
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
                    $("#h-tn").text(json.data[0].dtnumber);
                    $("#h-received").text(json.data[0].document_title);
                    $("#h-institution").text(json.data[0].doc_type);
                    $("#h-sent").text(json.data[0].document_origin);
                    $("#h-status").text(new Date(json.data[0].date_received));
                    $("#h-remarks").text(json.data[0].document_destination);
                    $("#h-duration").text(json.data[0].tag);
                });
        }
    });
})