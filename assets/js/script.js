import { productApi } from './ProductApi.js';
import {storage} from './Storage/index.js';
import {STORAGE_KEYS} from './Storage/consts.js';
let cartDisplay=document.querySelector("#cartDisplay");
let cart=document.querySelector(".cart");
let pizzasDOM=document.querySelector("#pizzasDOM");
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
                       <li><input type="radio" name="size" checked="checked" > <label for="" class="ml-3">small - 20sm</label> </li>
                       <li><input type="radio" name="size" > <label for="" class="ml-3">medium - 25sm</label> </li>
                       <li><input type="radio" name="size" > <label for="" class="ml-3">big - 32sm</label> </li>
                   </ul>

                   <button class="btn py-1 px-5" data-id=${product.id}>Add to basket </button>
            
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




}
document.addEventListener("DOMContentLoaded",()=>{

    productApi.getProductInfo().then(data=>{
    
        storage.setItem(STORAGE_KEYS.PRODUCTS,data)
        UI.displayPeoducts(storage.getItem(STORAGE_KEYS.PRODUCTS))

    })
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



})