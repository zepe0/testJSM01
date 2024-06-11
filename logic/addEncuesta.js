export function addEncuesta(titulo, arrayOpciones) {

  formData.append("titulo", titulo);
  formData.append("token", localStorage.token);
  fetch("addEncuesta.php", {
    method: "POST",
    body: formData,
  }).then((res) => {
    console.log(res);
  });
}
