import { Author } from '../entities/author.js';
import { AuthorRepository } from '../repositories/author-repository.js';
import { InvalidNameError } from '../shared/errors/invalid-name.error.js';
import { NotFoundError } from '../shared/errors/not-found.error.js';


export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async createAuthor(name: string): Promise<Author> {
    if (!name) {
      throw new InvalidNameError('O nome do autor é obrigatório e não pode ser vazio.');
    }

    if (name.length < 2) {
      throw new InvalidNameError('O nome do autor deve conter pelo menos 2 caracteres.');
    }

    const author = new Author({ name });
    await this.authorRepository.create(author);
    return author;
  }

  public async listAuthors(): Promise<Author[]> {
    return this.authorRepository.findAll();
  }

  public async getAuthorById(id: string): Promise<Author> {
    const author = await this.authorRepository.findById(id);

    if (!author) {
      throw new NotFoundError(`Autor com ID "${id}" não foi encontrado.`);
    }

    return author;
  }

  public async updateAuthor(id: string, name: string): Promise<Author> {
    if (!name) {
      throw new InvalidNameError('O novo nome do autor não pode ser vazio.');
    }

    if (name.length < 2) {
      throw new InvalidNameError('O nome do autor deve conter pelo menos 2 caracteres.');
    }

    const author = await this.getAuthorById(id);
    author.updateName(name);
    await this.authorRepository.update(author);
    return author;
  }
}
