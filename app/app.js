//Variables
const btnEnviar = document.querySelector("#btnEnviar");
const btnReset = document.querySelector("#reset");
const tituloFormulario = document.querySelector("#tituloFormulario");
const alerta = document.querySelector("#alerta");
const formulario = document.querySelector("#form");

let mailOk = false;
let subjetOk = false;
let messageOk = false;

//Variables para campos
const mail = document.querySelector("#mail");
const subjet = document.querySelector("#subjet");
const message = document.querySelector("#message");

const mensajeError = document.createElement("p");

eventListener();
function eventListener() {
  // Cuando la app arranca
  document.querySelector("DOMContentLoaded", iniciarApp);

  //Campos del formulario
  mail.addEventListener("blur", validarFormulario);
  subjet.addEventListener("blur", validarFormulario);
  message.addEventListener("blur", validarFormulario);
  // Enviar email
  formulario.addEventListener("submit", enviarEmail);
}

//Funciones

function iniciarApp() {
  btnEnviar.addEventListener("click", function (e) {
    e.preventDefault();
  });
}

// Valida el formulario

function validarFormulario(e) {
  btnEnviar.classList.add("disabled");
  if (e.target.value.length > 0) {
    e.target.style.borderBottom = "solid green";
    mensajeError.remove();
    messageOk = true;
  } else {
    mostrarError("El mensaje no puede ser vacío.");
    e.target.style.borderBottom = "solid red";
  }

  // Validacion de campo email
  if (e.target.type === "email") {
    const er =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (er.test(e.target.value) && e.target.value.length > 0) {
      e.target.style.borderBottom = "solid #198754";
      mensajeError.remove();
      mailOk = true;
    } else {
      e.target.style.borderBottom = "solid red";
      mostrarError("Email no valido.");
    }
  }
  //validacion de campo subjet
  if (e.target.type === "text") {
    if (e.target.value.length > 0) {
      e.target.style.borderBottom = "solid #198754";
      mensajeError.remove();
      subjetOk = true;
    } else {
      e.target.style.borderBottom = "solid red";
      mostrarError("El asunto no puede quedar vacío.");
    }
  }

  // Habilita el boton de envío
  if (mailOk && subjetOk) {
    if (e.target.name === "message") {
      if (e.target.value.length > 0) {
        btnEnviar.classList.remove("disabled");
      }
    }
  }
}

function mostrarError(mensaje) {
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "m-2",
    "alert-danger",
    "text-center",
    "p-2",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    alerta.appendChild(mensajeError);
  }
}
function enviarEmail(e) {
  e.preventDefault();

  console.log("enviando...");
  //mostrar el spiner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "block";

  // despues de 3 seg ocultar spiner y mostrar el mensaje

  setTimeout(() => {
    spinner.style.display = "none";
    console.log("Enviado correctamente!");
    const parrafo = document.createElement("p");
    parrafo.classList.add("alert", "alert-success");
    parrafo.textContent = "El mensaje se envió correctamente";
    formulario.insertBefore(parrafo, spinner);
    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 3000);
  }, 3000);
}

reset();
function reset() {
  btnReset.addEventListener("click", () => {
    location.reload();
  });
}

function resetearFormulario() {
  location.reload();
  iniciarApp();
}
