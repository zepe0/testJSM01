import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("encuesta");
  var newpost = document.getElementById("postear");

  button.addEventListener("click", options);
  newpost.addEventListener("click", addpost);
});

function generateObjectId() {
  const timestamp = Date.now().toString(16);
  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");

  return timestamp + random;
}

function voto(data) {
  const btnselec = document.getElementById(data.id);

  document.querySelectorAll("section").forEach((seccion) => {
    const botones = seccion.querySelectorAll("button");
    botones.forEach((boton) => {
      boton.addEventListener("click", (event) => {
        if (!seccion.dataset.votado) {
          event.target.classList.add("select");
          const span = document.createElement("span");
          span.textContent = "tu voto";
          event.target.insertAdjacentElement("afterend",span);

          seccion.dataset.votado = "true";

          botones.forEach((boton) => {
            boton.disabled = true;
          });
        }
      });
    });
  });
}

function addpost() {
  var modal = document.getElementById("encuestaOpen");
  var list = document.getElementById("listpost");
  list.innerHTML = "";

  if (localStorage.list) {
    const listpost = JSON.parse(localStorage.list);
    listpost.forEach((encuesta) => {
      const section = document.createElement("section");

      section.innerHTML = `
        <h3>${encuesta.titel}</h3>
        <article class="optionsencuestas">
        </article>
      `;

      const listoptions = section.querySelector(".optionsencuestas");

      encuesta.opc.forEach((opcencuesta) => {
        const id = generateObjectId();
        const button = document.createElement("button");
        button.name = "options";
        button.setAttribute("id", id);
        button.value = opcencuesta;
        button.textContent = opcencuesta;
        button.onclick = function () {
          voto(button);
        };

        listoptions.appendChild(button);
      });
      list.appendChild(section);
    });
  }

  if (!localStorage.encuesta) {
    showToast("campos vacios");
  } else {
    const encuestas = JSON.parse(localStorage.encuesta);
    encuestas.forEach((encuesta) => {
      if (encuesta.opc.length === 0) {
        showToast(
          "se necesitan al menos dos opciones para hacer encuesta",
          "error"
        );
        return null;
      } else {
        const section = document.createElement("section");
        // TODO add estilo
        section.innerHTML = `
          <h3>${encuesta.titel}</h3>
          <article class="optionsencuestas">
          </article>
        `;

        const listoptions = section.querySelector(".optionsencuestas");
        encuesta.opc.forEach((opcencuesta) => {
          listoptions.innerHTML += `<button name="options" value="${opcencuesta}" > </button>`;
        });
        /*    list.appendChild(section); */
        debugger;
        const list = document.getElementById("listpost").appendChild(section);

        if (localStorage.list) {
          const listpost = JSON.parse(localStorage.list);
          listpost.push(encuesta);
          localStorage.setItem("list", JSON.stringify(listpost));
          const nombre = document.getElementById("encuestaOpen");
          const btn = document.getElementById("btn");
          debugger;
          var coments = document.getElementById("textcoment");
          nombre.classList.add("hiden");
          btn.classList.add("hiden");
          coments.classList.remove("hiden");
        } else {
          localStorage.setItem("list", JSON.stringify([encuesta]));
          const nombre = document.getElementById("encuestaOpen");
          const btn = document.getElementById("btn");
          debugger;
          var coments = document.getElementById("textcoment");
          nombre.classList.add("hiden");
          btn.classList.add("hiden");
          coments.classList.remove("hiden");
        }
      }
    });

    delete localStorage.encuesta;
  }

  modal.innerHTML = `
    <label>
      <input id="nombreTitulo" placeholder="Título de la encuesta" />
    </label>
    <label>Nueva opción</label>
    <input id="nombreopcion" placeholder="Nueva opción"/>
    <button id="addOpcion">+</button>
  `;

  addOptionEventListener();
}

function options() {
  var buttons = document.getElementById("btn");
  var coments = document.getElementById("textcoment");
  var modal = document.getElementById("encuestaOpen");
  modal.innerHTML = "";
  if (modal.classList[0] === "hiden") {
    modal.classList.remove("hiden");
  }

  if (localStorage.encuesta) {
    buttons.classList.remove("hiden");
    buttons.innerHTML = `<input id="nombreopcion" placeholder="Nueva opción"/><span id="count"></span><button id="addOpcion">+</button>`;
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
    coments.classList.add("hiden");
    modal.innerHTML = `
      <label>
        <input id="nombreTitulo" placeholder="Título de la encuesta" />
      </label>
      <label>Nueva opción</label>
      <input id="nombreopcion" placeholder="Nueva opción"/><span id="count"></span>
      <button id="addOpcion">+</button>
    `;
  }

  addOptionEventListener();
}

function addOptionEventListener() {
  var modal = document.getElementById("encuestaOpen");

  const addoption = document.getElementById("addOpcion");
  var nombreOpcion = document.getElementById("nombreopcion");
  var countSpan = document.getElementById("count");

  if (nombreOpcion && countSpan) {
    nombreOpcion.addEventListener("input", function () {
      if (nombreOpcion.value.length <= 25) {
        countSpan.innerText = nombreOpcion.value.length + "/25";
      }

      if (nombreOpcion.value.length > 25) countSpan.innerText = 25;
      nombreOpcion.value = nombreOpcion.value.substring(0, 25);
      debugger;
    });
  }

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
