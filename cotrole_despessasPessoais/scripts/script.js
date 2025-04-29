// Recupera a lista de despesas armazenadas no localStorage, ou inicializa como um array vazio.
let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
let saldo = 0;

// Função para adicionar as despesas
function adicionarDespesas(valor, categoria, data) {
    despesas.push({valor, categoria, data});
    localStorage.setItem('despesas', JSON.stringify(despesas)); // Persiste no armazenamento local.
    console.log('Despesa adicionada!');
}

// Função para listar despesas no HTML com id="lista".
function listarDespesas() {
    const lista = document.getElementById('lista');
    if (!lista) {
        console.log('Elemento "lista" não encontrado.');
        return;
    }

    if (despesas.length === 0) {
        lista.innerHTML = '<p>Nenhuma despesa registrada.</p>';
        return;
    }

    // Aqui é construída a saída HTML com as informações de cada despesa.
    lista.innerHTML = despesas.map(despesa => 
        `<p>Valor: R$ ${despesa.valor.toFixed(2)}, Categoria: ${despesa.categoria}, Data: ${despesa.data}</p>`).join('');
}

// Função para buscar/filtrar despesas por categorias
function buscarPorFiltro(tipo, valorFiltro) {
    const lista = document.getElementById('lista');
    if (!lista) return;

    let resultados = [];

    // Define o tipo do filtro: categoria ou data
    switch (tipo.toLowerCase()) {
        case 'categoria':   // se 'tipo' for 'categoria', ele filtra todas as despesas cuja categoria é igual ao valorFiltro.
            resultados = despesas.filter(despesa => despesa.categoria.toLowerCase() === valorFiltro.toLowerCase());
            break;
        case 'data':    // se 'tipo' for 'data', ele filtra todas as despesas cuja data é igual ao valorFiltro.
            resultados = despesas.filter(despesa => despesa.data === valorFiltro);
            break;
        default:
            lista.innerHTML = "<p>Filtro inválido. Escolha 'categoria' ou 'data'.</p>";
            return;
    }

    // Exibe os resultados ou uma mensagem se nenhum item for encontrado.
    if (resultados.length === 0) {
        lista.innerHTML = "<p>Nenhuma despesa encontrada.</p>";
    } else {
        lista.innerHTML = resultados.map(despesa => `<p>Valor: R$ ${despesa.valor.toFixed(2)}, Categoria: ${despesa.categoria}, Data: ${despesa.data}</p>`).join('');
            
    }
}

// Função para remover uma despesa
function removerDespesa(indice) {

    //Aqui verificamos se o índice é válido.
    if (indice >= 0 && indice < despesas.length) { 
        despesas.splice(indice, 1); // Remove uma única despesa naquela posição.
        localStorage.setItem('despesas', JSON.stringify(despesas)); // Atualiza o armazenamento local.
        listarDespesas(); // Atualiza a lista na tela.
        console.log("Despesa removida!");
    } else {
        console.log("Índice inválido.");
    }
}

// Adiciona eventos de clique para os botões da interface.
const adicionarDespesaBtn = document.getElementById('adicionarDespesaBtn');
const listarDespesaBtn = document.getElementById('listarDespesaBtn');
const buscarCategoriaBtn = document.getElementById('buscarCategoriaBtn');
const removerDespesaBtn = document.getElementById('removerDespesaBtn');

// Coleta dados via prompt e chama a função para adicionar.
adicionarDespesaBtn.addEventListener('click', () => {
    let valor = parseFloat(prompt("Digite o valor da despesa: "));
    let categoria = prompt("Digite a categoria:");
    let data = prompt("Digite a data (DD-MM-YYYY):");

    adicionarDespesas(valor, categoria, data);
});

listarDespesaBtn.addEventListener('click', listarDespesas);

// Busca despesas por categoria ou data.
buscarCategoriaBtn.addEventListener('click', () => {
    let tipoFiltro = prompt("Deseja buscar por 'categoria' ou 'data'?");
    if (!tipoFiltro) return;

    let valorFiltro = prompt(`Digite o valor do filtro: ${tipoFiltro}`);
    if (!valorFiltro) return;

    buscarPorFiltro(tipoFiltro, valorFiltro);
});

// Solicita um índice e remove a despesa correspondente.
removerDespesaBtn.addEventListener('click', () => {
    let indice = parseInt(prompt("Digite o índice da despesa que deseja remover: "));
    removerDespesa(indice);
});