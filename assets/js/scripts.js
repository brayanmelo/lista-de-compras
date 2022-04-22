const button = document.querySelector (".btn-tarefa");
const input = document.querySelector (".input-tarefa");
const tarefas = document.querySelector (".tarefas");
const active = document.querySelector (".mensagem-error")

function criarP () {
    const p = document.createElement ("p");
    return p;
};

function criarBotao (p) {
    const botaoApagar = document.createElement ("button");
    botaoApagar.innerHTML = "Apagar";
    botaoApagar.classList.add ("botao-delete")
    botaoApagar.setAttribute ("title", "Apagar esta tarefa")
    p.appendChild (botaoApagar)
};

function criarTarefa (textoInput) {
    const p = criarP ();
    p.innerHTML = textoInput;
    tarefas.appendChild (p);
    criarBotao (p);
    salvarTarefas ();
};

function limparInput () { 
    input.value = ""
};

input.addEventListener ("keypress", function (e) {    
    if (input.value === "") {
        active.classList.add("active")
    } else {
        active.classList.remove("active")
    }

    if (e.keyCode === 13) {
        if (!input.value) {
            return;
        }
        criarTarefa (input.value);
        limparInput ();
    }
});

button.addEventListener ("click", function () {
    if (input.value === "") {
        active.classList.add("active")
    } else {
        active.classList.remove("active")
    }

    if (!input.value) {
        return;
    }
    criarTarefa (input.value);
    limparInput ();
    input.focus();
});

document.addEventListener ("click", function (e){
    const elementoSelecionado = e.target;

    if (elementoSelecionado.classList.contains("botao-delete")) {
       elementoSelecionado.parentElement.remove();
       salvarTarefas ();
    };
});

function salvarTarefas () {
    const pTarefas = tarefas.querySelectorAll ("p");
    const listaDeTarefas = [];

    for (let tarefa of pTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace ("Apagar", "").trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify (listaDeTarefas);
    localStorage.setItem ("tarefas", tarefasJSON);
    
}

function adicionaTarefasSalvas () {
    const tarefas = localStorage.getItem("tarefas");
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criarTarefa(tarefa);
    }
}
adicionaTarefasSalvas ();