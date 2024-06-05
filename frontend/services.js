document.addEventListener("DOMContentLoaded",()=>{
    check()
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
        },
        error : function(err){
            console.log(err)
            switch(err.status){
                case 400:
                    console.log(err)
                    alert("Wrong information, please try again!")
                    break
    
                case 401:
                    console.log(err)
                    window.location.href = "landing.html"
                    break
    
                case 500:
                    console.log(err)
                    alert("Server error, cannot login!")
                    break
            }
        }
    })
}

