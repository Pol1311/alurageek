async function listaProductos() {
    const conexion= await fetch("https://alurageek-ten.vercel.app/productos");
    
    try{
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    }
    catch{
        alert("Error en la conexion");
    }
};


async function nuevoProducto(nombre,precio,imagen,id){
    const conexion = await fetch("https://alurageek-ten.vercel.app/productos", {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({
            nombre:nombre,
            precio:precio,
            imagen:imagen,
            id:id
        })
    });

    try{
        const conexionConvertida = conexion.json()
        return conexionConvertida;
    }
    catch{       
        alert("Error en la conexion");
    }
};


async function eliminarTarjeta(id)  {
    const conexion = await fetch(`https://alurageek-ten.vercel.app/productos/${id}`, 
        {method: "DELETE",
        headers: {"Content-type":"application/json"}
    });
    try{
        const conexionConvertida = conexion.json();
        return conexionConvertida;
    }
    catch{
        alert("Error en la conexion");
    }
};
 

export const conexionAPI = {
    listaProductos, nuevoProducto, eliminarTarjeta
};
