// cxn.js (Archivo de módulo para Firebase y formulario)

// Importar módulos necesarios de Firebase v12.3.0
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAFh-1OJxv715gulOfORAU_M4inEyq3YDg",
  authDomain: "form-portafolio-3611b.firebaseapp.com",
  projectId: "form-portafolio-3611b",
  storageBucket: "form-portafolio-3611b.firebasestorage.app",
  messagingSenderId: "153457906731",
  appId: "1:153457906731:web:71f85dfcc279c6acb4c66e",
  measurementId: "G-XQ254HEX4E"
};

// Inicializar Firebase y Analytics
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firestore (para guardar datos del formulario)
const db = getFirestore(app);

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Línea añadida por tu profesor: Obtener el formulario
  const form = document.getElementById("contacto-form");

  // Verificar si el formulario existe (solo en páginas con formulario, como Contacto.html)
  if (!form) {
    console.log("Formulario no encontrado - este script solo funciona en Contacto.html");
    return;
  }

  // Event listener para el envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenir envío por defecto

    // Obtener valores de los campos (con trim para eliminar espacios)
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const fecha = new Date();

    // Validación básica (campos requeridos no vacíos)
    if (!nombre || !email || !mensaje) {
      alert("Por favor, completa los campos obligatorios: Nombre, Email y Mensaje.");
      return; // Detener el envío
    }

    // Validación simple de emaiL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un email válido.");
      return;
    }

    try {
      // Enviar datos a Firestore (colección "Clientes")
      await addDoc(collection(db, "Clientes"), {
        nombre: nombre,
        email: email,
        asunto: asunto || "Sin asunto", // Si asunto está vacío, poner default
        mensaje: mensaje,
        fecha: fecha
      });

      console.log("Datos enviados exitosamente a Firestore");
      alert("¡Mensaje enviado correctamente! Te responderé pronto.");
      form.reset(); // Limpiar el formulario
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Hubo un error al enviar el mensaje. Verifica tu conexión e intenta de nuevo.");
    }
  });
});