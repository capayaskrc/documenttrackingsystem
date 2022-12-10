$(document).ready(function () {
    $("#auth").click(function () {
        $.session.clear();
    })
    $("#login").click(function () {
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
                    alert("Log In Successful");
                    $.session.set("login", true);
                    $.session.set("userid", d.data.userid);
                    $.session.set("name", d.data.name);
                    $.session.set("username", d.data.username);
                    $.session.set("email", d.data.email);
                    $.session.set("role", d.data.role);
                    $.session.set("position", d.data.position);
                    alert("Welcome " + $.session.get("name"))
                } else {
                    alert("Log In Failed");
                }
                // alert("Data: " + data + "\nStatus: " + status);
            }
        );
        $(location).attr("href", "index.html");
    })
})