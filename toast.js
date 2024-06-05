export function showToast(message, type = "info") {

  const toast = document.getElementById("toast");
  toast.textContent = message;

  if (type === "error") {
    toast.classList.add("error");
  } else if (type === "success") {
    toast.classList.add("success");
  }

  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
    toast.classList.remove("error");
    toast.classList.remove("success");
  }, 3000);
}
