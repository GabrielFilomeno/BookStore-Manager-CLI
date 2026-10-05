import type * as readline from 'node:readline/promises';
import { BookService } from '../services/book-service.js';
import { InvalidParamError } from '../shared/errors/invalid-param.error.js';

export class BookController {
  constructor(private readonly bookService: BookService) {}

  public async register(terminal: readline.Interface): Promise<void> {
    console.log('\n--- CADASTRO DE LIVRO ---');

    const title = (await terminal.question('Informe o título do livro: ')).trim();
    const genre = (await terminal.question('Informe o gênero do livro: ')).trim();
    const authorId = (await terminal.question('Informe o ID do autor: ')).trim();
    const releaseDateStr = (await terminal.question('Informe a data de lançamento (DD/MM/AAAA): ')).trim();
    const totalQuantityStr = (await terminal.question('Informe a quantidade total de exemplares: ')).trim();

    try {
      const releaseDate = this.parseDate(releaseDateStr);
      const total_quantity = Number.parseInt(totalQuantityStr, 10);

      const book = await this.bookService.createBook({
        title,
        genre,
        authorId,
        releaseDate,
        total_quantity,
      });

      console.log('\nLivro cadastrado com sucesso!');
      console.log(`ID: ${book.id}`);
      console.log(`Título: ${book.title}`);
      console.log(`Gênero: ${book.genre}`);
      console.log(`ID do Autor: ${book.authorId}`);
      console.log(`Data de Lançamento: ${book.releaseDate.toLocaleDateString('pt-BR')}`);
      console.log(`Quantidade Total: ${book.total_quantity}`);
      console.log(`Quantidade Disponível: ${book.available_quantity}`);
      console.log(`Criado em: ${book.createdAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao cadastrar livro: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao cadastrar livro.');
      }
    }
  }

  public async list(): Promise<void> {
    console.log('\n--- LISTA DE LIVROS ---');

    try {
      const books = await this.bookService.listBooks();

      if (books.length === 0) {
        console.log('Nenhum livro cadastrado até o momento.');
        return;
      }

      console.table(
        books.map((book) => ({
          ID: book.id,
          Título: book.title,
          Gênero: book.genre,
          'ID Autor': book.authorId,
          Lançamento: book.releaseDate.toLocaleDateString('pt-BR'),
          Total: book.total_quantity,
          Disponível: book.available_quantity,
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao listar livros: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao listar livros.');
      }
    }
  }

  public async getById(terminal: readline.Interface): Promise<void> {
    console.log('\n--- BUSCAR LIVRO POR ID ---');
    const id = (await terminal.question('Informe o ID do livro: ')).trim();

    try {
      const book = await this.bookService.getBookById(id);
      console.log('\nLivro encontrado com sucesso!');
      console.log(`ID: ${book.id}`);
      console.log(`Título: ${book.title}`);
      console.log(`Gênero: ${book.genre}`);
      console.log(`ID do Autor: ${book.authorId}`);
      console.log(`Data de Lançamento: ${book.releaseDate.toLocaleDateString('pt-BR')}`);
      console.log(`Quantidade Total: ${book.total_quantity}`);
      console.log(`Quantidade Disponível: ${book.available_quantity}`);
      console.log(`Criado em: ${book.createdAt.toLocaleString('pt-BR')}`);
      console.log(`Atualizado em: ${book.updatedAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao buscar livro: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao buscar livro.');
      }
    }
  }

  public async update(terminal: readline.Interface): Promise<void> {
    console.log('\n--- ATUALIZAR LIVRO ---');
    const id = (await terminal.question('Informe o ID do livro: ')).trim();

    if (!id) {
      console.log('\nID não pode ser vazio.');
      return;
    }

    try {
      const existingBook = await this.bookService.getBookById(id);
      console.log(`\nLivro atual: "${existingBook.title}" (Autor ID: ${existingBook.authorId})`);
      console.log('Pressione Enter em qualquer campo para manter o valor atual.\n');

      const titleInput = (await terminal.question(`Novo título [${existingBook.title}]: `)).trim();
      const genreInput = (await terminal.question(`Novo gênero [${existingBook.genre}]: `)).trim();
      const authorIdInput = (await terminal.question(`Novo ID do autor [${existingBook.authorId}]: `)).trim();
      const releaseDateInput = (await terminal.question(`Nova data de lançamento (DD/MM/AAAA) [${existingBook.releaseDate.toLocaleDateString('pt-BR')}]: `)).trim();
      const totalQuantityInput = (await terminal.question(`Nova quantidade total [${existingBook.total_quantity}]: `)).trim();

      const title = titleInput.length > 0 ? titleInput : undefined;
      const genre = genreInput.length > 0 ? genreInput : undefined;
      const authorId = authorIdInput.length > 0 ? authorIdInput : undefined;
      const releaseDate = releaseDateInput.length > 0 ? this.parseDate(releaseDateInput) : undefined;
      const total_quantity = totalQuantityInput.length > 0 ? Number.parseInt(totalQuantityInput, 10) : undefined;

      const updatedBook = await this.bookService.updateBook(id, {
        authorId,
        title,
        genre,
        releaseDate,
        total_quantity,
      });

      console.log('\nLivro atualizado com sucesso!');
      console.log(`ID: ${updatedBook.id}`);
      console.log(`Título: ${updatedBook.title}`);
      console.log(`Gênero: ${updatedBook.genre}`);
      console.log(`ID do Autor: ${updatedBook.authorId}`);
      console.log(`Data de Lançamento: ${updatedBook.releaseDate.toLocaleDateString('pt-BR')}`);
      console.log(`Quantidade Total: ${updatedBook.total_quantity}`);
      console.log(`Quantidade Disponível: ${updatedBook.available_quantity}`);
      console.log(`Atualizado em: ${updatedBook.updatedAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao atualizar livro: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao atualizar livro.');
      }
    }
  }

  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);

    if(!day || !month || !year){
      throw new InvalidParamError('Data inválida', 'Data de Lançamento');
    }

    const date = new Date(year, month - 1, day);

    if (date >= new Date()) {
      throw new InvalidParamError('Data inválida', 'Data de Lançamento');
    }

    return date;
  }
}
