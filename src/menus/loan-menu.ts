import type * as readline from 'node:readline/promises';
import { LoanRepository } from '../repositories/loan-repository.js';
import { BookRepository } from '../repositories/book-repository.js';
import { ClientRepository } from '../repositories/client-repository.js';
import { LoanService } from '../services/loan-service.js';
import { LoanController } from '../controllers/loan-controller.js';

enum LoanMenuOption {
  REGISTER = '1',
  RETURN = '2',
  LIST = '3',
  BACK = '4',
}

const loanRepository = new LoanRepository();
const bookRepository = new BookRepository();
const clientRepository = new ClientRepository();
const loanService = new LoanService(loanRepository, bookRepository, clientRepository);
const loanController = new LoanController(loanService);

function displayLoanMenu(): void {
  console.clear();
  console.log('========================================');
  console.log('        GERENCIAR EMPRÉSTIMOS           ');
  console.log('========================================');
  console.log('1. Realizar empréstimo');
  console.log('2. Registrar devolução');
  console.log('3. Consultar empréstimos');
  console.log('4. Voltar ao menu principal');
  console.log('========================================');
}

async function waitForKeyPress(terminal: readline.Interface): Promise<void> {
  await terminal.question('\nPressione Enter para continuar...');
}

export async function loanMenu(terminal: readline.Interface): Promise<void> {
  let isRunning = true;

  while (isRunning) {
    displayLoanMenu();
    const choice = (await terminal.question('Escolha uma opção: ')).trim();

    switch (choice) {
      case LoanMenuOption.REGISTER:
        await loanController.register(terminal);
        await waitForKeyPress(terminal);
        break;

      case LoanMenuOption.RETURN:
        await loanController.returnBook(terminal);
        await waitForKeyPress(terminal);
        break;

      case LoanMenuOption.LIST:
        await loanController.list();
        await waitForKeyPress(terminal);
        break;

      case LoanMenuOption.BACK:
        isRunning = false;
        break;

      default:
        console.log('\nOpção inválida! Escolha um número entre 1 e 4.');
        await waitForKeyPress(terminal);
        break;
    }
  }
}
