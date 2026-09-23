import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

enum MenuOption {
  AUTHORS = '1',
  BOOKS = '2',
  CLIENTS = '3',
  LOANS = '4',
  REPORTS = '5',
  EXIT = '6',
}

function displayMenu(): void {
  console.clear();
  console.log('========================================');
  console.log('       GERENCIADOR DE LIVRARIA          ');
  console.log('========================================');
  console.log('1. Autores');
  console.log('2. Livros');
  console.log('3. Clientes');
  console.log('4. Empréstimos');
  console.log('5. Relatórios');
  console.log('6. Encerrar aplicação');
  console.log('========================================');
}

async function waitForKeyPress(terminal: readline.Interface): Promise<void> {
  await terminal.question('\nPressione Enter para voltar ao menu principal...');
}

async function main(): Promise<void> {
  const terminal = readline.createInterface({ input, output });
  let isRunning = true;

  try {
    while (isRunning) {
      displayMenu();
      const choice = (await terminal.question('Escolha uma opção: ')).trim();

      switch (choice) {
        case MenuOption.AUTHORS:
          // TODO: Chamar AuthorController (A fazer)
          console.log('\n[TODO] Gerenciamento de Autores - A fazer.');
          await waitForKeyPress(terminal);
          break;

        case MenuOption.BOOKS:
          // TODO: Chamar BookController (A fazer)
          console.log('\n[TODO] Gerenciamento de Livros - A fazer.');
          await waitForKeyPress(terminal);
          break;

        case MenuOption.CLIENTS:
          // TODO: Chamar ClientController (A fazer)
          console.log('\n[TODO] Gerenciamento de Clientes - A fazer.');
          await waitForKeyPress(terminal);
          break;

        case MenuOption.LOANS:
          // TODO: Chamar LoanController (A fazer)
          console.log('\n[TODO] Gerenciamento de Empréstimos - A fazer.');
          await waitForKeyPress(terminal);
          break;

        case MenuOption.REPORTS:
          // TODO: Chamar ReportController (A fazer)
          console.log('\n[TODO] Geração de Relatórios - A fazer.');
          await waitForKeyPress(terminal);
          break;

        case MenuOption.EXIT:
          console.log('\nEncerrando a aplicação... Volte sempre!\n');
          isRunning = false;
          break;

        default:
          console.log('\nOpção inválida! Escolha um número entre 1 e 6.');
          await waitForKeyPress(terminal);
          break;
      }
    }
  } finally {
    terminal.close();
  }
}

main().catch((error: unknown) => {
  console.error('Ocorreu um erro inesperado:', error);
  process.exit(1);
});
