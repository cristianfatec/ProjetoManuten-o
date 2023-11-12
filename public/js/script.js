// Adicione eventos de escuta aos campos litros e preco-litro
document.getElementById('litros').addEventListener('input', calcularValorTotal);
document.getElementById('preco-litro').addEventListener('input', calcularValorTotal);

// Adicione uma função para calcular o valor total dinamicamente
function calcularValorTotal() {
    const litros = parseFloat(document.getElementById('litros').value);
    const precoLitro = parseFloat(document.getElementById('preco-litro').value);

    // Debug - verificar os valores obtidos
    console.log('Litros:', litros);
    console.log('Preço do Litro:', precoLitro);

    // Calcular o valor total
    const valorTotal = litros * precoLitro;

    // Atualizar o campo de valor total na tela
    document.getElementById('valor-total').value = valorTotal.toFixed(2);
}

// Adicione uma função para registrar o abastecimento
function registrarAbastecimento() {
    const placa = document.getElementById('placa').value;
    const litros = document.getElementById('litros').value;
    const combustivel = document.getElementById('combustivel').value;
    const precoLitro = document.getElementById('preco-litro').value;

    // Calcular o valor total novamente para garantir precisão antes de enviar ao servidor
    const valorTotal = litros * precoLitro;

    // Faça o que for necessário com esses dados, por exemplo, enviá-los para o servidor
    const dadosAbastecimento = { placa, litros, combustivel, precoLitro, valorTotal };
    
     // Armazenar localmente os dados usando localStorage
     localStorage.setItem('abastecimento', JSON.stringify(dadosAbastecimento));


    // Exemplo de mensagem de sucesso
    alert('Abastecimento registrado com sucesso!');
}
