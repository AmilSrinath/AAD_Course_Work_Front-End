//Login Action
$("#btnLogin").on('click',()=>{
    console.log("fndjskanfsnafan")
    var email = $("#txtEmail").val();
    var password = $("#txtPassword").val();

    var data = {
        email: email,
        password: password
    };

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/user/signin",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            console.log("Success:", response.token);
            localStorage.setItem("token",response.token);
            $("#signInForm").css('display','none');
            $("#dashboardForm").css('display','block');
            $("#employeeForm").css('display','none');
            $("#navBarFrom").css('display','block');

            $("#dashboardEmail").text(email);
            $("#sidenav-main").css('display','block');
            $("#topBar").css('display','block');
            $(".nav-link").removeClass("active bg-gradient-primary");
            $(".dashboardFrom").addClass("active bg-gradient-primary");
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText);
            if (xhr.status === 403){
                alert("Please check username and password (:")
            }
        }
    });

    $("#txtEmail").val(null);
    $("#txtPassword").val(null);
})