let cart = []
cart = JSON.parse(localStorage.getItem('panier'))
 
const recapPanier = document.querySelector("#cart__items")
const changeQuantite = document.getElementsByClassName("itemQuantity")
const totalElement = document.getElementsByClassName("total")
const htmlData = document.getElementsByClassName('deleteItem');
const totalQty = document.getElementById("totalQuantity")
const totalPrice = document.getElementById("totalPrice")
const elementHtml = document.getElementsByClassName("cart__item__content__settings__quantity")

if (cart != null) {
  //parcourir le contenue de mon panier  en ajoutant le contenue de chaque article enregistré dans les atributs html
  for (let i = 0; i < cart.length; i++) {

    fetch("http://localhost:3000/api/products/" + cart[i]._id)
      .then(function (result) {
        if (result.ok) {
          return result.json();
        }
      })
      .then(function (data) {
        recapPanier.innerHTML +=
      `<article class="cart__item" id=${cart[i]._id} data-color=${cart[i].color}>
            <div class="cart__item__img">
              <img src=${data.imageUrl} alt=${data.altTxt}>
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
               <h2>${data.name}</h2>
               <p>${(cart[i].color)}</p>
               <p class="total">${(data.price * cart[i].quantity)} €</p>
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
          //Suprimer l'article
          for (let i = 0; i < htmlData.length; i++) {
            htmlData[i].addEventListener("click", () => {
              articleAsupprimer = htmlData[i].closest('article');
              // console.log(articleAsupprimer)
              const artColor = articleAsupprimer.dataset.color
              const idColor = articleAsupprimer.id
              cart = cart.filter(cart => (artColor || idColor) != (cart.color || cart._id));
              localStorage.setItem('panier', JSON.stringify(cart));
              document.location.reload()
        
            })
          }

        // calculer le total de de l'article ajouter avant la modification 
        let totalPrix = 0
        let nbrArticle = 0
        for (let i = 0; i < cart.length; i++) {
          totalPrix += cart[i].quantity * data.price;
          nbrArticle += cart[i].quantity
        }
        totalPrice.innerHTML = `${totalPrix}`;
        totalQty.innerHTML = `${nbrArticle}`;

          //modifier la valeur ajouté 

        for (let i = 0; i < elementHtml.length; i++) {
          elementHtml[i].addEventListener("click", (event) => {
            elementModif = elementHtml[i].closest('article');
            const idOfElement = elementModif.id
            const ColorOfElement = elementModif.dataset.color
            let quantiteAjout = elementModif
            quantiteAjout = Number.parseInt(event.target.value);
            let index = cart.findIndex(cart => (idOfElement === cart._id) && (cart.color === ColorOfElement));
            cart[index].quantity = quantiteAjout;
            localStorage.setItem('panier', JSON.stringify(cart))

            // calculer  le total d'un article

            let modifPrix = document.getElementsByClassName("total");
            if (cart[index].quantity == 0) {
              document.location.reload()
            } else {
              modifPrix[index].innerHTML = data.price * cart[index].quantity + " €"
            }

            //calculer le total du panier 

            let totalPrix = 0
            let nbrArticle = 0
            for (let i = 0; i < cart.length; i++) {
              totalPrix = totalPrix + (cart[i].quantity * data.price);
              nbrArticle = nbrArticle + cart[i].quantity
            }
            totalPrice.innerHTML = `${totalPrix}`;
            totalQty.innerHTML = `${nbrArticle}`;
          })
        }

      })
      //en cas d'erreur afficher un msg d'erreur dans mon console +créer une alerte (pour l'utilisateur)
      .catch(function (err) {
        console.log('Une erreur est survenue')
        alert("Veuillez nous excusez les produits ne sont pas disponible pour le moment.")
      });
    

  }





  // le formulaire //

  let formFirst = document.getElementById("firstName");
  let formLast = document.getElementById("lastName");
  let formAdress = document.getElementById("address");
  let formCity = document.getElementById("city");
  let formMail = document.getElementById("email");
  let formValid = document.getElementById("order");

  // CREATION EXPRESSION REGULIAIRE EMAIL

  formMail.addEventListener('change', function () {
    validMail(this)
  });
  const validMail = function (inputMail) {
    /*ituliser  le constructeur RegExp()*/
    let emailRegExp = new RegExp('^[a-zA-Z0-9ôöáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$', 'g');
    let testMail = emailRegExp.test(inputMail.value)
    if (testMail) {
      document.getElementById("emailErrorMsg").innerHTML = "Email Valide !"
    } else {
      document.getElementById("emailErrorMsg").innerHTML = `"${inputMail.value} n'est pas valide !"`
      formMail.value = null
    }
  };

  // CREATION EXPRESSION REGULIAIRE VILLE

  formCity.addEventListener('change', function () {
    validCity(this)
  });
  const validCity = function (inputCity) {
    let villeRegExp = new RegExp('^[ a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-]*$', 'g')
    let testVille = villeRegExp.test(inputCity.value)
    if (testVille) {
      document.getElementById("cityErrorMsg").innerHTML = "Ville Valide !"
    } else {
      document.getElementById("cityErrorMsg").innerHTML = `"${inputCity.value} n'est pas valide !"`
      formCity.value = null
    }

  };
  //CREATION EXPRESSION REGULIAIRE ADRESSE

  formAdress.addEventListener('change', function () {
    validAdress(this)
  });
  const validAdress = function (inputAdress) {
    let AdressRegExp = new RegExp('^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-]*$', 'g');
    let testAdress = AdressRegExp.test(inputAdress.value)
    if (testAdress) {
      document.getElementById("addressErrorMsg").innerHTML = "Adresse Valide !"
    } else {

      document.getElementById("addressErrorMsg").innerHTML = `"${inputAdress.value} n'est pas valide !"`
      formAdress.value = null
    }
  }

  // CREATION EXPRESSION REGULIAIRE LASTNAME

  formLast.addEventListener('change', function () {
    validLast(this)
  });
  const validLast = function (inputLast) {
    let LastRegExp = new RegExp('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-]*$', 'g');
    let testLast = LastRegExp.test(inputLast.value)
    if (testLast) {

      document.getElementById("lastNameErrorMsg").innerHTML = "Nom Valide !"


    } else {
      document.getElementById("lastNameErrorMsg").innerHTML = `"${inputLast.value} n'est pas valide !"`
      formLast.value = null
    }

  };

  // CREATION EXPRESSION REGULIAIRE FIRSTNAME

  formFirst.addEventListener('change', function () {
    validFirst(this)
  });
  const validFirst = function (inputFirst) {
    let FirstRegExp = new RegExp('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-]*$', 'g');
    let testFirst = FirstRegExp.test(inputFirst.value)
    if (testFirst) {
      document.getElementById("firstNameErrorMsg").innerHTML = "Prénom Valide !"

    } else {
      document.getElementById("firstNameErrorMsg").innerHTML = `"${inputFirst.value} n'est pas valide !"`
      formFirst.value = null
    }

  };

  // ENVOI DU FORMULAIRE AVEC FETCH

  formValid.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (
      !formFirst.value ||
      !formLast.value ||
      !formAdress.value ||
      !formCity.value ||
      !formMail.value
    ) {
      return alert('Veuillez remplir tous les champs et cliquer')
    }
    else {
      const contact = {
        firstName: `${formFirst.value}`,
        lastName: `${formLast.value}`,
        address: `${formAdress.value}`,
        city: `${formCity.value}`,
        email: `${formMail.value}`
      }
      localStorage.setItem("contact", JSON.stringify(contact));
      let products = []
      for (i = 0; i < cart.length; i++) {
        products.push(cart[i]._id)
      }
      let envoiProducts = { contact, products }
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(envoiProducts),
        headers: {
          "content-type": "application/json",
        }
      })
        .then(res => {
          return res.json();
        })
        .then((data) => {
          let orderId = data.orderId
          window.location.href = `./confirmation.html?id=${orderId}`;
          localStorage.clear()
        })
    }
  });
}
// afficher l'id de la commande dans le html de la page confiramation
if (location.search) {
  //console.log (location.search)
  let idCommande = location.search.slice(1).split("?")[0].split("=")[1];
  const nbOrder = document.getElementById("orderId");
  nbOrder.innerHTML = idCommande
}

