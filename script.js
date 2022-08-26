
let nome="";

function entradaSala() {
    
    const nomeDigitado = document.querySelector('.telaInicial input')

    nome = {
        name: nomeDigitado.value
    }

    console.log(nome);

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);

    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);

}

function carregaMensagem() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(carregouMensagem);
}

function carregouMensagem (mensagem) {

    todasMensagens = mensagem.data;

    console.log(todasMensagens);

    const pegaDiv = document.querySelector('main');

    for(let i=0; i<todasMensagens.length;i++) {

        if(todasMensagens[i].type == "message") {
            pegaDiv.innerHTML += `<div class="enviaMensagem">
            <div class="hora">(${todasMensagens[i].time})</div>
            <div class="conteudo">${todasMensagens[i].from} para ${todasMensagens[i].to}: ${todasMensagens[i].text}</div>
        </div>`
        }

        else if(todasMensagens[i].type == "status") {
            pegaDiv.innerHTML+=`<div class="enviaStatus">
            <div class="hora">(${todasMensagens[i].time})</div>
            <div class="conteudo">${todasMensagens[i].from}: ${todasMensagens[i].text}</div>
        </div>`
        }

        else if (todasMensagens[i].type == "private_message") {
            pegaDiv.innerHTML+=`<div class="enviaReservado">
            <div class="hora">(${todasMensagens[i].time})</div>
            <div class="conteudo">${todasMensagens[i].from} reservadamente para ${todasMensagens[i].to}: ${todasMensagens[i].text}</div>
        </div>`
        }
        
    }
}

setTimeout(carregaMensagem, 3000);

/*setTimeout(avisapresenca, 5000);

function avisapresenca() {
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome);
}*/

function tratarErro() {
        alert("Já existe um usuário com esse nome, digite outro nome:");
}

function tratarSucesso() {
    const tela = document.querySelector('.telaInicial');
    tela.classList.remove('visivel');
    carregaMensagem();
}