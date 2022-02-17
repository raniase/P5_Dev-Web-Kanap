
let cart = []
cart = JSON.parse(localStorage.getItem('panier'));
const recapPanier = document.querySelector("#cart__items")
const changeQuantite = document.getElementsByClassName("itemQuantity")
const totalElement = document.getElementsByClassName("total")

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
             <p class="total">${(cart[i].productPrice * cart[i].quantity )} €</p>
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
//Suprimer l'article
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
const totalPrice = document.getElementById("totalPrice")

// calculer le total de de l'article ajouter avant la modification  
let totalPrix = 0
let nbrArticle = 0
for (let i = 0; i < cart.length; i++) { 
    totalPrix += cart[i].quantity * cart[i].productPrice;
    nbrArticle += cart[i].quantity
}
totalPrice.innerHTML = `${totalPrix}`;
totalQty.innerHTML = `${nbrArticle}`;

const elementHtml = document.getElementsByClassName("cart__item__content__settings__quantity")
//modifier la valeur ajouté 
 for(let i =0; i<elementHtml.length; i++){
   elementHtml[i].addEventListener("click", (event) => {
     elementModif = elementHtml[i].closest('article');
     const idOfElement = elementModif.id
     const ColorOfElement = elementModif.dataset.color
     let quantiteAjout = elementModif
     quantiteAjout = Number.parseInt(event.target.value);
     let index = cart.findIndex(cart => (  idOfElement=== cart._id) && (cart.color === ColorOfElement));
     cart[index].quantity = quantiteAjout;
     cart[index].totalPrice = cart[index].quantity * cart[index].productPrice;
     localStorage.setItem('panier', JSON.stringify(cart))
     
     // calculer  le total d'un article
     let modifPrix = document.getElementsByClassName("total");
     if (cart[index].quantity == 0) {
       document.location.reload()
     } else {
       modifPrix[index].innerHTML = cart[index].productPrice * cart[index].quantity + " €"
     }
   //calculer le total du panier 
     let totalPrix = 0
     let nbrArticle = 0
     for (let i = 0; i < cart.length; i++) {
         totalPrix = totalPrix + (cart[i].quantity * cart[i].productPrice);
         nbrArticle = nbrArticle + cart[i].quantity
     }
     totalPrice.innerHTML = `${totalPrix}`;
     totalQty.innerHTML = `${nbrArticle}`;
   })
}
// le formulaire //
let form = document.getElementsByClassName("cart__order__form");
let formFirst = document.getElementById("firstName");
let formLast = document.getElementById("lastName");
let formAdress = document.getElementById("address");
let formCity = document.getElementById("city");
let formMail = document.getElementById("email");
let formValid = document.getElementById("order");
























