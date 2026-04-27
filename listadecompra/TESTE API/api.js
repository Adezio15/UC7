const cepInput = document.getElementById("cep");
const loading = document.getElementById("loading");

// 🔥 busca automática ao digitar
cepInput.addEventListener("input", () => {
    cepInput.value = cepInput.value.replace(/\D/g, "");

    if (cepInput.value.length === 8) {
        consultarCEP();
    }
});

// 🔥 função principal (botão também usa ela)
async function consultarCEP() {
    let cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    try {
        loading.style.display = "block";

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.erro) {
            limparCampos();
            return;
        }

        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("rua").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("numero").value = "";
        document.getElementById("estado").value = dados.uf || "";
        


    } catch (erro) {
        console.error(erro);
        limparCampos();
    } finally {
        loading.style.display = "none";
    }
}

function limparCampos() {
    document.getElementById("cidade").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("numero").value = "";
}