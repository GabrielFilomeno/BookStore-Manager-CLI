import type * as readline from 'node:readline/promises';
import { AuthorRepository } from '../repositories/author-repository.js';
import { AuthorService } from '../services/author-service.js';
import { AuthorController } from '../controllers/author-controller.js';

enum AuthorMenuOption {
  REGISTER = '1',
  LIST = '2',
  GET = '3',
  UPDATE = '4',
  DELETE = '5',
  BACK = '6',
}

const authorRepository = new AuthorRepository();
const authorService = new AuthorService(authorRepository);
const authorController = new AuthorController(authorService);

function displayAuthorMenu(): void {
  console.clear();
  console.log('========================================');
  console.log('          GERENCIAR AUTORES             ');
  console.log('========================================');
  console.log('1. Cadastrar autor');
  console.log('2. Listar autores');
  console.log('3. Buscar autor por ID');
  console.log('4. Atualizar autor');
  console.log('5. Excluir autor');
  console.log('6. Voltar ao menu principal');
  console.log('========================================');
}

async function waitForKeyPress(terminal: readline.Interface): Promise<void> {
  await terminal.question('\nPressione Enter para continuar...');
}

export async function authorMenu(terminal: readline.Interface): Promise<void> {
  let isRunning = true;

  while (isRunning) {
    displayAuthorMenu();
    const choice = (await terminal.question('Escolha uma opção: ')).trim();

    switch (choice) {
      case AuthorMenuOption.REGISTER:
        await authorController.register(terminal);
        await waitForKeyPress(terminal);
        break;

      case AuthorMenuOption.LIST:
        await authorController.list();
        await waitForKeyPress(terminal);
        break;

      case AuthorMenuOption.GET:
        await authorController.getById(terminal);
        await waitForKeyPress(terminal);
        break;

      case AuthorMenuOption.UPDATE:
        // TODO: Atualizar Autores (A fazer)
        console.log('\n[TODO] Atualização de Autores - A fazer.');
        await waitForKeyPress(terminal);
        break;

      case AuthorMenuOption.DELETE:
        // TODO: Excluir Autores (A fazer)
        console.log('\n[TODO] Exclusão de Autores - A fazer.');
        await waitForKeyPress(terminal);
        break;

      case AuthorMenuOption.BACK:
        isRunning = false;
        break;

      default:
        console.log('\nOpção inválida! Escolha um número entre 1 e 6.');
        await waitForKeyPress(terminal);
        break;
    }
  }
}
