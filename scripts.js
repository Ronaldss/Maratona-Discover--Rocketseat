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
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    description: 'Website',
    amount: -30000,
    date: '23/01/2021'
  },
  {
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  },
  {
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
  all: transactions,

  add(transaction){
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)
    App.reload()
  },

  incomes() {
    let income = 0;
    // pegar todas as transacoes
    // para cada transacao
    Transaction.all.forEach(transaction => {
      // se ela for maior que zero
      if(transaction.amount > 0) {
        // somar a uma variavel e retornar a variavel
        income += transaction.amount;
      }
    })
    return income;
  },
  expenses() {
      let expense = 0;
      // pegar todas as transacoes
      // para cada transacao
      Transaction.all.forEach(transaction => {
        // se ela for menor que zero
        if(transaction.amount < 0) {
          // somar a uma variavel e retornar a variavel
          expense += transaction.amount;
        }
      })
      return expense;
  },
  total() {
    return Transaction.incomes() + Transaction.expenses();








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
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
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

const App = {
  init() {

    Transaction.all.forEach(transaction => {
      DOM.addTrasaction(transaction)
    })
    
    DOM.updateBalance()

  },
  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init()


// Transaction.add({
//   description: 'Tmj!',
//   amount: 3123,
//   date: '21/02/2021'
// })








