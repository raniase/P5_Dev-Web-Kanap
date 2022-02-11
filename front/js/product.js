//https://developer.mozilla.org/fr/docs/Web/API/URL/searchParams
/* utiliser La propriété searchParams pour retourner l' id de l'article cliqué sur le console de ma page produits */
let params = new URL(document.location).searchParams;
let id = params.get("id");

/* recupérer les champs du produit à repmlir dans mon  html selon les attributs suivants :
colors/price/name/imageUrl/description/altTxt */

const imgAtribute = document.querySelector('.item__img');
const productTitle = document.querySelector('#title');
const price = document.querySelector('#price');
const descript = document.querySelector('#description');

const colors = document.querySelector('#colors')
const quantity = document.getElementById('quantity');
const addToCart = document.getElementById("addToCart");



// déclarer mes variables (quantity et colors)
let quantitySelected = 0;
let colorSelected = "";

// classe Article qui permet de créer un objet article
let Article = class {
    constructor(_id, quantity, color) {
        this._id = _id;
        this.quantity = quantity;
        this.color = color; 
    
    }
};



//console.log(imgAtribute)
fetch("http://localhost:3000/api/products/" + id)
    .then(function (result) {
        if (result.ok) {
            return result.json();
        }
    })
    /*utiliser la methode then pour récuperer mon produit et ajouter le contenue de chaque article kanapé dans les atributs html*/
    .then(function (product) {
        imgAtribute.innerHTML +=
            `<img src=${product.imageUrl} alt="${product.altTxt}">`
        productTitle.innerHTML = `${product.name}`;
        price.innerHTML = `${product.price}`;
        descript.innerHTML = `${product.description}`;
        /* mettre mes coulour dans une const /creé mon tab de couleur
        parcourir mon tab en mettant chaque couleur dans la partie option valeur du code html 
        utiliser la concatination */
        const couleur = product.colors;
        //console.log (couleur)
        for (let i = 0; i < couleur.length; i++) {
            colors.innerHTML += `<option value="${couleur[i]}">${couleur[i]}</option>`
        }
    })
    /*catch erreur (retour d'un msg sur mon console : Fetch Erreur en cas d'erreur) 
    creé une aletre pour le client:"Veuillez nous excusez les produits ne sont pas disponible pour le moment." )*/
    .catch(function (err) {
        console.log(err);
        alert("Veuillez nous excusez, le produit n'est pas disponible pour le moment.")
    });
// Ajouter des produits dans le panier:

//creé mon evenement input qui met la valeur de la quantité input selectionné dans ma variable quantitySelected
quantity.addEventListener('input', event => {
    quantitySelected = Number.parseInt(event.target.value);
});
//creé mon evenement input qui met la valeur de la couleur input selectionné dans ma variable  colorSelected
colors.addEventListener('input', event => {
    colorSelected = event.target.value;
    console.log(colors.value);
});
// creé mon evenement click qui ajoute les valeurs seclectinnés dans mon new article 
addToCart.addEventListener('click', event => {
    console.log(imgAtribute)
    let article = new Article();
    article._id = id;
    if (quantitySelected == 0) {
        return alert("Veuillez choisir la quantité")
    } 
    else if (quantitySelected > 100) {
        return alert("la quantité doit être inférieur à 100")
    }

    else if (colorSelected == ""){
        return alert("Veuillez choissez la couleur")
    }
    else {
        article.quantity = quantitySelected
        article.color = colorSelected;
    }
    //si mon local storage est vide, créer un tableau et ajouter l'article selectionné
    if (localStorage.getItem('panier') === null) {
        let cart = [];
        cart.push(article);
        let kanap = JSON.stringify(cart);
        localStorage.setItem('panier', kanap);
        // si nn si mon tableau prend le contenue de mon panier dans le local storage 
    } else {
        let cart = [];
        cart = JSON.parse(localStorage.getItem('panier'));
        let articleExiste;
        // parcourir le tableau en comparant l'id et la couleur de mon tableau ajouté avec l'id et la couleur de l'article de mon panier 
        for (let i = 0; i < cart.length; i++) {
            if (cart[i]._id === article._id && cart[i].color === article.color) {
                articleExiste = cart[i]
            }
          //console.log (cart)
        }
        // Si l'element existe dans localStorage, mettre à  jour la quantite du nouvel article et suprimer l'ancien
        if (articleExiste) {
            article.quantity = Number.parseInt(article.quantity) + Number.parseInt(articleExiste.quantity);
           // console.log (article.quantity)
        // créer une condition pour limité la quantité enregistré dans le local storage
            if (article.quantity >= 100) {
                return alert("La quantité demandée est indisponible")

            }

            var indexOfarticleExiste = cart.indexOf(articleExiste);
            //supprimer l'ancien article dans le tableau 
            cart.splice(indexOfarticleExiste, 1);
        }
        // faire un push de mon article 
        cart.push(article);
        let kanap = JSON.stringify(cart);
        localStorage.setItem('panier', kanap);

    }

}); 

