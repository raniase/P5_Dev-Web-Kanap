//https://developer.mozilla.org/fr/docs/Web/API/URL/searchParams
/* utiliser La propriété searchParams pour retourner l' id de l'article cliqué sur le console de ma page produits */
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id)
/* recupérer les champs du produit a repmlir dans mon  html selon les attributs suivants :
colors/price/name/imageUrl/description/altTxt */
const colors = document.querySelector('#colors');
const imgAtribute = document.querySelector('.item__img');
const productTitle = document.querySelector('#title');
const price = document.querySelector('#price');
const descript = document.querySelector('#description');
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

