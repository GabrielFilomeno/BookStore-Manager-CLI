import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { connectDatabase, pool } from './infra/database.js';
import { authorMenu } from './menus/author-menu.js';
import { bookMenu } from './menus/book-menu.js';
import { clientMenu } from './menus/client-menu.js';
import { loanMenu } from './menus/loan-menu.js';

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
  try {
    await connectDatabase();
  } catch (error) {
    console.error('\nErro ao conectar ao banco de dados PostgreSQL.');
    console.error('Verifique se o PostgreSQL está em execução e se as variáveis no arquivo .env estão corretas.');
    if (error instanceof Error) {
      console.error(`Detalhes: ${error.message}\n`);
    }
    process.exit(1);
  }

  const terminal = readline.createInterface({ input, output });
  let isRunning = true;

  try {
    while (isRunning) {
      displayMenu();
      const choice = (await terminal.question('Escolha uma opção: ')).trim();

      switch (choice) {
        case MenuOption.AUTHORS:
          await authorMenu(terminal);
          break;

        case MenuOption.BOOKS:
          await bookMenu(terminal);
          break;

        case MenuOption.CLIENTS:
          await clientMenu(terminal);
          break;

        case MenuOption.LOANS:
          await loanMenu(terminal);
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
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error('Ocorreu um erro inesperado:', error);
  process.exit(1);
});
