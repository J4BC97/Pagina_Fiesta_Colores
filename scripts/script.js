// Crear variables con referencia a elementos ID del archivo html

const titulo = document.getElementById("titulo"); // Hace referencia al titulo que vamos a cambiar el color
const botonContenedor = document.getElementById("btnContenedor"); //El contenedor donde se generaran los botones nuevos
const generarBoton = document.getElementById("genBoton"); //El boton que genera los botones nuevos
const borrarBotones =document.getElementById("ersBoton"); //El boton para borrar los nuevos generados

//Array para definir una lista de colores

const coloresDisponibles = [ "red", "green", "black", "white", "yellow", "blue", "pink", "purple", "orange", "grey" ];
let coloresUsados = [];

// Varias para limitar la cantidad de botones

const limiteBotones = coloresDisponibles.length;

// 

const sonidoBoton = new Audio('./sounds/effectsound.mp3')

// Una funcion para generar un color unico

function obtenerColorUnico() {
    //Si ya no hay colores disponibles, retorna null
    if (coloresDisponibles.length === 0) return null;
    //Seleccionar un color aleatorio de los disponibles
    const indiceAleatorio = Math.floor(Math.random() * coloresDisponibles.length);
    const color = coloresDisponibles[indiceAleatorio];

    //Remover el color de la lista de disponibles y agregarlo a la lista de usados
    coloresDisponibles.splice(indiceAleatorio, 1);
    coloresUsados.push(color);

    return color
}

// Funcion para crear un nuevo boton

function crearBoton() {
    //Comprobar si ya se alcanzo el limite de botones
    if (coloresUsados.length >= limiteBotones) {
        alert("Se alcanzo el limite de botones que puedes generar");
        return;
    }

    const color = obtenerColorUnico(); // Obtener un color unico
    if (!color) return; //Si no ha mas colores, no hacer nada

    const nuevoBoton = document.createElement("button");
    //nuevoBoton.textContent = `Boton ${color}`;
    nuevoBoton.classList.add("boton-estilo");
    nuevoBoton.style.backgroundColor = color;

    // Para cambiar el color del titulo al hacer clic en los botones generados
    nuevoBoton.addEventListener("click", () => {
        titulo.style.color = color;
        sonidoBoton.currentTime = 0;
        sonidoBoton.play();
    });

    botonContenedor.appendChild(nuevoBoton);
}

// Funcion para borrar todos los botones generados

function borrarBotonesGenerados() {
    botonContenedor.innerHTML = ""; //Limpia el contenedor
    coloresDisponibles.push(...coloresUsados); //Devuelve los colores a la lista disponible
    coloresUsados = []; //Limpia la lista de colores usados
}

generarBoton.addEventListener("click", crearBoton);
borrarBotones.addEventListener("click", borrarBotonesGenerados);