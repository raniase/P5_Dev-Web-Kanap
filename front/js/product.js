//https://developer.mozilla.org/fr/docs/Web/API/URL/searchParams
/* utiliser La propriété searchParams pour retourner l' id de l'article cliqué sur le console de ma page produits */
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id)
/* recupérer les champs du produit a repmlir dans mon  html selon les attributs suivants :
colors/price/name/imageUrl/description/altTxt */
;
const imgAtribute = document.querySelector('.item__img');
const productTitle = document.querySelector('#title');
const price = document.querySelector('#price');
const descript = document.querySelector('#description');

const colors = document.querySelector('#colors')
const quantity = document.getElementById('quantity');
const addToCart = document.getElementById("addToCart");

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
        console.log("Fetch Erreur");
        alert("Veuillez nous excusez les produits ne sont pas disponible pour le moment.")
    });
// Ajouter des produits dans le panier:
// cree une une variable class qui contient les donneés de mon article
let Article = class {
    constructor(_id, quantity, color) {
        this._id = _id;
        this.quantity = quantity;
        this.color = color;
    }
};
// déclarer un tableau 

// déclarer mes variables (quantity et colors)
let quantitySelected;
let colorSelected;
//creé mon evenement input qui met la valeur de la quantité input selectionné dans ma variable quantitySelected
quantity.addEventListener('input', event => {
    quantitySelected = event.target.value;
    //console.log (quantity.value);
});
//creé mon evenement input qui met la valeur de la couleur input selectionné dans ma variable  colorSelected
colors.addEventListener('input', event => {
    colorSelected = event.target.value;
    //console.log (colors.value);
});
// creé mon evenement click qui ajoute les valeurs seclectinnés dans mon new article 
addToCart.addEventListener('click', event => {
    let article = new Article();
    article._id = id;
   
    if (quantitySelected == 0) {
        return alert("choisir la quantité SVP")
    } else {
        article.quantity = quantitySelected
    }

    if (quantitySelected > 100) {
        return alert("la quantité doit être inférieur à 100 SVP")
    }
    else {
        article.quantity = quantitySelected
    }

    if (colorSelected == "") {
        return alert("Choissez la couleur SVP")
    } else {
        article.color = colorSelected;
    }

    //si mon local storage est vide, on crée un tableau et on ajoute l'article selectionne
    if (localStorage.getItem('panier') === null) {
        let cart = [];
        cart.push(article);
        let kanap = JSON.stringify(cart);
        localStorage.setItem('panier', kanap);
    } else {
        let cart = [];
        cart = JSON.parse(localStorage.getItem('panier'));
        let found = cart.find(element => element._id === article._id && element.color === article.color);
        if (found){
            let quantityFound = Number.parseInt(found.quantity);
            let totalQuantity = quantityFound + Number.parseInt(quantitySelected);
            
            article.quantity =totalQuantity; 

            var index = cart.indexOf(found);
            //index trouvé
            if (index !== -1) {
                cart.splice(index, 1);
            }

            cart.push(article)
            let kanap = JSON.stringify(cart);
            localStorage.setItem('panier', kanap);
  
        } else {
            cart.push(article);
            let kanap = JSON.stringify(cart);
            localStorage.setItem('panier', kanap);
        }

    }
    
//si nn le contenue de mon tableau prend les valeurs gardés dans la memoire de local storage et ajoute le contenue du l'article suivant 


/*
else {let kanap =kanap.find(article => article.id_color == article.id_color);
        console.log(kanap);
    }
        if(findArticle !== undefined){
            findArticle.nombre = parseInt(findArticle.nombre) + parseInt(quantity.value)
            console.log(findArticle.nombre);
        }
        

*/

/*let cart = JSON.parse(localStorage.getItem('Produit')) & JSON.parse(localStorage.getItem(article.color & article._id));
 if (cart = JSON.parse(localStorage.getItem('Produit'))& JSON.parse(localStorage.getItem(article.color & article._id))){
        cart.push(article)+(quantitySelected);
        let kanap = JSON.stringify(cart);
        localStorage.setItem('Produit', kanap);
    }

/*if (cart = JSON.parse(localStorage.getItem('Produit')) & (article.color & article._id)){
        cart.push((article)+(article.quantity++))
        let kanap = JSON.stringify(cart);
        localStorage.setItem('Produit', kanap);
    }







        //console.log(localPanier);
        /*if(findArticle !== undefined){
            findArticle.nombre = parseInt(findArticle.nombre) + parseInt(combien.value)
            console.log(findArticle.nombre)}
        }*/


});
       /* let findArticle = localPanier.find(p => p.id_color == articles.id_color);
        console.log(localPanier);
        if(findArticle !== undefined){
            findArticle.nombre = parseInt(findArticle.nombre) + parseInt(combien.value)
            console.log(findArticle.nombre);*/
        
    



    //SI PLUS DE 100 ARTICLES IDENTIQUES AU PANIER 
    //SI ARTICLE DEJA PRESENT TROUVE L'ARTICLE ET AJOUTE LA QUANTITE  

/*lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà
présent dans le panier, on ajoute un nouvel élément dans l’array.
● Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent
dans le panier (même id + même couleur), on incrémente
simplement la quantité du produit correspondant dans l’array*/

