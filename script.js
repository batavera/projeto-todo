function adicionarTarefa() {
  const input = document.getElementById("inputTarefa");
  const texto = input.value;

  if (texto === "") return;

  const lista = document.getElementById("lista");

  const li = document.createElement("li");
  li.textContent = texto;

  li.onclick = function () {
    this.style.textDecoration = "line-through";
  };

  lista.appendChild(li);

  input.value = "";
}