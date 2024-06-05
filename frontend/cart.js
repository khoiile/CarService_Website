document.addEventListener("DOMContentLoaded",()=>{
    check()
    getAllcartByid()
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

function getAllcartByid(){
    const token = localStorage.getItem("pretique_car_token_account") || null;
    const idu = localStorage.getItem("pretique_car_id_user") || null
    console.log(idu)
    $.ajax({
        url : "http://localhost:27017/api/carts/cartByIduser",
        type : "get",
        headers: {
            "x-auth-token" : token
        },
        contenttype :"application/json",
        data :{
            iduser : idu
        },
        
        success : function(data) {
            document.getElementById("line_2").innerHTML = ""
            document.getElementById("line_3").innerHTML = ""
            document.getElementById("line_4").innerHTML = ""
            document.getElementById("line_5").innerHTML = ""
            document.getElementById("line_6").innerHTML = ""
            console.log("success")
            var count = 0;
            var total = 0;
            for(var serv of data){
                count+=1
                total+= serv.Service_price_value
                switch(count){
                    case 1:
                    document.getElementById("line_2").innerHTML = `${serv.Service_name} ${serv.Service_price} <button class='delete_btn' onclick="remove('${serv.Cart_ID}')">Remove</button>`
                    break;

                    case 2:
                    document.getElementById("line_3").innerHTML = `${serv.Service_name} ${serv.Service_price} <button class='delete_btn' onclick="remove('${serv.Cart_ID}')">Remove</button>`
                    break;

                    case 3:
                    document.getElementById("line_4").innerHTML = `${serv.Service_name} ${serv.Service_price} <button class='delete_btn' onclick="remove('${serv.Cart_ID}')">Remove</button>`
                    break;

                    case 4:
                    document.getElementById("line_5").innerHTML = `${serv.Service_name} ${serv.Service_price} <button class='delete_btn' onclick="remove('${serv.Cart_ID}')">Remove</button>`
                    break;

                    case 5:
                    document.getElementById("line_6").innerHTML = `${serv.Service_name} ${serv.Service_price} <button class='delete_btn' onclick="remove('${serv.Cart_ID}')">Remove</button>`
                    break;
                }
            }
            document.getElementById("vnd").innerHTML = `<p id="total">${total}</p>VND`
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
    
                case 500:
                    console.log(err)
                    break
            }
        }
    })
}

function remove(idcart){
    const token = localStorage.getItem("pretique_car_token_account") || null;
    $.ajax({
        url : "http://localhost:27017/api/carts/"+idcart,
        type : "delete",
        headers: {
            "x-auth-token" : token
        },
        contenttype :"application/json",        
        success : function(data) {
            console.log("success")
            getAllcartByid()  
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
    
                case 500:
                    console.log(err)
                    break
            }
        }
    })
}

function chooseDate(){
    document.getElementById("wrap_choose").style.display = "flex"
}

function closeChoose(){
    console.log(document.getElementById("input_date").value)
    document.getElementById("wrap_choose").style.display = "none"
}

function Booking(){
    const token = localStorage.getItem("pretique_car_token_account") || null;
    const idu = localStorage.getItem("pretique_car_id_user") || null
    const total = document.getElementById("total").innerText
    const schedule = document.getElementById("input_date").value
    if(schedule){
        $.ajax({
            url : "http://localhost:27017/api/orders/",
            type : "POST",
            headers: {
                "x-auth-token" : token
            },
            contenttype :"application/json",        
            success : function(data) {
                alert(data.message)
                console.log(data.order)
                localStorage.setItem("pretique_car_id_order", data.order.Order_ID)
                window.location.href= 'check_out.html'
            },
            data : {
                Customer_ID : idu,
                TotalAmount : total,
                schedule : schedule
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
                        break
                }
            }
        })
    }else{
       alert("Please choose a date!") 
    }
    
}