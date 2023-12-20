const button = document.querySelector('.btn-adicionar')
const input = document.querySelector('.edt-tarefa')
const ulTarefas = document.querySelector('.lista-tarefas')

let listaDeTarefas = []

function adicionarNovaTarefa() {

    if(input.value != ''){
        listaDeTarefas.push({
            tarefa: input.value,
            finalizada: false
        })
    
        input.value = ''
        popularListaTarefas()
    } else {
        alert('Informe uma tarefa!')
    }
}

function popularListaTarefas() {

    let novaTarefa = ''

    listaDeTarefas.forEach((item, index) => {
        novaTarefa = novaTarefa + `
        <li class="item-tarefas ${item.finalizada && "done"} ">
            <img class="checked" src="./assets/checked.png" onClick="concluirTarefa(${index})" />
            <p>${item.tarefa}</p>
            <img class="trash" src="./assets/trash.png" onClick="excluirTarefa(${index})" />               
        </li>
        `
    })

    ulTarefas.innerHTML = novaTarefa
    localStorage.setItem('lista', JSON.stringify(listaDeTarefas))
}

function concluirTarefa(index) {
    listaDeTarefas[index].finalizada = !listaDeTarefas[index].finalizada
    popularListaTarefas()
}

function excluirTarefa(index) {
    listaDeTarefas.splice(index, 1)
    popularListaTarefas()
}

function reloadTarefas() {
    const tarefaLocalStorage = localStorage.getItem('lista')

    if(tarefaLocalStorage){
        listaDeTarefas = JSON.parse(tarefaLocalStorage)
    }

    popularListaTarefas()
}

reloadTarefas()
button.addEventListener('click', adicionarNovaTarefa)