//Declarar variables y constantes
let cart = 0;
let shoppingList = {};

//DIBUJAR LA TARJETA DE CADA PLANTA
function paintPlants() {
  //contenedor de conjunto de plantas
  $divContainerGrid = document.createElement("div");
  $divContainerGrid.classList.add("grid");
  for (let plant of plants) {
    //contenedor de cada planta
    let $divPill = document.createElement("div");
    $divPill.classList.add("divPill");
    //dataset
    $divPill.dataset.id=plant.id;
    $divPill.dataset.name=plant.name;
    $divPill.dataset.price=plant.price;
    $divPill.dataset.stock=plant.stock;
    //Imagen
    let $img = document.createElement("img");
    $img.classList.add("img");
    $img.src = plant.img;
    $img.alt = plant.name;
    $img.textContent = plant.img;
    //Div donde se encuentra toda la información de la planta
    let $divInfo = document.createElement("div");
    $divInfo.classList.add("divInfo");
    //titulo
    let $h3 = document.createElement("h3");
    $h3.classList.add("title");
    $h3.textContent = plant.name;
    //Descripción
    let $description = document.createElement("p");
    $description.classList.add("description");
    $description.textContent = plant.description;
    //Precio
    let $price = document.createElement("p");
    $price.classList.add("price");
    $price.textContent = "Precio: €" + plant.price;
    //dv button
    let $divBtn = document.createElement("div");
    $divBtn.classList.add("divBtn");
    //Boton para agregar el primer producto
    let $btn = document.createElement("button");
    $btn.classList.add("btn");
    $btn.classList.add("btnList");
    $btn.textContent = "Agregar al carrito";
    $btn.setAttribute("data-id", plant.id);
   //evento para subir articulo
    $btn.addEventListener("click", addItemToCart);
  //cuando se añade un artículo al carrito se abre el carrito
    $btn.addEventListener("click", toggleShoppingList);
    //Insertaamos todo*/
    $divContainerGrid.appendChild($divPill);
    $divPill.appendChild($img);
    $divPill.appendChild($divInfo);
    $divInfo.appendChild($h3);
    $divInfo.appendChild($description);
    $divInfo.appendChild($price);
    $divInfo.appendChild($divBtn);
    $divBtn.appendChild($btn);
    
  }

  document.body.appendChild($divContainerGrid);
}
//FUNCIÓN AÑADIR A CARRITO
/*Crear una función que añade los productos al carrito*/
/* se crea un objeto donde se mete, el objeto clickado*/

function addItemToCart(evento) {
  //event target, hace refenecia al evento clickado y
  // con gettattribute obtienes el id asignado a ese boton del container
  cart = evento.target.getAttribute("data-id");
  //en La carlist se guarda el objeto que contiene ese id que ha sido buscado en el array inicial
  cartList = plants.find((plant) => plant.id == cart);
  console.log(cartList);
  let id = cartList.id;
  let name = cartList.name;
  let price = cartList.price;
  let stock = cartList.stock;
  // se carga el primer producto al carrito si no esta el Id dentro
  if (!shoppingList.hasOwnProperty(id)){
  shoppingList[id] = {
    id: parseInt(id), //parseInt para quitar el String
    name: name,
    price: parseInt(price),
    count: 1,
    stock: parseInt(stock),
  };}
  //si esta el id en el objeto sale el mensaje de que se aumente la cantidad de producto desde el carrito
  else {
    alert ("Aumenta la cantidad del producto desde el carrito");
  }
   uppdateCart();
}
//FUNCIÓN ACTUALIZAR CARRITO
//Se actualiza el carrito, hay una tabla creada y segun el evento 
//se recogen los datos
function uppdateCart() {
  let $shoppingListBody = document.querySelector("#list tbody");
  $shoppingListBody.innerHTML = "";
  let totalPrice = 0;
  let $tr1 = document.createElement("tr");
    $tr1.innerHTML = `
      <th>Item</th>
      <th>Precio</th>
      <th>Cantidad</th>
      <th>Total</th>
      <th>+/- </th>`
  $shoppingListBody.appendChild($tr1);
  //para recorrer el objeto se usa el for in
  for (let itemId in shoppingList) {
    //accede al carrito de la compra a al ID de itemID
    let item = shoppingList[itemId];
    let $tr = document.createElement("tr");
    $tr.dataset.id = item.id;
    $tr.dataset.price = item.count * item.price;
    $tr.dataset.count = item.count;
    //dentro del tr se recogen los td con los datos
      $tr.innerHTML = `<td>${item.name}</td>
      <td>${item.price}€</td>
      <td>${item.count}</td>
      <td>${item.count * item.price}€</td>
      <td>
      <button class="btnAddCart fa-solid fa-plus"></button>
      <button class="btnRemoveCart fa-solid fa-minus"></button>
      <button class="deleteCart "> Eliminar </button>
      </td>`;
    //Se añaden botones para añadir, quitar y eliminar productos
    let $addBtn = $tr.querySelector(".btnAddCart");
    let $removeBtn = $tr.querySelector(".btnRemoveCart");
    let $deleteBtn = $tr.querySelector(".deleteCart");
    //LLAMADA DE EVENTOS
    //Boton de dentro del carrito para añadir más productos
    $addBtn.addEventListener("click", addItemToList);
    //Boton de dentro del carrito  para eliminar productos
    $removeBtn.addEventListener("click", removeItemFromList);
    //Boton para eliminar toda la cantidad de un producto del carrito
    $deleteBtn.addEventListener("click", deleteItemFromList);
    $shoppingListBody.appendChild($tr);
    //cálculo de precio total cada vez que se añade producto nuevo, se le suma a lo anterior
    totalPrice += item.count * item.price;
  }
  let $totalPrice = document.querySelector("#total");
  $totalPrice.textContent = totalPrice;
  }
paintPlants();


//FUNCIÓN DE LOS TRES BOTONES SUMAR, RESTAR Y AÑADIR PRODUCTO
//FUNCIÓN DE SUMA DE PRODUCTOS
function addItemToList() {
  //en row se recoge la información del tr más cercano al evento
  let $row = this.closest("tr");
  //se recoge el id de ese tr
  let itemId = parseInt($row.dataset.id);
  //MIARAR SI HAY STOCK O NO
  //Se compara en el objeto shopping en la posición id el contador de antes +1 nuevo
  //con el stock del mismo objeto
  if (shoppingList[itemId].count + 1 > shoppingList[itemId].stock) {
    alert("No hay stock");
    return;
  } else {
    shoppingList[itemId].count += 1;
  }
  uppdateCart();
}
//FUNCIÓN QUITAR PRODUCTOS
function removeItemFromList() {
  let $row = this.closest("tr");
  let itemId = parseInt($row.dataset.id);
  //Se quita un producto, si es menor o igual que cero, se elimina el producto
  shoppingList[itemId].count += -1;
  if (shoppingList[itemId].count <= 0) {
    delete shoppingList[itemId];
  }
  uppdateCart();
 }
//FUNCIÓN BORRAR ELEMENTOS
//Borra todos los elementos del tr 
function deleteItemFromList() {
  let $row = this.closest("tr");
  let itemId = parseInt($row.dataset.id);
  delete shoppingList[itemId];
uppdateCart();
}
//FUNCIÓN COMPRAR
function order() {
  //Si la longitud del array, ya que object key lo convierte en array es cero el carrito est vacio
  if (Object.keys(shoppingList).length === 0) {
    alert("El carrito esta vacío");
  } else {
    alert("Compra realizada");
    shoppingList={};
    cart=0;
    uppdateCart();
    }
}
function deleShoppingList(){
  
}


/*con esta funcion se le asigna la clase hidden o se le quita en caso de que la tenga,
lo cual hace que salga y se oculte la pantalla del carrito*/
function toggleShoppingList() {
  let $shoppingListContainer = document.querySelector("#shoppingListContainer");
  if (!$shoppingListContainer.classList.contains("hidden")) {
    $shoppingListContainer.classList.add("hidden");
  } else {
    $shoppingListContainer.classList.remove("hidden");
  }
}
//LAMADAS DE EVENTOS
//Se oculta y desoculta el carrito si le das al icono
let $toggleShoppingListButton = document.querySelector("#toggleShoppingListButton ");
$toggleShoppingListButton.addEventListener("click", toggleShoppingList);
//Se desoculta el producto si se le da al boton agregar producto
let $toggleListButton = document.querySelector(".btnList ");
$toggleListButton.addEventListener("click", toggleShoppingList);
//se vuelve al menu inicial ocultando el carrito
let $returnToProduct = document.querySelector("#returnToProduct");
$returnToProduct.addEventListener("click", toggleShoppingList);
//Cuando se hace click en el boton de compra, se ejecuta la compra
let $order = document.querySelector("#order");
$order.addEventListener("click", order);

