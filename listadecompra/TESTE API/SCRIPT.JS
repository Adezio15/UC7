async function buscarMunicipios() {
    const estado = document.getElementById("estado").value.toUpperCase(); // Pega o valor digitado
    // Converte para MAIÚSCULO (ex: ce → CE)

    const resultado = document.getElementById("resultado"); // Pega a área onde vai mostrar o resultado

    if (!estado) {  // Verifica se o campo está vazio

        resultado.innerHTML = "Digite a sigla do estado!"; // Mostra mensagem de erro
        return;
    }

    try {
        // API do IBGE - municípios por UF
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;

        const resposta = await fetch(url);  //Faz a requisição para a API

        if (!resposta.ok) { // Verifica se deu erro na requisição

            throw new Error("Estado não encontrado"); //MOSTRA ERRO
        
        }

        const dados = await resposta.json();  //Converte resposta em JSON (dados utilizáveis)

        // Monta lista de municípios
        let lista = "<h3>Municípios:</h3><ul>";

        dados.forEach(municipio => {  // Percorre cada município retornado

            lista += `<li>${municipio.nome}</li>`;  // Adiciona o nome de cada município na lista
        });

        lista += "</ul>";  // Encerra a lista

        resultado.innerHTML = lista;  // Mostra toda a lista na tela

    } catch (erro) { // se der erro
        resultado.innerHTML = "Erro ao buscar municípios.";
        console.error(erro); // mostra o erro
    }
}