$(document).ready(function () {
    if ($.session.get("login")) {
        $("#user-name").text($.session.get("name"));
        $("#user-position").text($.session.get("position"));

        $("#track-doc").get(0).innerHTML = '<a class="nav-link" href="track_doc.html">' +
            '<span class="menu-title"> Track Documents </span>' +
            '<i class="mdi mdi-magnify menu-icon"></i></a>';

        if ($.session.get("role") === "admin") {
            $("#admin-label").get(0).innerHTML = '<span style="font-size: xx-small;">MASTER LIST</span>';

            $("#admin-p").get(0).innerHTML = '<a class="nav-link" href="document.html">' +
                '<span class ="menu-title"> All Documents </span>' +
                '<i class = "mdi mdi-file-document menu-icon"></i></a>';

            $("#admin-settings").get(0).innerHTML = '<span style="font-size: xx-small;">SETTINGS</span>';

            $("#admin-inst").get(0).innerHTML = '<a class="nav-link" href="dmmmsu-mluc.html">' +
                '<span class="menu-title">DMMMSU-MLUC</span>' +
                '<i class="mdi mdi-home-map-marker menu-icon"></i></a>';

            $("#admin-users").get(0).innerHTML = '<a class="nav-link" href="users.html">' +
                '<span class="menu-title">User</span>' +
                '<i class="mdi mdi-account-multiple-outline menu-icon"></i></a>';
        } else if ($.session.get("role") === "staff") {
            $("#user-doc").get(0).innerHTML = '<a class="nav-link" href="document_user.html">' +
                '<span class="menu-title"> Documents </span>' +
                '<i class="mdi mdi-file menu-icon"></i></a>';

            $("#user-inc").get(0).innerHTML = '<a class="nav-link" href="incoming.html">' +
                '<span class="menu-title"> Incoming </span>' +
                '<i class="mdi mdi-download menu-icon"></i></a>';

            $("#user-rec").get(0).innerHTML = '<a class="nav-link" href="received.html">' +
                '<span class="menu-title"> Received </span>' +
                '<i class="mdi mdi-email menu-icon"></i></a>';

            $("#user-out").get(0).innerHTML = '<a class="nav-link" href="outgoing.html">' +
                '<span class="menu-title"> Outgoing </span>' +
                '<i class = "mdi mdi-upload menu-icon"></i></a>';

            $("#user-hold").get(0).innerHTML = '<a class="nav-link" href="hold.html">' +
                '<span class="menu-title"> Hold </span>' +
                '<i class = "mdi mdi-pause menu-icon"></i></a>';

            $("#user-ret").get(0).innerHTML = '<a class="nav-link" href="returned.html">' +
                '<span class="menu-title"> Returned </span>' +
                '<i class = "mdi mdi-swap-horizontal menu-icon"></i></a>';
        }
    }
    $("#update-password").click(function () {
        var userid = $.session.get("userid");
        var current_password = $("#current-pw").get(0).value;
        var new_password = $("#new-pw").get(0).value;
        var confirm_password = $("#confirm-pw").get(0).value;
        if (new_password === confirm_password) {
            $.post(
                "http://localhost/dts_api/dtsapi/DocTS/api/public/changePassword",
                JSON.stringify({
                    userid: userid,
                    current_password: current_password,
                    new_password: new_password,
                }),
                function (data, status) {
                    alert(data);
                    if (status === "success") {
                        alert("Password Changed Successful");
                        // $(location).attr("href", "index.html");
                    } else {
                        alert("Log In Failed");
                    }
                    // alert("Data: " + data + "\nStatus: " + status);
                }
            );
        }
    })

    $("#changeImg").click(function () {
        var fd = new FormData();
        var files = $('#profile-pic')[0].files;
        var userid = $.session.get("userid");
        // var filepath = "";
        // Check file selected or not
        if (files.length > 0) {
            fd.append('file', files[0]);
            $.ajax({
                url: 'http://localhost/dts_api/dtsapi/DocTS/api/public/imageUpload.php',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response != 0) {
                        $("#profile-img").attr("src", response);
                        $(".preview img").show(); // Display image element
                    } else {
                        alert('file not uploaded');
                    }
                },
            });
        } else {
            alert("Please select a file.");
        }
        $.post(
            "http://localhost/dts_api/dtsapi/DocTS/api/public/changeProfilePic",
            JSON.stringify({
                userid: userid,
                img: $.session.get("filepath"),
            }),
            function (data, status) {
                if (status === "success") {
                    alert("Profile Updated!");
                } else {
                    alert('Upload Failed!');
                }
                // alert("Data: " + data + "\nStatus: " + status);
            }
        );
    })
})