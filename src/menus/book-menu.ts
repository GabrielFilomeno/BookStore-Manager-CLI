import type * as readline from 'node:readline/promises';
import { BookRepository } from '../repositories/book-repository.js';
import { AuthorRepository } from '../repositories/author-repository.js';
import { BookService } from '../services/book-service.js';
import { BookController } from '../controllers/book-controller.js';

enum BookMenuOption {
  REGISTER = '1',
  LIST = '2',
  GET = '3',
  UPDATE = '4',
  DELETE = '5',
  BACK = '6',
}

const bookRepository = new BookRepository();
const authorRepository = new AuthorRepository();
const bookService = new BookService(bookRepository, authorRepository);
const bookController = new BookController(bookService);

function displayBookMenu(): void {
  console.clear();
  console.log('========================================');
  console.log('           GERENCIAR LIVROS             ');
  console.log('========================================');
  console.log('1. Cadastrar livro');
  console.log('2. Listar livros');
  console.log('3. Buscar livro por ID');
  console.log('4. Atualizar livro');
  console.log('5. Remover livro');
  console.log('6. Voltar ao menu principal');
  console.log('========================================');
}

async function waitForKeyPress(terminal: readline.Interface): Promise<void> {
  await terminal.question('\nPressione Enter para continuar...');
}

export async function bookMenu(terminal: readline.Interface): Promise<void> {
  let isRunning = true;

  while (isRunning) {
    displayBookMenu();
    const choice = (await terminal.question('Escolha uma opção: ')).trim();

    switch (choice) {
      case BookMenuOption.REGISTER:
        await bookController.register(terminal);
        await waitForKeyPress(terminal);
        break;

      case BookMenuOption.LIST:
        await bookController.list();
        await waitForKeyPress(terminal);
        break;

      case BookMenuOption.GET:
        await bookController.getById(terminal);
        await waitForKeyPress(terminal);
        break;

      case BookMenuOption.UPDATE:
        await bookController.update(terminal);
        await waitForKeyPress(terminal);
        break;

      case BookMenuOption.DELETE:
        await bookController.delete(terminal);
        await waitForKeyPress(terminal);
        break;

      case BookMenuOption.BACK:
        isRunning = false;
        break;

      default:
        console.log('\nOpção inválida! Escolha um número entre 1 e 6.');
        await waitForKeyPress(terminal);
        break;
    }
  }
}
