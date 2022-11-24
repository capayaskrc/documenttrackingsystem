//fetch data from database using API

$("#display").click(function(){
    $.post("http://localhost/dtsapi/DocTS/api/public/fetchDoc",
    function(data, status){
    var json=JSON.parse(data);
    var row="";
    for(var i=0;i<json.data.length;i++){

        row=row+
        "<th><span class='custom-checkbox'><input type='checkbox' id='selectAll'><label for='selectAll'></label></span></th>"+
        "<tr><td>"+json.data[i].dtnumber+"</td><td>"+json.data[i].document_fields+"</td>"
        "<td>"+json.data[i].doc_type+"</td><td>"+json.data[i].document_origin+"</td>"
        "<td>"+json.data[i].date_received+"</td><td>"+json.data[i].tag+"</td>"+
        "<td><a href='#editDocumentModal' class='edit' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>"+
        "</a><a href='#deleteDocumentModal' class='delete' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a></td>"
        "</tr>";

    }
    $("#data").get(0).innerHTML=row;
    });
    });

    // Save data to the database using api

    $(document).ready(function(){
        $("#save").click(function(){
        //unique tracking number   
        var document_title=$("#title").get(0).value;
        var doc_type=$("#doctype").get(0).value;
        var document_origin=$("#docorigin").get(0).value;
        var date_received=$("#datereceived").get(0).value;
        var document_destination=$("#docdestination").get(0).value;
        var tag=$("#tag").get(0).value;
        $.post("http://localhost/dtsapi/DocTS/api/public/insertDoc",
        JSON.stringify({
        dtnumber: dtnumber,
        document_title: document_title,
        doc_type: doc_type,
        document_origin: document_origin,
        date_recieved: date_recieved,
        document_destination:document_destination,
        tag: tag

        }),
        function(data,status){
        alert("Data: " + data + "\nStatus: " + status);
        });
        });
        });


//Search data

$("#search").click(function(){

    id=prompt("Tracking Number");
    //endpoint
    $.post("http://localhost/dtsapi/DocTS/api/public/searchDoc",
    JSON.stringify(
    //payload
    {
        dtnumber: dtnumber,
        document_title: document_title,
        doc_type: doc_type,
        document_origin: document_origin,
        date_recieved: date_recieved,
        document_destination:document_destination,
        tag: tag
    }
    ),
    function(data, status){
    //result
    var json=JSON.parse(data);
    $("#dtnumber").get(0).value=json.data[0].dtnumber;
    $("#title").get(0).value=json.data[0].document_title;
    $("#doctype").get(0).value=json.data[0].doc_type;
    $("#docorigin").get(0).value=json.data[0].document_origin;
    $("#datarecieved").get(0).value=json.data[0].date_recieved;
    $("#docdestination").get(0).value=json.data[0].document_destination;
    $("#tag").get(0).value=json.data[0].tag;
    console.log(json);
    
    });
    });


