class Producto {
	constructor(id, nombre, precio, img, cantidad) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.img = img;
		this.cantidad = cantidad;
	}
}

const productos = [
	(meatBurger = new Producto(
		1,
		`Mike Burger`,
		1300,
		"img/meat-burger.jpg",
		1
	)),
	(chickenBurger = new Producto(
		2,
		`Chicken Burger`,
		1200,
		"img/chicken-burger.jpg",
		1
	)),
	(veggieBurger = new Producto(
		3,
		`Veggie Burger`,
		1000,
		"img/veggie-burger.jpg",
		1
	)),
	(papasFritas = new Producto(
		4,
		`Papas Fritas`,
		600,
		"img/french-fries.jpg",
		1
	)),
];

let CARRITO = [];

function displayCards() {
	let cardsProductos = document.getElementById("cards");
	productos.forEach((productosMenu) => {
		cardsProductos.innerHTML += `
        <div class="card" style="width: 15rem; margin: 5px 15px 5px 15px;">
            <img src="${productosMenu.img}" class="card-img-top" alt="Foto producto.">
        <div class="card-body ">
        <p class="card-text"> <strong> ${productosMenu.nombre} <br> $${productosMenu.precio} </strong> </p>
        <div class="d-grid gap-2">
            <button onclick= "guardarEnCarrito(${productosMenu.id}); mostrarToast()" class="btn btn-warning buy"> Añadir al carrito </button>
        </div>
        </div>
        </div>
        `;
	});
}

displayCards();

function guardarEnCarrito(productoId) {
	let item = productos.find(
		(productos) => productos.id === productoId
	);

	carritoTotal();
	CARRITO.push(item);
	renderCarrito();

	addLocalStorage();
}

const CONTENEDOR_CARRITO =
	document.getElementById("contenedor");

function renderCarrito() {
	CONTENEDOR_CARRITO.innerHTML = "";
	CARRITO.forEach((item) => {
		let div = document.createElement("div");
		div.innerHTML = `
        <br>
        <div class="card" style="width: 10rem; margin: 5px 15px 5px 15px;">
        <img src="${item.img}" class="card-img-top imgCarrito" alt="Foto producto.">
        <div class="card-body ">
        <div style= "margin: 5px">
        <h3 id="nombreCarrito"> ${item.nombre} </h3>
        <input type="number" min="1" value=${item.cantidad} class="inputCarrito input__elemento" >
        <p id="precioCarrito"> Precio: $${item.precio} </p>
        <div class="d-grid gap-2">
        <button onclick= "eliminarItem(${item.id})" class="btn btn-danger btn-sm"  
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; 
        --bs-btn-font-size: .75rem;"> 
        Quitar del carrito 
        </button>
        </div>
        </div>
        `;
		CONTENEDOR_CARRITO.append(div);
	});
	carritoTotal();
}

function eliminarItem(id) {
	let borrar = CARRITO.find(
		(productos) => productos.id === id
	);
	let indice = CARRITO.indexOf(borrar);
	CARRITO.splice(indice, 1);
	renderCarrito();
	carritoTotal();
	addLocalStorage();
	preguntarEliminarCarrito();
}

function preguntarEliminarCarrito() {
	Swal.fire({
		title: "¿Deseas eliminar el producto del carrito?",
		icon: "question",
		showCancelButton: true,
		confirmButtonColor: "#ffc107",
		cancelButtonColor: "#d33",
		confirmButtonText: "Eliminar",
	}).then((result) => {
		if (result.isConfirmed) {
			Toastify({
				text: "Producto eliminado del carrito.",
				duration: 2000,
				close: true,
				gravity: "bottom",
				position: "right",
				style: {
					background: "#ffc107",
				},
			}).showToast();
		}
	});
}

function mostrarToast() {
	Toastify({
		text: "¡Producto agregado al carrito!",
		duration: 1000,
		newWindow: false,
		close: true,
		gravity: "bottom",
		position: "right",
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
			background:
				"linear-gradient(to right, #d2001a, #FFDE00)",
		},
		onClick: function () {}, // Callback after click
	}).showToast();
}

function carritoTotal() {
	let Total = 0;
	const itemCartTotal = document.querySelector(
		".itemCartTotal"
	);
	CARRITO.forEach((item) => {
		const precio = Number(item.precio);
		Total = Total + precio;
	});

	itemCartTotal.innerHTML = `Total: $${Total}`;
	addLocalStorage();
}

function addLocalStorage() {
	localStorage.setItem("carrito", JSON.stringify(CARRITO));
}

window.onload = function () {
	const storage = JSON.parse(
		localStorage.getItem("carrito")
	);
	if (storage) {
		CARRITO = storage;
		renderCarrito();
	}
};

// function consultarProductosServidor() {
//     fetch('https://634deaf2f34e1ed8268057be.mockapi.io/productos')
//     .then((response) => response.json())
//     .then((data) => {
//         productos = [...data]
//     })
//     .catch((error) => console.log(error))
// }

//! Por las dudas

// const DIV_PRECIO = document.querySelector("#precioTotal");

// function calcularTotal() {
// 	let contador = 0;
// 	CARRITO.forEach((item) => {
// 		contador += item.precio * item.cantidad;
// 	});

// 	DIV_PRECIO.innerHTML = `<p style="font-size: 18px; font-weight: bold";> Monto total: $${contador} </p>`;
// 	addLocalStorage();
// 	return contador;
// }

// function actualizarProductosStorage() {
// 	let productosJSON = JSON.stringify(CARRITO);
// 	localStorage.setItem("productos", productosJSON);
// }

//* SUMAR CANTIDAD

// const inputElemento =
// 	CONTENEDOR_CARRITO.getElementsByClassName(
// 		"input__elemento"
// 	);

// for (let i = 0; i < CARRITO.length; i++) {
// 	if (CARRITO[i].nombre.trim() === item.nombre.trim())
// 		CARRITO[i].cantidad++;
// 	const inputValue = inputElemento[i];
// 	inputValue.value++;
// 	calcularTotal();
// 	return null;
// }
