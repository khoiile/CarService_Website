document.addEventListener("DOMContentLoaded",()=>{
    const token = localStorage.getItem("pretique_car_token_account") || null;
    $.ajax({
        url : "http://localhost:27017/api/auth/checkLogin",
        type : "POST",
        headers: {
            "x-auth-token" : token
        },
        success : function (data){
            window.location.href="landing.html"
            console.log(data)
        },
        error : function (err){
            console.log(err)
        }
    })
})

function register(){
    const email = $("#email").val()
    const pass = $("#pass").val()
    const repass = $("#repass").val()
    const name = $("#name").val()
    const sdt = $("#sdt").val()
    const address = $("#address").val()
    $.ajax({
        url : "http://localhost:27017/api/auth/register",
        type : "POST",
        data:{
            name : name,
            email: email,
            password: pass,
            address : address,
            phoneNumber : sdt
        },
        success : function(data){
            alert("Sign up successful!")
            window.location.href="log_in_page.html"
        },
        error : function(err){
            const json = err
            switch(err.status){
                case 400:
                    console.log(json)
                    alert("User already exists!")
                    break
    
                case 401:
                    console.log(json)
                    break
    
                case 500:
                    console.log(json)
                    alert("Server error!")
                    break
            }
        }
    })
}