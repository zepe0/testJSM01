let data = [];

fetch("../api/encuestas/getEncuestas.php")
  .then((listaEncuesta) => listaEncuesta.json())
  .then((r) => {
    data = r.encuesta;
    console.log(data);
    // Insertat en la app cuando este el examen corregido
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });
