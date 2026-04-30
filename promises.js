let queryList = []; // declara a existência da array queryList

// --- ELEMENTOS DA TELA ---
const orderInput = document.getElementById('orderInput');
const addOrderBtn = document.getElementById('addOrderBtn');
const queueList = document.getElementById('queueList');
const emptyState = document.getElementById('emptyState');

// --- A NOSSA PROMISE ---
// Função que retorna uma Promise para inserir um pedido com delay de 2 segundos
function insertQuery(query) { // Função para inserir o pedido no cardápio
  return new Promise((resolve, reject) => { // Retorna uma nova promise
    setTimeout(() => { // Define um tempo de espera para processar o pedido
      if (query && query.trim() !== '') { // Se o pedido existir e não for vazio
        queryList.push(query); // Adiciona o pedido à lista
        resolve(query); // Resolve a promise passando o nome do pedido
      } else { // Caso contrário
        reject('Erro: O pedido não pode estar vazio!'); // Rejeita a promise    
      }
    }, 2000); // Tempo de espera para processar o pedido
  }); // Final da Promise
} // Fim da função

// --- FUNÇÃO QUE CRIA O HTML DO PEDIDO ---
function renderOrder(orderName) {
  // Se existir a mensagem de "fila vazia", nós a escondemos
  if (emptyState) emptyState.style.display = 'none';

  // Cria a div do novo pedido
  const item = document.createElement('div');
  item.className = 'queue-item';
  item.innerHTML = `
    <span><i class="fas fa-coffee" style="color: var(--caramel); margin-right: 8px;"></i> ${orderName}</span>
    <span style="font-size: 0.8rem; color: var(--caramel);"><i class="fas fa-check"></i> Na fila</span>
  `;

  // Adiciona o novo pedido na tela
  queueList.appendChild(item);
}

function handleAddOrder() {
  const pedido = orderInput.value;

  if (!pedido.trim()) return;

  const textoOriginalDoBotao = addOrderBtn.innerHTML;
  addOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';
  addOrderBtn.disabled = true;

  insertQuery(pedido)
    .then((sucess) => {
      console.log(`Pedido registrado: ${sucess}`);
      console.log('Fila atual da cafeteria:', queryList);

      renderOrder(sucess);

      orderInput.value = '';
      orderInput.focus();
    })
    .catch((failure) => { // Se a promise for rejeitada
      console.error(failure);
      alert(failure); // Mostra um alerta pro usuário
    })
    .finally(() => { // O .finally() executa SEMPRE no final, dando certo ou errado
      // 3. DEPOIS DA PROMISE: Volta o botão ao normal
      addOrderBtn.innerHTML = textoOriginalDoBotao;
      addOrderBtn.disabled = false;
    });
}

// --- EVENTOS QUE ACIONAM A FUNÇÃO PRINCIPAL ---

// Evento 1: Se a pessoa clicar no botão
addOrderBtn.addEventListener('click', () => {
  handleAddOrder();
});

// Evento 2: Se a pessoa apertar a tecla "Enter" dentro do campo de texto
orderInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleAddOrder();
  }
});