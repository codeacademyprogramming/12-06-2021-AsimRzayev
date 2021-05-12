import { productApi } from './ProductApi.js';
import {storage} from './Storage/index.js';
import {STORAGE_KEYS,cartItems} from './Storage/consts.js';
let cartDisplay=document.querySelector("#cartDisplay");
let cart=document.querySelector(".cart");
let pizzasDOM=document.querySelector("#pizzasDOM");
let cardBody=document.querySelector(".card-body");
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
   static addCartItemLocalStorage(item){
    let dataitem=item[0];
    cartItems.push({
        image:dataitem.image,
        count:1,
        name:dataitem.name,
        price:dataitem.price
    })
    storage.setItem(STORAGE_KEYS.CART,cartItems);
    UI.displayCartItems(storage.getItem(STORAGE_KEYS.CART));
    
}
static getBagButtons(){
    const buttons=[...document.querySelectorAll(".buttonPizza")];

    buttons.forEach(button=>{
        let id=button.dataset.id;
        
        button.addEventListener("click",event=>{
           id=event.target.dataset.id;
          let  product=storage.getItemById(STORAGE_KEYS.PRODUCTS,id);
            UI.addCartItemLocalStorage(product)
            UI.countTotalpay(storage.getItem(STORAGE_KEYS.CART))
        })
    

        })
    }  
   
    static displayCartItems(items)
    {
        cardBody.innerHTML="";
        items.forEach(element => {
            const div=document.createElement('div');
            div.classList.add('cart-item',"mt-5");
            let result="";        
            result=`
           
            <img src="${element.image}" alt="">
            <span>X 1</span>
            <div class="card-item-text">
            <div>
                <h5>${element.name}</h5>
                <h6>size: small</h6>
            </div>
            <h3>${element.price}<span>$</span></h3>
            </div>
           `;
           div.innerHTML=result;
            cardBody.appendChild(div);
        });
    }
    static countTotalpay(items)
    {
        
       let totalpayment=items.reduce((accumulator, currentValue, currentIndex, array) => {
            return accumulator + currentValue.price;
        }, 0)
        

    }
};



document.addEventListener("DOMContentLoaded",()=>{
    UI.displayCartItems(storage.getItem(STORAGE_KEYS.CART));
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



})