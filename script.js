
let nome="";
let nomeAtual;

function entradaSala() {
    
    const nomeDigitado = document.querySelector('.telaInicial input')
    nomeAtual = nomeDigitado.value;

    nome = {
        name: nomeAtual
    }

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);

    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);

}

function tratarErro() {
    alert("Já existe um usuário com esse nome, digite outro nome:");
}

function tratarSucesso() {

    const tela = document.querySelector('.telaInicial');
    tela.classList.remove('visivel');

    carregaMensagem();
    setTimeout(avisapresenca, 5000);
}
setTimeout(carregaMensagem, 3000);

function carregaMensagem() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(carregouMensagem);
}


function carregouMensagem (mensagem) {

    todasMensagens = mensagem.data;

    const pegaDiv = document.querySelector('main');

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
    divFinal =document.querySelector('.ultimaMensagem') ;
    divFinal.scrollIntoView();
}

function enviaMensagem() {

    const pegaMensagem = document.querySelector('footer input');

    let mensagem = {
        from: nomeAtual,
        to: "Todos",
        text: pegaMensagem.value,
        type: "message"
    }

    requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);

    requisicao.then(enviouMensagem);
}

function enviouMensagem() {
    carregaMensagem();  
}


function avisapresenca() {
    const pedido = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome);
    pedido.catch(ausente);
}

function ausente() {

    const tela = document.querySelector('.telaInicial');
    tela.classList.add('visivel');
    entradaSala();

}