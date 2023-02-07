const form = document.querySelector('.adicionar')
const lista = document.querySelector('.lista')
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemObjeto = {
        "nome":nome.value,
        "quantidade":quantidade.value
    }

    if(existe) {
        itemObjeto.id = existe.id

        atualizaElemento(itemObjeto)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemObjeto
    } else {
        itemObjeto.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1: 0;

        criaElemento(itemObjeto)

        itens.push(itemObjeto)

    }

    localStorage.setItem("itens", JSON.stringify(itens))


    nome.value = ""
    quantidade.value = ""
})


function criaElemento(item) {

    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeletar())

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade

}

function botaoDeletar(id) {

    const botao = document.createElement('button')
    botao.innerHTML = 'X'

    botao.addEventListener("click", function() {

        deletaElemento(this.parentNode, id)

    })

    return botao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}