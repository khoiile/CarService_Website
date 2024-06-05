document.addEventListener("DOMContentLoaded",()=>{
    check()
})

function check(){
    const token = localStorage.getItem("pretique_car_token_account") || null;
    $.ajax({
        url : "http://localhost:27017/api/auth/checkLogin",
        type : "POST",
        headers: {
            "x-auth-token" : token
        },
        success : function(data) {
            console.log("success")
            $("#log_in").hide()
            $("#sign_up").hide()
            $("#log_out").show()
            $("#service").show()
        },
        error : function(err){
            console.log(err)
        }
    })
}

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