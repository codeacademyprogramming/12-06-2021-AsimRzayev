import { productApi } from './ProductApi.js';
import {storage} from './Storage/index.js';
import {STORAGE_KEYS,cartItems} from './Storage/consts.js';
let cartDisplay=document.querySelector("#cartDisplay");
let cart=document.querySelector(".cart");
let pizzasDOM=document.querySelector("#pizzasDOM");
let cardBody=document.querySelector(".card-body");
let totalPayment=document.querySelectorAll(".totalPayment");
let subTotal=document.querySelectorAll(".SubTotal");
class UI{

   static displayPeoducts(products)
   {
    let result="";
    products.forEach(product => {
       result+=`
       <div class="col-xl-3 col-12 ">
       <div class="pizza-item">
           <div class="pizza-hover">
         
                   <h6>Sizes:</h6>
                   <ul>
                       <li><input type="radio" class="radios" name="size" value="small"> <label for="" class="ml-3">small - 20sm</label> </li>
                       <li><input type="radio" class="radios" name="size"  value="medium"> <label for=""  class="ml-3">medium - 25sm</label> </li>
                       <li><input type="radio" class="radios" name="size" value="large"> <label for=""  class="ml-3">big - 32sm</label> </li>
                   </ul>

                   <button class="btn py-1 px-5 buttonPizza" data-id=${product.id}>Add to basket </button>
            
           </div>
           <div class="img-container">
               <img src=${product.image} alt="">
           </div>
           <div class="d-flex justify-content-between">
               <h4>${product.name}</h4>
               <span>32cm</span>
           </div>
           <p>${product.topping.join(",")}</p>
           <h5>${product.price} UAH</h5>
           <div class="pizza-footer">
               <div class="circle">
                   <i class="fas fa-shopping-bag"></i>
                   </div>
           </div>
       </div>
   </div>

       
       `
    });
    pizzasDOM.innerHTML=result;
   }
   static addCartItemLocalStorage(item,size){
    let dataitem=item[0];
    if(storage.getItem(STORAGE_KEYS.CART)==null){
    cartItems.push({
        id:dataitem.id,
        image:dataitem.image,
        size:size,
        count:1,
        name:dataitem.name,
        price:dataitem.price
    })
    }
    else{
        let carts=storage.getItem(STORAGE_KEYS.CART);
         cartItems.splice(0,cartItems.length);
        carts.forEach((cart)=>{
            cartItems.push(cart);
        })
        cartItems.push({
            id:dataitem.id,
            image:dataitem.image,
            size:size,
            count:1,
            name:dataitem.name,
            price:dataitem.price 
        })
    }
    storage.setItem(STORAGE_KEYS.CART,cartItems);

    UI.displayCartItems(storage.getItem(STORAGE_KEYS.CART));
    
}
static UpdateNumber(int)
{
let carts=storage.getItem(STORAGE_KEYS.CART);
carts=carts.map((item)=>{
    if(item.id==int)
        item.count+=1;

    return item;
})
storage.setItem(STORAGE_KEYS.CART,carts);
UI.displayCartItems(storage.getItem(STORAGE_KEYS.CART));
}
static getBagButtons(){
    const buttons=[...document.querySelectorAll(".buttonPizza")];

    buttons.forEach(button=>{
        let id=button.dataset.id;
        
        button.addEventListener("click",event=>{
           id=event.target.dataset.id;
          let  product=storage.getItemById(STORAGE_KEYS.PRODUCTS,id);
          let carts=storage.getItem(STORAGE_KEYS.CART);
        
        if(carts!=null && carts.some(x=>x.id==product[0].id))
        {
            let element=storage.getItemById(STORAGE_KEYS.CART,product[0].id)[0].id ;
        
           UI.UpdateNumber(element);
         
        }
        else{
            let arr=[];
           document.querySelectorAll(".radios").forEach((element)=>{
               
               if(element.parentElement.parentElement.parentElement==event.target.parentElement)
             {
                 arr.push(element);
                 
             }
           
           })
           console.log(arr);
           arr.forEach((element)=>{
            if(element.checked==true)
            {
                element.checked=true;
                
                UI.addCartItemLocalStorage(product,element.value)
                if(cart.style.display!="block"){
                    cartDisplay.style.opacity=1;
                    cart.style.display="block";
                }
                

            }else{
                element.setAttribute("disabled","")
              
            }
           })
         
         
        }
        UI.countTotalpay(storage.getItem(STORAGE_KEYS.CART))
        })
    

        })
    }  
   
    static displayCartItems(items)
    {
        if(items!=null){
        cardBody.innerHTML="";
        items.forEach(element => {
            const div=document.createElement('div');
            div.classList.add('cart-item',"mt-5");
            let result="";        
            result=`
           
            <img src="${element.image}" alt="">
            <span>X ${element.count}</span>
            <div class="card-item-text">
            <div>
                <h5>${element.name}</h5>
                <h6>size: ${element.size}</h6>
            </div>
            <h3>${element.price * element.count}<span>$</span></h3>
            </div>
           `;
           div.innerHTML=result;
            cardBody.appendChild(div);
        });
    }
    }
    static countTotalpay(items)
    {
        if(items!=null){
       let totalpaymentvalue=items.reduce((accumulator, currentValue, currentIndex, array) => {
            return accumulator + ( currentValue.price*currentValue.count);
        }, 0)
        totalPayment[0].innerHTML=totalpaymentvalue;
        totalPayment[1].innerHTML=totalpaymentvalue;
        subTotal[0].innerHTML=items.length;
        subTotal[1].innerHTML=items.length;
    }
    }
};



document.addEventListener("DOMContentLoaded",()=>{
    UI.displayCartItems(storage.getItem(STORAGE_KEYS.CART));
    UI.countTotalpay(storage.getItem(STORAGE_KEYS.CART))
    productApi.getProductInfo().then(data=>{
    
        storage.setItem(STORAGE_KEYS.PRODUCTS,data)
        
    })
    UI.displayPeoducts(storage.getItem(STORAGE_KEYS.PRODUCTS))
    UI.getBagButtons();
    cartDisplay.addEventListener("click",(e)=>{
        if(cart.style.display=="block"){
            cartDisplay.style.opacity=0.7;
            cart.style.display="none";
        }
        else
        {
            cartDisplay.style.opacity=1;
            cart.style.display="block";
        }
    });
    cartDisplay.addEventListener("mouseover",(e)=>{
        if(e.target==cartDisplay || e.target.parentElement==cartDisplay){
          
        document.querySelector(".amount-cart").style.visibility= "visible";
        }
    })
    window.addEventListener("mouseover",(e)=>{
        if(e.target!==cartDisplay && e.target.parentElement!==cartDisplay){
          
        document.querySelector(".amount-cart").style.visibility= "hidden";
        }
    })
    


})