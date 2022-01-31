//https://developer.mozilla.org/fr/docs/Web/API/URL/searchParams
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);
/* j'ai utilisé La propriété searchParams pour retourner l' id de mes images sur le console de ma page produits */
