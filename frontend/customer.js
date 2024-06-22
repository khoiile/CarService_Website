document.addEventListener("DOMContentLoaded",()=>{
    getCusInfo()
    $("#wrap_pass_form").hide()
})
function logout(){
    const token = localStorage.getItem("pretique_car_token_account") || null;
    $.ajax({
        url : "http://localhost:27017/api/auth/logout",
        type : "POST",
        headers: {
            "x-auth-token" : token
        },
        success : function(data) {
            localStorage.removeItem("pretique_car_token_account")
            location.reload()
        },
        error : function(err){
            console.log(err)
        }
    })
}

function getCusInfo(){
    const token = localStorage.getItem("pretique_car_token_account") || null;
    const idu = localStorage.getItem("pretique_car_id_user") || null
    $.ajax({
        url : "http://localhost:27017/api/customers/" + idu,
        type : "GET",
        headers: {
            "x-auth-token" : token
        },
        success : function(data) {
            console.log(data)
            $("#name").val(data.Name) 
            $("#email").val(data.Email) 
            $("#phone").val(data.PhoneNumber) 
            $("#address").val(data.Address) 
        },
        error : function(err){
            console.log(err)
            alert("cannot get information!")
        }
    })
}

function applyChange(){
    const token = localStorage.getItem("pretique_car_token_account") || null;
    const idu = localStorage.getItem("pretique_car_id_user") || null
    if($("#name").val().length > 0){
        if($("#phone").val().length > 0){
            if($("#address").val().length > 0){
                var oldpass = null
                var pass = null
                var check = false
                if(document.getElementById("check_box").checked){
                    if($("#oldpass").val().length > 0){
                        if($("#pass").val().length > 0){
                            oldpass = $("#oldpass").val()
                            pass = $("#pass").val()
                            check = true
                        }else{
                            alert("Please fill new password!")
                        }
                    }else{
                        alert("Please fill password!")
                    }
                }else{
                    check = true
                }
                if(check === true){
                    $.ajax({
                        url : "http://localhost:27017/api/customers/" + idu,
                        type : "PUT",
                        headers: {
                            "x-auth-token" : token
                        },
                        data : {
                            Name : $("#name").val(),
                            PhoneNumber : $("#phone").val(),
                            OldPass : oldpass,
                            Password : pass,
                            Address : $("#address").val()
                        },
                        success : function(data) {
                            console.log(data)
                            alert("Change information successfull!")
                        },
                        error : function(err){
                            console.log(err)
                            alert("cannot change information!")
                        }
                    })
                }
            }else{
                alert("Please fill Address field!")
            }
        }else{
            alert("Please fill Phone field!")
        }
    }else{
        alert("Please fill Name field!")
    }
    
}

function checkChangepass(event){
    if(event.checked){
        $("#wrap_pass_form").show()
    }else{
        $("#wrap_pass_form").hide()
    }
}

function deleteAccount(){
    var isConf = confirm("Are you sure you want to delete account?")
    if(isConf){
        const token = localStorage.getItem("pretique_car_token_account") || null;
        const idu = localStorage.getItem("pretique_car_id_user") || null
        $.ajax({
            url : "http://localhost:27017/api/customers/" + idu,
            type : "DELETE",
            headers: {
                "x-auth-token" : token
            },
            success : function(data) {
                localStorage.removeItem("pretique_car_token_account")
                location.reload()
            },
            error : function(err){
                console.log(err)
                alert("cannot get information!")
            }
        })
    }
}