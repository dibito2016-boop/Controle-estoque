let produtos = [];
function cadastrarProduto() {

    let nome = document.getElementById('produto').value;
    let sku = document.getElementById('sku').value;
    let quantidade = Number(document.getElementById('quantidade').value);
    let minimo = Number(document.getElementById('minimo').value);

    if (nome === '' || sku === '' || quantidade < 0 || minimo < 0) {
        alert('Preencha os dados corretamente.');
        return;
    }

    let skuExistente = produtos.find(produto => produto.sku === sku);

    if (skuExistente) {
        alert('Este SKU já está cadastrado');
        return;
    }

    let produto = {
        nome: nome,
        sku: sku,
        quantidade: quantidade,
        minimo: minimo
    };

    produtos.push(produto);

    atualizarTabela();

    document.getElementById('sku').value='';
    document.getElementById('produto').value='';
    document.getElementById('quantidade').value='';
    document.getElementById('minimo').value='';

}

    function registrarEntrada() {

        let sku = document.getElementById('skuEntrada').value;
        let quantidadeEntrada = Number(document.getElementById('quantidadeEntrada').value);

        if (sku ==='' || quantidadeEntrada <= 0) {
            alert('Preencha os dados corretamente.');
            return;
        }

        let produtoEncontrado = produtos.find(produto => produto.sku === sku);

        if (!produtoEncontrado) {
            alert('Produto não encontrado.');
            return;
        }

        produtoEncontrado.quantidade += quantidadeEntrada;

        atualizarTabela();

        document.getElementById('skuEntrada').value='';
        document.getElementById('quantidadeEntrada').value='';

        }
    function registrarSaida() {

        let sku = document.getElementById('skuSaida').value;
        let quantidadeSaida = Number(document.getElementById('quantidadeSaida').value);

        if (sku === '' || quantidadeSaida <= 0) {
            alert('Preencha os dados corretamente.');
            return;
        }

        let produtoEncontrado = produtos.find(produto => produto.sku === sku);

        if (!produtoEncontrado) {
            alert('Quantidade de saida maior que o estoque disponivel');
            return;
        }

        if (quantidadeSaida > produtoEncontrado.quantidade) {
            alert('Quantidade de saida maior que o estoque disponivel.');
            return;
        }

        produtoEncontrado.quantidade -= quantidadeSaida;

        atualizarTabela();

        document.getElementById('skuSaida').value = '';
        document.getElementById('quantidadeSaida').value= '';
        

}       

function atualizarTabela() {
    let tabela = document.getElementById('tabelaEstoque');

    tabela.innerHTML = '';

    for(let produto of produtos) {
        
        let situacao;

        if (produto.quantidade <= produto.minimo) {
            situacao = 'Estoque baixo'
        } else{
            situacao = 'Normal';
        }

        tabela.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.sku}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.minimo}</td>
                <td>${situacao}</td>
            </tr>
        `;
    }
        
}

