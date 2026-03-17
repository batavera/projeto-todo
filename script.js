let filtroAtual = "todas";

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

  let tarefasFiltradas = tarefas;

  if (filtroAtual === "pendentes") {
    tarefasFiltradas = tarefas.filter(t => !t.concluida);
  }

  if (filtroAtual === "concluidas") {
    tarefasFiltradas = tarefas.filter(t => t.concluida);
  }

  tarefasFiltradas.forEach((tarefa) => {
    const index = tarefas.indexOf(tarefa);

    const li = document.createElement("li");
    li.textContent = tarefa.texto;

    if (tarefa.concluida) {
      li.style.textDecoration = "line-through";
    }

    li.onclick = function () {
      tarefas[index].concluida = !tarefas[index].concluida;
      renderizar();
    };

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
mudarFiltro("todas");

function mudarFiltro(filtro) {
  filtroAtual = filtro;

  // remove destaque de todos
  document.getElementById("btnTodas").classList.remove("ativo");
  document.getElementById("btnPendentes").classList.remove("ativo");
  document.getElementById("btnConcluidas").classList.remove("ativo");

  // adiciona destaque no botão clicado
  if (filtro === "todas") {
    document.getElementById("btnTodas").classList.add("ativo");
  }

  if (filtro === "pendentes") {
    document.getElementById("btnPendentes").classList.add("ativo");
  }

  if (filtro === "concluidas") {
    document.getElementById("btnConcluidas").classList.add("ativo");
  }

  renderizar();
}

document.getElementById("inputTarefa").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    adicionarTarefa();
  }
});