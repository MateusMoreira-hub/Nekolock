
function verificarIntegridade() {
    const estaAutorizado = sessionStorage.getItem('autorizado');

    //Proteção do acesso a quem não está verificado
    if (estaAutorizado !== 'true') {
        // Verifica se já não estamos no index para evitar loop infinito
        if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
            alert("Acesso negado! Por favor, faça login.");
            window.location.href = 'index.html'; 
        }
    }
}


verificarIntegridade();

function sair() {
    sessionStorage.removeItem('autorizado');
    window.location.href = 'index.html';
}




const CHAVE_MESTRA = 'meow_key_master';



//Criar ou Logar na Senha Felina
function verificarStatusSeguranca() {
    console.log("Iniciando verificação de segurança...");

    const senhaSalva = localStorage.getItem(CHAVE_MESTRA);
    
    const campoConfirmar = document.getElementById('senha-confirmar');
    const titulo = document.getElementById('titulo-seguranca');
    const desc = document.getElementById('desc-seguranca');
    const btn = document.getElementById('btn-entrar');

    
    if (!campoConfirmar || !titulo || !btn) {
        console.error("Erro: Alguns elementos do HTML não foram encontrados. Verifique os IDs.");
        return;
    }

    if (!senhaSalva || senhaSalva.trim() === "") {

        // MODO CRIAÇÃO
        titulo.innerText = "BEM VINDO(A) AO NEKOLOCK! Crie uma senha principal para proteger seus dados e seu acesso na aplicação.";
        desc.innerText = "Defina uma senha felina para o seu Nekolock.";
        campoConfirmar.style.display = "block"; 
        btn.innerText = "Criar Minha Senha Felina";
    } else {

        // MODO LOGIN
        titulo.innerText = "Nekolock Bloqueado";
        desc.innerText = "Insira sua senha felina para acessar.";
        campoConfirmar.style.display = "none"; 
        btn.innerText = "Desbloquear";
    }
}


function processarAcesso() {
    const senhaSalva = localStorage.getItem(CHAVE_MESTRA);
    const inputPrincipal = document.getElementById('senha-principal');
    const inputConfirmar = document.getElementById('senha-confirmar');

    if (!inputPrincipal) return console.error("Input 'senha-felina' não encontrado.");

    const senha1 = inputPrincipal.value;
    const senha2 = inputConfirmar ? inputConfirmar.value : "";

    if (!senha1) return alert("Por favor, digite a senha.");

    if (!senhaSalva) {
        // Criação
        if (senha1 !== senha2) return alert("As senhas não coincidem!");
        if (senha1.length < 4) return alert("A senha deve ter pelo menos 4 caracteres.");

        localStorage.setItem(CHAVE_MESTRA, senha1);
        alert("Senha felina definida!");
        liberarAcesso();
    } else {
        // Login
        if (senha1 === senhaSalva) {
            liberarAcesso();
        } else {
            alert("Senha felina incorreta!");
            inputPrincipal.value = "";
        }
    }
}

function liberarAcesso() {
   
    sessionStorage.setItem('autorizado', 'true');

    window.location.href = 'Inicio.html';
    
    const camada = document.getElementById('camada-seguranca');
    if (camada) camada.style.display = 'none';

    if (typeof listar === 'function') listar();
}


function resetarCofre() {
    
    const desejaContinuar = confirm("ATENÇÃO: Isso apagará permanentemente todas as suas senhas salvas e a sua senha felina. Deseja continuar?");
    
    if (desejaContinuar) {
      
        const validacao = prompt("Para confirmar a exclusão TOTAL dos dados, digite a palavra APAGAR (em letras maiúsculas):");

        
        if (validacao === "APAGAR") {
            localStorage.clear(); 
            alert("Cofre resetado com sucesso. O aplicativo será reiniciado.");
            location.reload(); 
        } else {
            
            alert("Ação cancelada. A palavra de confirmação não confere.");
        }
    }
}


window.addEventListener('load', verificarStatusSeguranca);


window.onload = listar; // Agora ele chama a função correta

    function salvarSenha() {
        const servicoInput = document.getElementById('servico');
        const senhaInput = document.getElementById('senha');

        if (servicoInput.value === '' || senhaInput.value === '') {
            alert("Preencha todos os campos!");
            return;
        }

        // 2. Buscar o que já existe no localStorage ou criar um array vazio
        const senhasAtuais = JSON.parse(localStorage.getItem('minhasSenhas')) || [];

        // 3. Criar um novo objeto de senha
        const novaSenha = {
            servico: servicoInput.value,
            senha: senhaInput.value
        };

        // 4. Adicionar ao array e salvar de volta no localStorage
        senhasAtuais.push(novaSenha);
        localStorage.setItem('minhasSenhas', JSON.stringify(senhasAtuais));

        // Limpar campos e atualizar a lista na tela
        servicoInput.value = '';
        senhaInput.value = '';
        exibirSenhas();
    }

    
    function removerSenha(index) {
        const senhasAtuais = JSON.parse(localStorage.getItem('minhasSenhas')) || [];
        senhasAtuais.splice(index, 1); // Remove o item pelo índice
        localStorage.setItem('minhasSenhas', JSON.stringify(senhasAtuais));
        exibirSenhas();
    }






        // Função para mostrar os dados na tela
        function atualizarLista() {
            const listaUl = document.getElementById('listaDeSenhas');
            listaUl.innerHTML = ''; // Limpa a lista antes de mostrar

            // Pega os dados do localStorage
            const dadosSalvos = JSON.parse(localStorage.getItem('minhasSenhas')) || [];

            // Cria um item de lista para cada senha
            dadosSalvos.forEach(function(item) {
                const li = document.createElement('li');
                li.textContent = item.nome + " -> " + item.chave;
                listaUl.appendChild(li);
            });
        }

function salvar() {
        const s = document.getElementById('servico');
        const p = document.getElementById('senha');

        if (!s.value || !p.value) return alert("Preencha tudo");

        let dados = JSON.parse(localStorage.getItem('senhas_prioridade')) || [];
        dados.push({ id: Date.now(), nome: s.value, pass: p.value });
        localStorage.setItem('senhas_prioridade', JSON.stringify(dados));

        s.value = '';
        p.value = '';
        listar();
    }

    function listar() {
    const listaUl = document.getElementById('listaContainer');
    const termo = document.getElementById('campoBusca').value.toLowerCase();
    
    if (!listaUl) return; 

    listaUl.innerHTML = '';
    let dados = JSON.parse(localStorage.getItem('senhas_prioridade')) || [];

    // Ordenação (mantida conforme o seu código)
    dados.sort((a, b) => {
        const aMatch = a.nome.toLowerCase().includes(termo);
        const bMatch = b.nome.toLowerCase().includes(termo);
        
        if (termo === "") return 0;
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
    });

    dados.forEach(item => {
        const li = document.createElement('li');
        const ehDestaque = termo !== "" && item.nome.toLowerCase().includes(termo);
        
        if (ehDestaque) li.classList.add('destaque');

        // REMOÇÃO DO BOTÃO:
        // Note que agora só temos a div com as informações, sem a tag <button>
        li.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                <span>${item.pass}</span>
            </div>
        `;
        listaUl.appendChild(li);
    });
}


    // Iniciar
    window.onload = listar;

    // Função para remover
    function remover(idParaRemover) {
        let dados = JSON.parse(localStorage.getItem('senhas_v3')) || [];
        
        // Filtra para manter apenas os que NÃO têm o ID que queremos apagar
        dados = dados.filter(item => item.id !== idParaRemover);
        
        localStorage.setItem('senhas_v3', JSON.stringify(dados));
        listar();
    }

    // Carregar ao abrir
 function listar() {
    const listaUl = document.getElementById('listaContainer');
    const campoBusca = document.getElementById('campoBusca'); // Primeiro pegamos o elemento
    
    // Se a lista não existir nesta página, não fazemos nada
    if (!listaUl) return; 

    // Se o campo de busca existir, pegamos o valor. Se não existir, o termo fica vazio "".
    const termo = campoBusca ? campoBusca.value.toLowerCase() : "";

    listaUl.innerHTML = '';
    // ... resto do seu código ...
}

    const dados = JSON.parse(localStorage.getItem('banco_senhas')) || [];

    // ORDENAÇÃO: Vamos organizar a lista com base na busca
    const listaOrdenada = dados.sort((a, b) => {
        const nomeA = a.servico.toLowerCase();
        const nomeB = b.servico.toLowerCase();

        const aCorresponde = nomeA.includes(termoBusca);
        const bCorresponde = nomeB.includes(termoBusca);

        // Se o termo de busca estiver vazio, mantém a ordem original
        if (termoBusca === "") return 0;

        // Se 'a' corresponde e 'b' não, 'a' sobe (retorna -1)
        if (aCorresponde && !bCorresponde) return -1;
        // Se 'b' corresponde e 'a' não, 'b' sobe (retorna 1)
        if (!aCorresponde && bCorresponde) return 1;

        return 0; // Se ambos correspondem ou ambos não, mantém igual
    });

    // Agora desenhamos a lista já ordenada
    listaOrdenada.forEach(item => {
        const li = document.createElement('li');
        
        // Vamos dar um destaque visual (cor de fundo) para o que foi encontrado
        const destaque = (termoBusca !== "" && item.servico.toLowerCase().includes(termoBusca)) 
                         ? 'style="background-color: #e8f4fd; border-left: 5px solid #007bff;"' 
                         : '';

        li.innerHTML = `
            <div ${destaque} style="width: 100%; display: flex; justify-content: space-between; padding: 5px; border-radius: 4px;">
                <span><strong>${item.servico}</strong>: ${item.senha}</span>
                <button class="delete-btn" onclick="remover('${item.id}')">X</button>
            </div>
        `;
        listaUl.appendChild(li);
    });




// 1. Função para listar os itens
function listarGestao() {
    const listaUl = document.getElementById('listaGestao');
    if (!listaUl) return;

    listaUl.innerHTML = '';
    let dados = JSON.parse(localStorage.getItem('senhas_prioridade')) || [];

    dados.forEach(item => {
        const li = document.createElement('li');
        li.style.marginBottom = "10px";
        
        // Importante: passamos item.id, item.nome e item.pass para a função
        li.innerHTML = `
            <strong>${item.nome}</strong> - <span>${item.pass}</span>
            <div class="botoes-acao">
                <button onclick="prepararEdicao(${item.id})" class="btnedit">Editar</button>
                <button onclick="remover(${item.id})" style="color: black;" class="btnexc">Excluir</button>
            </div>
        `;
        listaUl.appendChild(li);
    });
}

// Função para abrir o modal com animação
function prepararEdicao(id) {
    let dados = JSON.parse(localStorage.getItem('senhas_prioridade')) || [];
    const item = dados.find(d => d.id === id);

    if (item) {
        document.getElementById('edit-id').value = item.id;
        document.getElementById('edit-nome').value = item.nome;
        document.getElementById('edit-pass').value = item.pass;
        
        // Em vez de .style.display, adicionamos a classe 'mostrar'
        document.getElementById('form-edicao').classList.add('mostrar');
    }
}

// Função para fechar o modal com animação
function cancelarEdicao() {
    // Removemos a classe 'mostrar' e o CSS faz o resto
    document.getElementById('form-edicao').classList.remove('mostrar');
}

// 3. Salva a alteração e FECHA o modal
function salvarEdicao() {
    const idInput = document.getElementById('edit-id').value;
    const novoNome = document.getElementById('edit-nome').value;
    const novaPass = document.getElementById('edit-pass').value;

    if (!idInput) return; // Segurança caso o ID esteja vazio

    const id = parseInt(idInput);
    let dados = JSON.parse(localStorage.getItem('senhas_prioridade')) || [];
    
    // Atualizamos o item no array
    dados = dados.map(item => {
        if (item.id === id) {
            return { ...item, nome: novoNome, pass: novaPass };
        }
        return item;
    });

    // Grava de volta no localStorage
    localStorage.setItem('senhas_prioridade', JSON.stringify(dados));
    
    // Fecha o modal e atualiza as listas
    cancelarEdicao();
    listarGestao(); 
    
    if (typeof listar === 'function') listar(); 
}



// 5. Função para remover
function remover(idParaRemover) {
    if (confirm("Tem certeza que deseja excluir?")) {
        let dados = JSON.parse(localStorage.getItem('senhas_prioridade')) || [];
        dados = dados.filter(item => item.id !== idParaRemover);
        localStorage.setItem('senhas_prioridade', JSON.stringify(dados));
        listarGestao();
        if (typeof listar === 'function') listar();
    }
}

// Iniciar a lista de gestão ao carregar
window.addEventListener('load', listarGestao);


function listarApenasLeitura() {
    const listaUl = document.getElementById('listaContainer');
    const campoInput = document.getElementById('campoBusca');
    
    // 1. Segurança: se a lista não existir na página, para aqui
    if (!listaUl) return; 

    // 2. Pega o termo de busca (se o input não existir, assume vazio)
    const termo = campoInput ? campoInput.value.toLowerCase() : "";

    // 3. Limpa a lista antes de desenhar
    listaUl.innerHTML = '';
    
    // 4. Busca os dados (Ajuste 'senhas_prioridade' se o seu banco tiver outro nome)
    let dados = JSON.parse(localStorage.getItem('senhas_prioridade')) || [];

    // 5. Filtra os dados com base na busca
    const dadosFiltrados = dados.filter(item => 
        item.nome.toLowerCase().includes(termo)
    );

    // 6. Cria os itens na tela (Sem botões!)
    dadosFiltrados.forEach(item => {
        const li = document.createElement('li');
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";
        
        // Estrutura apenas com texto
        li.innerHTML = `
            <div>
                <strong class="item-nome">${item.nome}</strong><br>
            <span class="item-pass">${item.pass}</span>
            </div>
        `;
        listaUl.appendChild(li);
    });
}

// Inicia a lista assim que a página carregar
window.onload = listarApenasLeitura;




document.addEventListener("DOMContentLoaded", function() {
    // 1. Selecionamos o container que envolve as duas logos
    const seletorTema = document.getElementById("btntema");

    function aplicarTema(estado) {
    if (estado === "claro") {
        document.documentElement.classList.add("fundo-claro");
    } else {
        document.documentElement.classList.remove("fundo-claro");
    }
}

    // 2. Configuração inicial
    const temaSalvo = localStorage.getItem("temaSelecionado") || "escuro";
    aplicarTema(temaSalvo);

    // 3. Evento de Clique no CONTAINER
    if (seletorTema) {
        seletorTema.addEventListener("click", function() {
            // Verifica se o HTML já tem a classe
            const jaEClaro = document.documentElement.classList.contains("fundo-claro");
            const novoTema = jaEClaro ? "escuro" : "claro";
            
            aplicarTema(novoTema);
            localStorage.setItem("temaSelecionado", novoTema);
        });
    }
});

// 3. Ao carregar a página
const temaSalvo = localStorage.getItem("temaSelecionado");
aplicarTema(temaSalvo || "escuro");

// 4. Evento de Clique (Corrigido)
// Usamos o document.documentElement para verificar a classe
btnTrocar.forEach(el => {
    el.addEventListener("click", function() {
        // O ERRO ESTAVA AQUI: verificando no body em vez de documentElement
        const eClaro = document.documentElement.classList.contains("fundo-claro");
        const novoTema = eClaro ? "escuro" : "claro";
        
        aplicarTema(novoTema);
        localStorage.setItem("temaSelecionado", novoTema);
    });
});
        
           

           

     // --- FUNÇÃO PARA EXPORTAR (BACKUP) ---
function fazerBackup() {
    // 1. Pegamos os dados do banco que você já utiliza
    const dados = localStorage.getItem('senhas_prioridade');

    if (!dados || dados === "[]") {
        alert("Não há dados para exportar!");
        return;
    }

    // 2. Criamos um "Blob" (um objeto que representa o arquivo)
    const blob = new Blob([dados], { type: 'application/json' });
    
    // 3. Criamos um link temporário para o download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = 'Meow-Key.json'; // Nome do arquivo que será baixado
    
    // 4. Simulamos o clique para baixar e removemos o link
    link.click();
    URL.revokeObjectURL(url);
}





function restaurarBackup() {
    const seletorArquivo = document.getElementById('arquivoBackup');
    
    if (seletorArquivo.files.length === 0) {
        alert("Por favor, selecione um arquivo Meow-Key (.json).");
        return;
    }

    const arquivo = seletorArquivo.files[0];
    const leitor = new FileReader();

    leitor.onload = function(evento) {
        try {
            const novosDados = JSON.parse(evento.target.result);

            if (Array.isArray(novosDados)) {
                // 1. Pegamos o que já existe
                const dadosAtuais = JSON.parse(localStorage.getItem('senhas_prioridade')) || [];

                // 2. Filtramos os novos dados para ignorar o que já existe
                // Substitua 'id' pelo campo único do seu objeto (ex: 'site' ou 'login')
                const dadosFiltrados = novosDados.filter(novoItem => {
                    return !dadosAtuais.some(itemAtual => itemAtual.id === novoItem.id);
                });

                // 3. Juntamos os atuais com os novos (sem duplicados)
                const listaFinal = dadosAtuais.concat(dadosFiltrados);

                localStorage.setItem('senhas_prioridade', JSON.stringify(listaFinal));

                // Mensagem personalizada para feedback
                const totalAdicionados = dadosFiltrados.length;
                const totalIgnorados = novosDados.length - dadosFiltrados.length;
                
                alert(`Senhas adicionadas com sucesso! 
- ${totalAdicionados} novas senhas adicionadas.
- ${totalIgnorados} senhas duplicadas foram ignoradas.`);

                if (typeof listarGestao === 'function') listarGestao();
                if (typeof listar === 'function') listar();
            }
        } catch (erro) {
            alert("Erro ao processar o arquivo.");
        }
    };

    leitor.readAsText(arquivo);
}




