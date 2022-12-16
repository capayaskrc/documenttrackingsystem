setInterval(displayData, 10000);

function displayData() {
    $.post("https://dts4d.fusiontechph.com/api/public/fetchReceivedDoc",
        JSON.stringify({
            userSchool: $.session.get("school"),
        }),
        function (data, status) {
            var json = JSON.parse(data);
            var row = "";
            for (var i = 0; i < json.data.length; i++) {

                row = row +
                    "<tr id='" + json.data[i].dtnumber + "'>" + "<td><span class='custom-checkbox'><input type='checkbox' id='selectAll'><label for='selectAll'></label></span></td>" +
                    "<td>" + json.data[i].dtnumber + "</td><td>" + json.data[i].document_title + "</td>" +
                    "<td>" + json.data[i].doc_type + "</td><td>" + json.data[i].document_origin + "</td>" +
                    "<td>" + json.data[i].date_received + "</td><td>" + json.data[i].tag + "</td>" +
                    "<td><a href='#settingsDocumentModal' class='settings' data-toggle='modal'><i id='settings' class='material-icons' data-toggle='tooltip' title='Settings'>&#xe8b8;</i>" +
                    "</a><a href='#viewDocumentModal' class='view' data-toggle='modal'><i id='view' class='material-icons' data-toggle='tooltip' title='View'>&#xe417;</i></a></td>" +
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
            $.post("https://dts4d.fusiontechph.com/api/public/insertDoc",
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
                        "<td><a href='#settingsDocumentModal' class='settings' data-toggle='modal'><i id='settings' class='material-icons' data-toggle='tooltip' title='Settings'>&#xe8b8;</i>" +
                        "</a><a href='#viewDocumentModal' class='view data-toggle='modal'><i id='view' class='material-icons' data-toggle='tooltip' title='View'>&#xe417;</i></a></td>" +
                        "</tr>";
                });
        });
    })

    // Print view OR History view
    $("table").delegate("tr", "click", function (event) {
        var id = $(this).attr('id');
        if (event.target.id === 'settings') {
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
                    $("#s-tn").text(json.data[0].dtnumber);
                    // $("#p-title").text(json.data[0].document_title);
                    // $("#p-type").text(json.data[0].doc_type);
                    // $("#p-origin").text(json.data[0].document_origin);
                    // $("#p-dr").text(new Date(json.data[0].date_received));
                    // $("#p-destination").text(json.data[0].document_destination);
                    // $("#p-tag").text(json.data[0].tag);
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
                    $("#v-tn").text(json.data[0].dtnumber);
                    $("#v-title").text(json.data[0].document_title);
                    $("#v-type").text(json.data[0].doc_type);
                    $("#v-origin").text(json.data[0].document_origin);
                    $("#v-dr").text(new Date(json.data[0].date_received));
                    $("#v-destination").text(json.data[0].document_destination);
                    $("#v-tags").text(json.data[0].tag);
                });
        }
    });
})