import { Book } from '../entities/book.js';
import { BookRepository } from '../repositories/book-repository.js';
import { AuthorRepository } from '../repositories/author-repository.js';
import { InvalidParamError } from '../shared/errors/invalid-param.error.js';
import { NotFoundError } from '../shared/errors/not-found.error.js';

export interface CreateBookDTO {
  authorId: string;
  title: string;
  genre: string;
  releaseDate: Date;
  total_quantity: number;
  available_quantity?: number;
}

export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository
  ) {}

  public async createBook(data: CreateBookDTO): Promise<Book> {
    const { authorId, title, genre, releaseDate, total_quantity, available_quantity } = data;

    if (!title || title.trim().length === 0) {
      throw new InvalidParamError('O título do livro é obrigatório.', 'title');
    }

    if (!genre || genre.trim().length === 0) {
      throw new InvalidParamError('O gênero do livro é obrigatório.', 'genre');
    }

    if (!authorId || authorId.trim().length === 0) {
      throw new InvalidParamError('O ID do autor é obrigatório.', 'authorId');
    }

    const author = await this.authorRepository.findById(authorId.trim());
    if (!author) {
      throw new NotFoundError(`Autor com ID "${authorId}" não foi encontrado.`);
    }

    if (isNaN(releaseDate.getTime())) {
      throw new InvalidParamError('A data de lançamento é inválida.', 'releaseDate');
    }

    if (isNaN(total_quantity) || total_quantity < 0) {
      throw new InvalidParamError('A quantidade total deve ser um número maior ou igual a 0.', 'total_quantity');
    }

    const finalAvailableQuantity = available_quantity ?? total_quantity;

    if (isNaN(finalAvailableQuantity) || finalAvailableQuantity < 0 || finalAvailableQuantity > total_quantity) {
      throw new InvalidParamError(
        'A quantidade disponível deve estar entre 0 e a quantidade total.',
        'available_quantity'
      );
    }

    const book = new Book({
      authorId: authorId.trim(),
      title: title.trim(),
      genre: genre.trim(),
      releaseDate,
      total_quantity,
      available_quantity: finalAvailableQuantity,
    });

    await this.bookRepository.create(book);
    return book;
  }

  public async listBooks(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  public async getBookById(id: string): Promise<Book> {
    if (!id || id.trim().length === 0) {
      throw new InvalidParamError('O ID do livro é obrigatório.', 'id');
    }

    const book = await this.bookRepository.findById(id.trim());

    if (!book) {
      throw new NotFoundError(`Livro com ID "${id}" não foi encontrado.`);
    }

    return book;
  }
}
