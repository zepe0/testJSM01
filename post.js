document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("encuesta");
  var buttonadd = document.getElementById("addOpcion");
  button.addEventListener("click", options);
  buttonadd.addEventListener("click", options);
});

function options() {
  var buttons = document.getElementById("btn");
  var modal = document.getElementById("encuestaOpen");
  var button = document.getElementById("encuesta");
  if (localStorage.encuesta) {
    buttons.innerHTML = `<input id="nombreopcion"/><button id="addOpcion">+</button>`;
    lista = localStorage.encuesta;
    lista = JSON.parse(lista);
    lista.forEach((op) => {
      let article = document.createElement("article");
      article.innerHTML = `
            <label class="opcion" id="nombreTitulo" value="${op.titel}">${op.titel}</label>
          `;
      modal.appendChild(article);

      op.opc.forEach((opcion) => {
        const newdiv = document.createElement("div");
        newdiv.innerHTML = `<input name="opcion" value="${opcion}" />`;
        article.appendChild(newdiv);
      });

      modal.appendChild(article);
    });

    const addoption = document.getElementById("addOpcion");
    addoption.addEventListener("click", function () {
      const titulo = document.getElementById("nombreTitulo").innerText;
      const option = document.getElementById("nombreopcion").value;

      if (titulo && option) {
        let encuesta = JSON.parse(localStorage.encuesta);
        let encuestaItem = encuesta.find((item) => item.titulo === titulo);
        if (encuestaItem) {
          encuestaItem.opc.push(option);
        } else {
          encuesta.push({ title: titulo, opc: [option] });
        }
        localStorage.encuesta = JSON.stringify(encuesta);
      }
    });
  } else {
    modal.innerHTML = `
              <label id="">
          <input id="nombreTitulo" />
          </label>
          <label id=""
          >Nueva opción </label>
          <input id="nombreopcion"/>
          <button id="addOpcion">+</button>
         
       
        `;
    const addoption = document.getElementById("addOpcion");
    addoption.addEventListener("click", function () {
      const titulo = document.getElementById("nombreTitulo").value;
      const option = document.getElementById("nombreopcion").value;

      if (titulo && option) {
        let encuesta = localStorage.encuesta
          ? JSON.parse(localStorage.encuesta)
          : [];
        let encuestaItem = encuesta.find((item) => item.titulo === titulo);
        if (encuestaItem) {
          encuestaItem.opc.push(option);
        } else {
          encuesta.push({ titulo: titulo, opc: [option] });
        }
        localStorage.encuesta = JSON.stringify(encuesta);
        options(); // Volver a ejecutar options para actualizar la pantalla
      }
    });
  }
}
