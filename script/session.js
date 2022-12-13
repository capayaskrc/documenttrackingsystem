$(document).ready(function () {
    $("#login").click(function () {
        if ($.session.remove("login")) {
            $.session.remove("login");
            $.session.remove("userid");
            $.session.remove("name");
            $.session.remove("profile-pic");
            $.session.remove("username");
            $.session.remove("email");
            $.session.remove("role");
            $.session.remove("position");
            $.session.remove("school");
        }
        var email = $("#email").get(0).value;
        var role = $("#role").get(0).value;
        var password = $("#password").get(0).value;
        $.post(
            "http://localhost/dts_api/dtsapi/DocTS/api/public/login",
            JSON.stringify({
                email: email,
                role: role,
                password: password,
            }),
            function (data, status) {
                let d = JSON.parse(data);
                if (status === "success") {
                    // alert("Log In Successful");
                    $.session.set("login", true);
                    $.session.set("userid", d.data.userid);
                    $.session.set("name", d.data.name);
                    $.session.set("username", d.data.username);
                    $.session.set("profile-pic", d.data.profile_pic);
                    $.session.set("email", d.data.email);
                    $.session.set("role", d.data.role);
                    $.session.set("position", d.data.position);
                    $.session.set("school", d.data.school);
                    alert("Log In Successful\nWelcome " + $.session.get("name"))
                    $(location).attr("href", "index.html");
                } else {
                    alert("Log In Failed");
                }
                // alert("Data: " + data + "\nStatus: " + status);
            }
        );
        // $(location).attr("href", "index.html");
    })
})