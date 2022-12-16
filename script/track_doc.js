$(document).ready(function () {

    //Search data
    $(document).ready(function () {
        $("#search").click(function () {
            var query = $("#query").get(0).value;
            //endpoint
            $.post("https://dts4d.fusiontechph.com/api/public/trackDoc",
                JSON.stringify(
                    //payload
                    {
                        q: query
                    }
                ),
                function (data, status) {
                    //result
                    var json = JSON.parse(data);
                    $("#thead").get(0).innerHTML = "<th>Tracking No.</th>" +
                        "<th>Title</th>" +
                        "<th>Type</th>" +
                        "<th>Origin</th>" +
                        "<th>Date Received</th>" +
                        "<th>Tags </th>" +
                        "<th>Action</th>";

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
        });
    })
})