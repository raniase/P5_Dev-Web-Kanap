
let cart = []
cart = JSON.parse(localStorage.getItem('panier'));
console.log(cart)

const recapPanier = document.querySelector("#cart__items")
const changeQuantite = document.getElementsByClassName("itemQuantity")

for (let i = 0; i < cart.length; i++) {
    let id = (cart[i]._id);
    console.log(id)
    let colorSelected = (cart[i].color);
    console.log(colorSelected)
    let quantity = (cart[i].quantity);
    console.log(quantity)

    fetch("http://localhost:3000/api/products/" + id)
        .then(function (result) {
            if (result.ok) {
                return result.json();
            }
        })

        .then(function (product) {
            cart[i] = product
            recapPanier.innerHTML +=
                `<article class="cart__item" id=${cart[i]._id} data-color=${colorSelected}>
     
            <div class="cart__item__img">
            <img src=${cart[i].imageUrl} alt=${cart[i].altTxt}>
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${cart[i].name}</h2>
                <p>${colorSelected}</p>
                <p class="total">${cart[i].price * quantity} €</p>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
            </div>
          </div>`
        })
}











/*
  <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" oninput="updateQty(this)" value=${objPanier[i].nombre}>
      </div>
      <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
      </div>
  </div>
  </div>
</article>`
};*/