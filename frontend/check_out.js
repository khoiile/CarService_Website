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
    const id_order = localStorage.getItem("pretique_car_id_order")
    const idu = localStorage.getItem("pretique_car_id_user") || null
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

                document.getElementById("name_").innerText = `Name: ${data.order.Name}`
                document.getElementById("phone_number_").innerText = `Phone: ${data.order.PhoneNumber}`
                document.getElementById("e_mail_").innerText = `Email: ${data.order.Email}`
                document.getElementById("address_").innerText = `Address: ${data.order.Address}`
                document.getElementById("booked_date_").innerText = `Booked date: ${data.order.DateOrder}`

                var count = 0
                for(var c of data.order.Carts){
                    count++
                    switch(count){
                        case 1:
                            document.getElementById("line_7").innerText = c.Service_name + " " + c.Service_price
                        break
                        case 2:
                            document.getElementById("line_8").innerText = c.Service_name + " " + c.Service_price
                        break
                        case 3:
                            document.getElementById("line_9").innerText = c.Service_name + " " + c.Service_price
                        break
                        case 4:
                            document.getElementById("line_10").innerText = c.Service_name + " " + c.Service_price
                        break
                        case 5:
                            document.getElementById("line_11").innerText = c.Service_name + " " + c.Service_price
                        break
                    }
                }

                document.getElementById("vnd").innerHTML = `<p id="price_vnd">${data.order.TotalAmount}</p>` + " VND"
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
                        alert("Server error")
                        break
                }
            }
        })
    }else{
        alert("You have to order to be here!")
        window.location.href = 'services.html'
    }
    
}

function payment(){
    const token = localStorage.getItem("pretique_car_token_account") || null
    const id_order = localStorage.getItem("pretique_car_id_order") || null
    const idu = localStorage.getItem("pretique_car_id_user") || null
    if(id_order){
        console.log(id_order)
        $.ajax({
            url : "http://localhost:27017/api/payments/",
            type : "POST",
            headers: {
                "x-auth-token" : token
            },
            data : {
                Order_ID : id_order,
                Amount : document.getElementById("price_vnd").innerText,
                PaymentMethod : "Banking"
            },
            success : function(data) {
                console.log(data)
                window.location.href = 'payment.html'
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
                        alert("Server error")
                        break
                }
            }
        })
    }else{
        alert("You have to order to be here!")
        window.location.href = 'services.html'
    }
}

function payOffline(){
    const token = localStorage.getItem("pretique_car_token_account") || null
    const id_order = localStorage.getItem("pretique_car_id_order") || null
    const idu = localStorage.getItem("pretique_car_id_user") || null
    if(id_order){
        console.log(id_order)
        $.ajax({
            url : "http://localhost:27017/api/payments/",
            type : "POST",
            headers: {
                "x-auth-token" : token
            },
            data : {
                Order_ID : id_order,
                Amount : document.getElementById("price_vnd").innerText,
                PaymentMethod : "Cash"
            },
            success : function(data) {
                console.log(data)
                window.location.href = 'services.html'
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
                        alert("Server error")
                        break
                }
            }
        })
    }else{
        alert("You have to order to be here!")
        window.location.href = 'services.html'
    }
}

function back(){
    const token = localStorage.getItem("pretique_car_token_account") || null
    const id_order = localStorage.getItem("pretique_car_id_order") || null
    const idu = localStorage.getItem("pretique_car_id_user") || null
    if(id_order){
        console.log(id_order)
        $.ajax({
            url : "http://localhost:27017/api/payments/",
            type : "POST",
            headers: {
                "x-auth-token" : token
            },
            data : {
                Order_ID : id_order,
                Amount : document.getElementById("price_vnd").innerText,
                PaymentMethod : "Cash"
            },
            success : function(data) {
                console.log(data)
                window.location.href = 'cart.html'
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
                        alert("Server error")
                        break
                }
            }
        })
    }else{
        alert("You have to order to be here!")
        window.location.href = 'services.html'
    }
}