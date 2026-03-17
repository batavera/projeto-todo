let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function adicionarTarefa() {
  const input = document.getElementById("inputTarefa");
  const texto = input.value;

  if (texto === "") return;

  tarefas.push({
  texto: texto,
  concluida: false
});
  renderizar();

  input.value = "";
  input.focus();
}

function renderizar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");

    li.textContent = tarefa.texto;

    if (tarefa.concluida) {
        li.style.textDecoration = "line-through";
    }
    li.ondblclick = function () {
        const novoTexto = prompt("Editar Tarefa:", tarefa.texto);

        if (novoTexto !== null && novoTexto.trim() !== "") {
            tarefas[index].texto = novoTexto;
            renderizar();
        }
    };


    const botao = document.createElement("button");
    botao.textContent = "X";

    botao.onclick = function (e) {
      e.stopPropagation();
      tarefas.splice(index, 1);
      renderizar();
    };

    li.appendChild(botao);
    lista.appendChild(li);
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

renderizar();

document.getElementById("inputTarefa").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    adicionarTarefa();
  }
});