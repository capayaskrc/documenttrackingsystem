//fetch data from database using API
$("#display").click(function(){

    $.post("http://localhost/api/public/printName",
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



    //SAVE DOCUMENT TO DATABASE VIA API
    