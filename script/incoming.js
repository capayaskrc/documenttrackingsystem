setInterval(displayData, 10000);

function displayData() {
    $.post("https://dts4d.fusiontechph.com/api/public/fetchIncomingDoc",
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
                    "<td><a id='receive' href='#receiveDocumentModal' class='receive' data-toggle='modal'><i id='receive' class='material-icons' data-toggle='tooltip' title='Receive'>&#xe5ca;</i>" +
                    "</a><a id='delete' href='#deleteDocumentModal' class='delete' data-toggle='modal'><i id='delete' class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>" +
                    "</a><a id='view' href='#viewDocumentModal' class='view' data-toggle='modal'><i id='view' class='material-icons' data-toggle='tooltip' title='View'>&#xe417;</i></a></td>" +
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
                        "<td><a id='receive' href='#receiveDocumentModal' class='receive' data-toggle='modal'><i id='receive' class='material-icons' data-toggle='tooltip' title='Receive'>&#xe5ca;</i>" +
                        "</a><a id='delete' href='#deleteDocumentModal' class='delete' data-toggle='modal'><i id='delete' class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>" +
                        "</a><a id='view' href='#viewDocumentModal' class='view' data-toggle='modal'><i id='view' class='material-icons' data-toggle='tooltip' title='View'>&#xe417;</i></a></td>" +
                        "</tr>";
                });
        });
    })

    $("table").delegate("tr", "click", function (event) {
        var id = $(this).attr('id');
        if (event.target.id === 'view') {
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
                    $("#p-tn").text(json.data[0].dtnumber);
                    $("#p-title").text(json.data[0].document_title);
                    $("#p-type").text(json.data[0].doc_type);
                    $("#p-origin").text(json.data[0].document_origin);
                    $("#p-dr").text(new Date(json.data[0].date_received));
                    $("#p-tag").text(json.data[0].tag);
                });
        } else if (event.target.id === 'delete') {
            $("#idToDelete").text(id);
            $.post("https://dts4d.fusiontechph.com/api/public/deleteDoc",
                JSON.stringify({
                    dtnumber: id
                }),
                function (data, status) {
                    alert("Data: " + data + "\nStatus: " + status);
                });
            displayData();
        } else {
            $.post("https://dts4d.fusiontechph.com/api/public/receiveDoc",
                JSON.stringify(
                    //payload
                    {
                        dtnumber: id,
                        date_received: new Date()
                    }
                ),
                function (data, status) {
                    alert("Data: " + data + "\nStatus: " + status);
                });
        }
    });
})