// 🧩 Palabras organizadas por secciones
const secciones = [
  { id: 1, palabra: "javascript", pista: "Lenguaje de programación muy popular en la web." },
  { id: 2, palabra: "ahorcado", pista: "Juego clásico de adivinar palabras." },
  { id: 3, palabra: "programar", pista: "Acción de escribir código." },
  { id: 4, palabra: "computadora", pista: "Máquina con la que trabajas o estudias." },
  { id: 5, palabra: "gato", pista: "Animal que maúlla." },
  { id: 6, palabra: "perro", pista: "Animal que ladra." },
  { id: 7, palabra: "internet", pista: "Red mundial de computadoras." },
  { id: 8, palabra: "teclado", pista: "Dispositivo con letras para escribir." },
  { id: 9, palabra: "monitor", pista: "Pantalla que muestra la salida del ordenador." },
  { id: 10, palabra: "raton", pista: "Dispositivo que se usa para mover el cursor." },
  { id: 11, palabra: "pantalla", pista: "Parte visual de una computadora." },
  { id: 12, palabra: "codigo", pista: "Conjunto de instrucciones en un programa." },
  { id: 13, palabra: "variable", pista: "Espacio en memoria para almacenar datos." },
  { id: 14, palabra: "funcion", pista: "Bloque de código que realiza una tarea." },
  { id: 15, palabra: "objeto", pista: "Entidad con propiedades y métodos." },
  { id: 16, palabra: "navegador", pista: "Programa usado para navegar en internet." },
  { id: 17, palabra: "servidor", pista: "Computadora que aloja sitios web." },
  { id: 18, palabra: "algoritmo", pista: "Conjunto de pasos para resolver un problema." },
  { id: 19, palabra: "desarrollo", pista: "Proceso de crear software." },
  { id: 20, palabra: "web", pista: "Parte de internet accesible mediante navegadores." },
  { id: 21, palabra: "html", pista: "Lenguaje de marcado usado para estructurar páginas web." },
  { id: 22, palabra: "css", pista: "Lenguaje para dar estilo a las páginas web." },
  { id: 23, palabra: "python", pista: "Lenguaje de programación versátil y legible." },
  { id: 24, palabra: "inteligencia", pista: "Capacidad de las máquinas para aprender y razonar." },
  { id: 25, palabra: "artificial", pista: "Campo que combina programación y aprendizaje automático." }
];

// ⚙️ Variables de control
let palabraSecreta = "";
let palabraAdivinada = [];
let errores = 0;
const maxErrores = 6;
let palabraActual = 0; // Índice actual (por defecto, palabra 1)

// 🎨 Elementos del DOM
const palabraElemento = document.getElementById("word");
const mensajeElemento = document.getElementById("message");
const tecladoElemento = document.getElementById("keyboard");
const botonReset = document.getElementById("reset");
const canvas = document.getElementById("hangman");
const pistaElemento = document.getElementById("hint");
const ctx = canvas.getContext("2d");

// 🎮 Inicializa el juego
function iniciarJuego(seccion = null) {
  let palabraInfo;

  if (seccion) {
    palabraInfo = seccion;
  } else {
    palabraInfo = secciones[palabraActual]; // Usa la palabra actual
  }

  palabraSecreta = palabraInfo.palabra.toUpperCase();
  const pista = palabraInfo.pista;

  palabraAdivinada = Array(palabraSecreta.length).fill("_");
  errores = 0;

  mensajeElemento.textContent = "";
  pistaElemento.textContent = `💡 ${pista}`;
  actualizarPalabra();
  dibujarAhorcado();
  generarTeclado();

  // 💾 Guarda la palabra actual en localStorage
  localStorage.setItem("palabraActual", palabraActual);
}

// 📝 Actualiza la palabra mostrada
function actualizarPalabra() {
  palabraElemento.textContent = palabraAdivinada.join(" ");
}

// ⌨️ Genera el teclado virtual
function generarTeclado() {
  tecladoElemento.innerHTML = "";
  const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  letras.split("").forEach(letra => {
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.addEventListener("click", () => manejarIntento(letra, boton));
    tecladoElemento.appendChild(boton);
  });
}

// 🧠 Lógica de intento de letra
function manejarIntento(letra, boton) {
  boton.disabled = true;

  if (palabraSecreta.includes(letra)) {
    palabraSecreta.split("").forEach((l, i) => {
      if (l === letra) palabraAdivinada[i] = letra;
    });
    actualizarPalabra();

    if (!palabraAdivinada.includes("_")) {
      mensajeElemento.textContent = "🎉 ¡Ganaste!";
      desactivarTeclado();
    }
  } else {
    errores++;
    dibujarAhorcado();
    if (errores >= maxErrores) {
      mensajeElemento.textContent = `💀 Perdiste. La palabra era: ${palabraSecreta}`;
      desactivarTeclado();
    }
  }
}

// 🚫 Desactiva todas las letras
function desactivarTeclado() {
  document.querySelectorAll("#keyboard button").forEach(btn => btn.disabled = true);
}

// 🧍‍♂️ Dibuja el ahorcado con expresiones y detalles
function dibujarAhorcado() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 3;

  // 🎨 Soporte de madera
  let gradienteMadera = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradienteMadera.addColorStop(0, "#8b5a2b");
  gradienteMadera.addColorStop(1, "#deb887");
  ctx.strokeStyle = gradienteMadera;

  // 🪵 Base y poste
  ctx.beginPath();
  ctx.moveTo(10, 190);
  ctx.lineTo(150, 190);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(40, 190);
  ctx.lineTo(40, 20);
  ctx.lineTo(120, 20);
  ctx.lineTo(120, 40);
  ctx.stroke();

  // 🧵 Cuerda
  ctx.strokeStyle = "#d4a373";
  ctx.beginPath();
  ctx.moveTo(120, 40);
  ctx.lineTo(120, 55);
  ctx.stroke();

  // 🧍 Muñeco azul
  ctx.strokeStyle = "#1a73e8";

  if (errores > 0) { ctx.beginPath(); ctx.arc(120, 70, 15, 0, Math.PI * 2); ctx.stroke(); }
  if (errores > 1) { ctx.beginPath(); ctx.moveTo(120, 85); ctx.lineTo(120, 135); ctx.stroke(); }
  if (errores > 2) { ctx.beginPath(); ctx.moveTo(120, 95); ctx.lineTo(100, 115); ctx.stroke(); }
  if (errores > 3) { ctx.beginPath(); ctx.moveTo(120, 95); ctx.lineTo(140, 115); ctx.stroke(); }
  if (errores > 4) { ctx.beginPath(); ctx.moveTo(120, 135); ctx.lineTo(100, 165); ctx.stroke(); }
  if (errores > 5) { ctx.beginPath(); ctx.moveTo(120, 135); ctx.lineTo(140, 165); ctx.stroke(); }

  // 😐😟💀 Caras según errores
  if (errores > 0) {
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    if (errores <= 2) ctx.fillText("😐", 120, 75);
    else if (errores <= 4) ctx.fillText("😟", 120, 75);
    else if (errores >= 6) ctx.fillText("💀", 120, 75);
  }

  // ⚰️ Efecto final
  if (errores >= 6) {
    ctx.strokeStyle = "#3e3e3e";
    ctx.beginPath();
    ctx.moveTo(10, 190);
    ctx.lineTo(150, 190);
    ctx.stroke();
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(90, 170, 60, 10);
  }
}

// 🧭 Genera la barra lateral sin mostrar las palabras
function generarBarraLateral() {
  const lista = document.getElementById("word-list");
  lista.innerHTML = "";

  secciones.forEach((seccion, index) => {
    const item = document.createElement("li");
    item.textContent = `Palabra ${index + 1}`;
    item.title = seccion.pista;

    // ✅ Marca visualmente la palabra activa
    item.classList.toggle("active", index === palabraActual);

    item.addEventListener("click", () => {
      palabraActual = index;
      iniciarJuego(seccion);
      generarBarraLateral();
    });

    lista.appendChild(item);
  });
}

// 🔁 Reinicia el juego
botonReset.addEventListener("click", () => {
  iniciarJuego(secciones[palabraActual]);
});

// 🚀 Inicia al cargar
window.addEventListener("load", () => {
  // 📦 Recupera el índice guardado o usa 0 si no existe
  const guardado = localStorage.getItem("palabraActual");
  palabraActual = guardado ? parseInt(guardado, 10) : 0;

  generarBarraLateral();
  iniciarJuego(secciones[palabraActual]);
});

