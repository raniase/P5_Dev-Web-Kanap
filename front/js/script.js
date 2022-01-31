//je selectionne mon element items grace a son selecteur
const container = document.querySelector("#items");

console.log(container)
//j'appele l'url de mon api grace a la requette http fetch
fetch("http://localhost:3000/api/products")
// j'apple la fonction then pour récupérer le résultat de la requête au format json
// en ayant vérifié au préalable que la requête s’était bien passée avec res.ok
  .then(function(allKanap) {
    if (allKanap.ok) {
      return allKanap.json();
    }
  })
  //je stoke mon resulat dans une const
  .then(function(value) {
    const allKanap = value;
    //je creé une boucle on apliquant la methode de concatination a chaque passage 
    for (let i = 0; i < allKanap.length; i++) {
      container.innerHTML +=
      //j'ajouté le contenue de mes vignettes dans mon html(#items)
        `<a href="./product.html?id=${allKanap[i]._id}"> 
            <article>
                <img src=${allKanap[i].imageUrl} alt=${allKanap[i].altTxt}>
                    <h3 class="productName">${allKanap[i].name}</h3>
                    <p class="productDescription">${allKanap[i].description}</p>
             </article>
          </a>`
    }
    
  })
  //en cas d'erreur je cree une alerte
  .catch(function(err) {
    console.log('Une erreur est survenue')
    alert("Veuillez nous excusez les produits ne sont pas disponible pour le moment.")
  });