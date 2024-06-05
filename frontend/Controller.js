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

function addtoCart(id_service){
    const token = localStorage.getItem("pretique_car_token_account") || null;
    const idu = localStorage.getItem("pretique_car_id_user")
    $.ajax({
        url : "http://localhost:27017/api/carts/",
        type : "POST",
        headers: {
            "x-auth-token" : token
        },
        data :{
            iduser : idu,
            servID : id_service
        },
        success : function(data) {
            alert("Add to cart successfully!")
        },
        error : function(err){
            console.log(err)
            switch(err.status){
                case 400:
                    console.log(err)
                    // alert("Wrong information, please try again!")
                    alert(err.responseJSON.message)
                
                    break
    
                case 401:
                    console.log(err)
                    break
    
                case 500:
                    console.log(err)
                    alert("Server error!")
                    break
            }
        }
    })
}


