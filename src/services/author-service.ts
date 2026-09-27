import { Author } from '../entities/author.js';
import { AuthorRepository } from '../repositories/author-repository.js';
import { InvalidNameError } from '../shared/errors/invalid-name.error.js';


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
}
