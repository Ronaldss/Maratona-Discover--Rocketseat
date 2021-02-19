const Modal = { // desafio: depois tente fazer o Modal apenas com a função toogle.
  open(){
    // Abrir o Modal
    // Adicinar a class active ao modal
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  close(){
    // fechar o modal
    // remover a class active do modal
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  }
}


const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 1,
    description: 'Website',
    amount: -30000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  },
  {
    id: 4,
    description: 'App',
    amount: 350000,
    date: '23/01/2021'
  },
]

// Constante Transaction
// 1 - somar as entradas
// 2 - somar as saídas
// 3 - remover das entradas o valor das saidas
// 4 - assim teremos o total


const Transaction = {
  incomes() {
    let income = 0;
    // pegar todas as transacoes
    // para cada transacao
    transactions.forEach(transaction => {
      // se ela for maior que zero
      if(transaction.amount > 0) {
        // somar a uma variavel e retornar a variavel
        income += transaction.amount;
      }
    })
    return income;
  },
  expenses() {
    return "+ saídas"
  },
  total() {
    return "Total"
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  addTrasaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expanse"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover trasação">
      </td>
    `
    return html
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Transaction.incomes()
    document
      .getElementById('expenseDisplay')
      .innerHTML = Transaction.expenses()
    document
      .getElementById('totalDisplay')
      .innerHTML = Transaction.total()
  }

}

const Utils = {
   formatCurrency(value) {
     const signal = Number(value) < 0 ? "-" : ""

     value = String(value).replace(/\D/g, "")

     value = Number(value) / 100

     value = value.toLocaleString("pt-BR", {
       style: "currency",
       currency: "BRL"
     })
     return signal + value
   }
}

transactions.forEach(function(transaction) {
  DOM.addTrasaction(transaction)
})

DOM.updateBalance()