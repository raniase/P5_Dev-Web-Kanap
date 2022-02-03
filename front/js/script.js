//selectionner mon element items grace à son selecteur
const container = document.querySelector("#items");

console.log(container)
//appeler l'url de mon api en utilisant la requette http fetch
fetch("http://localhost:3000/api/products")
// appler la fonction then pour récupérer le résultat de la requête au format json
// en ayant vérifié au préalable que la requête s’était bien passée avec res.ok
  .then(function(allKanap) {
    if (allKanap.ok) {
      return allKanap.json();
    }
  })
  //stocker la valeur récuperer dans une const
  .then(function(value) {
    const allKanap = value;
    //créer une boucle on appliquant la methode de concatination a chaque passage 
    for (let i = 0; i < allKanap.length; i++) {
      container.innerHTML +=
      //ajoutr le contenue de mes vignettes dans mon html(#items)
        `<a href="./product.html?id=${allKanap[i]._id}"> 
            <article>
                <img src=${allKanap[i].imageUrl} alt=${allKanap[i].altTxt}>
                    <h3 class="productName">${allKanap[i].name}</h3>
                    <p class="productDescription">${allKanap[i].description}</p>
             </article>
          </a>`
    }
    
  })
  //en cas d'erreur afficher un msg d'erreur dans mon console +créer une alerte (pour l'utilisateur)
  .catch(function(err) {
    console.log('Une erreur est survenue')
    alert("Veuillez nous excusez les produits ne sont pas disponible pour le moment.")
  });
 
 