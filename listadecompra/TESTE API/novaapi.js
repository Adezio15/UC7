// Evento do botão
document.getElementById("btnBuscar")
  .addEventListener("click", buscarNome);

function buscarNome() {

  // Pega os valores digitados
  const nome = document.getElementById("nomeInput").value;
  const uf = document.getElementById("estadoInput").value.toUpperCase();

  // Validação
  if (!nome || !uf) {
    alert("Digite o nome e o estado!");
    return;
  }

  document.getElementById("resultado").innerHTML = "🔎 Buscando...";

  // Busca dados do nome no IBGE
  fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}`)
    .then(res => res.json())
    .then(dados => {

      if (!dados.length) {
        document.getElementById("resultado").innerHTML = "❌ Nome não encontrado!";
        return;
      }

      // Soma total do nome no Brasil
      let total = 0;

      dados[0].res.forEach(item => {
        total += item.frequencia;
      });

      // Exibe resultado (simulação por estado)
      document.getElementById("resultado").innerHTML = `
        👤 Nome: ${nome} <br>
        📊 Total no Brasil: ${total.toLocaleString("pt-BR")} pessoas <br><br>
        📍 No estado ${uf}: estimativa proporcional baseada na população
      `;
    })
    .catch(() => {
      document.getElementById("resultado").innerHTML = "⚠️ Erro ao buscar dados!";
    });
}