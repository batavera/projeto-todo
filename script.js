let filtroAtual = "todas";

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
  const input = document.getElementById("inputTarefa");
  const texto = input.value.trim();

  if (texto === "") return;

  tarefas.push({
    texto: texto,
    concluida: false
  });

  input.value = "";
  input.focus();

  salvarTarefas();
  renderizar();
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
      salvarTarefas();
      renderizar();
    };

  li.ondblclick = function () {
     const inputEdit = document.createElement("input");
     inputEdit.type = "text";
     inputEdit.value = tarefa.texto;

     li.innerHTML = ""; 
     li.appendChild(inputEdit);
     inputEdit.focus();

    function salvarEdicao() {
      const novoTexto = inputEdit.value.trim();

      if (novoTexto !== "") {
        tarefas[index].texto = novoTexto;
        salvarTarefas();
        renderizar();
      } else {
        renderizar(); 
    }
  }

    inputEdit.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        salvarEdicao();
    }
  });

  inputEdit.addEventListener("blur", function () {
    salvarEdicao();
  });
};

    const botao = document.createElement("button");
    botao.textContent = "X";

    botao.onclick = function (e) {
      e.stopPropagation();
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizar();
    };

    li.appendChild(botao);
    lista.appendChild(li);
  });

  atualizarContador();
}

function mudarFiltro(filtro) {
  filtroAtual = filtro;

  document.getElementById("btnTodas").classList.remove("ativo");
  document.getElementById("btnPendentes").classList.remove("ativo");
  document.getElementById("btnConcluidas").classList.remove("ativo");

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

function atualizarContador() {
  const total = tarefas.length;
  const pendentes = tarefas.filter(t => !t.concluida).length;
  const concluidas = tarefas.filter(t => t.concluida).length;

  document.getElementById("total").textContent = `Total: ${total}`;
  document.getElementById("pendentes").textContent = `Pendentes: ${pendentes}`;
  document.getElementById("concluidas").textContent = `Concluídas: ${concluidas}`;
}

document.getElementById("inputTarefa").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    adicionarTarefa();
  }
});

renderizar();
mudarFiltro("todas");