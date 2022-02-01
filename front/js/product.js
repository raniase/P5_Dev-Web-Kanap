//https://developer.mozilla.org/fr/docs/Web/API/URL/searchParams
let params = new URL(document.location).searchParams;
let id = params.get("id");

const colors = document.querySelector('#colors');
const combien = document.querySelector('#quantity');
const imgAtribute = document.querySelector('.item__img');
const productTitle = document.querySelector('#title');
const price = document.querySelector('#price');
const descript = document.querySelector('#description');
const addToCart = document.getElementById("addToCart");
const nbProductPanier = document.querySelector('nav ul')

console.log(imgAtribute)
fetch("http://localhost:3000/api/products/"+id)
.then(function(result){
    if (result.ok) {
      return result.json();
    }
})
.then(function(product) {
    imgAtribute.innerHTML+=
    `<img src=${product.imageUrl} alt="${product.altTxt}">`
    productTitle.innerHTML = `${product.name}`;
    price.innerHTML = `${product.price}`;
    descript.innerHTML = `${product.description}`;
    colors.innerHTML += makeColors(product.colors);
})
.catch(function (err){
    //console.log("Fetch Erreur");
   //alert("Veuillez nous excusez les produits ne sont pas disponible pour le moment.")
}); 
console.log("apres:", imgAtribute);

/* j'ai utilisé La propriété searchParams pour retourner l' id de l'article cliqué sur le console de ma page produits */

/* recupérer les champs du produit a repmlir dans mon  html selon les attributs suivants :
colors 
name 
price 
imageUrl
description
altTxt */


/*utiliser la methode then qui contient {set atribute + .innerhtml} pour ajouter le contenue de chaque article kanapé*/
/*catch erreur (retour d'un msg sur mon console : produit indisponible +
    creé une aletre pour le client:"Veuillez nous excusez les produits ne sont pas disponible pour le moment." )*/
   
   // MODIFICATION DES ELEMENTS
   