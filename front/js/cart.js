
let cart = []
cart = JSON.parse(localStorage.getItem('panier'));
const recapPanier = document.querySelector("#cart__items")
const changeQuantite = document.getElementsByClassName("itemQuantity")

 
for (let i = 0; i < cart.length; i++) {
  recapPanier.innerHTML +=
  `<article class="cart__item" id=${cart[i]._id} data-color=${cart[i].color}>
          <div class="cart__item__img">
            <img src=${cart[i].imageUrl} alt=${cart[i].altTxt}>
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
             <h2>${cart[i].name}</h2>
             <p>${(cart[i].color)}</p>
             <p class="total">${cart[i].productPrice * (cart[i].quantity)} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${(cart[i].quantity)}>
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer  </p>
              </div>
            </div>
           </div>
        </article>`
      
}
const htmlData = document.getElementsByClassName('deleteItem');
for(let i =0; i<htmlData.length; i++){
  htmlData[i].addEventListener("click", (event) =>{
     articleAsupprimer = htmlData[i].closest('article');
     console.log(articleAsupprimer)
       const artColor = articleAsupprimer.dataset.color
        const idColor = articleAsupprimer.id 
        cart = cart.filter(cart => (artColor || idColor) != (cart.color ||  cart._id) ); 
        localStorage.setItem('panier', JSON.stringify(cart));
        document.location.reload() 

  })
}

const totalQty = document.getElementById("totalQuantity")
console.log (totalQty)
const totalPrice = document.getElementById("totalPrice")
console.log (totalPrice)
 
const elementHtml = document.getElementsByClassName("cart__item__content__settings__quantity")
 console.log (elementHtml)

 for(let i =0; i<elementHtml.length; i++){
  elementHtml[i].addEventListener("click", (event) =>{
     elementModif = elementHtml[i].closest('article');
     console.log (elementModif)

     const ofId = elementModif.id 
     console.log (ofId)

     const ofColor = elementModif.dataset.color
     console.log (ofColor)

     let quantiteAjout = elementModif
    quantiteAjout = Number.parseInt(event.target.value);
     console.log(quantiteAjout)

     
     let index = cart.findIndex(cart => (ofId === cart._id ) &&  (cart.color === ofColor ));
     console.log(cart[index])
     cart[index].quantity = quantiteAjout;
     localStorage.setItem('panier', JSON.stringify(cart))
     document.location.reload() 
  })
  }

/* formulaire */
























