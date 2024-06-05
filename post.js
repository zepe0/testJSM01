import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("encuesta");
  var newpost = document.getElementById("postear");

  button.addEventListener("click", options);
  newpost.addEventListener("click", addpost);
});

function addpost() {
  var modal = document.getElementById("encuestaOpen");
  var list = document.getElementById("listpost");
  list.innerHTML = "";
  if (!localStorage.encuesta) {
    showToast("campos vacios");
  } else {
    const encuestas = JSON.parse(localStorage.encuesta);
    encuestas.map((encuesta) => {
      const section = document.createElement("section");
      // TODO add estilo
      if (encuesta.opc.length <= 1) {
        showToast(
          "se necesitan al menos dos opciones para hacer encuesta",
          "error"
        );
        return null;
      } else {
        section.innerHTML = `
        <h3>${encuesta.titel}</h3>
        <article class="optionsencuestas">
        </article>
      `;
        const listoptions = section.querySelector(".optionsencuestas");
        encuesta.opc.forEach((opcencuesta) => {
          listoptions.innerHTML += `<input name="options" value="${opcencuesta}" />`;
        });
        list.appendChild(section);
        delete localStorage.encuesta;
      }
    });

    modal.innerHTML = `
    <label>
      <input id="nombreTitulo" placeholder="Título de la encuesta" />
    </label>
    <label>Nueva opción</label>
    <input id="nombreopcion" placeholder="Nueva opción"/>
    <button id="addOpcion">+</button>
  `;

    addOptionEventListener(); // Register event listener again
  }
}

function options() {
  var buttons = document.getElementById("btn");
  var coments = document.getElementById("coment");
  var modal = document.getElementById("encuestaOpen");

  modal.innerHTML = "";

  if (localStorage.encuesta) {
    buttons.innerHTML = `<input id="nombreopcion"/><button id="addOpcion">+</button>`;
    let lista = JSON.parse(localStorage.encuesta);
    lista.forEach((op) => {
      let article = document.createElement("article");
      // TODO add estilo
      article.innerHTML = `
        <input class="opcion" id="nombreTitulo" value="${op.titel}" />
      `;
      modal.appendChild(article);

      op.opc.forEach((opcion) => {
        const newdiv = document.createElement("div");
        newdiv.innerHTML = `<input name="opcion" class="m-t" value="${opcion}" />`;
        article.appendChild(newdiv);
      });

      modal.appendChild(article);
    });
  } else {
    modal.innerHTML = `
      <label>
        <input id="nombreTitulo" placeholder="Título de la encuesta" />
      </label>
      <label>Nueva opción</label>
      <input id="nombreopcion" placeholder="Nueva opción"/>
      <button id="addOpcion">+</button>
    `;
  }

  addOptionEventListener(); // Register event listener again
}

function addOptionEventListener() {
  var modal = document.getElementById("encuestaOpen");
  const addoption = document.getElementById("addOpcion");

  if (addoption) {
    addoption.addEventListener("click", function () {
      const tituloInput = document.getElementById("nombreTitulo");
      const optionInput = document.getElementById("nombreopcion");
      const titulo = tituloInput ? tituloInput.value : false;
      const option = optionInput ? optionInput.value : false;
      if (!titulo || !option) {
        showToast("rellene campos");
      }
      if (titulo && option) {
        let encuesta = localStorage.encuesta
          ? JSON.parse(localStorage.encuesta)
          : [];
        let encuestaItem = encuesta.find((item) => item.titel === titulo);
        if (encuestaItem) {
          if (encuestaItem.opc.length >= 4) {
            showToast("No se pueden agregar más de 4 opciones", "error");
            return;
          }
          encuestaItem.opc.push(option);
        } else {
          encuesta.push({ titel: titulo, opc: [option] });
        }
        localStorage.encuesta = JSON.stringify(encuesta);
        options();
      }
    });
  }
}