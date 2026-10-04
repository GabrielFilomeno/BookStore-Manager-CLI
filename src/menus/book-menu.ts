import type * as readline from 'node:readline/promises';
import { BookRepository } from '../repositories/book-repository.js';
import { AuthorRepository } from '../repositories/author-repository.js';
import { BookService } from '../services/book-service.js';
import { BookController } from '../controllers/book-controller.js';

enum BookMenuOption {
  REGISTER = '1',
  BACK = '2',
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
  console.log('2. Voltar ao menu principal');
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

      case BookMenuOption.BACK:
        isRunning = false;
        break;

      default:
        console.log('\nOpção inválida! Escolha 1 ou 2.');
        await waitForKeyPress(terminal);
        break;
    }
  }
}
