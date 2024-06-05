document.addEventListener("DOMContentLoaded",()=>{
    check()
    checkCart()
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

function checkCart(){
    const token = localStorage.getItem("pretique_car_token_account") || null
    const id_order = localStorage.getItem("pretique_car_id_order") || null
    const idu = localStorage.getItem("pretique_car_id_user") || null
    localStorage.removeItem("pretique_car_id_order")
    if(id_order){
        console.log(id_order)
        $.ajax({
            url : "http://localhost:27017/api/orders/" + id_order,
            type : "GET",
            headers: {
                "x-auth-token" : token
            },
            data : {
                Customer_ID : idu
            },
            success : function(data) {
                console.log(data)
                document.getElementById("vnd").innerHTML =  data.order.TotalAmount + " VND"
            },
            error : function(err){
                console.log(err)
                switch(err.status){
                    case 400:
                        console.log(err)
                        break
        
                    case 401:
                        console.log(err)
                        break

                    case 404:
                        console.log(err)
                        alert(err.responseJSON.message)
                        break

                    case 500:
                        console.log(err)
                        alert("Server error, cannot login!")
                        break
                }
            }
        })
    }else{
        alert("You have to order to be here!")
        window.location.href = 'services.html'
    }
    
}
