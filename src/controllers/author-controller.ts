import type * as readline from 'node:readline/promises';
import { AuthorService } from '../services/author-service.js';

export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  public async register(terminal: readline.Interface): Promise<void> {
    console.log('\n--- CADASTRO DE AUTOR ---');
    const name = await terminal.question('Informe o nome do autor: ');

    try {
      const author = await this.authorService.createAuthor(name);
      console.log('\nAutor cadastrado com sucesso!');
      console.log(`ID: ${author.id}`);
      console.log(`Nome: ${author.name}`);
      console.log(`Criado em: ${author.createdAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao cadastrar autor: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao cadastrar autor.');
      }
    }
  }
}
