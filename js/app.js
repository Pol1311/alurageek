import { conexionAPI } from "./conexionAPI.js";

const tarjeta = document.querySelector("[data-tarjeta]");
const botonFormulario = document.querySelector("[data-formulario]");
const botonLimpiar = document.querySelector("[data-limpiarformulario]");

//Creando el contenedor productos
function crearTarjeta(nombre,precio,imagen,id){
    const productos = document.createElement("div");
    productos.className = "carta";
    productos.innerHTML = `
      <img class="imagen-producto" src=${imagen} alt=${nombre}/>
      <div class="card-container--info">
        <p>${nombre}</p>
        <div class="card-container--value">
          <p>$ ${precio}</p>
          <button class="eliminar" data-eliminar=${id}><img src="/img/basura.png" alt="icono borrar" class="borrar"/></button>
        </div>
      </div>
    `;

//Boton eliminar producto 
    const botonEliminar = productos.querySelector(".eliminar");
    botonEliminar.addEventListener("click", async () => {
      try {
        await conexionAPI.eliminarTarjeta(id);
        productos.remove();
      }
      catch(error){
        console.log(error);
      }
    });

    tarjeta.appendChild(productos);
    return productos;                    
};

//Crea un contenedor para cada productos de la base de datos 
async function listaProductos() {
    const listaAPI = await conexionAPI.listaProductos();
    listaAPI.forEach(producto => tarjeta.appendChild(crearTarjeta(producto.nombre, producto.precio, producto.imagen, producto.id)) );
};
listaProductos();


//Agrega nuevos productos en la base de datos
async function crearNuevaTarjeta(e) {
    e.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;
    const id = Math.floor((Math.random()*100)+1).toString();
    await conexionAPI.nuevoProducto(nombre,precio,imagen,id);
} 

//Boton agregar nuevo producto
botonFormulario.addEventListener("submit", (e) => crearNuevaTarjeta(e));

//Boton limpiar botonFormulario
botonLimpiar.addEventListener("click", (e) => {
    e.preventDefault();
    botonFormulario.reset();
    console.log("limpiar");
}); 

