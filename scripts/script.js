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

// Variable que define la ruta del archivo de sonido

const sonidoBoton = new Audio('./sounds/effectsound.mp3')

// Generar un temporizador de reinicio de botones

const tiempoInactivo = 20000;
let temporizadorInactivo = null;

// Variable para definir una funcion de restablecimiento de color del titulo

const tituloColorOriginal = titulo.style.color || "black";

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
        reiniciarTemporizador(); //Para reiniciar el temporizador
    });

    botonContenedor.appendChild(nuevoBoton);
    reiniciarTemporizador(); //Para reiniciar el temporizador cuando se cree el boton
}

// Funcion para borrar todos los botones generados

function borrarBotonesGenerados() {
    botonContenedor.innerHTML = ""; //Limpia el contenedor
    coloresDisponibles.push(...coloresUsados); //Devuelve los colores a la lista disponible
    coloresUsados = []; //Limpia la lista de colores usados
    titulo.style.color = tituloColorOriginal; // Restaura el color original del titulo al presionar el boton Remover botones
    
    // Desactivar el temporizador hasta que se vuelvan a generar nuevos botones
    if (temporizadorInactivo) {
        clearTimeout(temporizadorInactivo);
        temporizadorInactivo = null;
    }
}

function reiniciarTemporizador() {
    // Limpia el temporizador anterior, si existe
    if (temporizadorInactivo) {
        clearTimeout(temporizadorInactivo);
    }

    // Para configurar un temporizador
    temporizadorInactivo = setTimeout(() => {
        borrarBotonesGenerados(); // Borra los botones y restaura el color original
        alert("Se removieron los botones y se restablecio el color del titulo")
    }, tiempoInactivo);
}

generarBoton.addEventListener("click", crearBoton);
borrarBotones.addEventListener("click", borrarBotonesGenerados);