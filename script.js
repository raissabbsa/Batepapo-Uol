let nome="";
let nomeAtual;

function entradaSala() {
    
    let nomeDigitado = document.querySelector('.telaInicial input')
    nomeAtual = nomeDigitado.value;

    nome = {
        name: nomeAtual
    }

    let requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);

    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);

}

function tratarErro() {
    alert("Já existe um usuário com esse nome, digite outro nome:");
}

function tratarSucesso() {

    carregaMensagem();
    setTimeout(carregaMensagem, 3000);
    setTimeout(avisapresenca, 5000);

    let tela = document.querySelector('.telaInicial');
    tela.classList.remove('visivel');
    
}


function carregaMensagem() {
    let promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(carregouMensagem);
}


function carregouMensagem (mensagem) {

    let todasMensagens = mensagem.data;

    let pegaDiv = document.querySelector('main');

    for(let i=0; i<todasMensagens.length;i++) {

        if(todasMensagens[i].type == "message") {
            
            if(i === todasMensagens.length-1) {
                pegaDiv.innerHTML += `<div class="enviaMensagem ultimaMensagem">
                <div class="hora">(${todasMensagens[i].time})</div>
                <div class="conteudo">${todasMensagens[i].from} para ${todasMensagens[i].to}: ${todasMensagens[i].text}</div>
            </div>`}

            else { 
                pegaDiv.innerHTML += `<div class="enviaMensagem">
                <div class="hora">(${todasMensagens[i].time})</div>
                <div class="conteudo">${todasMensagens[i].from} para ${todasMensagens[i].to}: ${todasMensagens[i].text}</div>
            </div>`}
        }

        else if(todasMensagens[i].type == "status") {
            if(i === todasMensagens.length-1) {
            pegaDiv.innerHTML+=`<div class="enviaStatus ultimaMensagem">
            <div class="hora">(${todasMensagens[i].time})</div>
            <div class="conteudo">${todasMensagens[i].from}: ${todasMensagens[i].text}</div>
        </div>`}

            else {
                pegaDiv.innerHTML+=`<div class="enviaStatus">
                <div class="hora">(${todasMensagens[i].time})</div>
                <div class="conteudo">${todasMensagens[i].from}: ${todasMensagens[i].text}</div>
            </div>`
            }
        }

        else if (todasMensagens[i].type === "private_message") {
            if(todasMensagens[i].to == nomeAtual) {
                if(i === todasMensagens.length-1) {
                    pegaDiv.innerHTML+=`<div class="enviaReservado ultimaMensagem">
                    <div class="hora">(${todasMensagens[i].time})</div>
                    <div class="conteudo">${todasMensagens[i].from} reservadamente para ${todasMensagens[i].to}: ${todasMensagens[i].text}</div>
                </div>`
                }
                else {
                    pegaDiv.innerHTML+=`<div class="enviaReservado">
                    <div class="hora">(${todasMensagens[i].time})</div>
                    <div class="conteudo">${todasMensagens[i].from} reservadamente para ${todasMensagens[i].to}: ${todasMensagens[i].text}</div>
                </div>`}
            }
        }  
    } 
    let divFinal =document.querySelector('.ultimaMensagem') ;
    divFinal.scrollIntoView();
    console.log('carregou mensagens');
}

function enviaMensagem() {

    let pegaMensagem = document.querySelector('footer input');

    let mensagem = {
        from: nomeAtual,
        to: "Todos",
        text: pegaMensagem.value,
        type: "message"
    }
    console.log (mensagem);

    const requisicaoEnvio = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);

    requisicaoEnvio.then(enviouMensagem);
}

function enviouMensagem() {
    carregaMensagem();
    console.log('mensagem enviada');
}


function avisapresenca() {
    let identidade = {
        name: nomeAtual
    }
    console.log(identidade);

    let pedido = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', identidade);
    console.log('presente');

    pedido.catch(ausente);
}

function ausente() {

    /*const tela = document.querySelector('.telaInicial');
    tela.classList.add('visivel');
    entradaSala();*/
    console.log('saiu da sala');

}